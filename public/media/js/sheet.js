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
        // "7 лв.." -> "7 лв." : abbreviations already carry their own full stop
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
    var wide = task.kind === "text" || (task.a && String(task.a).length > 4);
    return '<span class="sh-blank' + (wide ? " wide" : "") + '"></span>' +
      (task.unit ? " " + task.unit : "");
  }

  /** Question HTML for the printed sheet. `space` scales the writing room. */
  Sheet.printQuestion = function (task, space) {
    var body = task.q;
    if (space === undefined) space = 1;

    if (task.kind === "choice") {
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
      return '<div class="sh-text">' + body + "</div>" + work +
        '<div class="sh-text" style="margin-top:5px"><b>' +
        (Z.i18n.lang === "bg" ? "Отговор:" : "Answer:") + "</b> " + blank(task) + "</div>";
    }

    if (task.layout === "block") {
      var tail = task.eq ? tailFor(task) + " " + blank(task) : "";
      var extra = task.kind === "num" || task.kind === "text"
        ? '<div class="sh-text" style="margin-top:4px">' +
          (Z.i18n.lang === "bg" ? "Отговор:" : "Answer:") + " " + blank(task) + "</div>"
        : "";
      return '<div>' + body + tail + "</div>" + (task.eq ? "" : extra);
    }

    return '<span class="sh-expr">' + body + tailFor(task) + " " + blank(task) + "</span>";
  };

  /** Question HTML for the interactive card (no blanks — inputs go elsewhere). */
  Sheet.solveQuestion = function (task) {
    if (task.layout === "expr") {
      return '<span class="big">' + task.q + tailFor(task) + "</span>";
    }
    return task.q;
  };

  /* ------------------------------ Rendering ------------------------------ */

  function colsFor(cfg, gen, tasks) {
    if (cfg.cols) return cfg.cols;
    var c = gen.cols || 2;
    // Long *prompts* need more room. Diagrams carry their own width, and their
    // internal labels (clock numerals, side lengths) must not count as text.
    var longest = 0;
    tasks.forEach(function (task) {
      var txt = String(task.q)
        .replace(/<svg[\s\S]*?<\/svg>/gi, "")
        .replace(/<table[\s\S]*?<\/table>/gi, "")
        .replace(/<[^>]+>/g, "");
      longest = Math.max(longest, txt.length);
    });
    if (longest > 46) c = Math.min(c, 1);
    else if (longest > 26) c = Math.min(c, 2);
    return H.clamp(c, 1, 4);
  }

  var LETTERS = ["А", "Б", "В", "Г"];
  var LETTERS_EN = ["A", "B", "C", "D"];

  Sheet.variantLetter = function (i) {
    return (Z.i18n.lang === "bg" ? LETTERS : LETTERS_EN)[i] || String(i + 1);
  };

  /** Render one printable A4 sheet as an HTML string. */
  Sheet.renderPaper = function (model) {
    var cfg = model.cfg, t = Z.t;
    var title = cfg.title || t("titlePlaceholder");
    var gradeName = t("grade" + cfg.grade);
    var total = 0;
    model.sections.forEach(function (s) { total += s.tasks.length; });
    var maxPoints = cfg.points ? total * cfg.points : 0;

    var html = '<div class="sheet">';

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
      var cols = colsFor(cfg, sec.gen, sec.tasks);
      var pts = cfg.points ? sec.tasks.length * cfg.points : 0;
      html += '<section class="sh-sec">';
      html += '<div class="sh-sec-hd"><h3>' + (si + 1) + ". " + Z.i18n.pick(sec.gen.name) + "</h3>" +
        (pts ? '<span class="pts">' + pts + " " + t("pts") + "</span>" : "") + "</div>";
      html += '<p class="sh-instr">' + Z.i18n.pick(sec.gen.instr) + "</p>";
      html += '<ol class="sh-list cols-' + cols + (sec.gen.cols === 1 ? " wide" : "") + '">';
      sec.tasks.forEach(function (task) {
        html += '<li' + (task.layout === "block" ? ' class="blk"' : "") + '><span class="no">' +
          task.no + '.</span><span class="q">' + Sheet.printQuestion(task, cfg.space) + "</span></li>";
      });
      html += "</ol></section>";
    });

    /* footer */
    html += '<div class="sh-foot"><span>' + t("sheetFoot") + "</span>" +
      "<span>" + t("seedLabel") + ": " + H.esc(cfg.seed) +
      (cfg.variants > 1 ? "-" + Sheet.variantLetter(model.variant) : "") + "</span></div>";

    /* answer key on the same sheet */
    if (cfg.key === "same") html += Sheet.renderKey(model, false);

    html += "</div>";

    if (cfg.key === "page") html += '<div class="sheet">' + Sheet.renderKey(model) + "</div>";
    return html;
  };

  Sheet.renderKey = function (model) {
    var t = Z.t;
    var html = '<div class="sh-key">';
    html += "<h3>🔑 " + t("answersKey") +
      (model.cfg.variants > 1 ? " — " + t("variant") + " " + Sheet.variantLetter(model.variant) : "") + "</h3>";
    html += "<ol>";
    Sheet.allTasks(model).forEach(function (task) {
      html += '<li value="' + task.no + '">' + H.esc(task.a) + "</li>";
    });
    html += "</ol></div>";
    return html;
  };

  /** All variants of a sheet, one after another. */
  Sheet.renderAll = function (cfg) {
    var out = "";
    var n = H.clamp(cfg.variants || 1, 1, 4);
    for (var i = 0; i < n; i++) out += Sheet.renderPaper(Sheet.build(cfg, i));
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
