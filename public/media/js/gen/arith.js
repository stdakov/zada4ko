/* ==========================================================================
   zada4ko.com — generators: numbers & arithmetic
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;

  /** Working range for a grade, nudged by the difficulty slider.
      An explicit "numbers up to" limit (grades 0–1) wins over both. */
  function range(grade, diff, max) {
    if (max) return max;
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
    make: function (rng, ctx) {
      var thing = Z.pickThing(rng, rng.bool(0.5) ? "things" : "animals");
      var max = ctx.grade === 0 ? (ctx.diff === 0 ? 6 : 10) : (ctx.diff === 2 ? 20 : 14);
      if (ctx.max) max = Math.min(ctx.max, 20);   // past 20 a row of pictures is a chore, not a lesson
      var n = rng.int(ctx.max ? 1 : 2, max);
      var row = "";
      for (var i = 0; i < n; i++) {
        row += '<span style="font-size:1.5em;letter-spacing:2px">' + thing.e + "</span>";
        if ((i + 1) % 10 === 0) row += "<br>";
      }
      return {
        q: '<div style="line-height:1.7;max-width:22em">' + row + "</div>",
        a: String(n), kind: "num", layout: "block", eq: false,
        sol: Z.m("arith.countSol", { n: n })
      };
    }
  });

  /* ------------------------- Addition & subtraction ---------------------- */
  reg.add({
    id: "addsub",
    icon: "➕",
    grades: [0, 1, 2, 3, 4],
    cols: 3,
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff, ctx.max);

      // Children meet the numbers one at a time, so when the limit is set a
      // good share of the tasks are about the newest number itself: 3 + 4 = 7, 7 − 2 = 5.
      if (ctx.max && rng.bool(0.4)) {
        var part = rng.int(0, max);
        return rng.bool() ? T.expr(part + " + " + (max - part), max) : T.expr(max + " − " + part, max - part);
      }

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
        b = rng.int(1, Math.max(1, Math.min(max - 1, Math.floor(max / 2))));
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
        a: Z.m("arith.remAnswer", { q: q, r: r }),
        alts: [q + "ост" + r, q + " " + r, q + "r" + r, q + " остатък " + r],
        kind: "text", layout: "expr", eq: true,
        hintTxt: Z.m("arith.remHint"),
        sol: Z.m("arith.remSol", { dividend: dividend, d: d, q: q, r: r })
      };
    }
  });

  /* --------------------------- Order of operations ------------------------ */
  reg.add({
    id: "order",
    icon: "🧩",
    grades: [3, 4, 5, 6],
    cols: 2,
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
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff, ctx.max);
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
    make: function (rng, ctx) {
      var max = range(ctx.grade, ctx.diff, ctx.max);
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
    make: function (rng, ctx) {
      var start, step, kind, seq = [], i;
      var pool = ctx.grade <= 2 ? ["add", "add", "sub"] :
                 ctx.grade <= 4 ? ["add", "sub", "mul", "add"] :
                                  ["add", "sub", "mul", "square", "fib"];
      kind = rng.pick(pool);

      if (ctx.max) {
        // counting forwards or backwards without leaving 0…max
        var len = Math.min(6, ctx.max + 1);
        step = rng.int(1, Math.max(1, Math.min(5, Math.floor(ctx.max / (len - 1)))));
        start = rng.int(0, ctx.max - (len - 1) * step);
        for (i = 0; i < len; i++) seq.push(start + i * step);
        kind = rng.bool(0.35) ? "sub" : "add";
        if (kind === "sub") seq.reverse();
      } else if (kind === "mul") {
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

      var last = seq.length - 1;
      var hideAt = ctx.diff === 0 ? last : rng.int(Math.max(1, last - 2), last);
      var answer = seq[hideAt];
      var shown = seq.map(function (v, idx) {
        return idx === hideAt ? '<span class="sh-box">?</span>' : v;
      });
      var ruleKey = {
        add: "arith.seqRuleAdd", sub: "arith.seqRuleSub", mul: "arith.seqRuleMul",
        square: "arith.seqRuleSquare", fib: "arith.seqRuleFib"
      }[kind];

      return {
        q: shown.join(", ") + ", …",
        a: String(answer), kind: "num", layout: "expr", eq: false,
        sol: Z.m(ruleKey, { step: step }) + " → " + answer
      };
    }
  });

  /* ------------------------------- Rounding -------------------------------- */
  reg.add({
    id: "rounding",
    icon: "🎯",
    grades: [3, 4, 5],
    cols: 2,
    make: function (rng, ctx) {
      var opts = ctx.grade === 3 ? [10, 100] : [10, 100, 1000];
      if (ctx.diff === 2) opts.push(10000);
      var to = rng.pick(opts);
      var n = rng.int(to * 2, to * (ctx.grade >= 4 ? 90 : 9)) + rng.int(1, to - 1);
      var ans = Math.round(n / to) * to;
      var lead = Z.m("arith.roundQ", { n: n, unit: Z.m("arith.roundUnit", { to: to }) });
      return { q: lead, a: String(ans), kind: "num", layout: "expr", eq: true, sol: n + " ≈ " + ans };
    }
  });

  /* ------------------------------ Place value ------------------------------ */
  reg.add({
    id: "place",
    icon: "🏛️",
    grades: [2, 3, 4],
    cols: 2,
    make: function (rng, ctx) {
      var digits = ctx.grade === 2 ? 2 : (ctx.grade === 3 ? 3 : (ctx.diff === 2 ? 6 : 5));
      var n = rng.int(Math.pow(10, digits - 1), Math.pow(10, digits) - 1);
      var s = String(n);
      var mode = rng.int(0, 2);

      if (mode === 0) {
        var pos = rng.int(0, digits - 1);
        var dig = +s[s.length - 1 - pos];
        return {
          q: Z.m("arith.placeDigitQ", { n: n, place: Z.m("arith.placeName", { pos: pos }) }),
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
          q: Z.m("arith.placeSumQ", { n: n }),
          a: parts.join(" + "),
          alts: [parts.join("+")],
          kind: "text", layout: "expr", eq: true,
          sol: n + " = " + parts.join(" + ")
        };
      }
      var m = rng.pick([10, 100]);
      var big = n * m;
      return {
        q: Z.m("arith.placeFitQ", { m: m, big: big }),
        a: String(n), kind: "num", layout: "expr", eq: true, sol: big + " : " + m + " = " + n
      };
    }
  });
})(window.Z);
