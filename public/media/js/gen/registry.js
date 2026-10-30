/* ==========================================================================
   zada4ko.com — generator registry
   --------------------------------------------------------------------------
   A generator produces one task at a time from a seeded RNG, so the same
   sheet code always rebuilds the exact same worksheet.

   generator = {
     id, icon, grades: [..], cols: 1..4,
     (name, desc and instr come from the language files: Z.i18n.gen(g, "name"))
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
  /*
     Pools hold language-neutral ids; the words come from the active language
     file (nouns / kids), so a seed picks the same object in every language.
  */
  Z.pools = {
    things: [["apple", "🍎"], ["banana", "🍌"], ["pencil", "✏️"], ["balloon", "🎈"], ["book", "📚"], ["sweet", "🍬"],
             ["ball", "⚽"], ["flower", "🌸"], ["sticker", "⭐"], ["nut", "🌰"], ["strawberry", "🍓"], ["cube", "🧊"]],
    animals: [["cat", "🐱"], ["dog", "🐶"], ["bunny", "🐰"], ["chick", "🐥"], ["fish", "🐟"], ["butterfly", "🦋"],
              ["ant", "🐜"], ["bee", "🐝"]],
    /* [id, emoji, a believable top price in euro] */
    shop: [["notebook", "📓", 3], ["book", "📚", 20], ["ball", "⚽", 15], ["backpack", "🎒", 40], ["puzzle", "🧩", 15],
           ["umbrella", "☂️", 12], ["cap", "🧢", 15], ["toy", "🧸", 25], ["mug", "☕", 8], ["icecream", "🍦", 4],
           ["ticket", "🎟️", 12], ["plantpot", "🪴", 10]]
  };

  /**
   * A noun in the active language. It is an array [singular, plural, emoji,
   * price] for short use, and also carries .id .sg .pl .e .price and .f — the
   * full list of forms from the language file, for languages that need more
   * than two (Polish: one / few / many).
   */
  Z.noun = function (id, emoji, price) {
    var f = Z.i18n.noun(id) || [id, id];
    var n = [f[0], f[1], emoji, price];
    n.id = id; n.f = f; n.sg = f[0]; n.pl = f[1]; n.e = emoji; n.price = price;
    return n;
  };

  /** Pick a themed noun in the active language. */
  Z.pickThing = function (rng, which) {
    var p = rng.pick(Z.pools[which || "things"]);
    return Z.noun(p[0], p[1], p[2]);
  };
  Z.pickKid = function (rng) { return rng.pick(Z.i18n.list("kids")); };
  /** Two different kid names. */
  Z.pickKids = function (rng, n) { return rng.sample(Z.i18n.list("kids"), n || 2); };

  /** "1 ябълка", "2 ябълки" — the language decides; default is singular for 1. */
  Z.qty = function (n, thing) {
    var q = Z.i18n.fmt("qty");
    return q ? q(n, thing) : n + " " + (n === 1 ? thing[0] : thing[1]);
  };

  /** An amount in euro, the way the language writes it: "12,50 €", "€12.50". */
  Z.money = function (v) {
    var s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.00$/, "");
    var f = Z.i18n.fmt("money");
    return f ? f(s) : s + " €";
  };
  Z.cur = function () { return Z.i18n.fmt("cur") || "€"; };

  /** "a, b и c" — commas between, a conjunction before the last item. */
  Z.joinList = function (parts) {
    if (parts.length < 2) return parts.join("");
    return parts.slice(0, -1).join(", ") + (Z.i18n.fmt("and") || " & ") + parts[parts.length - 1];
  };
})(window.Z);
