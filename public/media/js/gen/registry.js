/* ==========================================================================
   zada4ko.com — generator registry
   --------------------------------------------------------------------------
   A generator produces one task at a time from a seeded RNG, so the same
   sheet code always rebuilds the exact same worksheet.

   generator = {
     id, icon, grades: [..], cols: 1..4,
     name: {bg,en}, desc: {bg,en}, instr: {bg,en},
     make(rng, ctx) -> task
   }
   ctx  = { grade, diff: 0|1|2 }
   task = {
     q,                 html prompt (no answer blank)
     a,                 canonical answer as a string
     alts: [],          other accepted spellings
     kind: 'num'|'text'|'choice',
     choices: [],       for kind 'choice'
     layout: 'expr'|'text'|'block',
     eq: bool,          render " = ____" after the prompt (default: layout==='expr')
     unit,              printed after the blank
     work: 0..3,        dotted working lines on the printed sheet
     sol                html explanation shown after checking
   }
   ========================================================================== */
"use strict";

(function (Z) {
  var list = [];
  var byId = {};

  var reg = {
    add: function (g) {
      g.cols = g.cols || 2;
      g.instr = g.instr || { bg: "Пресметни.", en: "Calculate." };
      list.push(g);
      byId[g.id] = g;
      return g;
    },
    all: function () { return list; },
    get: function (id) { return byId[id]; },
    /** Generators available for a grade, in registry order. */
    forGrade: function (grade) {
      return list.filter(function (g) { return g.grades.indexOf(grade) !== -1; });
    }
  };

  Z.reg = reg;

  /* ------------------------- shared task helpers ------------------------- */
  var T = {};

  /** A short calculation such as `12 + 7`. */
  T.expr = function (html, answer, extra) {
    var t = { q: html, a: String(answer), kind: "num", layout: "expr", eq: true };
    if (extra) Object.keys(extra).forEach(function (k) { t[k] = extra[k]; });
    return t;
  };

  /** A word problem: full width, working space, an "Answer:" line. */
  T.word = function (html, answer, extra) {
    var t = { q: html, a: String(answer), kind: "num", layout: "text", eq: false, work: 2 };
    if (extra) Object.keys(extra).forEach(function (k) { t[k] = extra[k]; });
    return t;
  };

  /** Multiple choice. */
  T.choice = function (html, answer, choices, extra) {
    var t = {
      q: html, a: String(answer), kind: "choice", choices: choices.map(String),
      layout: "expr", eq: false
    };
    if (extra) Object.keys(extra).forEach(function (k) { t[k] = extra[k]; });
    return t;
  };

  Z.T = T;

  /* --------------------------- naming pools ----------------------------- */
  Z.pools = {
    kids: {
      bg: ["Иван", "Мария", "Георги", "Ния", "Борис", "Ели", "Митко", "Дара", "Калоян", "Рая",
           "Симона", "Тодор", "Виктор", "Ани", "Пламен", "Лора", "Мартин", "Йоана", "Кирил", "Дени"],
      en: ["Ivan", "Maria", "George", "Nia", "Boris", "Ellie", "Mitko", "Dara", "Kaloyan", "Ray",
           "Simona", "Theo", "Victor", "Annie", "Peter", "Laura", "Martin", "Joanna", "Kiril", "Deni"]
    },
    animals: {
      bg: [["котка", "котки", "🐱"], ["куче", "кучета", "🐶"], ["зайче", "зайчета", "🐰"],
           ["пиле", "пилета", "🐥"], ["рибка", "рибки", "🐟"], ["пеперуда", "пеперуди", "🦋"],
           ["мравка", "мравки", "🐜"], ["пчела", "пчели", "🐝"]],
      en: [["cat", "cats", "🐱"], ["dog", "dogs", "🐶"], ["bunny", "bunnies", "🐰"],
           ["chick", "chicks", "🐥"], ["fish", "fish", "🐟"], ["butterfly", "butterflies", "🦋"],
           ["ant", "ants", "🐜"], ["bee", "bees", "🐝"]]
    },
    shop: {
      bg: [["тетрадка", "тетрадки", "📓"], ["книга", "книги", "📚"], ["топка", "топки", "⚽"],
           ["раница", "раници", "🎒"], ["пъзел", "пъзела", "🧩"], ["чадър", "чадъра", "☂️"],
           ["шапка", "шапки", "🧢"], ["играчка", "играчки", "🧸"], ["чаша", "чаши", "☕"],
           ["сладолед", "сладоледа", "🍦"], ["билет", "билета", "🎟️"], ["саксия", "саксии", "🪴"]],
      en: [["notebook", "notebooks", "📓"], ["book", "books", "📚"], ["ball", "balls", "⚽"],
           ["backpack", "backpacks", "🎒"], ["puzzle", "puzzles", "🧩"], ["umbrella", "umbrellas", "☂️"],
           ["cap", "caps", "🧢"], ["toy", "toys", "🧸"], ["mug", "mugs", "☕"],
           ["ice cream", "ice creams", "🍦"], ["ticket", "tickets", "🎟️"], ["plant pot", "plant pots", "🪴"]]
    },
    things: {
      bg: [["ябълка", "ябълки", "🍎"], ["банан", "банана", "🍌"], ["молив", "молива", "✏️"],
           ["балон", "балона", "🎈"], ["книга", "книги", "📚"], ["бонбон", "бонбона", "🍬"],
           ["топка", "топки", "⚽"], ["цвете", "цветя", "🌸"], ["стикер", "стикера", "⭐"],
           ["орех", "ореха", "🌰"], ["ягода", "ягоди", "🍓"], ["кубче", "кубчета", "🧊"]],
      en: [["apple", "apples", "🍎"], ["banana", "bananas", "🍌"], ["pencil", "pencils", "✏️"],
           ["balloon", "balloons", "🎈"], ["book", "books", "📚"], ["sweet", "sweets", "🍬"],
           ["ball", "balls", "⚽"], ["flower", "flowers", "🌸"], ["sticker", "stickers", "⭐"],
           ["nut", "nuts", "🌰"], ["strawberry", "strawberries", "🍓"], ["cube", "cubes", "🧊"]]
    }
  };

  /** Pick a themed noun triple [singular, plural, emoji] in the active language. */
  Z.pickThing = function (rng, which) {
    var p = Z.pools[which || "things"];
    var arr = p[Z.i18n.lang] || p.bg;
    return rng.pick(arr);
  };
  Z.pickKid = function (rng) {
    var p = Z.pools.kids[Z.i18n.lang] || Z.pools.kids.bg;
    return rng.pick(p);
  };
  /** Two different kid names. */
  Z.pickKids = function (rng, n) {
    var p = Z.pools.kids[Z.i18n.lang] || Z.pools.kids.bg;
    return rng.sample(p, n || 2);
  };
  /** Bulgarian needs "2 ябълки" but "1 ябълка" — pick singular/plural. */
  Z.qty = function (n, thing) { return n + " " + (n === 1 ? thing[0] : thing[1]); };
})(window.Z);
