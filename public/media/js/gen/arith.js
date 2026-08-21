/* ==========================================================================
   zada4ko.com — generators: numbers & arithmetic
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;

  /** Working range for a grade, nudged by the difficulty slider. */
  function range(grade, diff) {
    var base = [10, 20, 100, 1000, 10000, 100000, 1000, 1000][grade] || 100;
    if (diff === 0) base = Math.max(5, Math.round(base / 2));
    if (diff === 2) base = base * 2;
    return base;
  }

  /* ------------------------------ Counting ------------------------------- */
  reg.add({
    id: "counting",
    icon: "🍎",
    grades: [0, 1],
    cols: 2,
    name: { bg: "Броене", en: "Counting" },
    desc: { bg: "Преброй предметите и запиши числото", en: "Count the objects and write the number" },
    instr: { bg: "Преброй и запиши колко са.", en: "Count and write how many." },
    make: function (rng, ctx) {
      var thing = Z.pickThing(rng, rng.bool(0.5) ? "things" : "animals");
      var max = ctx.grade === 0 ? (ctx.diff === 0 ? 6 : 10) : (ctx.diff === 2 ? 20 : 14);
      var n = rng.int(2, max);
      var row = "";
      for (var i = 0; i < n; i++) {
        row += '<span style="font-size:1.5em;letter-spacing:2px">' + thing[2] + "</span>";
        if ((i + 1) % 10 === 0) row += "<br>";
      }
      return {
        q: '<div style="line-height:1.7;max-width:22em">' + row + "</div>",
        a: String(n), kind: "num", layout: "block", eq: false,
        sol: { bg: "Броим едно по едно: " + n + ".", en: "Count one by one: " + n + "." }[Z.i18n.lang]
      };
    }
  });

  /* ------------------------- Addition & subtraction ---------------------- */
  reg.add({
    id: "addsub",
    icon: "➕",
    grades: [0, 1, 2, 3, 4],
    cols: 3,
    name: { bg: "Събиране и изваждане", en: "Addition & subtraction" },
    desc: { bg: "Основните действия в границите на класа", en: "The core operations within the grade range" },
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff);
      var threeTerms = ctx.grade >= 2 && ctx.diff === 2 && rng.bool(0.4);
      var a, b, c, q, ans;

      if (threeTerms) {
        a = rng.int(Math.floor(max / 4), max);
        b = rng.int(1, Math.floor(max / 3));
        c = rng.int(1, Math.floor(max / 3));
        if (rng.bool()) { q = a + " + " + b + " − " + c; ans = a + b - c; }
        else { q = a + " − " + b + " + " + c; ans = a - b + c; }
        if (ans < 0) { q = a + " + " + b + " + " + c; ans = a + b + c; }
      } else if (rng.bool()) {
        // addition, preferring a carry on higher difficulty
        b = rng.int(1, Math.max(2, Math.floor(max / 2)));
        a = rng.int(1, max - b);
        if (ctx.diff === 2 && ctx.grade >= 2 && (a % 10) + (b % 10) < 10) {
          a = a - (a % 10) + rng.int(5, 9);
          b = b - (b % 10) + rng.int(5, 9);
          if (a + b > max) a = Math.max(1, a - 10);
        }
        q = a + " + " + b;
        ans = a + b;
      } else {
        a = rng.int(Math.floor(max / 3), max);
        b = rng.int(1, a);
        if (ctx.diff === 2 && ctx.grade >= 2 && (a % 10) >= (b % 10)) {
          a = a - (a % 10) + rng.int(0, 3);
          b = b - (b % 10) + rng.int(5, 9);
          if (b > a) { var t = a; a = b; b = t; }
        }
        q = a + " − " + b;
        ans = a - b;
      }
      return T.expr(q, ans);
    }
  });

  /* ----------------------- Columnar (vertical) maths --------------------- */
  reg.add({
    id: "columnar",
    icon: "🧮",
    grades: [2, 3, 4, 5],
    cols: 4,
    name: { bg: "Смятане в стълбче", en: "Column arithmetic" },
    desc: { bg: "Записване едно под друго — за печат", en: "Written one under the other — great on paper" },
    instr: { bg: "Пресметни в стълбче.", en: "Calculate in columns." },
    make: function (rng, ctx) {
      var digits = { 2: 2, 3: 3, 4: 4, 5: 4 }[ctx.grade] || 3;
      if (ctx.diff === 0) digits = Math.max(2, digits - 1);
      if (ctx.diff === 2) digits = digits + 1;
      var lo = Math.pow(10, digits - 1), hi = Math.pow(10, digits) - 1;
      var op = rng.pick(ctx.grade >= 3 ? ["+", "−", "−", "×"] : ["+", "−"]);
      var a, b, ans;

      if (op === "×") {
        a = rng.int(lo, hi);
        b = ctx.diff === 2 ? rng.int(11, 99) : rng.int(2, 9);
        ans = a * b;
      } else if (op === "+") {
        a = rng.int(lo, hi); b = rng.int(lo, hi); ans = a + b;
      } else {
        a = rng.int(lo + Math.floor(lo / 2), hi); b = rng.int(lo, a); ans = a - b;
      }

      // A real column sum: operands right-aligned, a rule, then room to write.
      var html =
        '<span class="sh-col">' +
          '<span class="n1">' + a + "</span>" +
          '<span class="o">' + op + "</span>" +
          '<span class="n2">' + b + "</span>" +
          '<span class="rule"></span>' +
          '<span class="pad"></span>' +
        "</span>";
      return {
        q: html, a: String(ans), kind: "num", layout: "block", eq: false,
        selfContained: true            // the space under the rule *is* the answer
      };
    }
  });

  /* ---------------------------- Times tables ----------------------------- */
  reg.add({
    id: "times",
    icon: "✖️",
    grades: [2, 3, 4],
    cols: 4,
    name: { bg: "Таблица за умножение", en: "Times tables" },
    desc: { bg: "Умножение и деление до 100", en: "Multiplication and division up to 100" },
    make: function (rng, ctx) {
      var top = ctx.grade === 2 ? (ctx.diff === 0 ? 5 : 7) : 10;
      if (ctx.diff === 2) top = 12;
      var a = rng.int(2, top), b = rng.int(2, top);
      if (rng.bool(0.55)) return T.expr(a + " · " + b, a * b);
      return T.expr((a * b) + " : " + a, b);
    }
  });

  /* ------------------- Multi-digit multiply & divide ---------------------- */
  reg.add({
    id: "bigmuldiv",
    icon: "🔢",
    grades: [3, 4, 5],
    cols: 3,
    name: { bg: "Умножение и деление на многоцифрени", en: "Multi-digit × and ÷" },
    desc: { bg: "Извънтаблично смятане, деление с остатък", en: "Beyond the tables, division with remainder" },
    make: function (rng, ctx) {
      var big = ctx.grade === 3 ? rng.int(11, 99) : rng.int(101, 999);
      if (ctx.diff === 2) big = rng.int(1001, 9999);
      var twoDigitDivisor = (ctx.grade >= 5 && ctx.diff >= 1) || (ctx.grade >= 4 && ctx.diff === 2);
      var small = twoDigitDivisor ? rng.int(11, 49) : rng.int(2, 9);
      var mode = rng.int(0, 2);

      if (mode === 0) return T.expr(big + " · " + small, big * small);
      if (mode === 1) return T.expr((big * small) + " : " + small, big);

      // division with a remainder
      var q = rng.int(11, ctx.grade === 3 ? 99 : 499);
      var d = rng.int(2, 9);
      var r = rng.int(1, d - 1);
      var dividend = q * d + r;
      return {
        q: dividend + " : " + d,
        a: q + " ост. " + r,
        alts: [q + "ост" + r, q + " " + r, q + "r" + r, q + " остатък " + r],
        kind: "text", layout: "expr", eq: true,
        hintTxt: { bg: "запиши като „частно ост. остатък“", en: "write as “quotient r remainder”" }[Z.i18n.lang],
        sol: dividend + " : " + d + " = " + q + " (" + { bg: "остатък", en: "remainder" }[Z.i18n.lang] + " " + r + ")"
      };
    }
  });

  /* --------------------------- Order of operations ------------------------ */
  reg.add({
    id: "order",
    icon: "🧩",
    grades: [3, 4, 5, 6],
    cols: 2,
    name: { bg: "Ред на действията", en: "Order of operations" },
    desc: { bg: "Изрази със скоби — какво се смята първо", en: "Expressions with brackets — what comes first" },
    instr: { bg: "Пресметни, като спазваш реда на действията.", en: "Calculate, respecting the order of operations." },
    make: function (rng, ctx) {
      var s = ctx.grade <= 3 ? 10 : (ctx.grade === 4 ? 20 : 30);
      if (ctx.diff === 2) s = s * 2;
      var a = rng.int(2, s), b = rng.int(2, 9), c = rng.int(2, 9), d = rng.int(2, 9);
      var forms = [
        function () { return { q: a + " + " + b + " · " + c, v: a + b * c }; },
        function () { return { q: "(" + a + " + " + b + ") · " + c, v: (a + b) * c }; },
        function () { return { q: a + " · " + b + " − " + c + " · " + d, v: a * b - c * d }; },
        function () { return { q: (b * c) + " : " + b + " + " + a, v: c + a }; },
        function () { return { q: a + " + " + (b * c) + " : " + b, v: a + c }; },
        function () { return { q: "(" + (a + b) + " − " + b + ") · " + c, v: a * c }; }
      ];
      if (ctx.grade >= 5) {
        forms.push(function () { return { q: a + " · (" + b + " + " + c + ") − " + d, v: a * (b + c) - d }; });
        forms.push(function () { return { q: "(" + (a * b) + " : " + b + " + " + c + ") · " + d, v: (a + c) * d }; });
      }
      var f = rng.pick(forms)();
      if (f.v < 0) f = { q: f.q.replace(" − ", " + "), v: Math.abs(f.v) + 2 * Math.min(a * b, c * d) };
      return T.expr(f.q, f.v);
    }
  });

  /* --------------------------- Find the unknown --------------------------- */
  reg.add({
    id: "missing",
    icon: "❓",
    grades: [1, 2, 3, 4, 5],
    cols: 3,
    name: { bg: "Намери неизвестното", en: "Find the missing number" },
    desc: { bg: "□ + 7 = 15 — кое число се крие", en: "□ + 7 = 15 — which number is hiding" },
    instr: { bg: "Намери числото, което липсва.", en: "Find the missing number." },
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff);
      var box = '<span class="sh-box">?</span>';
      var mode = ctx.grade >= 2 && rng.bool(0.4) ? "mul" : "add";
      var a, b, r;

      if (mode === "mul") {
        a = rng.int(2, ctx.grade >= 3 ? 10 : 5);
        b = rng.int(2, ctx.grade >= 3 ? 10 : 5);
        if (rng.bool()) return { q: box + " · " + a + " = " + (a * b), a: String(b), kind: "num", layout: "expr", eq: false, sol: (a * b) + " : " + a + " = " + b };
        return { q: (a * b) + " : " + box + " = " + a, a: String(b), kind: "num", layout: "expr", eq: false, sol: (a * b) + " : " + a + " = " + b };
      }

      b = rng.int(1, Math.floor(max / 2));
      r = rng.int(b + 1, max);
      a = r - b;
      var forms = [
        { q: box + " + " + b + " = " + r, a: a, sol: r + " − " + b + " = " + a },
        { q: b + " + " + box + " = " + r, a: a, sol: r + " − " + b + " = " + a },
        { q: r + " − " + box + " = " + b, a: a, sol: r + " − " + b + " = " + a },
        { q: box + " − " + b + " = " + a, a: r, sol: a + " + " + b + " = " + r }
      ];
      var f = rng.pick(forms);
      return { q: f.q, a: String(f.a), kind: "num", layout: "expr", eq: false, sol: f.sol };
    }
  });

  /* ------------------------------ Comparison ------------------------------ */
  reg.add({
    id: "compare",
    icon: "⚖️",
    grades: [0, 1, 2, 3, 4, 5],
    cols: 3,
    name: { bg: "Сравняване", en: "Comparing" },
    desc: { bg: "Постави &lt;, &gt; или =", en: "Put &lt;, &gt; or =" },
    instr: { bg: "Постави знак &lt;, &gt; или = .", en: "Insert &lt;, &gt; or = ." },
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff);
      var left, right, lv, rv;

      if (ctx.grade <= 1 && ctx.diff === 0) {
        lv = rng.int(0, max); rv = rng.bool(0.25) ? lv : rng.int(0, max);
        left = String(lv); right = String(rv);
      } else {
        var mk = function () {
          var a = rng.int(1, Math.floor(max / 2)), b = rng.int(1, Math.floor(max / 2));
          if (ctx.grade >= 2 && rng.bool(0.35)) return { s: a + " · " + b, v: a * b };
          if (rng.bool()) return { s: a + " + " + b, v: a + b };
          if (a < b) { var t = a; a = b; b = t; }
          return { s: a + " − " + b, v: a - b };
        };
        var L = mk(), R = rng.bool(0.2) ? { s: String(L.v), v: L.v } : mk();
        left = L.s; right = R.s; lv = L.v; rv = R.v;
      }
      var sign = lv > rv ? ">" : (lv < rv ? "<" : "=");
      return T.choice(
        left + ' <span class="sh-box">?</span> ' + right,
        sign, ["<", ">", "="],
        { sol: lv + " " + sign + " " + rv }
      );
    }
  });

  /* ------------------------------ Sequences ------------------------------- */
  reg.add({
    id: "sequence",
    icon: "🪜",
    grades: [1, 2, 3, 4, 5, 6],
    cols: 2,
    name: { bg: "Числови редици", en: "Number sequences" },
    desc: { bg: "Открий правилото и продължи", en: "Spot the rule and continue" },
    instr: { bg: "Открий правилото и запиши липсващото число.", en: "Find the rule and write the missing number." },
    make: function (rng, ctx) {
      var start, step, kind, seq = [], i;
      var pool = ctx.grade <= 2 ? ["add", "add", "sub"] :
                 ctx.grade <= 4 ? ["add", "sub", "mul", "add"] :
                                  ["add", "sub", "mul", "square", "fib"];
      kind = rng.pick(pool);

      if (kind === "mul") {
        start = rng.int(1, 4); step = rng.int(2, 3);
        for (i = 0; i < 6; i++) seq.push(start * Math.pow(step, i));
      } else if (kind === "square") {
        start = rng.int(1, 4);
        for (i = 0; i < 6; i++) seq.push(Math.pow(start + i, 2));
      } else if (kind === "fib") {
        var a = rng.int(1, 5), b = rng.int(a, a + 5);
        seq = [a, b];
        for (i = 2; i < 6; i++) seq.push(seq[i - 1] + seq[i - 2]);
      } else if (kind === "sub") {
        step = rng.int(2, ctx.grade <= 2 ? 5 : 12);
        start = step * 6 + rng.int(1, 20);
        for (i = 0; i < 6; i++) seq.push(start - i * step);
      } else {
        step = rng.int(2, ctx.grade <= 2 ? 5 : (ctx.diff === 2 ? 25 : 12));
        start = rng.int(1, 20);
        for (i = 0; i < 6; i++) seq.push(start + i * step);
      }

      var hideAt = ctx.diff === 0 ? 5 : rng.int(3, 5);
      var answer = seq[hideAt];
      var shown = seq.map(function (v, idx) {
        return idx === hideAt ? '<span class="sh-box">?</span>' : v;
      });
      var ruleTxt = {
        add: { bg: "всяко следващо е с " + step + " повече", en: "each next is " + step + " more" },
        sub: { bg: "всяко следващо е с " + step + " по-малко", en: "each next is " + step + " less" },
        mul: { bg: "всяко следващо е " + step + " пъти по-голямо", en: "each next is " + step + " times bigger" },
        square: { bg: "квадратите на числата", en: "the squares of the numbers" },
        fib: { bg: "всяко е сбор от предните две", en: "each is the sum of the two before" }
      }[kind];

      return {
        q: shown.join(", ") + ", …",
        a: String(answer), kind: "num", layout: "expr", eq: false,
        sol: Z.i18n.pick(ruleTxt) + " → " + answer
      };
    }
  });

  /* ------------------------------- Rounding -------------------------------- */
  reg.add({
    id: "rounding",
    icon: "🎯",
    grades: [3, 4, 5],
    cols: 2,
    name: { bg: "Закръгляване", en: "Rounding" },
    desc: { bg: "До десетици, стотици, хиляди", en: "To tens, hundreds, thousands" },
    instr: { bg: "Закръгли числото.", en: "Round the number." },
    make: function (rng, ctx) {
      var opts = ctx.grade === 3 ? [10, 100] : [10, 100, 1000];
      if (ctx.diff === 2) opts.push(10000);
      var to = rng.pick(opts);
      var n = rng.int(to * 2, to * (ctx.grade >= 4 ? 90 : 9)) + rng.int(1, to - 1);
      var ans = Math.round(n / to) * to;
      var word = {
        10: { bg: "десетици", en: "tens" },
        100: { bg: "стотици", en: "hundreds" },
        1000: { bg: "хиляди", en: "thousands" },
        10000: { bg: "десетки хиляди", en: "ten thousands" }
      }[to];
      var lead = Z.i18n.lang === "bg"
        ? "Закръгли " + n + " до " + Z.i18n.pick(word)
        : "Round " + n + " to the nearest " + Z.i18n.pick(word);
      return { q: lead, a: String(ans), kind: "num", layout: "expr", eq: true, sol: n + " ≈ " + ans };
    }
  });

  /* ------------------------------ Place value ------------------------------ */
  reg.add({
    id: "place",
    icon: "🏛️",
    grades: [2, 3, 4],
    cols: 2,
    name: { bg: "Разредни единици", en: "Place value" },
    desc: { bg: "Единици, десетици, стотици, хиляди", en: "Units, tens, hundreds, thousands" },
    instr: { bg: "Отговори на въпроса за числото.", en: "Answer the question about the number." },
    make: function (rng, ctx) {
      var digits = ctx.grade === 2 ? 2 : (ctx.grade === 3 ? 3 : (ctx.diff === 2 ? 6 : 5));
      var n = rng.int(Math.pow(10, digits - 1), Math.pow(10, digits) - 1);
      var s = String(n);
      var names = {
        bg: ["единиците", "десетиците", "стотиците", "хилядите", "десетохилядните", "стохилядните"],
        en: ["units", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"]
      }[Z.i18n.lang];
      var mode = rng.int(0, 2);

      if (mode === 0) {
        var pos = rng.int(0, digits - 1);
        var dig = +s[s.length - 1 - pos];
        return {
          q: (Z.i18n.lang === "bg"
              ? "Коя цифра стои в реда на " + names[pos] + " в числото " + n + "?"
              : "Which digit is in the " + names[pos] + " place of " + n + "?"),
          a: String(dig), kind: "num", layout: "expr", eq: true
        };
      }
      if (mode === 1) {
        var parts = [];
        for (var i = 0; i < s.length; i++) {
          var v = +s[i] * Math.pow(10, s.length - 1 - i);
          if (v) parts.push(v);
        }
        return {
          q: (Z.i18n.lang === "bg" ? "Запиши като сбор от разредни единици: " : "Write as a sum of place values: ") + n,
          a: parts.join(" + "),
          alts: [parts.join("+")],
          kind: "text", layout: "expr", eq: true,
          sol: n + " = " + parts.join(" + ")
        };
      }
      var m = rng.pick([10, 100]);
      var big = n * m;
      return {
        q: (Z.i18n.lang === "bg" ? "Колко пъти " + m + " се съдържат в " + big + "?" : "How many times does " + m + " fit into " + big + "?"),
        a: String(n), kind: "num", layout: "expr", eq: true, sol: big + " : " + m + " = " + n
      };
    }
  });
})(window.Z);
