/* ==========================================================================
   zada4ko.com — sheet model: build tasks, render paper, encode to URL
   ========================================================================== */
"use strict";

(function (Z) {
  var H = Z.H, reg = Z.reg;

  var Sheet = {};

  Sheet.defaults = function () {
    return {
      grade: 2,
      diff: 1,
      topics: [],          // [{ id, count }]
      title: "",
      cols: 0,             // 0 = auto
      key: "page",         // none | same | page
      space: 1,            // 0 = compact, 1 = normal, 2 = extra room to work
      points: 0,           // 0 = don't print points
      variants: 1,
      mode: "solve",       // solve | print — carried in the shared link
      seed: Z.newSeed()
    };
  };

  /* ------------------------------ Building ------------------------------- */

  /**
   * Build the task model for one variant.
   * The RNG stream is derived from seed + variant + topic id, so adding a
   * topic never reshuffles the tasks of the topics above it.
   */
  Sheet.build = function (cfg, variantIdx) {
    var vs = variantIdx ? "-v" + variantIdx : "";
    var sections = [];
    var n = 0;

    cfg.topics.forEach(function (t) {
      var gen = reg.get(t.id);
      if (!gen || t.count < 1) return;
      var rng = new Z.RNG(cfg.seed + vs + "|" + t.id + "|" + cfg.grade + "|" + cfg.diff);
      var ctx = { grade: cfg.grade, diff: cfg.diff };
      var tasks = [];
      var guard = 0;
      var seen = {};
      while (tasks.length < t.count && guard < t.count * 40) {
        guard++;
        var task = gen.make(rng, ctx);
        if (!task || task.a === undefined || task.a === null || task.a === "") continue;
        var fp = task.q + "|" + task.a;
        if (seen[fp] && guard < t.count * 20) continue;   // avoid duplicates while we can
        seen[fp] = 1;
        // "20 мин.." -> "20 мин." : abbreviations already carry their own full stop
        task.q = String(task.q).replace(/([.!?])\.(?=\s|<|$)/g, "$1");
        task.no = ++n;
        task.gen = gen.id;
        task.genName = Z.i18n.pick(gen.name);
        tasks.push(task);
      }
      if (tasks.length) sections.push({ gen: gen, tasks: tasks });
    });

    return { cfg: cfg, variant: variantIdx || 0, sections: sections, count: n };
  };

  Sheet.allTasks = function (model) {
    var out = [];
    model.sections.forEach(function (s) { out = out.concat(s.tasks); });
    return out;
  };

  /* --------------------------- Task fragments ---------------------------- */

  /** Visible text of a prompt, with the markup stripped. */
  function plain(html) {
    return String(html).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
  }

  /**
   * What goes between the prompt and the blank. "12 + 7" wants " =", but
   * "Колко процента е 41 от 820?" must not grow an equals sign.
   */
  function tailFor(task) {
    if (task.tail) return task.tail;
    if (!task.eq) return "";
    return /[?:]$/.test(plain(task.q)) ? "" : " =";
  }

  /** The answer blank as it appears on paper. */
  function blank(task) {
    var wide = task.kind === "text" || (task.a && String(task.a).length > 3);
    return '<span class="sh-blank' + (wide ? " wide" : "") + '"></span>' +
      (task.unit ? " " + task.unit : "");
  }

  /**
   * Some prompts already carry their own answer slot — the "?" box in
   * "□ + 7 = 15", or the inline blank in "8 dm = ___ cm". Appending a second
   * blank to those reads as two separate questions.
   */
  function hasOwnSlot(task) {
    return /sh-blank|sh-box/.test(String(task.q));
  }

  /** "= ____" kept on one line, so a blank never orphans onto the next row. */
  function slotFor(task) {
    if (hasOwnSlot(task)) return "";
    return '<span class="sh-nb">' + tailFor(task) + " " + blank(task) + "</span>";
  }

  /** The separate "Отговор: ____" line used under diagrams and word problems. */
  function answerLine(task) {
    if (hasOwnSlot(task)) return "";
    return '<div class="sh-answer"><span class="sh-nb"><b>' +
      (Z.i18n.lang === "bg" ? "Отговор:" : "Answer:") + "</b> " + blank(task) + "</span></div>";
  }

  /**
   * On paper the "?" box is where the child writes, so it has to be wide enough
   * for the answer. The size is decided once per section from its longest
   * answer, not per task — a box that grows with its own answer would tell the
   * child how many digits to expect.
   */
  Sheet.boxClass = function (tasks) {
    var n = 0;
    tasks.forEach(function (t) { n = Math.max(n, String(t.a).length); });
    return n >= 4 ? "box-lg" : (n >= 2 ? "box-md" : "");
  };

  /** Question HTML for the printed sheet. `space` scales the writing room. */
  Sheet.printQuestion = function (task, space, boxCls) {
    var body = boxCls
      ? String(task.q).replace(/class="sh-box"/g, 'class="sh-box ' + boxCls + '"')
      : task.q;
    if (space === undefined) space = 1;

    if (task.kind === "choice") {
      // When the prompt carries its own box the child writes the sign straight
      // into it — listing ○< ○> ○= underneath as well only clutters the page.
      if (hasOwnSlot(task)) return '<div class="sh-expr">' + body + "</div>";
      var ch = task.choices.map(function (c) {
        return "<span><i></i>" + c + "</span>";
      }).join("");
      return '<div class="sh-expr">' + body + '</div><div class="sh-choices">' + ch + "</div>";
    }

    if (task.layout === "text") {
      var work = "";
      var base = task.work === undefined ? 2 : task.work;
      var lines = space === 0 ? 0 : (space === 2 ? base + 2 : base);
      for (var i = 0; i < lines; i++) work += '<div class="sh-work"></div>';
      return '<div class="sh-text">' + body + "</div>" + work + answerLine(task);
    }

    if (task.layout === "block") {
      if (task.eq) return "<div>" + body + slotFor(task) + "</div>";
      // `selfContained` means the drawing already leaves room to write in
      var needsLine = !task.selfContained && (task.kind === "num" || task.kind === "text");
      return "<div>" + body + "</div>" + (needsLine ? answerLine(task) : "");
    }

    return '<span class="sh-expr">' + body + slotFor(task) + "</span>";
  };

  /** Question HTML for the interactive card (no blanks — inputs go elsewhere). */
  Sheet.solveQuestion = function (task) {
    if (task.layout === "expr") {
      return '<span class="big">' + task.q + tailFor(task) + "</span>";
    }
    return task.q;
  };

  /* ------------------------------ Rendering ------------------------------ */

  var MM = 3.7795275591;               // one CSS millimetre, in px
  var TEXT_MM = 186;                     // A4 width minus the @page margins
  var ROW_GAP_PX = 16;                   // gap between the printed columns
  var NUM_PX = 28;                       // room for the "12." task number and its gap

  /**
   * Headroom demanded of every column before it is accepted.
   *
   * Fitting an expression to the last pixel looked fine in Chrome but broke on
   * iOS Safari, which adds its own print header and margins and rasterises text
   * slightly differently: sections that had 3–8% slack wrapped onto two lines.
   * Requiring a fifth of the width as slack means a column is only used when it
   * comfortably fits, on any engine.
   */
  var SAFETY = 1.20;

  /**
   * Arrange items into rows that read down the columns — the same order a
   * balanced multi-column layout produces, but as explicit rows.
   */
  function toRows(items, cols) {
    var rows = Math.max(1, Math.ceil(items.length / cols));
    var out = [];
    for (var r = 0; r < rows; r++) {
      var row = [];
      for (var k = 0; k < cols; k++) {
        var i = r + k * rows;
        row.push(i < items.length ? items[i] : null);
      }
      out.push(row);
    }
    return out;
  }

  /** Rough character-based width, used only when there is no DOM to measure in. */
  function guessWidthPx(tasks, cfg) {
    var longest = 0;
    tasks.forEach(function (task) {
      var q = String(task.q);
      var txt = q.replace(/<svg[\s\S]*?<\/svg>/gi, "")
        .replace(/<table[\s\S]*?<\/table>/gi, "")
        .replace(/<[^>]+>/g, "");
      var w = txt.length +
        (q.match(/sh-blank/g) || []).length * 7 +
        (q.match(/sh-box/g) || []).length * 2;
      if (task.layout === "expr" && !hasOwnSlot(task)) w += 9;
      longest = Math.max(longest, w);
    });
    return longest * 2.2 * MM;           // ~2.2mm per bold character
  }

  /**
   * How many columns a section gets. `widths` holds the real measured width of
   * each topic's widest expression (see Sheet.measureTopics); without it we fall
   * back to counting characters.
   */
  function colsFor(cfg, gen, tasks, widths) {
    if (cfg.cols) return H.clamp(cfg.cols, 1, 4);
    var max = H.clamp(gen.cols || 2, 1, 4);
    var need = (widths && widths[gen.id]) || guessWidthPx(tasks, cfg);
    if (!need) return max;               // nothing to measure (diagrams only)
    var text = TEXT_MM * MM;
    for (var c = max; c > 1; c--) {
      var avail = (text - ROW_GAP_PX * (c - 1)) / c - NUM_PX;
      if (need * SAFETY <= avail) return c;
    }
    return 1;
  }

  /**
   * Measure the widest expression of every topic, in an off-screen probe as wide
   * as the printed text block. Measuring beats estimating, and doing it before
   * the sheet is built means the column count is right on the first render.
   */
  Sheet.measureTopics = function (models) {
    if (typeof document === "undefined" || !document.createElement) return null;

    var html = "", ids = [];
    models.forEach(function (m) {
      m.sections.forEach(function (sec) {
        var boxCls = Sheet.boxClass(sec.tasks);
        sec.tasks.forEach(function (task) {
          if (task.layout !== "expr") return;
          html += '<div class="sh-probe">' + Sheet.printQuestion(task, m.cfg.space, boxCls) + "</div>";
          ids.push(sec.gen.id);
        });
      });
    });
    if (!html) return {};

    var probe = document.createElement("div");
    probe.className = "sheet";
    probe.setAttribute("style", "position:absolute;left:-99999px;top:0;width:" +
      (TEXT_MM * MM) + "px;min-height:0;padding:0;border:0;box-shadow:none;pointer-events:none");
    probe.innerHTML = html;
    document.body.appendChild(probe);

    var out = {};
    var spans = probe.querySelectorAll(".sh-probe > .sh-expr");
    for (var i = 0; i < spans.length; i++) {
      // Multiple-choice prompts render as a block <div>, which would measure the
      // full probe width instead of the text. inline-block collapses it to its
      // content; the probe is thrown away, so real layout is untouched.
      spans[i].style.display = "inline-block";
      spans[i].style.whiteSpace = "nowrap";
      var w = spans[i].getBoundingClientRect().width;
      var id = ids[i];
      if (w > 0 && (!out[id] || w > out[id])) out[id] = w;
    }
    probe.remove();
    return out;
  };

  var LETTERS = ["А", "Б", "В", "Г"];
  var LETTERS_EN = ["A", "B", "C", "D"];

  Sheet.variantLetter = function (i) {
    return (Z.i18n.lang === "bg" ? LETTERS : LETTERS_EN)[i] || String(i + 1);
  };

  /** Render one printable A4 sheet as an HTML string. */
  Sheet.renderPaper = function (model, widths) {
    var cfg = model.cfg, t = Z.t;
    var title = cfg.title || t("titlePlaceholder");
    var gradeName = t("grade" + cfg.grade);
    var total = 0;
    model.sections.forEach(function (s) { total += s.tasks.length; });
    var maxPoints = cfg.points ? total * cfg.points : 0;

    var html = '<div class="sheet-fit"><div class="sheet">';

    /* header */
    html += '<div class="sh-head">' +
      '<div class="sh-brand">zada4ko<small>' + gradeName + "</small></div>" +
      '<div class="sh-title"><h2>' + H.esc(title) + "</h2><p>" +
        total + " " + t("taskWord") +
        (cfg.variants > 1 ? " · " + t("variant") + " " + Sheet.variantLetter(model.variant) : "") +
      "</p></div>" +
      '<div class="sh-score"><div class="box"></div>' + t("sheetScore") +
        (maxPoints ? " / " + maxPoints : "") + "</div>" +
      "</div>";

    /* name / class / date line */
    html += '<div class="sh-meta">' +
      "<span>" + t("sheetName") + ": </span>" +
      "<span>" + t("sheetClass") + ": </span>" +
      "<span>" + t("sheetDate") + ": </span>" +
      "</div>";

    /* sections */
    model.sections.forEach(function (sec, si) {
      var cols = colsFor(cfg, sec.gen, sec.tasks, widths);
      var boxCls = Sheet.boxClass(sec.tasks);
      var pts = cfg.points ? sec.tasks.length * cfg.points : 0;
      html += '<section class="sh-sec">';
      html += '<div class="sh-sec-hd"><h3>' + (si + 1) + ". " + Z.i18n.pick(sec.gen.name) + "</h3>" +
        (pts ? '<span class="pts">' + pts + " " + t("pts") + "</span>" : "") + "</div>";
      html += '<p class="sh-instr">' + Z.i18n.pick(sec.gen.instr) + "</p>";

      // Explicit rows rather than CSS columns: Safari collapses a multi-column
      // container to a single column when it paginates, so a sheet that looked
      // right on screen printed as one long column on an iPhone.
      html += '<div class="sh-rows' + (sec.gen.cols === 1 ? " wide" : "") + '">';
      toRows(sec.tasks, cols).forEach(function (row) {
        html += '<div class="sh-row">';
        row.forEach(function (task) {
          if (!task) { html += '<div class="sh-cell empty"></div>'; return; }
          html += '<div class="sh-cell' + (task.layout === "block" ? " blk" : "") + '">' +
            '<span class="no">' + task.no + '.</span>' +
            '<span class="q">' + Sheet.printQuestion(task, cfg.space, boxCls) + "</span></div>";
        });
        html += "</div>";
      });
      html += "</div></section>";
    });

    /* answer key, when it shares the page */
    if (cfg.key === "same") html += Sheet.renderKey(model);

    /* the footer closes the page, so it goes last */
    html += Sheet.footer(model);
    html += "</div></div>";

    /* the key on its own page gets the same footer */
    if (cfg.key === "page") {
      html += '<div class="sheet-fit"><div class="sheet">' +
        Sheet.renderKey(model) + Sheet.footer(model) + "</div></div>";
    }
    return html;
  };

  /** The line that closes every printed page: site name and sheet code. */
  Sheet.footer = function (model) {
    var cfg = model.cfg;
    return '<div class="sh-foot"><span>' + Z.t("sheetFoot") + "</span>" +
      "<span>" + Z.t("seedLabel") + ": " + H.esc(cfg.seed) +
      (cfg.variants > 1 ? "-" + Sheet.variantLetter(model.variant) : "") +
      (Z.VERSION ? " · v" + Z.VERSION : "") + "</span></div>";
  };

  Sheet.renderKey = function (model) {
    var t = Z.t;
    var html = '<div class="sh-key">';
    html += "<h3>🔑 " + t("answersKey") +
      (model.cfg.variants > 1 ? " — " + t("variant") + " " + Sheet.variantLetter(model.variant) : "") + "</h3>";
    // rows, for the same reason the task lists use them
    var all = Sheet.allTasks(model);
    var cols = all.length <= 8 ? 2 : 4;
    html += '<div class="sh-rows key-rows">';
    toRows(all, cols).forEach(function (row) {
      html += '<div class="sh-row">';
      row.forEach(function (task) {
        if (!task) { html += '<div class="sh-cell empty"></div>'; return; }
        html += '<div class="sh-cell"><span class="no">' + task.no + '.</span>' +
          '<span class="q">' + H.esc(task.a) + "</span></div>";
      });
      html += "</div>";
    });
    html += "</div></div>";
    return html;
  };

  /** Every variant of a sheet, one page after another. */
  Sheet.renderAll = function (cfg) {
    var n = H.clamp(cfg.variants || 1, 1, 4);
    var models = [];
    for (var i = 0; i < n; i++) models.push(Sheet.build(cfg, i));
    var widths = Sheet.measureTopics(models);
    var out = "";
    models.forEach(function (m) { out += Sheet.renderPaper(m, widths); });
    return out;
  };

  /* ----------------------------- URL encoding ---------------------------- */

  Sheet.encode = function (cfg) {
    var p = [];
    p.push("g=" + cfg.grade);
    p.push("d=" + cfg.diff);
    p.push("s=" + encodeURIComponent(cfg.seed));
    p.push("t=" + cfg.topics.map(function (x) { return x.id + "." + x.count; }).join("_"));
    if (cfg.title) p.push("h=" + encodeURIComponent(cfg.title));
    if (cfg.cols) p.push("c=" + cfg.cols);
    if (cfg.key !== "page") p.push("k=" + cfg.key);
    if (cfg.space !== 1) p.push("w=" + cfg.space);
    if (cfg.points) p.push("p=" + cfg.points);
    if (cfg.variants > 1) p.push("v=" + cfg.variants);
    if (cfg.mode === "print") p.push("m=print");
    return p.join("&");
  };

  Sheet.decode = function (str) {
    var cfg = Sheet.defaults();
    if (!str) return null;
    var got = false;
    str.replace(/^[?#]/, "").split("&").forEach(function (pair) {
      var i = pair.indexOf("=");
      if (i < 0) return;
      var k = pair.slice(0, i), v = decodeURIComponent(pair.slice(i + 1));
      switch (k) {
        case "g": cfg.grade = H.clamp(H.toInt(v, 2), 0, 7); got = true; break;
        case "d": cfg.diff = H.clamp(H.toInt(v, 1), 0, 2); break;
        case "s": if (v) cfg.seed = v.slice(0, 24); break;
        case "h": cfg.title = v.slice(0, 90); break;
        case "c": cfg.cols = H.clamp(H.toInt(v, 0), 0, 4); break;
        case "k": if (["none", "same", "page"].indexOf(v) >= 0) cfg.key = v; break;
        case "w": cfg.space = H.clamp(H.toInt(v, 1), 0, 2); break;
        case "p": cfg.points = H.clamp(H.toInt(v, 0), 0, 20); break;
        case "v": cfg.variants = H.clamp(H.toInt(v, 1), 1, 4); break;
        case "m": if (v === "print" || v === "solve") cfg.mode = v; break;
        case "t":
          cfg.topics = v.split("_").map(function (part) {
            var bits = part.split(".");
            return { id: bits[0], count: H.clamp(H.toInt(bits[1], 5), 1, 40) };
          }).filter(function (x) { return !!reg.get(x.id); });
          got = true;
          break;
      }
    });
    return got ? cfg : null;
  };

  Z.Sheet = Sheet;
})(window.Z);
