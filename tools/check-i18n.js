#!/usr/bin/env node
/* ==========================================================================
   zada4ko.com — language file check
   --------------------------------------------------------------------------
   For every language in public/media/js/i18n/:
     - lists keys that English has and the language lacks (they would fall
       back to English on screen),
     - builds every topic at every grade and difficulty and flags text that
       came out broken: "undefined", "NaN", an unfilled {placeholder}, a raw
       message key, or a thrown error,
     - checks that numeric answers match English — a translation must never
       change the maths.

     node tools/check-i18n.js          all languages
     node tools/check-i18n.js fr de    only these

   Exits with code 1 when anything is wrong.
   ========================================================================== */
"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var JS = path.join(__dirname, "..", "public", "media", "js");
var sandbox = {
  localStorage: { getItem: function () { return null; }, setItem: function () { } },
  navigator: { language: "bg" },
  location: { search: "" },
  document: {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
function run(rel) { vm.runInContext(fs.readFileSync(path.join(JS, rel), "utf8"), sandbox, { filename: rel }); }

run("core.js");
var files = fs.readdirSync(path.join(JS, "i18n")).filter(function (f) { return /^[a-z]{2}\.js$/.test(f); });
files.forEach(function (f) { run("i18n/" + f); });
["gen/registry.js", "gen/arith.js", "gen/word.js", "gen/measure.js", "gen/advanced.js", "sheet.js"].forEach(run);

var Z = sandbox.Z;
var L = Z.i18n.locales;
var want = process.argv.slice(2);
var langs = Object.keys(L).filter(function (c) { return !want.length || want.indexOf(c) !== -1; });
var problems = 0;

var shown = {};
/** Count every problem, but print at most 40 per language. */
function report(lang, msg) {
  problems++;
  shown[lang] = (shown[lang] || 0) + 1;
  if (shown[lang] <= 40) console.log("  " + lang + ": " + msg);
  else if (shown[lang] === 41) console.log("  " + lang + ": … more not shown");
}

/* ------------------------------ missing keys ----------------------------- */
console.log("Missing keys (compared with English):");
langs.forEach(function (lang) {
  ["ui", "msg", "gen", "badges", "nouns", "fmt"].forEach(function (sec) {
    var ref = L.en[sec] || {}, have = L[lang][sec] || {};
    var miss = Object.keys(ref).filter(function (k) { return have[k] === undefined; });
    if (miss.length) report(lang, sec + " — " + miss.length + " missing: " + miss.slice(0, 12).join(", ") + (miss.length > 12 ? " …" : ""));
    if (sec === "gen") Object.keys(ref).forEach(function (id) {
      ["name", "desc", "instr"].forEach(function (f) {
        if (ref[id][f] !== undefined && have[id] && have[id][f] === undefined) report(lang, "gen." + id + "." + f + " missing");
      });
    });
  });
  var kids = L[lang].kids || [];
  if (kids.length !== L.en.kids.length) report(lang, "kids has " + kids.length + " names, English has " + L.en.kids.length);
});

/* ------------------------------ generated text --------------------------- */
console.log("Generated tasks:");
var keyLike = /\b(?:arith|word|measure|adv)\.[a-zA-Z]+/;
function scan(lang, where, text) {
  if (text === undefined || text === null) return;
  var s = String(text).replace(/<[^>]+>/g, " ");
  if (/undefined|NaN|\[object/.test(s)) report(lang, where + " → " + s.trim().slice(0, 140));
  else if (/\{[a-zA-Z0-9_]+\}/.test(s)) report(lang, where + " unfilled placeholder → " + s.trim().slice(0, 140));
  else if (keyLike.test(s)) report(lang, where + " raw key → " + s.match(keyLike)[0]);
}
function norm(a) { return String(a).replace(",", "."); }

var answers = {};
["en"].concat(langs.filter(function (l) { return l !== "en"; })).forEach(function (lang) {
  Z.i18n.lang = lang;
  Z.reg.all().forEach(function (gen) {
    scan(lang, gen.id + " name", Z.i18n.gen(gen, "name"));
    scan(lang, gen.id + " instr", Z.i18n.gen(gen, "instr"));
    gen.grades.forEach(function (grade) {
      [0, 1, 2].forEach(function (diff) {
        (grade <= 1 ? [0, 7] : [0]).forEach(function (max) {
          var id = gen.id + "/g" + grade + "/d" + diff + (max ? "/n" + max : "");
          var cfg = Z.Sheet.defaults();
          cfg.grade = grade; cfg.diff = diff; cfg.max = max; cfg.seed = "CHECK"; cfg.topics = [{ id: gen.id, count: 30 }];
          var model;
          try { model = Z.Sheet.build(cfg, 0); } catch (e) { report(lang, id + " threw " + e.message); return; }
          model.sections.forEach(function (sec) {
            sec.tasks.forEach(function (t, i) {
              var w = id + " #" + (i + 1);
              scan(lang, w, t.q); scan(lang, w + " sol", t.sol); scan(lang, w + " a", t.a);
              scan(lang, w + " unit", t.unit); scan(lang, w + " hint", t.hintTxt);
              if (t.kind === "num") {
                var k = id + "#" + i;
                if (lang === "en") answers[k] = norm(t.a);
                else if (answers[k] !== undefined && answers[k] !== norm(t.a)) report(lang, w + " answer " + t.a + " ≠ English " + answers[k]);
              }
            });
          });
        });
      });
    });
  });
});

console.log(problems ? "\n" + problems + " problem(s)." : "\nAll good: " + langs.join(", "));
process.exit(problems ? 1 : 0);
