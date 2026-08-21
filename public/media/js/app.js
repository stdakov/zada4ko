/* ==========================================================================
   zada4ko.com — application shell: routing, studio UI, printing, progress
   ========================================================================== */
"use strict";

(function (Z) {
  var H = Z.H, el = H.el, $ = H.$, $$ = H.$$, t = Z.t;
  var Sheet = Z.Sheet;

  var App = {
    cfg: null,
    mode: "solve",          // solve | print
    view: "home",
    dirty: true
  };

  var GRADES = [
    { g: 0, emoji: "🧸", age: "5–6",   short: { bg: "ПГ", en: "Pre" } },
    { g: 1, emoji: "🍎", age: "6–7",   short: { bg: "1.", en: "G1" } },
    { g: 2, emoji: "🚀", age: "7–8",   short: { bg: "2.", en: "G2" } },
    { g: 3, emoji: "🎨", age: "8–9",   short: { bg: "3.", en: "G3" } },
    { g: 4, emoji: "🔭", age: "9–10",  short: { bg: "4.", en: "G4" } },
    { g: 5, emoji: "🧪", age: "10–11", short: { bg: "5.", en: "G5" } },
    { g: 6, emoji: "🤖", age: "11–12", short: { bg: "6.", en: "G6" } },
    { g: 7, emoji: "🏅", age: "12–13", short: { bg: "7.", en: "G7" } }
  ];
  App.GRADES = GRADES;

  /** A sensible starting number of tasks for a topic. */
  function defaultCount(gen) {
    if (gen.cols === 1) return 4;
    if (gen.cols >= 3) return 8;
    return 6;
  }

  /* ------------------------------- Toast --------------------------------- */
  Z.toast = function (msg) {
    var wrap = $("#toasts");
    if (!wrap) return;
    var n = el("div", { class: "toast", text: msg });
    wrap.appendChild(n);
    setTimeout(function () {
      n.style.transition = "opacity .35s, transform .35s";
      n.style.opacity = "0";
      n.style.transform = "translateY(10px)";
      setTimeout(function () { n.remove(); }, 380);
    }, 2600);
  };

  /* ------------------------------ Routing -------------------------------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var qi = h.indexOf("?");
    return { view: (qi < 0 ? h : h.slice(0, qi)) || "home", query: qi < 0 ? "" : h.slice(qi + 1) };
  }

  function go(view, query, replace) {
    var hash = "#/" + view + (query ? "?" + query : "");
    if (replace) history.replaceState(null, "", hash);
    else location.hash = hash;
    if (replace) route();
  }
  App.go = go;

  function route() {
    var r = parseHash();
    var known = ["home", "studio", "teachers", "progress", "about"];
    if (known.indexOf(r.view) === -1) r.view = "home";
    App.view = r.view;

    if (r.view === "studio") {
      var incoming = Sheet.decode(r.query);
      if (incoming && Sheet.encode(incoming) !== (App.cfg ? Sheet.encode(App.cfg) : "")) {
        App.cfg = incoming;
        App.dirty = true;
        fillPanel();
        if (incoming.mode && incoming.mode !== App.mode) applyMode(incoming.mode);
      }
      if (!App.cfg) { App.cfg = starterConfig(2); fillPanel(); }
      renderStudio();
    }
    if (r.view === "progress") renderProgress();

    $$(".view").forEach(function (v) { v.classList.toggle("on", v.id === "view-" + r.view); });
    $$(".topnav a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("href") === "#/" + r.view);
    });
    $("#topnav").classList.remove("open");
    if (r.view !== "studio") window.scrollTo({ top: 0, behavior: "instant" in window ? "auto" : "auto" });
    document.title = (r.view === "home" ? "" : t("nav" + r.view.charAt(0).toUpperCase() + r.view.slice(1)) + " · ") +
      (Z.i18n.lang === "bg"
        ? "zada4ko — задачи по математика за деца"
        : "zada4ko — maths tasks for kids");
  }

  /* --------------------------- Config helpers ---------------------------- */
  function starterConfig(grade) {
    var cfg = Sheet.defaults();
    cfg.grade = grade;
    var gens = Z.reg.forGrade(grade);
    var picked = gens.slice(0, 3);
    cfg.topics = picked.map(function (g) { return { id: g.id, count: defaultCount(g) }; });
    cfg.title = "";
    return cfg;
  }
  App.starterConfig = starterConfig;

  function syncUrl() {
    if (App.view !== "studio") return;
    history.replaceState(null, "", "#/studio?" + Sheet.encode(App.cfg));
  }

  /* ----------------------------- Grade cards ----------------------------- */
  function gradeCard(g, onClick) {
    return el("button", {
      class: "grade", "data-g": g.g, type: "button",
      onclick: function () { onClick(g.g); }
    }, [
      el("span", { class: "g-emoji", text: g.emoji }),
      el("span", { class: "g-name", text: t("grade" + g.g) }),
      el("span", { class: "g-age", text: g.age + " " + t("ageLabel") }),
      el("span", { class: "g-bar" })
    ]);
  }

  function renderHomeGrades() {
    var box = $("#homeGrades");
    box.innerHTML = "";
    GRADES.forEach(function (g) {
      box.appendChild(gradeCard(g, function (grade) {
        App.cfg = starterConfig(grade);
        App.dirty = true;
        fillPanel();
        go("studio", Sheet.encode(App.cfg));
      }));
    });
  }

  /* ------------------------------- Panel --------------------------------- */
  function renderGradePicker() {
    var box = $("#panelGrades");
    box.innerHTML = "";
    GRADES.forEach(function (g) {
      var id = "pg" + g.g;
      box.appendChild(el("input", {
        type: "radio", name: "pgrade", id: id, value: g.g,
        checked: App.cfg.grade === g.g ? "checked" : null,
        onchange: function () {
          App.cfg.grade = g.g;
          // keep only topics that still exist for the new grade
          var avail = Z.reg.forGrade(g.g).map(function (x) { return x.id; });
          App.cfg.topics = App.cfg.topics.filter(function (x) { return avail.indexOf(x.id) !== -1; });
          if (!App.cfg.topics.length) App.cfg.topics = starterConfig(g.g).topics;
          App.dirty = true;
          renderTopics();
          refresh();
        }
      }));
      box.appendChild(el("label", { for: id, text: Z.i18n.pick(g.short), title: t("grade" + g.g) }));
    });
  }

  function topicCount(id) {
    var found = App.cfg.topics.filter(function (x) { return x.id === id; })[0];
    return found ? found.count : 0;
  }

  function renderTopics() {
    var box = $("#panelTopics");
    box.innerHTML = "";
    var gens = Z.reg.forGrade(App.cfg.grade);
    gens.forEach(function (gen) {
      var on = topicCount(gen.id) > 0;
      var row = el("div", { class: "topic" + (on ? " on" : ""), "data-id": gen.id });
      row.appendChild(el("span", { class: "t-ico", text: gen.icon }));
      row.appendChild(el("span", { class: "t-txt" }, [
        el("span", { class: "t-name", text: Z.i18n.pick(gen.name) }),
        el("span", { class: "t-desc", html: Z.i18n.pick(gen.desc) })
      ]));
      var cnt = el("input", {
        class: "t-cnt", type: "number", min: "1", max: "40", value: String(on ? topicCount(gen.id) : defaultCount(gen)),
        "aria-label": Z.i18n.pick(gen.name) + " — " + t("countLabel"),
        onclick: function (e) { e.stopPropagation(); },
        onchange: function (e) {
          e.stopPropagation();
          var v = H.clamp(H.toInt(e.target.value, defaultCount(gen)), 1, 40);
          e.target.value = v;
          setTopic(gen.id, v, true);
        }
      });
      row.appendChild(cnt);
      row.appendChild(el("span", { class: "t-check", text: "✓" }));
      row.addEventListener("click", function () {
        var nowOn = !row.classList.contains("on");
        setTopic(gen.id, nowOn ? H.toInt(cnt.value, defaultCount(gen)) : 0);
        row.classList.toggle("on", nowOn);
      });
      box.appendChild(row);
    });
    updateTotal();
  }

  function setTopic(id, count, keepOrder) {
    var list = App.cfg.topics.slice();
    var idx = -1;
    list.forEach(function (x, i) { if (x.id === id) idx = i; });
    if (count < 1) { if (idx >= 0) list.splice(idx, 1); }
    else if (idx >= 0) list[idx].count = count;
    else list.push({ id: id, count: count });
    App.cfg.topics = list;
    App.dirty = true;
    updateTotal();
    refresh();
  }

  function updateTotal() {
    var n = App.cfg.topics.reduce(function (s, x) { return s + x.count; }, 0);
    var node = $("#totalCount");
    if (node) node.textContent = n;
  }

  /** Push current cfg values into the form controls. */
  function fillPanel() {
    if (!$("#panelTopics")) return;
    renderGradePicker();
    renderTopics();
    $("#optTitle").value = App.cfg.title;
    $("#optDiff").value = String(App.cfg.diff);
    $("#optCols").value = String(App.cfg.cols);
    $("#optKey").value = App.cfg.key;
    $("#optPoints").value = String(App.cfg.points);
    $("#optSpace").value = String(App.cfg.space);
    $("#optVariants").value = String(App.cfg.variants);
    $("#seedBox").textContent = App.cfg.seed;
  }

  function bindPanel() {
    $("#optTitle").addEventListener("input", function (e) {
      App.cfg.title = e.target.value.slice(0, 90); syncUrl(); softRefresh();
    });
    $("#optDiff").addEventListener("change", function (e) {
      App.cfg.diff = H.toInt(e.target.value, 1); App.dirty = true; refresh();
    });
    $("#optCols").addEventListener("change", function (e) {
      App.cfg.cols = H.toInt(e.target.value, 0); softRefresh();
    });
    $("#optKey").addEventListener("change", function (e) {
      App.cfg.key = e.target.value; softRefresh();
    });
    $("#optPoints").addEventListener("change", function (e) {
      App.cfg.points = H.toInt(e.target.value, 0); softRefresh();
    });
    $("#optSpace").addEventListener("change", function (e) {
      App.cfg.space = H.clamp(H.toInt(e.target.value, 1), 0, 2); softRefresh();
    });
    $("#optVariants").addEventListener("change", function (e) {
      App.cfg.variants = H.toInt(e.target.value, 1); softRefresh();
    });
    $("#btnReshuffle").addEventListener("click", function () {
      App.cfg.seed = Z.newSeed();
      $("#seedBox").textContent = App.cfg.seed;
      App.dirty = true;
      refresh();
      Z.toast("🎲 " + t("reshuffle"));
    });
  }

  /* ------------------------------- Studio -------------------------------- */
  /** Switch mode state + tab chrome, without triggering a render. */
  function applyMode(m) {
    App.mode = m;
    if (App.cfg) App.cfg.mode = m;
    $$("#modeTabs button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-m") === m); });
    $("#printTools").classList.toggle("hidden", m !== "print");
  }

  function setMode(m) {
    applyMode(m);
    syncUrl();
    renderStudio();
  }

  /** Full rebuild (tasks change). */
  function refresh() { App.dirty = true; syncUrl(); renderStudio(); }
  /** Layout-only rebuild (same tasks). */
  function softRefresh() { syncUrl(); if (App.mode === "print") renderPaper(); }

  var renderStudio = H.debounce(function () {
    if (App.view !== "studio") return;
    updateTotal();
    if (!App.cfg.topics.length) {
      $("#studioOut").innerHTML = '<div class="card card-pad tac muted" style="font-weight:700">🐣 ' + t("noTopics") + "</div>";
      return;
    }
    if (App.mode === "print") renderPaper();
    else renderSolve();
  }, 120);

  function renderPaper() {
    Z.Solve.stop();
    $("#studioOut").innerHTML = '<div class="paper-scroll">' + Sheet.renderAll(App.cfg) + "</div>";
    fitAndMeasure();

    // Column fitting measures text, so it needs the real font. On a cold load
    // Nunito may still be downloading, and the fallback font has different
    // metrics — so measure again once the font is in. fitColumns always starts
    // from data-maxcols, which makes re-running it safe and idempotent.
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(function () {
        if (App.view === "studio" && App.mode === "print") fitAndMeasure();
      });
    }
  }

  function fitAndMeasure() {
    Sheet.fitColumns($("#studioOut"));
    updatePageEstimate();
  }

  /**
   * Measure what we just laid out and report how many A4 pages it will take.
   * The printed text block is 275mm tall (A4 minus the @page margins).
   */
  function updatePageEstimate() {
    var out = $("#pageEst");
    if (!out) return;
    var probe = el("div", { style: "height:100mm;position:absolute;visibility:hidden;pointer-events:none" });
    document.body.appendChild(probe);
    var pxPerMm = probe.getBoundingClientRect().height / 100;
    probe.remove();
    if (!pxPerMm) return;
    var pages = 0;
    $$("#studioOut .sheet").forEach(function (sh) {
      var cs = window.getComputedStyle(sh);
      var inner = sh.scrollHeight - parseFloat(cs.paddingTop || 0) - parseFloat(cs.paddingBottom || 0);
      pages += Math.max(1, Math.ceil(inner / pxPerMm / 275));
    });
    out.textContent = pages;
  }

  function renderSolve() {
    if (!App.dirty && Z.Solve.state) return;
    App.dirty = false;
    Z.Solve.stop();
    var model = Sheet.build(App.cfg, 0);
    var out = $("#studioOut");
    out.innerHTML = "";
    Z.Solve.start(model, out, function (what) {
      if (what === "new") { App.cfg.seed = Z.newSeed(); $("#seedBox").textContent = App.cfg.seed; App.dirty = true; refresh(); }
      else if (what === "retry") { App.dirty = true; renderSolve(); }
      else if (what === "print") { setMode("print"); setTimeout(doPrint, 400); }
    });
  }

  function doPrint() {
    if (App.mode !== "print") { setMode("print"); setTimeout(doPrint, 350); return; }
    Z.Store.countPrint();
    window.print();
  }

  function share() {
    var url = location.origin + location.pathname + "#/studio?" + Sheet.encode(App.cfg);
    var done = function () { Z.toast("🔗 " + t("linkCopied")); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, function () { prompt("URL:", url); });
    } else {
      var ta = el("textarea", { });
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { prompt("URL:", url); }
      ta.remove();
    }
  }

  /* ------------------------------ Progress ------------------------------- */
  function renderProgress() {
    var d = Z.Store.data;
    var box = $("#progStats");
    var cells = [
      ["🧮", d.solved, t("progSolved")],
      ["✅", d.correct, t("progCorrect")],
      ["🎯", Z.Store.accuracy() + "%", t("progAccuracy")],
      ["📄", d.sheets, t("progSheets")]
    ];
    box.innerHTML = "";
    cells.forEach(function (c) {
      box.appendChild(el("div", { class: "feat tac" }, [
        el("div", { style: "font-size:2rem", text: c[0] }),
        el("div", { style: "font-family:var(--f-display);font-size:1.9rem;font-weight:700", text: String(c[1]) }),
        el("div", { class: "tiny muted", style: "font-weight:800", text: c[2] })
      ]));
    });

    var bb = $("#progBadges");
    bb.innerHTML = "";
    Z.Store.badges.forEach(function (b) {
      var got = d.badges.indexOf(b.id) !== -1;
      bb.appendChild(el("div", { class: "badge-i" + (got ? "" : " locked") }, [
        el("span", { text: b.icon }), el("span", { text: Z.i18n.pick(b.name) })
      ]));
    });

    var tb = $("#progTopics");
    tb.innerHTML = "";
    var ids = Object.keys(d.topics);
    if (!ids.length) {
      tb.appendChild(el("p", { class: "muted", style: "font-weight:700", text: t("progEmpty") }));
    } else {
      ids.sort(function (a, b) { return d.topics[b].n - d.topics[a].n; }).forEach(function (id) {
        var gen = Z.reg.get(id);
        if (!gen) return;
        var s = d.topics[id];
        var pct = Math.round((s.ok / s.n) * 100);
        tb.appendChild(el("div", { class: "row center", style: "gap:10px;margin-bottom:10px" }, [
          el("span", { style: "font-size:1.3rem;width:1.6em", text: gen.icon }),
          el("span", { style: "flex:0 0 34%;font-weight:800;font-size:.9rem", text: Z.i18n.pick(gen.name) }),
          el("span", { class: "progressbar grow" }, [el("i", { style: "width:" + pct + "%" })]),
          el("span", { class: "tiny mono", style: "font-weight:800;width:5.5em;text-align:right", text: s.ok + "/" + s.n + " · " + pct + "%" })
        ]));
      });
    }
  }

  /* ----------------------------- Language -------------------------------- */
  function setLang(lang) {
    Z.i18n.lang = lang;
    localStorage.setItem("z4_lang", lang);
    document.documentElement.setAttribute("lang", lang);
    Z.i18n.apply();
    $$("#langsw button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-l") === lang); });
    renderHomeGrades();
    if ($("#panelTopics")) fillPanel();
    App.dirty = true;
    route();
    if (App.view === "studio") renderStudio();
  }

  /* -------------------------------- Init --------------------------------- */
  function init() {
    Z.i18n.lang = Z.i18n.detect();
    document.documentElement.setAttribute("lang", Z.i18n.lang);
    Z.Store.load();
    Z.i18n.apply();

    $$("#langsw button").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-l") === Z.i18n.lang);
      b.addEventListener("click", function () { setLang(b.getAttribute("data-l")); });
    });

    $("#burger").addEventListener("click", function () { $("#topnav").classList.toggle("open"); });

    renderHomeGrades();
    bindPanel();

    $$("#modeTabs button").forEach(function (b) {
      b.addEventListener("click", function () { setMode(b.getAttribute("data-m")); });
    });
    $("#btnPrint").addEventListener("click", doPrint);
    $("#btnShare").addEventListener("click", share);

    $$("[data-quick]").forEach(function (b) {
      b.addEventListener("click", function () {
        var spec = b.getAttribute("data-quick").split(":");
        var grade = H.toInt(spec[0], 1);
        var cfg = Sheet.defaults();
        cfg.grade = grade;
        cfg.topics = spec[1].split(",").map(function (p) {
          var bits = p.split(".");
          return { id: bits[0], count: H.toInt(bits[1], 6) };
        }).filter(function (x) { return !!Z.reg.get(x.id); });
        if (spec[2]) cfg.diff = H.toInt(spec[2], 1);
        cfg.mode = b.getAttribute("data-mode") || "solve";
        App.cfg = cfg;
        App.mode = cfg.mode;
        App.dirty = true;
        fillPanel();
        setMode(App.mode);
        go("studio", Sheet.encode(cfg));
      });
    });

    $("#progReset").addEventListener("click", function () {
      if (confirm(t("progResetAsk"))) { Z.Store.reset(); renderProgress(); Z.toast("🧹"); }
    });

    // the preview width feeds the column fitting, so re-fit after a resize
    window.addEventListener("resize", H.debounce(function () {
      if (App.view === "studio" && App.mode === "print") fitAndMeasure();
    }, 250));

    window.addEventListener("hashchange", route);
    route();

    // Keyboard: Ctrl/Cmd+P prints the sheet rather than the whole page
    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p" && App.view === "studio") {
        e.preventDefault();
        doPrint();
      }
    });
  }

  Z.App = App;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(window.Z);
