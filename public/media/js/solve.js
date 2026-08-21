/* ==========================================================================
   zada4ko.com — interactive solving: cards, checking, scoring, celebration
   ========================================================================== */
"use strict";

(function (Z) {
  var H = Z.H, el = H.el, t = Z.t;

  var Solve = {
    model: null,
    state: null,
    root: null,
    onFinish: null
  };

  /* ------------------------- answer comparison --------------------------- */

  /** Fractions, remainders, times and decimals all normalise to one string. */
  function candidates(task) {
    var list = [task.a].concat(task.alts || []);
    var out = [];
    list.forEach(function (a) {
      if (a === undefined || a === null || a === "") return;
      var s = String(a);
      out.push(H.normAnswer(s));
      // "12 ост. 3" also accepted as "12 r 3" / "12ост3" / "12 3"
      var m = s.match(/^(-?\d+)\s*(?:ост\.?|остатък|r|rem)\s*(\d+)$/i);
      if (m) {
        out.push(H.normAnswer(m[1] + "ост" + m[2]));
        out.push(H.normAnswer(m[1] + "r" + m[2]));
        out.push(H.normAnswer(m[1] + " " + m[2]));
      }
      // "3 1/2" mixed number also as "31/2"
      var mm = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
      if (mm) out.push(H.normAnswer(mm[1] + mm[2] + "/" + mm[3]));
      // numeric equality (2.50 == 2.5)
      var num = parseFloat(s.replace(",", "."));
      if (!isNaN(num) && /^-?[\d.,]+$/.test(s.trim())) out.push(H.normAnswer(String(num)));
    });
    return out;
  }

  /** Only these are safe to compare as plain numbers. */
  var PLAIN_NUMBER = /^-?\d+(\.\d+)?$/;

  function isCorrect(task, given) {
    var g = H.normAnswer(given);
    if (!g) return false;
    var list = candidates(task);
    if (list.indexOf(g) !== -1) return true;
    // Numeric fallback, but only when BOTH sides are plain numbers: parseFloat
    // would happily read "04:00" as 4 and "12ост.3" as 12 and accept the wrong
    // answer for a clock reading or a division with remainder.
    var a = H.normAnswer(task.a);
    if (PLAIN_NUMBER.test(g) && PLAIN_NUMBER.test(a)) {
      if (Math.abs(parseFloat(g) - parseFloat(a)) < 1e-9) return true;
    }
    // "12ост3" / "12rem3" / "12r3" all mean the same thing
    var gg = g.replace(/остатък|ост|rem|r/g, "r");
    if (!/r/.test(gg)) return false;
    return list.some(function (c) { return c.replace(/остатък|ост|rem|r/g, "r") === gg; });
  }
  Solve.isCorrect = isCorrect;

  /* ------------------------------ rendering ------------------------------ */

  function card(task, idx) {
    var wrap = el("div", { class: "qcard", "data-i": idx });
    wrap.appendChild(el("div", { class: "q-no", text: String(task.no) }));
    wrap.appendChild(el("div", { class: "q-topic", text: task.genName }));
    wrap.appendChild(el("div", { class: "q-body", html: Z.Sheet.solveQuestion(task) }));

    if (task.kind === "choice") {
      var box = el("div", { class: "q-choices" });
      task.choices.forEach(function (c) {
        box.appendChild(el("button", {
          type: "button", class: "q-choice", "data-v": c, html: c === "<" ? "&lt;" : (c === ">" ? "&gt;" : c)
        }));
      });
      wrap.appendChild(box);
    } else {
      var row = el("div", { class: "ansrow" });
      var inp = el("input", {
        class: "inp grow", type: "text", inputmode: task.kind === "num" ? "decimal" : "text",
        autocomplete: "off", autocorrect: "off", spellcheck: "false",
        placeholder: task.hintTxt || t("answerPh"), "aria-label": t("answerPh")
      });
      row.appendChild(inp);
      row.appendChild(el("button", { type: "button", class: "btn btn-sm btn-mint q-go", text: t("check") }));
      wrap.appendChild(row);
    }

    wrap.appendChild(el("div", { class: "q-fb" }));
    return wrap;
  }

  /* -------------------------------- flow --------------------------------- */

  Solve.start = function (model, root, onFinish) {
    Solve.model = model;
    Solve.root = root;
    Solve.onFinish = onFinish;
    var tasks = Z.Sheet.allTasks(model);
    Solve.state = {
      tasks: tasks, done: 0, correct: 0, streak: 0, best: 0,
      started: Date.now(), answered: {}
    };

    root.innerHTML = "";
    var hud = el("div", { class: "solve-top noprint" }, [
      el("div", { class: "hud" }, [el("span", { text: "⭐" }), el("span", { class: "v", id: "hudScore", text: "0" }),
        el("span", { class: "tiny muted", text: "/ " + tasks.length })]),
      el("div", { class: "hud" }, [el("span", { text: "🔥" }), el("span", { class: "v", id: "hudStreak", text: "0" })]),
      el("div", { class: "hud" }, [el("span", { text: "⏱" }), el("span", { class: "v mono", id: "hudTime", text: "0:00" })]),
      el("div", { class: "progressbar grow" }, [el("i", { id: "hudBar" })]),
      el("button", { class: "btn btn-sm btn-paper", id: "solveNew", text: t("btnNew") })
    ]);
    root.appendChild(hud);

    var grid = el("div", { class: "qcards", id: "qgrid" });
    tasks.forEach(function (task, i) { grid.appendChild(card(task, i)); });
    root.appendChild(grid);

    var res = el("div", { class: "card card-pad result hidden", id: "solveResult" });
    root.appendChild(res);

    /* interaction */
    grid.addEventListener("click", function (e) {
      var goBtn = e.target.closest(".q-go");
      if (goBtn) { submitCard(goBtn.closest(".qcard")); return; }
      var ch = e.target.closest(".q-choice");
      if (ch) {
        var c = ch.closest(".qcard");
        if (c.classList.contains("ok") || c.classList.contains("bad")) return;
        H.$$(".q-choice", c).forEach(function (b) { b.classList.remove("sel"); });
        ch.classList.add("sel");
        submitCard(c, ch.getAttribute("data-v"));
      }
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.classList.contains("inp")) {
        e.preventDefault();
        submitCard(e.target.closest(".qcard"));
      }
    });

    H.$("#solveNew", root).addEventListener("click", function () {
      if (Solve.onFinish) Solve.onFinish("new");
    });

    Solve.timer = setInterval(tick, 1000);
    tick();
    var firstInput = H.$(".qcard .inp", grid);
    if (firstInput && window.innerWidth > 760) firstInput.focus();
  };

  function tick() {
    if (!Solve.state) return;
    var s = Math.floor((Date.now() - Solve.state.started) / 1000);
    var node = H.$("#hudTime");
    if (node) node.textContent = Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
  }

  function submitCard(cardEl, forced) {
    if (!cardEl || cardEl.classList.contains("ok") || cardEl.classList.contains("bad")) return;
    var i = +cardEl.getAttribute("data-i");
    var task = Solve.state.tasks[i];
    var given = forced;
    if (given === undefined) {
      var inp = H.$(".inp", cardEl);
      given = inp ? inp.value : "";
      if (!String(given).trim()) { inp && inp.focus(); return; }
      inp.setAttribute("readonly", "readonly");
    }

    var ok = isCorrect(task, given);
    var st = Solve.state;
    st.done++;
    st.answered[i] = { given: given, ok: ok };
    if (ok) { st.correct++; st.streak++; if (st.streak > st.best) st.best = st.streak; }
    else st.streak = 0;

    cardEl.classList.add(ok ? "ok" : "bad", ok ? "pop" : "shake");
    setTimeout(function () { cardEl.classList.remove("pop", "shake"); }, 450);

    if (task.kind === "choice") {
      H.$$(".q-choice", cardEl).forEach(function (b) {
        var v = b.getAttribute("data-v");
        if (v === task.a) b.classList.add("good");
        else if (v === given) b.classList.add("wrong");
        b.disabled = true;
      });
    } else {
      var go = H.$(".q-go", cardEl);
      if (go) go.disabled = true;
    }

    var fb = H.$(".q-fb", cardEl);
    fb.innerHTML = ok
      ? "✅ " + t("correct") + (task.sol ? '<span class="sol">' + task.sol + "</span>" : "")
      : "❌ " + t("wrong") + " " + t("correctIs") + " <b>" + H.esc(task.a) + "</b>" +
        (task.sol ? '<span class="sol">' + task.sol + "</span>" : "");

    var fresh = Z.Store.answer(task.gen, ok, st.streak);
    fresh.forEach(function (b) { Z.toast(b.icon + " " + Z.i18n.pick(b.name) + "!"); });

    updateHud();
    if (ok && st.streak > 0 && st.streak % 5 === 0) burst(0.35);
    if (st.done === st.tasks.length) setTimeout(finish, 500);
  }

  function updateHud() {
    var st = Solve.state;
    var a = H.$("#hudScore"), b = H.$("#hudStreak"), c = H.$("#hudBar");
    if (a) a.textContent = st.correct;
    if (b) b.textContent = st.streak;
    if (c) c.style.width = Math.round((st.done / st.tasks.length) * 100) + "%";
  }

  function burst(scale) {
    if (typeof window.confetti !== "function") return;
    window.confetti({
      particleCount: Math.round(70 * (scale || 1)),
      spread: 70, startVelocity: 38, origin: { y: 0.7 },
      colors: ["#ffc93c", "#ff6b6b", "#2fc4b2", "#4d96ff", "#9b5de5"]
    });
  }

  function finish() {
    clearInterval(Solve.timer);
    var st = Solve.state;
    var total = st.tasks.length;
    var pct = Math.round((st.correct / total) * 100);
    var perfect = st.correct === total;
    Z.Store.finishSheet(perfect);

    var stars = pct === 100 ? 3 : (pct >= 75 ? 2 : (pct >= 50 ? 1 : 0));
    var msg = perfect ? t("perfect") : (pct >= 80 ? t("great") : (pct >= 50 ? t("good") : t("keepGoing")));
    var secs = Math.floor((Date.now() - st.started) / 1000);

    var box = H.$("#solveResult");
    box.className = "card card-pad result";
    box.innerHTML =
      '<div class="medal">' + (perfect ? "🏆" : (pct >= 75 ? "🥇" : (pct >= 50 ? "🥈" : "🎯"))) + "</div>" +
      "<h2>" + t("resultTitle") + "</h2>" +
      '<div class="stars">' + "⭐".repeat(stars) + "☆".repeat(3 - stars) + "</div>" +
      '<div class="score-big">' + st.correct + " / " + total + "</div>" +
      '<p class="muted" style="font-weight:700">' + msg + " · " + pct + "% · ⏱ " +
        Math.floor(secs / 60) + ":" + (secs % 60 < 10 ? "0" : "") + (secs % 60) + "</p>" +
      '<div class="row row-wrap center" style="justify-content:center;margin-top:16px">' +
        '<button class="btn btn-mint" id="resNew">' + t("newTasks") + "</button>" +
        '<button class="btn btn-paper" id="resRetry">' + t("tryAgain") + "</button>" +
        '<button class="btn btn-sky" id="resPrint">🖨 ' + t("printThese") + "</button>" +
      "</div>";
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    if (pct >= 50) burst(perfect ? 2 : 1);

    H.$("#resNew").addEventListener("click", function () { Solve.onFinish && Solve.onFinish("new"); });
    H.$("#resRetry").addEventListener("click", function () { Solve.onFinish && Solve.onFinish("retry"); });
    H.$("#resPrint").addEventListener("click", function () { Solve.onFinish && Solve.onFinish("print"); });
  }

  Solve.stop = function () { clearInterval(Solve.timer); Solve.state = null; };
  Solve.burst = burst;

  Z.Solve = Solve;
})(window.Z);
