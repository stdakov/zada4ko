/* ==========================================================================
   zada4ko.com — generators: word problems
   Every template is grade-gated, so a 1st-grader never meets a percentage.
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;

  /* Texts live in i18n/parts/word.<lang>.js. Money goes into messages already
     formatted with Z.money(); nouns go in whole (Z.qty / .sg / .pl there). */
  function ansMoney(v) { return String(Math.round(v * 100) / 100).replace(/\.0+$/, ""); }

  /* Animals for the "how many legs" problem: [noun id, emoji, legs]. */
  var LEGS = [["chick", "🐥", 2], ["cat", "🐱", 4], ["dog", "🐶", 4], ["bunny", "🐰", 4],
              ["ant", "🐜", 6], ["bee", "🐝", 6], ["butterfly", "🦋", 6]];

  /* Each template: { g:[grades], f:function(rng,ctx) -> task } */
  var TPL = [
    /* ------------------------------ Grades 0–2 ------------------------------ */
    {
      g: [0, 1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2), th = Z.pickThing(rng);
        var max = ctx.grade <= 1 ? 10 : (ctx.grade === 2 ? 40 : 200);
        var a = rng.int(2, max), b = rng.int(2, max);
        if (ctx.max) { if (ctx.max < 4) return null; a = rng.int(2, ctx.max - 2); b = rng.int(2, ctx.max - a); }
        return T.word(
          Z.m("word.together", { k0: k[0], k1: k[1], a: a, b: b, th: th }),
          a + b, { sol: a + " + " + b + " = " + (a + b) }
        );
      }
    },
    {
      g: [0, 1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng);
        var max = ctx.grade <= 1 ? 12 : (ctx.grade === 2 ? 60 : 300);
        var a = rng.int(5, max), b = rng.int(1, a - 1);
        if (ctx.max) { a = rng.int(2, ctx.max); b = rng.int(1, a - 1); }
        return T.word(
          Z.m("word.giveAway", { k: k, a: a, b: b, th: th }),
          a - b, { sol: a + " − " + b + " = " + (a - b) }
        );
      }
    },
    {
      g: [1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2), th = Z.pickThing(rng);
        var max = ctx.grade === 1 ? 10 : (ctx.grade === 2 ? 40 : 150);
        var a = rng.int(3, max), d = rng.int(2, Math.max(3, Math.floor(max / 3)));
        if (ctx.max) {
          // the total is a + (a + d), and it must not pass the limit
          if (ctx.max < 4) return null;
          a = rng.int(1, Math.floor((ctx.max - 1) / 2));
          d = rng.int(1, ctx.max - 2 * a);
        }
        return T.word(
          Z.m("word.moreThan", { k0: k[0], k1: k[1], a: a, d: d, th: th }),
          a + (a + d), { work: 2, sol: (a + d) + " + " + a + " = " + (a + a + d) }
        );
      }
    },
    {
      g: [1, 2, 3], f: function (rng, ctx) {
        // the leg count belongs to the animal — no two-legged cats; fish sit this one out
        var animal = rng.pick(LEGS);
        var th = Z.noun(animal[0], animal[1]);
        var legs = animal[2];
        var n = rng.int(3, ctx.grade === 1 ? 6 : 12);
        if (ctx.max) { if (ctx.max < 2 * legs) return null; n = rng.int(1, Math.floor(ctx.max / legs)); }
        return T.word(
          Z.m("word.animalLegs", { n: n, legs: legs, th: th }),
          n * legs, { sol: n + " · " + legs + " = " + n * legs }
        );
      }
    },

    /* ------------------------------ Money ---------------------------------- */
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng, "shop");
        var cap = Math.min(th[3] || 15, ctx.grade === 2 ? 6 : 15);
        var price = rng.int(2, Math.max(3, cap));
        var n = rng.int(2, 9);
        return T.word(
          Z.m("word.buyMany", { k: k, n: n, th: th, price: Z.money(price) }),
          price * n, { unit: Z.cur(), sol: n + " · " + price + " = " + (n * price) + " " + Z.cur() }
        );
      }
    },
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng, "shop");
        var price = rng.int(2, Math.max(3, Math.min(th[3] || 12, 12)));
        var paid = price + rng.int(2, 15);
        return T.word(
          Z.m("word.change", { k: k, th: th, paid: Z.money(paid), price: Z.money(price) }),
          paid - price, { unit: Z.cur(), sol: paid + " − " + price + " = " + (paid - price) + " " + Z.cur() }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var k = Z.pickKid(rng);
        var week = rng.int(2, 8), weeks = rng.int(4, 12), target = week * weeks + rng.int(5, 30);
        return T.word(
          Z.m("word.saveUp", { k: k, week: Z.money(week), weeks: weeks, target: Z.money(target) }),
          target - week * weeks,
          { unit: Z.cur(), work: 3, sol: week + " · " + weeks + " = " + week * weeks + "; " + target + " − " + week * weeks + " = " + (target - week * weeks) }
        );
      }
    },

    /* ------------------------ Sharing / grouping ---------------------------- */
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var th = Z.pickThing(rng), n = rng.int(2, 8), per = rng.int(2, ctx.grade === 2 ? 6 : 12);
        return T.word(
          Z.m("word.boxesTotal", { n: n, per: per, th: th }),
          n * per, { sol: n + " · " + per + " = " + n * per }
        );
      }
    },
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var th = Z.pickThing(rng), kids = rng.int(2, 8), per = rng.int(2, 12);
        var total = kids * per;
        return T.word(
          Z.m("word.shareEqually", { total: total, kids: kids, th: th }),
          per, { sol: total + " : " + kids + " = " + per }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var th = Z.pickThing(rng), per = rng.int(3, 9), boxes = rng.int(4, 15), rest = rng.int(1, per - 1);
        var total = per * boxes + rest;
        return T.word(
          Z.m("word.boxesRest", { total: total, per: per, th: th }),
          Z.m("word.boxesRestAns", { boxes: boxes, rest: rest }),
          {
            kind: "text", work: 2,
            alts: [boxes + "ост" + rest, boxes + " " + rest, boxes + "r" + rest],
            sol: total + " : " + per + " = " + boxes + " (" + Z.m("word.solRemainder", { rest: rest }) + ")"
          }
        );
      }
    },

    /* --------------------------- Two & three steps -------------------------- */
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var k = Z.pickKid(rng);
        var pages = rng.int(8, 30), days = rng.int(4, 12), total = pages * days + rng.int(10, 90);
        return T.word(
          Z.m("word.pagesLeft", { k: k, pages: pages, days: days, total: total }),
          total - pages * days,
          { work: 3, sol: pages + " · " + days + " = " + pages * days + "; " + total + " − " + pages * days + " = " + (total - pages * days) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var a = rng.int(15, 60), b = rng.int(15, 60), c = rng.int(15, 60), n = 3;
        var sum = a + b + c;
        return T.word(
          Z.m("word.average", { a: a, b: b, c: c }),
          Math.round((sum / n) * 100) / 100,
          { work: 2, sol: "(" + a + " + " + b + " + " + c + ") : 3 = " + H.num(Math.round((sum / n) * 100) / 100) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2);
        var total = rng.step(40, 300, 2), d = rng.step(4, 40, 2);
        var big = (total + d) / 2, small = (total - d) / 2;
        return T.word(
          Z.m("word.sumDiff", { k0: k[0], k1: k[1], total: total, d: d }),
          big,
          { work: 3, sol: "(" + total + " + " + d + ") : 2 = " + big + "; " + k[1] + ": " + small }
        );
      }
    },

    /* ------------------------------ Time ------------------------------------ */
    {
      g: [2, 3, 4, 5], f: function (rng, ctx) {
        var h = rng.int(7, 18), m = rng.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
        var dur = rng.pick([25, 35, 40, 45, 50, 55, 70, 90, 105]);
        var tot = h * 60 + m + dur;
        var eh = Math.floor(tot / 60) % 24, em = tot % 60;
        var f = function (a, b) { return (a < 10 ? "0" + a : a) + ":" + (b < 10 ? "0" + b : b); };
        return T.word(
          Z.m("word.filmEnd", { start: f(h, m), dur: dur }),
          f(eh, em),
          { kind: "text", alts: [eh + ":" + (em < 10 ? "0" + em : em)], sol: f(h, m) + " + " + dur + " " + Z.m("word.solMin") + " = " + f(eh, em) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var speed = rng.pick([40, 50, 60, 70, 80, 90, 100]);
        var hours = rng.pick([2, 3, 4, 5, 1.5, 2.5]);
        return T.word(
          Z.m("word.carDistance", { speed: speed, hours: H.num(hours) }),
          speed * hours,
          { unit: Z.m("word.unitKm"), sol: speed + " · " + H.num(hours) + " = " + (speed * hours) + " " + Z.m("word.solKm") }
        );
      }
    },
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var speed = rng.pick([45, 60, 75, 80, 90, 120]);
        var dist = speed * rng.pick([2, 3, 4]);
        return T.word(
          Z.m("word.trainTime", { dist: dist, speed: speed }),
          dist / speed, { unit: Z.m("word.unitH"), sol: dist + " : " + speed + " = " + (dist / speed) }
        );
      }
    },

    /* ---------------------------- Fractions --------------------------------- */
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var d = rng.pick([2, 3, 4, 5, 6, 8, 10]);
        var n = rng.int(1, d - 1);
        var whole = d * rng.int(3, 20);
        var th = Z.pickThing(rng);
        return T.word(
          Z.m("word.fractionSold", { whole: whole, th: th, frac: H.frac(n, d) }),
          (whole / d) * n,
          { work: 2, sol: whole + " : " + d + " · " + n + " = " + (whole / d) * n }
        );
      }
    },
    {
      g: [5, 6], f: function (rng, ctx) {
        var d = rng.pick([3, 4, 5, 6, 8]);
        var n = rng.int(1, d - 1);
        var part = rng.int(2, 15) * n;
        var whole = (part / n) * d;
        return T.word(
          Z.m("word.fractionWhole", { frac: H.frac(n, d), part: part }),
          whole, { work: 2, sol: part + " : " + n + " · " + d + " = " + whole }
        );
      }
    },

    /* ---------------------------- Percentages -------------------------------- */
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var p = rng.pick([5, 10, 15, 20, 25, 40, 50, 60, 75]);
        var base = rng.step(40, 800, 20);
        return T.word(
          Z.m("word.pctOf", { p: p, base: base }),
          Math.round(base * p) / 100,
          { work: 1, sol: base + " · " + p + " : 100 = " + H.num(Math.round(base * p) / 100) }
        );
      }
    },
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var p = rng.pick([10, 15, 20, 25, 30, 40, 50]);
        var price = rng.step(30, 300, 10);
        var final = price * (100 - p) / 100;
        return T.word(
          Z.m("word.saleJacket", { price: Z.money(price), p: p }),
          ansMoney(final),
          { unit: Z.cur(), work: 3, sol: price + " · " + (100 - p) + " : 100 = " + Z.money(final) }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var part = rng.int(3, 60), whole = part * rng.pick([2, 4, 5, 10, 20]);
        return T.word(
          Z.m("word.pctStudents", { whole: whole, part: part }),
          Math.round((part / whole) * 10000) / 100,
          { unit: "%", work: 2, sol: part + " : " + whole + " · 100 = " + H.num(Math.round((part / whole) * 10000) / 100) + "%" }
        );
      }
    },

    /* ---------------------- Proportion & logic (older) ----------------------- */
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var workers = rng.int(2, 6), days = rng.int(4, 15);
        var k = rng.pick([2, 3]);
        return T.word(
          Z.m("word.workers", { workers: workers, days: days * k, more: workers * k }),
          days, { unit: Z.m("word.unitDays"), work: 2, sol: (workers * days * k) + " : " + (workers * k) + " = " + days }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var child = rng.int(8, 16), mult = rng.int(2, 4), years = rng.int(3, 12);
        var parent = child * mult;
        return T.word(
          Z.m("word.motherAge", { mult: mult, child: child, years: years }),
          parent + years,
          { work: 2, sol: child + " · " + mult + " = " + parent + "; " + parent + " + " + years + " = " + (parent + years) }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var n = rng.int(4, 40);
        var sum = n + (n + 1) + (n + 2);
        return T.word(
          Z.m("word.consecutive", { sum: sum }),
          n, { work: 2, sol: "x + (x+1) + (x+2) = " + sum + " → 3x = " + (sum - 3) + " → x = " + n }
        );
      }
    },
    {
      g: [4, 5, 6, 7], f: function (rng, ctx) {
        var a = rng.int(4, 25), b = rng.int(4, 25);
        var per1 = rng.int(2, 9), per2 = rng.int(2, 9);
        var total = a * per1 + b * per2;
        return T.word(
          Z.m("word.pencilPacks", { a: a, per1: per1, b: b, per2: per2 }),
          total,
          { work: 3, sol: a + " · " + per1 + " + " + b + " · " + per2 + " = " + total }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var small = rng.int(4, 30), times = rng.int(2, 6);
        return T.word(
          Z.m("word.treeTaller", { small: small, times: times }),
          small * times - small,
          { unit: Z.m("word.unitM"), work: 2, sol: small + " · " + times + " − " + small + " = " + (small * times - small) }
        );
      }
    }
  ];

  reg.add({
    id: "word",
    icon: "📖",
    grades: [0, 1, 2, 3, 4, 5, 6, 7],
    cols: 1,
    make: function (rng, ctx) {
      var pool = TPL.filter(function (t) { return t.g.indexOf(ctx.grade) !== -1; });
      if (!pool.length) pool = TPL.filter(function (t) { return t.g.indexOf(4) !== -1; });
      // a template may decline when the "numbers up to" limit is too small for it
      var t = null;
      for (var tries = 0; !t && tries < 20; tries++) t = rng.pick(pool).f(rng, ctx);
      if (!t) return null;
      t.layout = "text";
      if (t.work === undefined) t.work = 2;
      return t;
    }
  });
})(window.Z);
