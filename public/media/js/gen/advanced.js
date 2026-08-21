/* ==========================================================================
   zada4ko.com — generators: fractions, decimals, algebra, number theory
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;
  function L(bg, en) { return Z.i18n.lang === "en" ? en : bg; }

  function fr(n, d) { return H.frac(n, d); }
  /** Reduce a fraction to lowest terms. */
  function red(n, d) { var g = H.gcd(n, d) || 1; return [n / g, d / g]; }

  /* ------------------------------- Fractions ------------------------------ */
  reg.add({
    id: "fractions",
    icon: "🍕",
    grades: [4, 5, 6, 7],
    cols: 2,
    name: { bg: "Обикновени дроби", en: "Fractions" },
    desc: { bg: "Сравняване, съкращаване, събиране, изваждане", en: "Compare, simplify, add and subtract" },
    instr: { bg: "Пресметни. Запиши дроб като 3/4.", en: "Calculate. Write a fraction as 3/4." },
    make: function (rng, ctx) {
      var modes = ctx.grade === 4 ? ["compare", "sameDen", "ofNumber"] :
                  ctx.grade === 5 ? ["sameDen", "simplify", "diffDen", "ofNumber", "mixed"] :
                                    ["diffDen", "simplify", "multiply", "divide", "mixed"];
      var mode = rng.pick(modes);
      var a, b, c, d, r;

      if (mode === "compare") {
        d = rng.pick([4, 5, 6, 8, 10, 12]);
        a = rng.int(1, d - 1); c = rng.int(1, d - 1);
        var d2 = rng.bool(0.5) ? d : rng.pick([4, 6, 8, 12]);
        var lv = a / d, rv = c / d2;
        var sign = lv > rv ? ">" : (lv < rv ? "<" : "=");
        return T.choice(fr(a, d) + ' <span class="sh-box">?</span> ' + fr(c, d2), sign, ["<", ">", "="],
          { sol: H.num(Math.round(lv * 1000) / 1000) + " " + sign + " " + H.num(Math.round(rv * 1000) / 1000) });
      }
      if (mode === "sameDen") {
        d = rng.pick([4, 5, 6, 7, 8, 9, 10, 12]);
        a = rng.int(1, d - 1); c = rng.int(1, d - 1);
        if (rng.bool() && a + c < d) {
          r = red(a + c, d);
          return { q: fr(a, d) + " + " + fr(c, d), a: r[0] + "/" + r[1], alts: [(a + c) + "/" + d],
            kind: "text", layout: "expr", eq: true, sol: (a + c) + "/" + d + (r[1] !== d ? " = " + r[0] + "/" + r[1] : "") };
        }
        if (a < c) { var t = a; a = c; c = t; }
        r = red(a - c, d);
        return { q: fr(a, d) + " − " + fr(c, d), a: (a - c === 0 ? "0" : r[0] + "/" + r[1]),
          alts: [(a - c) + "/" + d, a - c === d ? "1" : ""].filter(Boolean),
          kind: "text", layout: "expr", eq: true, sol: (a - c) + "/" + d + (r[1] !== d && a !== c ? " = " + r[0] + "/" + r[1] : "") };
      }
      if (mode === "simplify") {
        var base = rng.pick([2, 3, 4, 5, 6, 7, 8, 9]);
        var k = rng.int(2, 9);
        var nn = rng.int(1, base - 1);
        a = nn * k; d = base * k;
        return { q: L("Съкрати: ", "Simplify: ") + fr(a, d), a: nn + "/" + base,
          kind: "text", layout: "expr", eq: true, sol: a + "/" + d + " = " + nn + "/" + base + "  (÷" + k + ")" };
      }
      if (mode === "diffDen") {
        var dens = [[2, 3], [2, 5], [3, 4], [3, 6], [4, 6], [4, 8], [5, 10], [2, 6], [3, 9], [6, 8]];
        var pr = rng.pick(dens);
        var d1 = pr[0], dd2 = pr[1];
        var n1 = rng.int(1, d1 - 1), n2 = rng.int(1, dd2 - 1);
        var lcm = H.lcm(d1, dd2);
        var sum = n1 * (lcm / d1) + n2 * (lcm / dd2);
        r = red(sum, lcm);
        var ansTxt = r[1] === 1 ? String(r[0]) : r[0] + "/" + r[1];
        return { q: fr(n1, d1) + " + " + fr(n2, dd2), a: ansTxt, alts: [sum + "/" + lcm],
          kind: "text", layout: "expr", eq: true,
          sol: L("Общ знаменател ", "Common denominator ") + lcm + ": " + (n1 * lcm / d1) + "/" + lcm + " + " + (n2 * lcm / dd2) + "/" + lcm + " = " + ansTxt };
      }
      if (mode === "multiply") {
        var an = rng.int(1, 7), ad = rng.int(an + 1, 9), bn = rng.int(1, 7), bd = rng.int(bn + 1, 9);
        r = red(an * bn, ad * bd);
        return { q: fr(an, ad) + " · " + fr(bn, bd), a: r[0] + "/" + r[1], alts: [(an * bn) + "/" + (ad * bd)],
          kind: "text", layout: "expr", eq: true, sol: (an * bn) + "/" + (ad * bd) + " = " + r[0] + "/" + r[1] };
      }
      if (mode === "divide") {
        var cn = rng.int(1, 7), cd = rng.int(cn + 1, 9), dn = rng.int(1, 7), dd = rng.int(dn + 1, 9);
        r = red(cn * dd, cd * dn);
        return { q: fr(cn, cd) + " : " + fr(dn, dd), a: (r[1] === 1 ? String(r[0]) : r[0] + "/" + r[1]),
          kind: "text", layout: "expr", eq: true,
          sol: fr(cn, cd) + " · " + fr(dd, dn) + " = " + r[0] + (r[1] === 1 ? "" : "/" + r[1]) };
      }
      if (mode === "mixed") {
        var w = rng.int(1, 6); d = rng.pick([2, 3, 4, 5, 6, 8]); a = rng.int(1, d - 1);
        if (rng.bool()) {
          return { q: L("Превърни в неправилна дроб: ", "Write as an improper fraction: ") + H.frac(a, d, w),
            a: (w * d + a) + "/" + d, kind: "text", layout: "expr", eq: true,
            sol: w + " · " + d + " + " + a + " = " + (w * d + a) + " → " + (w * d + a) + "/" + d };
        }
        var imp = w * d + a;
        return { q: L("Превърни в смесено число: ", "Write as a mixed number: ") + fr(imp, d),
          a: w + " " + a + "/" + d, alts: [w + a + "/" + d, w + "и" + a + "/" + d],
          kind: "text", layout: "expr", eq: true, sol: imp + " : " + d + " = " + w + " " + L("цяло и остатък", "whole, remainder") + " " + a + " → " + w + " " + a + "/" + d };
      }
      // ofNumber
      d = rng.pick([2, 3, 4, 5, 6, 8, 10]);
      a = rng.int(1, d - 1);
      var whole = d * rng.int(2, 20);
      return { q: L("Колко е ", "What is ") + fr(a, d) + L(" от ", " of ") + whole + "?",
        a: String(whole / d * a), kind: "num", layout: "expr", eq: true,
        sol: whole + " : " + d + " · " + a + " = " + (whole / d * a) };
    }
  });

  /* ------------------------------- Decimals -------------------------------- */
  reg.add({
    id: "decimals",
    icon: "🔟",
    grades: [4, 5, 6, 7],
    cols: 3,
    name: { bg: "Десетични дроби", en: "Decimal numbers" },
    desc: { bg: "Действия с числа със запетая", en: "Arithmetic with decimal points" },
    instr: { bg: "Пресметни.", en: "Calculate." },
    make: function (rng, ctx) {
      var dec = ctx.grade <= 4 ? 1 : (ctx.diff === 2 ? 3 : 2);
      var p = Math.pow(10, dec);
      var a = rng.int(1, ctx.grade <= 4 ? 200 : 5000) / p;
      var b = rng.int(1, ctx.grade <= 4 ? 200 : 5000) / p;
      var mode = rng.int(0, 3);
      var val, q;

      if (mode === 0) { val = a + b; q = H.num(a) + " + " + H.num(b); }
      else if (mode === 1) {
        if (b > a) { var t = a; a = b; b = t; }
        val = a - b; q = H.num(a) + " − " + H.num(b);
      } else if (mode === 2) {
        a = rng.int(1, 300) / 10; b = rng.pick([2, 3, 4, 5, 10, 100, 0.1]);
        val = a * b; q = H.num(a) + " · " + H.num(b);
      } else {
        b = rng.pick([2, 4, 5, 8, 10, 100]);
        var res = rng.int(1, 400) / 10;
        a = res * b; val = res; q = H.num(a) + " : " + H.num(b);
      }
      val = Math.round(val * 1000000) / 1000000;
      return { q: q, a: String(val), alts: [String(val).replace(".", ",")], kind: "num", layout: "expr", eq: true };
    }
  });

  /* ------------------------------ Percentages ------------------------------ */
  reg.add({
    id: "percent",
    icon: "％",
    grades: [5, 6, 7],
    cols: 2,
    name: { bg: "Проценти", en: "Percentages" },
    desc: { bg: "Процент от число, намаление, увеличение", en: "Percent of, discount, increase" },
    instr: { bg: "Пресметни.", en: "Calculate." },
    make: function (rng, ctx) {
      var p = rng.pick([5, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
      var base = rng.step(40, 1200, 20);
      var mode = rng.int(0, 3);

      if (mode === 0) return { q: p + "% " + L("от", "of") + " " + base, a: String(Math.round(base * p) / 100),
        kind: "num", layout: "expr", eq: true, sol: base + " · " + p + " : 100 = " + (Math.round(base * p) / 100) };
      if (mode === 1) return { q: L("Намали ", "Decrease ") + base + L(" с ", " by ") + p + "%",
        a: String(Math.round(base * (100 - p)) / 100), kind: "num", layout: "expr", eq: true,
        sol: base + " − " + (base * p / 100) + " = " + (Math.round(base * (100 - p)) / 100) };
      if (mode === 2) return { q: L("Увеличи ", "Increase ") + base + L(" с ", " by ") + p + "%",
        a: String(Math.round(base * (100 + p)) / 100), kind: "num", layout: "expr", eq: true,
        sol: base + " + " + (base * p / 100) + " = " + (Math.round(base * (100 + p)) / 100) };
      var part = Math.round(base * p) / 100;
      return { q: L("Колко процента е " + part + " от " + base + "?", "What percent of " + base + " is " + part + "?"),
        a: String(p), kind: "num", layout: "expr", eq: true, unit: "%",
        sol: part + " : " + base + " · 100 = " + p + "%" };
    }
  });

  /* ------------------------- Divisibility / NOD / NOK ---------------------- */
  reg.add({
    id: "divis",
    icon: "🔍",
    grades: [4, 5, 6],
    cols: 2,
    name: { bg: "Делимост и делители", en: "Divisibility & factors" },
    desc: { bg: "Признаци за делимост, прости числа, НОД и НОК", en: "Divisibility rules, primes, GCD and LCM" },
    instr: { bg: "Отговори на въпроса.", en: "Answer the question." },
    make: function (rng, ctx) {
      var mode = ctx.grade === 4 ? 0 : rng.int(0, 3);
      var a, b;

      if (mode === 0) {
        var d = rng.pick(ctx.grade <= 4 ? [2, 5, 10] : [2, 3, 4, 5, 9, 10]);
        // Aim for a "yes" half the time. Drawing n at random would answer "no"
        // about three times out of four, and a child could just write "no".
        var n;
        if (rng.bool()) {
          n = d * rng.int(3, Math.floor(400 / d));
        } else {
          do { n = rng.int(12, 400); } while (n % d === 0);
        }
        return T.choice(
          L("Делимо ли е " + n + " на " + d + "?", "Is " + n + " divisible by " + d + "?"),
          n % d === 0 ? L("да", "yes") : L("не", "no"),
          [L("да", "yes"), L("не", "no")],
          { sol: n + " : " + d + (n % d === 0 ? " = " + n / d : " → " + L("остатък ", "remainder ") + (n % d)) }
        );
      }
      if (mode === 1) {
        // likewise balanced: half prime, half composite
        var m;
        if (rng.bool()) {
          m = rng.pick([23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89]);
        } else {
          do { m = rng.int(20, 90); } while (H.isPrime(m));
        }
        var isP = H.isPrime(m);
        return T.choice(
          L("Просто число ли е " + m + "?", "Is " + m + " a prime number?"),
          isP ? L("да", "yes") : L("не", "no"),
          [L("да", "yes"), L("не", "no")],
          { sol: isP ? L(m + " се дели само на 1 и на себе си.", m + " is divisible only by 1 and itself.")
                     : L(m + " се дели и на " + H.divisors(m)[1] + ".", m + " is also divisible by " + H.divisors(m)[1] + ".") }
        );
      }
      if (mode === 2) {
        a = rng.int(8, 60); b = rng.int(8, 60);
        return { q: L("НОД", "GCD") + "(" + a + ", " + b + ")",
          a: String(H.gcd(a, b)), kind: "num", layout: "expr", eq: true,
          sol: L("Общите делители дават ", "The greatest common divisor is ") + H.gcd(a, b) };
      }
      a = rng.int(3, 20); b = rng.int(3, 20);
      return { q: L("НОК", "LCM") + "(" + a + ", " + b + ")",
        a: String(H.lcm(a, b)), kind: "num", layout: "expr", eq: true,
        sol: L("Най-малкото общо кратно е ", "The least common multiple is ") + H.lcm(a, b) };
    }
  });

  /* -------------------------- Powers & square roots ------------------------ */
  reg.add({
    id: "powers",
    icon: "⚡",
    grades: [5, 6, 7],
    cols: 3,
    name: { bg: "Степени и корени", en: "Powers & roots" },
    desc: { bg: "Квадрати, кубове, квадратен корен", en: "Squares, cubes and square roots" },
    instr: { bg: "Пресметни.", en: "Calculate." },
    make: function (rng, ctx) {
      var mode = rng.int(0, 3);
      var a;
      if (mode === 0) { a = rng.int(2, ctx.diff === 2 ? 25 : 15); return T.expr(a + "<sup>2</sup>", a * a); }
      if (mode === 1) { a = rng.int(2, 10); return T.expr(a + "<sup>3</sup>", a * a * a); }
      if (mode === 2) { a = rng.int(2, 20); return T.expr("√" + (a * a), a); }
      a = rng.int(2, 6);
      var e1 = rng.int(2, 4), e2 = rng.int(2, 4);
      if (ctx.grade >= 7 && rng.bool()) {
        return { q: a + "<sup>" + e1 + "</sup> · " + a + "<sup>" + e2 + "</sup>",
          a: String(Math.pow(a, e1 + e2)), kind: "num", layout: "expr", eq: true,
          sol: a + "^" + e1 + " · " + a + "^" + e2 + " = " + a + "^" + (e1 + e2) + " = " + Math.pow(a, e1 + e2) };
      }
      var e = rng.int(3, 10);
      return T.expr("2<sup>" + e + "</sup>", Math.pow(2, e));
    }
  });

  /* ------------------------------- Negatives ------------------------------- */
  reg.add({
    id: "negatives",
    icon: "🌡️",
    grades: [6, 7],
    cols: 3,
    name: { bg: "Отрицателни числа", en: "Negative numbers" },
    desc: { bg: "Действия с цели числа", en: "Operations with integers" },
    instr: { bg: "Пресметни.", en: "Calculate." },
    make: function (rng, ctx) {
      var max = ctx.diff === 2 ? 60 : 25;
      var a = rng.int(-max, max), b = rng.int(-max, max);
      var f = function (v) { return v < 0 ? "(" + v + ")" : String(v); };
      var mode = rng.int(0, 2);
      if (mode === 0) return T.expr(f(a) + " + " + f(b), a + b);
      if (mode === 1) return T.expr(f(a) + " − " + f(b), a - b);
      a = rng.int(-12, 12) || -3; b = rng.int(-12, 12) || 4;
      return T.expr(f(a) + " · " + f(b), a * b);
    }
  });

  /* ------------------------------- Equations ------------------------------- */
  reg.add({
    id: "equations",
    icon: "🧠",
    grades: [5, 6, 7],
    cols: 2,
    name: { bg: "Уравнения", en: "Equations" },
    desc: { bg: "Намери х — от прости до двустранни", en: "Solve for x — simple to two-sided" },
    instr: { bg: "Реши уравнението. Намери х.", en: "Solve the equation. Find x." },
    make: function (rng, ctx) {
      var x = rng.int(2, ctx.grade >= 6 ? 25 : 15);
      if (ctx.grade >= 6 && rng.bool(0.3)) x = -x;
      var a = rng.int(2, 12), b = rng.int(1, 40), c;

      var forms = [
        function () { return { q: a + "x + " + b + " = " + (a * x + b), v: x, sol: a + "x = " + (a * x) + " → x = " + x }; },
        function () { return { q: a + "x − " + b + " = " + (a * x - b), v: x, sol: a + "x = " + (a * x) + " → x = " + x }; },
        function () { return { q: b + " + " + a + "x = " + (b + a * x), v: x, sol: a + "x = " + (a * x) + " → x = " + x }; },
        function () { return { q: "x : " + a + " = " + x, v: x * a, sol: "x = " + x + " · " + a + " = " + (x * a) }; },
        function () { return { q: b + " − x = " + (b - x), v: x, sol: "x = " + b + " − " + (b - x) + " = " + x }; }
      ];
      if (ctx.grade >= 6) {
        forms.push(function () {
          c = rng.int(1, a - 1) || 1;
          var d = rng.int(1, 30);
          return { q: a + "x + " + d + " = " + c + "x + " + ((a - c) * x + d), v: x,
            sol: (a - c) + "x = " + ((a - c) * x) + " → x = " + x };
        });
        forms.push(function () {
          var m = rng.int(2, 6);
          return { q: m + "(x + " + b + ") = " + (m * (x + b)), v: x,
            sol: "x + " + b + " = " + (x + b) + " → x = " + x };
        });
      }
      if (ctx.grade >= 7) {
        forms.push(function () {
          var m = rng.int(2, 5), n = rng.int(2, 5), k = rng.int(1, 20);
          return { q: m + "(x − " + k + ") + " + n + "x = " + (m * (x - k) + n * x), v: x,
            sol: (m + n) + "x = " + (m * (x - k) + n * x + m * k) + " → x = " + x };
        });
      }
      var f = rng.pick(forms)();
      return { q: f.q, a: String(f.v), kind: "num", layout: "expr", eq: false,
        tail: " &nbsp;→&nbsp; x =", sol: f.sol };
    }
  });

  /* ------------------------- Algebraic expressions (7) --------------------- */
  reg.add({
    id: "algebra",
    icon: "🅧",
    grades: [7],
    cols: 2,
    name: { bg: "Изрази и формули", en: "Expressions & identities" },
    desc: { bg: "Разкриване на скоби, съкратено умножение", en: "Expanding brackets, special products" },
    instr: { bg: "Пресметни стойността при дадените числа.", en: "Evaluate for the given values." },
    make: function (rng, ctx) {
      var a = rng.int(2, 12), b = rng.int(2, 12);
      var mode = rng.int(0, 3);
      if (mode === 0) return { q: "(" + a + " + " + b + ")<sup>2</sup>", a: String(Math.pow(a + b, 2)),
        kind: "num", layout: "expr", eq: true, sol: a + "² + 2·" + a + "·" + b + " + " + b + "² = " + Math.pow(a + b, 2) };
      if (mode === 1) return { q: "(" + a + " − " + b + ")<sup>2</sup>", a: String(Math.pow(a - b, 2)),
        kind: "num", layout: "expr", eq: true, sol: a + "² − 2·" + a + "·" + b + " + " + b + "² = " + Math.pow(a - b, 2) };
      if (mode === 2) return { q: "(" + a + " − " + b + ") · (" + a + " + " + b + ")", a: String(a * a - b * b),
        kind: "num", layout: "expr", eq: true, sol: a + "² − " + b + "² = " + (a * a - b * b) };
      var x = rng.int(1, 8), m = rng.int(2, 6), n = rng.int(2, 9);
      return { q: L("При x = " + x + " пресметни ", "For x = " + x + " evaluate ") + m + "x + " + n,
        a: String(m * x + n), kind: "num", layout: "expr", eq: true, sol: m + " · " + x + " + " + n + " = " + (m * x + n) };
    }
  });

  /* ------------------------------ Pythagoras ------------------------------- */
  reg.add({
    id: "pythagoras",
    icon: "📊",
    grades: [7],
    cols: 2,
    name: { bg: "Питагорова теорема", en: "Pythagorean theorem" },
    desc: { bg: "Правоъгълен триъгълник — намери страна", en: "Right triangle — find the missing side" },
    instr: { bg: "Намери неизвестната страна.", en: "Find the missing side." },
    make: function (rng, ctx) {
      var triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 16, 20]];
      var t = rng.pick(triples);
      var k = ctx.diff === 2 ? rng.int(1, 3) : 1;
      var a = t[0] * k, b = t[1] * k, c = t[2] * k;
      var u = L("см", "cm");
      var svg = '<svg class="shape-svg" viewBox="0 0 170 120" width="170" role="img">' +
        '<polygon points="26,96 146,96 26,20" fill="none" stroke="#111" stroke-width="2.6"/>' +
        '<rect x="26" y="86" width="10" height="10" fill="none" stroke="#111" stroke-width="1.3"/>' +
        '<text x="86" y="113" text-anchor="middle" font-size="12" font-weight="700" fill="#111">%B%</text>' +
        '<text x="14" y="60" text-anchor="middle" font-size="12" font-weight="700" fill="#111" transform="rotate(-90 14 60)">%A%</text>' +
        '<text x="98" y="50" font-size="12" font-weight="700" fill="#111">%C%</text></svg>';

      if (rng.bool(0.6)) {
        return { q: svg.replace("%A%", a + " " + u).replace("%B%", b + " " + u).replace("%C%", "c = ?"),
          a: String(c), kind: "num", layout: "block", eq: false, unit: u,
          sol: "c² = " + a + "² + " + b + "² = " + (a * a + b * b) + " → c = " + c };
      }
      return { q: svg.replace("%A%", "a = ?").replace("%B%", b + " " + u).replace("%C%", c + " " + u),
        a: String(a), kind: "num", layout: "block", eq: false, unit: u,
        sol: "a² = " + c + "² − " + b + "² = " + (c * c - b * b) + " → a = " + a };
    }
  });

  /* ------------------------------ Roman numerals --------------------------- */
  var RN = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
            [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  function toRoman(n) {
    var s = "";
    RN.forEach(function (p) { while (n >= p[0]) { s += p[1]; n -= p[0]; } });
    return s;
  }

  reg.add({
    id: "roman",
    icon: "🏛",
    grades: [3, 4, 5],
    cols: 3,
    name: { bg: "Римски цифри", en: "Roman numerals" },
    desc: { bg: "От I до MMXXV и обратно", en: "From I to MMXXV and back" },
    instr: { bg: "Запиши с арабски или римски цифри.", en: "Write in Arabic or Roman numerals." },
    make: function (rng, ctx) {
      var max = ctx.grade === 3 ? 39 : (ctx.diff === 2 ? 2500 : 400);
      var n = rng.int(1, max);
      if (rng.bool()) {
        return { q: toRoman(n), a: String(n), kind: "num", layout: "expr", eq: true, sol: toRoman(n) + " = " + n };
      }
      return { q: String(n), a: toRoman(n), kind: "text", layout: "expr", eq: true, sol: n + " = " + toRoman(n) };
    }
  });

  /* ------------------------------ Brain teasers ---------------------------- */
  reg.add({
    id: "logic",
    icon: "💡",
    grades: [2, 3, 4, 5, 6, 7],
    cols: 1,
    name: { bg: "Занимателни задачи", en: "Brain teasers" },
    desc: { bg: "Ребуси, намислени числа, логика", en: "Riddles, hidden numbers, logic" },
    instr: { bg: "Помисли добре и намери отговора.", en: "Think it through and find the answer." },
    make: function (rng, ctx) {
      var mode = rng.int(0, 3);

      if (mode === 0) {
        var x = rng.int(2, ctx.grade <= 3 ? 12 : 40);
        var m = rng.int(2, ctx.grade <= 3 ? 4 : 9);
        var add = rng.int(1, 30);
        return { q: L("Намислих число, умножих го по " + m + " и прибавих " + add + ". Получих " +
                      (x * m + add) + ". Кое число намислих?",
                      "I thought of a number, multiplied it by " + m + " and added " + add + ". I got " +
                      (x * m + add) + ". What was my number?"),
          a: String(x), kind: "num", layout: "text", eq: false, work: 2,
          sol: (x * m + add) + " − " + add + " = " + (x * m) + "; " + (x * m) + " : " + m + " = " + x };
      }
      if (mode === 1) {
        var legsA = 2, legsB = 4;
        var heads = rng.int(6, ctx.grade <= 3 ? 12 : 30);
        var b = rng.int(1, heads - 1), a = heads - b;
        var legs = a * legsA + b * legsB;
        return { q: L("В двора има кокошки и зайци — общо " + heads + " глави и " + legs +
                      " крака. Колко са зайците?",
                      "A yard has chickens and rabbits — " + heads + " heads and " + legs +
                      " legs in total. How many rabbits are there?"),
          a: String(b), kind: "num", layout: "text", eq: false, work: 3,
          sol: L("Ако всички бяха кокошки: ", "If all were chickens: ") + (heads * 2) + L(" крака. Разликата ", " legs. The difference ") +
               (legs - heads * 2) + " : 2 = " + b };
      }
      if (mode === 2) {
        // 3x3 magic square: every row, column and diagonal adds up to 3c.
        // Keeping c > d + e guarantees all nine cells stay positive.
        var d = rng.int(1, 4);
        var e = d + rng.int(1, 4);
        var c = d + e + rng.int(1, ctx.grade <= 3 ? 6 : 14);
        var sq = [
          [c - d,     c + d + e, c - e],
          [c + d - e, c,         c - d + e],
          [c + e,     c - d - e, c + d]
        ];
        var sum = 3 * c;
        var hr = rng.int(0, 2), hc = rng.int(0, 2);
        var missing = sq[hr][hc];
        var tbl = '<table style="border-collapse:collapse;margin-top:6px">';
        for (var i = 0; i < 3; i++) {
          tbl += "<tr>";
          for (var j = 0; j < 3; j++) {
            tbl += '<td style="border:2px solid #111;width:2.4em;height:2.2em;text-align:center;font-weight:800">' +
              (i === hr && j === hc ? "?" : sq[i][j]) + "</td>";
          }
          tbl += "</tr>";
        }
        tbl += "</table>";
        return { q: L("Магически квадрат: сборът по всеки ред, стълб и диагонал е " + sum +
                      ". Кое число липсва?",
                      "Magic square: every row, column and diagonal adds up to " + sum +
                      ". Which number is missing?") + tbl,
          a: String(missing), kind: "num", layout: "block", eq: false,
          sol: L("Сбор на реда ", "Row sum ") + sum + " → " + missing };
      }
      var pages = rng.int(3, 9), tot = rng.int(20, 90);
      var k = Z.pickKid(rng);
      return { q: L(k + " реди " + tot + " кубчета на кули по " + pages + " кубчета. Колко пълни кули " +
                    "получава и колко кубчета остават? (запиши броя на кулите)",
                    k + " stacks " + tot + " cubes into towers of " + pages + ". How many full towers " +
                    "are built? (write the number of towers)"),
        a: String(Math.floor(tot / pages)), kind: "num", layout: "text", eq: false, work: 2,
        sol: tot + " : " + pages + " = " + Math.floor(tot / pages) + L(" ост. ", " r ") + (tot % pages) };
    }
  });
})(window.Z);
