#!/usr/bin/env node
/* Print a few generated tasks per topic in one language, to read the grammar.
     node tools/sample-i18n.js fr [topicId…]                                   */
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm");
var JS = path.join(__dirname, "..", "public", "media", "js");
var sb = { localStorage: { getItem: function () { return null; }, setItem: function () { } },
  navigator: { language: "bg" }, location: { search: "" }, document: {} };
sb.window = sb; vm.createContext(sb);
function run(rel) { vm.runInContext(fs.readFileSync(path.join(JS, rel), "utf8"), sb, { filename: rel }); }
run("core.js");
fs.readdirSync(path.join(JS, "i18n")).filter(function (f) { return /^[a-z]{2}\.js$/.test(f); })
  .forEach(function (f) { run("i18n/" + f); });
["gen/registry.js", "gen/arith.js", "gen/word.js", "gen/measure.js", "gen/advanced.js", "sheet.js"].forEach(run);
var Z = sb.Z, lang = process.argv[2] || "en", only = process.argv.slice(3);
Z.i18n.lang = lang;
Z.reg.all().filter(function (g) { return !only.length || only.indexOf(g.id) !== -1; }).forEach(function (gen) {
  console.log("\n## " + Z.i18n.gen(gen, "name") + " — " + Z.i18n.gen(gen, "desc") + " | " + Z.i18n.gen(gen, "instr"));
  gen.grades.forEach(function (grade) {
    var cfg = Z.Sheet.defaults();
    cfg.grade = grade; cfg.seed = "S" + grade; cfg.topics = [{ id: gen.id, count: gen.id === "word" ? 6 : 2 }];
    Z.Sheet.build(cfg, 0).sections.forEach(function (s) {
      s.tasks.forEach(function (t) {
        console.log("  [g" + grade + "] " + String(t.q).replace(/<svg[\s\S]*?<\/svg>/g, "[drawing]").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() +
          "  ⇒ " + t.a + (t.unit ? " " + t.unit : "") + (t.sol ? "   (" + String(t.sol).replace(/<[^>]+>/g, "") + ")" : ""));
      });
    });
  });
});
