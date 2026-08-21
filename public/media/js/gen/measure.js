/* ==========================================================================
   zada4ko.com — generators: units, money, clock, geometry
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;
  function L(bg, en) { return Z.i18n.lang === "en" ? en : bg; }

  /* ------------------------------ Clock face ----------------------------- */
  function clockSVG(h, m) {
    var cx = 60, cy = 60, r = 52;
    var ticks = "";
    for (var i = 0; i < 60; i++) {
      var ang = (i * 6 - 90) * Math.PI / 180;
      var big = i % 5 === 0;
      var r1 = big ? r - 9 : r - 5;
      ticks += '<line x1="' + (cx + Math.cos(ang) * r1).toFixed(1) + '" y1="' + (cy + Math.sin(ang) * r1).toFixed(1) +
        '" x2="' + (cx + Math.cos(ang) * (r - 1)).toFixed(1) + '" y2="' + (cy + Math.sin(ang) * (r - 1)).toFixed(1) +
        '" stroke="#111" stroke-width="' + (big ? 2.4 : 1) + '" stroke-linecap="round"/>';
    }
    var nums = "";
    for (var n = 1; n <= 12; n++) {
      var a2 = (n * 30 - 90) * Math.PI / 180;
      nums += '<text x="' + (cx + Math.cos(a2) * (r - 18)).toFixed(1) + '" y="' + (cy + Math.sin(a2) * (r - 18) + 4).toFixed(1) +
        '" text-anchor="middle" font-size="11" font-weight="700" fill="#111" font-family="inherit">' + n + "</text>";
    }
    var ha = ((h % 12) * 30 + m * 0.5 - 90) * Math.PI / 180;
    var ma = (m * 6 - 90) * Math.PI / 180;
    return '<svg class="clockface" viewBox="0 0 120 120" role="img" aria-label="clock">' +
      '<circle cx="60" cy="60" r="' + r + '" fill="#fff" stroke="#111" stroke-width="3"/>' + ticks + nums +
      '<line x1="60" y1="60" x2="' + (cx + Math.cos(ha) * 26).toFixed(1) + '" y2="' + (cy + Math.sin(ha) * 26).toFixed(1) +
      '" stroke="#111" stroke-width="4.5" stroke-linecap="round"/>' +
      '<line x1="60" y1="60" x2="' + (cx + Math.cos(ma) * 38).toFixed(1) + '" y2="' + (cy + Math.sin(ma) * 38).toFixed(1) +
      '" stroke="#111" stroke-width="2.8" stroke-linecap="round"/>' +
      '<circle cx="60" cy="60" r="3.4" fill="#111"/></svg>';
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  reg.add({
    id: "clock",
    icon: "🕐",
    grades: [1, 2, 3, 4],
    cols: 3,
    name: { bg: "Часовник", en: "Telling the time" },
    desc: { bg: "Чети стрелките и записвай часа", en: "Read the hands and write the time" },
    instr: { bg: "Колко часа показва часовникът? Запиши като чч:мм.", en: "What time is it? Write as hh:mm." },
    make: function (rng, ctx) {
      var mins;
      if (ctx.grade === 1) mins = ctx.diff === 0 ? [0] : [0, 30];
      else if (ctx.grade === 2) mins = [0, 15, 30, 45];
      else if (ctx.grade === 3) mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      else mins = null;
      var h = rng.int(1, 12);
      var m = mins ? rng.pick(mins) : rng.int(0, 59);

      if (ctx.grade >= 3 && rng.bool(0.35)) {
        var dur = rng.pick([20, 25, 40, 45, 50, 75, 90]);
        var tot = h * 60 + m + dur, eh = Math.floor(tot / 60) % 12 || 12, em = tot % 60;
        return {
          q: clockSVG(h, m) + '<div style="font-size:.9em;font-weight:700;margin-top:4px;max-width:15em">' +
             L("Колко ще е часът след " + dur + " минути?", "What time will it be in " + dur + " minutes?") + "</div>",
          a: pad(eh) + ":" + pad(em), kind: "text", layout: "block", eq: false,
          alts: [eh + ":" + pad(em)],
          sol: pad(h) + ":" + pad(m) + " + " + dur + " min = " + pad(eh) + ":" + pad(em)
        };
      }
      return {
        q: clockSVG(h, m), a: pad(h) + ":" + pad(m), kind: "text", layout: "block", eq: false,
        alts: [h + ":" + pad(m)],
        sol: L("Часовникът показва ", "The clock shows ") + pad(h) + ":" + pad(m)
      };
    }
  });

  /* ------------------------------ Unit conversion ------------------------- */
  var UNITS = {
    len: { bg: "дължина", en: "length", steps: [["мм", "mm", 1], ["см", "cm", 10], ["дм", "dm", 100], ["м", "m", 1000], ["км", "km", 1000000]] },
    mass: { bg: "маса", en: "mass", steps: [["г", "g", 1], ["кг", "kg", 1000], ["т", "t", 1000000]] },
    vol: { bg: "обем", en: "volume", steps: [["мл", "ml", 1], ["л", "l", 1000]] },
    time: { bg: "време", en: "time", steps: [["сек", "s", 1], ["мин", "min", 60], ["ч", "h", 3600], ["ден", "day", 86400]] }
  };

  reg.add({
    id: "units",
    icon: "📏",
    grades: [2, 3, 4, 5, 6],
    cols: 3,
    name: { bg: "Мерни единици", en: "Units of measure" },
    desc: { bg: "Превръщане: см, м, км, г, кг, л, минути", en: "Convert cm, m, km, g, kg, l, minutes" },
    instr: { bg: "Превърни в посочените мерни единици.", en: "Convert to the given units." },
    make: function (rng, ctx) {
      var keys = ctx.grade <= 2 ? ["len", "time"] : ["len", "mass", "vol", "time"];
      var fam = UNITS[rng.pick(keys)];
      var steps = fam.steps;
      var i = rng.int(1, steps.length - 1);
      var from = steps[i], to = steps[i - 1];
      var factor = from[2] / to[2];
      var v = ctx.diff === 0 ? rng.int(1, 9) : rng.int(2, 60);
      var down = rng.bool(0.6);

      if (down) {
        return {
          q: v + " " + L(from[0], from[1]) + " = <span class='sh-blank'></span> " + L(to[0], to[1]),
          a: String(v * factor), kind: "num", layout: "expr", eq: false,
          sol: v + " · " + factor + " = " + (v * factor) + " " + L(to[0], to[1])
        };
      }
      var big = v * factor;
      return {
        q: big + " " + L(to[0], to[1]) + " = <span class='sh-blank'></span> " + L(from[0], from[1]),
        a: String(v), kind: "num", layout: "expr", eq: false,
        sol: big + " : " + factor + " = " + v + " " + L(from[0], from[1])
      };
    }
  });

  /* --------------------------------- Money -------------------------------- */
  reg.add({
    id: "money",
    icon: "💰",
    grades: [1, 2, 3, 4],
    cols: 2,
    name: { bg: "Пари", en: "Money" },
    desc: { bg: "Евро и центове, ресто, покупки", en: "Euros and cents, change, shopping" },
    instr: { bg: "Пресметни сумата.", en: "Work out the amount." },
    make: function (rng, ctx) {
      var mode = rng.int(0, 2);
      var coins = [1, 2, 5, 10, 20, 50];        // the euro cent coins
      var notes = [5, 10, 20, 50];              // the small euro notes

      // "1 цент" but "5 цента"; "евро" never changes form in Bulgarian.
      function cents(n) { return L(n === 1 ? "цент" : "цента", n === 1 ? "cent" : "cents"); }

      if (mode === 0) {
        var picks = rng.sample(coins, rng.int(2, 3));
        var parts = [], total = 0;
        picks.forEach(function (c) {
          var n = rng.int(1, 5);
          total += n * c;
          parts.push(L(n + (n === 1 ? " монета" : " монети") + " по " + c + " " + cents(c),
                       n + " coin" + (n === 1 ? "" : "s") + " of " + c + "c"));
        });
        return {
          q: L("В касичката има " + Z.joinList(parts) + ". Колко цента има общо?",
               "A money box holds " + Z.joinList(parts) + ". How many cents in total?"),
          a: String(total), kind: "num", layout: "text", eq: false, unit: cents(total), work: 1,
          sol: String(total) + " " + cents(total)
        };
      }
      if (mode === 1) {
        var eur = rng.int(1, 20), st = rng.pick([10, 20, 25, 40, 50, 60, 75, 80, 90]);
        return {
          q: L(eur + " евро и " + st + " цента = <span class='sh-blank'></span> цента",
               eur + " euro" + (eur === 1 ? "" : "s") + " and " + st +
               " cents = <span class='sh-blank'></span> cents"),
          a: String(eur * 100 + st), kind: "num", layout: "expr", eq: false,
          sol: eur + " · 100 + " + st + " = " + (eur * 100 + st)
        };
      }
      var paid = rng.pick(notes);
      var price1 = 2, price2 = 3, guard = 0;
      do {
        price1 = rng.int(1, paid - 2);
        price2 = rng.int(1, paid - 2);
        guard++;
      } while ((price1 + price2 >= paid || price1 === price2) && guard < 40);
      if (price1 + price2 >= paid || price1 === price2) { price1 = 1; price2 = 2; }
      return {
        q: L("Купуваме две неща за " + price1 + " € и " + price2 + " € и плащаме с банкнота от " +
             paid + " €. Колко ресто получаваме?",
             "We buy two items for €" + price1 + " and €" + price2 + " and pay with a €" + paid +
             " note. How much change do we get?"),
        a: String(paid - price1 - price2), kind: "num", layout: "text", eq: false, unit: "€", work: 2,
        sol: price1 + " + " + price2 + " = " + (price1 + price2) + "; " + paid + " − " + (price1 + price2) + " = " + (paid - price1 - price2)
      };
    }
  });

  /* -------------------------------- Geometry ------------------------------- */

  /**
   * Bulgarian primary school (up to 4th grade) says "обиколка" and "лице";
   * the words "периметър"/"P" and the symbol "S" only arrive in 5th grade.
   * Asking a 2nd-grader for "периметъра P" is jargon they have not met yet.
   */
  function askPerimeter(grade) {
    return Z.i18n.lang === "en"
      ? "Find the perimeter (P)."
      : (grade <= 4 ? "Намери обиколката (P)." : "Намери периметъра (P).");
  }
  function askArea(grade) {
    return Z.i18n.lang === "en" ? "Find the area (S)." : "Намери лицето (S).";
  }
  function perimNoun(grade) {
    return Z.i18n.lang === "en" ? "perimeter" : (grade <= 4 ? "обиколка" : "периметър");
  }
  /** A side length different from `from`, so a rectangle is never a square. */
  function otherSide(rng, lo, hi, from) {
    var v;
    do { v = rng.int(lo, hi); } while (v === from);
    return v;
  }

  /** Draw a rectangle to scale: a square looks square, a long strip looks long. */
  function rectSVG(a, b, ua) {
    var MAXPX = 116, MINPX = 30;
    var scale = MAXPX / Math.max(a, b);
    var w = Math.max(MINPX, Math.round(a * scale));
    var h = Math.max(MINPX, Math.round(b * scale));
    var vw = w + 52, vh = h + 34;
    return '<svg class="shape-svg" viewBox="0 0 ' + vw + " " + vh + '" width="' + vw + '" role="img">' +
      '<rect x="26" y="8" width="' + w + '" height="' + h + '" fill="none" stroke="#111" stroke-width="2.6"/>' +
      '<text x="' + (26 + w / 2) + '" y="' + (h + 26) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#111">' + a + " " + ua + "</text>" +
      '<text x="16" y="' + (8 + h / 2 + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#111" transform="rotate(-90 16 ' + (8 + h / 2) + ')">' + b + " " + ua + "</text>" +
      "</svg>";
  }
  function triSVG(a, hh, ua) {
    return '<svg class="shape-svg" viewBox="0 0 170 118" width="170" role="img">' +
      '<polygon points="26,86 144,86 96,14" fill="none" stroke="#111" stroke-width="2.6"/>' +
      '<line x1="96" y1="14" x2="96" y2="86" stroke="#111" stroke-width="1.6" stroke-dasharray="4 3"/>' +
      '<rect x="88" y="78" width="8" height="8" fill="none" stroke="#111" stroke-width="1.2"/>' +
      '<text x="85" y="104" text-anchor="middle" font-size="12" font-weight="700" fill="#111">a = ' + a + " " + ua + "</text>" +
      '<text x="104" y="52" font-size="12" font-weight="700" fill="#111">h = ' + hh + " " + ua + "</text>" +
      "</svg>";
  }
  function circSVG(r, ua, isDiam) {
    return '<svg class="shape-svg" viewBox="0 0 150 128" width="150" role="img">' +
      '<circle cx="70" cy="60" r="48" fill="none" stroke="#111" stroke-width="2.6"/>' +
      '<circle cx="70" cy="60" r="2.6" fill="#111"/>' +
      '<line x1="70" y1="60" x2="' + (isDiam ? 22 : 118) + '" y2="60" stroke="#111" stroke-width="1.8"/>' +
      (isDiam ? '<line x1="70" y1="60" x2="118" y2="60" stroke="#111" stroke-width="1.8"/>' : "") +
      '<text x="70" y="122" text-anchor="middle" font-size="12" font-weight="700" fill="#111">' +
      (isDiam ? "d" : "r") + " = " + r + " " + ua + "</text></svg>";
  }

  reg.add({
    id: "geometry",
    icon: "📐",
    grades: [2, 3, 4, 5, 6, 7],
    cols: 2,
    name: { bg: "Геометрия", en: "Geometry" },
    desc: { bg: "Обиколка, лице и обем на фигури", en: "Perimeter, area and volume of shapes" },
    instr: { bg: "Разгледай чертежа и пресметни.", en: "Look at the drawing and calculate." },
    make: function (rng, ctx) {
      var u = L("см", "cm");
      // Rectangles are listed twice so squares stay about a third of the mix;
      // with one entry each, half of every geometry section came out square.
      var modes = [];
      if (ctx.grade >= 2) modes.push("perimRect", "perimRect", "perimSquare");
      if (ctx.grade >= 3) modes.push("areaRect", "areaRect", "areaSquare");
      if (ctx.grade >= 4) modes.push("sideFromPerim");
      if (ctx.grade >= 5) modes.push("areaTri", "volCuboid", "volCube");
      if (ctx.grade >= 6) modes.push("circumference", "areaCircle");
      var mode = rng.pick(modes);
      var a, b, c;

      switch (mode) {
        case "perimRect":
          a = rng.int(2, 24); b = otherSide(rng, 2, 24, a);
          return { q: rectSVG(a, b, u) + '<div style="font-size:.88em;font-weight:700">' + askPerimeter(ctx.grade) + "</div>",
            a: String(2 * (a + b)), kind: "num", layout: "block", eq: false, unit: u,
            // primary school adds up the four sides; the formula comes later
            sol: ctx.grade <= 4
              ? "P = " + a + " + " + b + " + " + a + " + " + b + " = " + 2 * (a + b) + " " + u
              : "P = 2 · (" + a + " + " + b + ") = " + 2 * (a + b) + " " + u };
        case "perimSquare":
          a = rng.int(2, 30);
          return { q: rectSVG(a, a, u) + '<div style="font-size:.88em;font-weight:700">' +
              L("Квадрат. ", "A square. ") + askPerimeter(ctx.grade) + "</div>",
            a: String(4 * a), kind: "num", layout: "block", eq: false, unit: u,
            sol: ctx.grade <= 2
              ? "P = " + a + " + " + a + " + " + a + " + " + a + " = " + 4 * a + " " + u
              : "P = 4 · " + a + " = " + 4 * a + " " + u };
        case "areaRect":
          a = rng.int(3, ctx.grade >= 4 ? 40 : 12);
          b = otherSide(rng, 3, ctx.grade >= 4 ? 30 : 12, a);
          return { q: rectSVG(a, b, u) + '<div style="font-size:.88em;font-weight:700">' + askArea(ctx.grade) + "</div>",
            a: String(a * b), kind: "num", layout: "block", eq: false, unit: u + "²",
            sol: "S = " + a + " · " + b + " = " + a * b + " " + u + "²" };
        case "areaSquare":
          a = rng.int(3, 20);
          return { q: rectSVG(a, a, u) + '<div style="font-size:.88em;font-weight:700">' +
              L("Квадрат. ", "A square. ") + askArea(ctx.grade) + "</div>",
            a: String(a * a), kind: "num", layout: "block", eq: false, unit: u + "²",
            sol: "S = " + a + " · " + a + " = " + a * a + " " + u + "²" };
        case "sideFromPerim":
          a = rng.int(3, 25); b = otherSide(rng, 3, 25, a);
          return { q: L("Правоъгълник има " + perimNoun(ctx.grade) + " P = " + 2 * (a + b) + " " + u +
                         " и едната му страна е " + a + " " + u + ". Колко е другата страна?",
                       "A rectangle has perimeter P = " + 2 * (a + b) + " " + u + " and one side of " +
                         a + " " + u + ". How long is the other side?"),
            a: String(b), kind: "num", layout: "text", eq: false, unit: u, work: 2,
            sol: (2 * (a + b)) + " : 2 − " + a + " = " + b + " " + u };
        case "areaTri":
          a = rng.step(4, 40, 2); b = rng.int(3, 24);
          return { q: triSVG(a, b, u) + '<div style="font-size:.88em;font-weight:700">' + L("Намери лицето (S) на триъгълника.", "Find the area (S) of the triangle.") + "</div>",
            a: String(a * b / 2), kind: "num", layout: "block", eq: false, unit: u + "²",
            sol: "S = a · h : 2 = " + a + " · " + b + " : 2 = " + (a * b / 2) + " " + u + "²" };
        case "volCube":
          a = rng.int(2, 12);
          return { q: L("Куб има ръб " + a + " " + u + ". Намери обема (V).", "A cube has an edge of " + a + " " + u + ". Find the volume (V)."),
            a: String(a * a * a), kind: "num", layout: "text", eq: false, unit: u + "³", work: 1,
            sol: "V = " + a + "³ = " + a * a * a + " " + u + "³" };
        case "volCuboid":
          a = rng.int(2, 15); b = rng.int(2, 15); c = rng.int(2, 15);
          return { q: L("Правоъгълен паралелепипед с размери " + a + " × " + b + " × " + c + " " + u + ". Намери обема (V).",
                       "A cuboid measures " + a + " × " + b + " × " + c + " " + u + ". Find the volume (V)."),
            a: String(a * b * c), kind: "num", layout: "text", eq: false, unit: u + "³", work: 1,
            sol: "V = " + a + " · " + b + " · " + c + " = " + a * b * c + " " + u + "³" };
        case "circumference":
          a = rng.int(2, 20);
          return { q: circSVG(a, u, false) + '<div style="font-size:.88em;font-weight:700">' +
              L("Намери дължината (C) на окръжността. Приеми π ≈ 3,14.", "Find the circumference (C). Take π ≈ 3.14.") + "</div>",
            a: H.num(Math.round(2 * 3.14 * a * 100) / 100), kind: "num", layout: "block", eq: false, unit: u,
            sol: "C = 2πr = 2 · " + H.num(3.14) + " · " + a + " = " + H.num(Math.round(2 * 3.14 * a * 100) / 100) + " " + u };
        default:
          a = rng.int(2, 15);
          return { q: circSVG(a, u, false) + '<div style="font-size:.88em;font-weight:700">' +
              L("Намери лицето (S) на кръга. Приеми π ≈ 3,14.", "Find the area (S) of the circle. Take π ≈ 3.14.") + "</div>",
            a: H.num(Math.round(3.14 * a * a * 100) / 100), kind: "num", layout: "block", eq: false, unit: u + "²",
            sol: "S = πr² = " + H.num(3.14) + " · " + a + "² = " + H.num(Math.round(3.14 * a * a * 100) / 100) + " " + u + "²" };
      }
    }
  });
})(window.Z);
