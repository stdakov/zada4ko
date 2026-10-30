#!/usr/bin/env node
/* ==========================================================================
   zada4ko.com — static landing pages for search engines
   --------------------------------------------------------------------------
   The app lives behind "#/…" routes, and search engines ignore everything
   after the "#", so on its own the whole site is a single indexable URL.
   This script writes one real page per grade and one per topic — each with
   its own title, description, text and sample tasks produced by the very
   generators the app uses — plus the sitemap.

     node tools/build-pages.js

   Run it again after adding or renaming a generator. No dependencies.
   ========================================================================== */
"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..", "public");
var SITE = "https://zada4ko.com";
var TODAY = new Date().toISOString().slice(0, 10);

/* ----------------------- load the real generators ----------------------- */
var sandbox = {
  localStorage: { getItem: function () { return null; }, setItem: function () { } },
  navigator: { language: "bg" },
  location: { search: "" },
  document: {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
["core"].concat(fs.readdirSync(path.join(ROOT, "media/js/i18n")).filter(function (f) { return /^[a-z]{2}\.js$/.test(f); })
  .map(function (f) { return "i18n/" + f.replace(/\.js$/, ""); })).concat(["gen/registry", "gen/arith", "gen/word", "gen/measure", "gen/advanced", "sheet"]).forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "media/js", f + ".js"), "utf8"), sandbox, { filename: f + ".js" });
});
var Z = sandbox.Z;
Z.i18n.lang = "bg";
var VERSION = Z.VERSION;

/* ------------------------------- content -------------------------------- */
var GRADES = [
  { g: 0, slug: "zadachi-za-predouchilishna", name: "предучилищна група", short: "Предучилищна", age: "5–6",
    title: "Задачи по математика за предучилищна група (5–6 г.) — за печат и онлайн",
    lead: "Първи стъпки в математиката преди училище: броене до 10, сравняване на количества, " +
      "първо събиране и изваждане с картинки и кратки текстови задачи, които се четат на глас.",
    topics: "counting.6_addsub.8_compare.6" },
  { g: 1, slug: "zadachi-po-matematika-1-klas", name: "1. клас", short: "1. клас", age: "6–7",
    title: "Задачи по математика за 1 клас — безплатни листове за печат и онлайн",
    lead: "В 1. клас децата учат числата едно по едно — до 10, после до 20 и до 100. Тук има задачи за броене, " +
      "събиране и изваждане, сравняване, намиране на неизвестно число, числови редици, часовник, пари и първи " +
      "текстови задачи. С настройката „Числата до“ ограничаваш задачите точно до числото, което детето учи в момента.",
    topics: "addsub.10_counting.4_compare.6_missing.6" },
  { g: 2, slug: "zadachi-po-matematika-2-klas", name: "2. клас", short: "2. клас", age: "7–8",
    title: "Задачи по математика за 2 клас — таблица за умножение, събиране до 100",
    lead: "Събиране и изваждане до 100 с преминаване, таблица за умножение и деление, смятане в стълбче, " +
      "разредни единици, часовник, мерни единици, пари, геометрия и текстови задачи за 2. клас.",
    topics: "addsub.10_times.8_clock.4_word.4" },
  { g: 3, slug: "zadachi-po-matematika-3-klas", name: "3. клас", short: "3. клас", age: "8–9",
    title: "Задачи по математика за 3 клас — числата до 1000, умножение и деление",
    lead: "Числата до 1000, извънтаблично умножение и деление, деление с остатък, ред на действията, " +
      "закръгляване, римски цифри, мерни единици, обиколка на фигури и текстови задачи за 3. клас.",
    topics: "times.8_order.6_bigmuldiv.6_word.4" },
  { g: 4, slug: "zadachi-po-matematika-4-klas", name: "4. клас", short: "4. клас", age: "9–10",
    title: "Задачи по математика за 4 клас — многоцифрени числа, дроби, лице",
    lead: "Многоцифрени числа, умножение и деление в стълбче, първи дроби и десетични числа, делимост, " +
      "мерни единици, лице и обиколка, пари и текстови задачи — подготовка за външното оценяване в 4. клас.",
    topics: "bigmuldiv.8_fractions.5_units.5_geometry.4" },
  { g: 5, slug: "zadachi-po-matematika-5-klas", name: "5. клас", short: "5. клас", age: "10–11",
    title: "Задачи по математика за 5 клас — дроби, десетични числа, уравнения",
    lead: "Обикновени и десетични дроби, проценти, делимост, НОД и НОК, степени, прости уравнения, " +
      "лице и обем и текстови задачи за 5. клас.",
    topics: "fractions.6_decimals.6_equations.5_word.4" },
  { g: 6, slug: "zadachi-po-matematika-6-klas", name: "6. клас", short: "6. клас", age: "11–12",
    title: "Задачи по математика за 6 клас — проценти, отрицателни числа, уравнения",
    lead: "Проценти, отрицателни числа и действия с цели числа, степени, уравнения, геометрия и " +
      "текстови задачи за 6. клас.",
    topics: "percent.6_negatives.6_equations.6_geometry.4" },
  { g: 7, slug: "zadachi-po-matematika-7-klas", name: "7. клас", short: "7. клас", age: "12–13",
    title: "Задачи по математика за 7 клас — уравнения, формули, Питагорова теорема",
    lead: "Уравнения, алгебрични изрази и формули за съкратено умножение, степени и корени, проценти, " +
      "Питагорова теорема и текстови задачи — упражнения за НВО по математика в 7. клас.",
    topics: "equations.6_algebra.5_pythagoras.4_word.4" }
];

/** Bulgarian → Latin, the official streamlined system, for readable URLs. */
function slugify(s) {
  var map = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l",
    м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
    щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya" };
  return s.toLowerCase().split("").map(function (c) { return map[c] !== undefined ? map[c] : c; }).join("")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

var TOPICS = Z.reg.all().map(function (gen) {
  var name = Z.i18n.gen(gen, "name");
  return { gen: gen, slug: slugify(name), name: name, desc: Z.i18n.gen(gen, "desc") };
});
function topicUrl(t) { return "/zadachi/" + t.slug + "/"; }
function gradeUrl(G) { return "/" + G.slug + "/"; }
function gradeOf(g) { return GRADES.filter(function (G) { return G.g === g; })[0]; }

/** "1.–4. клас", "7. клас", "предучилищна и 1. клас" */
function gradeSpan(grades) {
  var school = grades.filter(function (g) { return g > 0; });
  var span = !school.length ? "" : school.length === 1 ? school[0] + ". клас"
    : school[0] + ".–" + school[school.length - 1] + ". клас";
  if (grades.indexOf(0) !== -1) return span ? "предучилищна и " + span : "предучилищна група";
  return span;
}

/* -------------------------------- helpers ------------------------------- */
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
}
function plain(html) { return String(html).replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"); }
function studio(grade, topics, mode) {
  return "/#/studio?g=" + grade + "&t=" + topics + (mode === "print" ? "&m=print" : "");
}

/** Sample tasks, made with a fixed seed so the page only changes when a generator does. */
function samples(grade, topics) {
  var cfg = Z.Sheet.defaults();
  cfg.grade = grade;
  cfg.seed = "SEO" + grade;
  cfg.topics = topics;
  var model = Z.Sheet.build(cfg, 0);
  var items = [], keys = [];
  model.sections.forEach(function (s) {
    var box = Z.Sheet.boxClass(s.tasks);
    s.tasks.forEach(function (t) {
      items.push('<li><span class="lp-no">' + t.no + '.</span><div class="lp-q">' + Z.Sheet.printQuestion(t, 0, box) + "</div></li>");
      keys.push("<li><b>" + t.no + ".</b> " + esc(t.a) + "</li>");
    });
  });
  return '<ol class="lp-tasks">' + items.join("") + "</ol>" +
    '<details class="lp-key"><summary>Покажи отговорите</summary><ol>' + keys.join("") + "</ol></details>";
}

function jsonLd(obj) {
  return '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, "\\u003c") + "</script>";
}
function breadcrumbs(trail) {
  return jsonLd({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: trail.map(function (c, i) {
      return { "@type": "ListItem", position: i + 1, name: c[0], item: SITE + c[1] };
    })
  });
}
function faqLd(faq) {
  return jsonLd({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map(function (f) {
      return { "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } };
    })
  });
}
function faqHtml(faq) {
  return faq.map(function (f) {
    return '<details class="lp-faq"><summary>' + esc(f[0]) + "</summary><p>" + esc(f[1]) + "</p></details>";
  }).join("");
}

/* -------------------------------- layout -------------------------------- */
var BRAND_SVG = '<span class="brand-mark"><svg viewBox="0 0 24 24" fill="none" stroke="#241b45" stroke-width="2.6" ' +
  'stroke-linecap="round"><path d="M4 8h7M7.5 4.5v7M14 6.5h6M14 17.5h6M17 14.5v6M3.5 17.5l5 0M4 15l4 5M8 15l-4 5"/></svg></span>';

function page(o) {
  var url = SITE + o.path;
  var crumbs = o.trail.map(function (c, i) {
    return i === o.trail.length - 1 ? "<span>" + esc(c[0]) + "</span>" : '<a href="' + c[1] + '">' + esc(c[0]) + "</a>";
  }).join(" › ");

  return "<!DOCTYPE html>\n" +
'<html lang="bg">\n<head>\n' +
'<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
"<title>" + esc(o.title) + " | Задачко</title>\n" +
'<meta name="description" content="' + esc(o.desc) + '">\n' +
'<meta name="theme-color" content="#fff6e9">\n' +
'<link rel="canonical" href="' + url + '">\n' +
'<meta property="og:type" content="website">\n' +
'<meta property="og:site_name" content="Задачко · zada4ko">\n' +
'<meta property="og:url" content="' + url + '">\n' +
'<meta property="og:title" content="' + esc(o.title) + '">\n' +
'<meta property="og:description" content="' + esc(o.desc) + '">\n' +
'<meta property="og:image" content="' + SITE + '/media/icon/android-chrome-512x512.png">\n' +
'<meta property="og:locale" content="bg_BG">\n' +
'<meta name="twitter:card" content="summary">\n' +
'<link rel="icon" href="/media/icon/favicon.ico" sizes="any">\n' +
'<link rel="icon" type="image/svg+xml" href="/media/icon/favicon.svg">\n' +
'<link rel="apple-touch-icon" sizes="180x180" href="/media/icon/apple-touch-icon.png">\n' +
'<link rel="manifest" href="/site.webmanifest">\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">\n' +
'<link rel="stylesheet" href="/media/css/base.css?v=' + VERSION + '">\n' +
'<link rel="stylesheet" href="/media/css/app.css?v=' + VERSION + '">\n' +
breadcrumbs(o.trail) + "\n" +
(o.faq ? faqLd(o.faq) + "\n" : "") +
'<script async src="https://www.googletagmanager.com/gtag/js?id=G-1DVQQZ0EHE"></script>\n' +
"<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1DVQQZ0EHE');</script>\n" +
"</head>\n<body>\n" +
'<header class="topbar"><div class="wrap topbar-in">\n' +
'  <a class="brand" href="/">' + BRAND_SVG + "<span>zada4<b>ko</b><small>математика за деца</small></span></a>\n" +
'  <nav class="topnav lp-nav"><a href="/">Начало</a><a href="/#/studio">Създай задачи</a><a href="/#/teachers">За учители</a></nav>\n' +
"</div></header>\n" +
'<div class="wrap lp-layout">\n' +
'<main class="lp">\n' +
'<nav class="lp-crumbs" aria-label="breadcrumb">' + crumbs + "</nav>\n" +
o.body +
"</main>\n" +
sidebar(o.path) +
"</div>\n" +
footer() +
"</body>\n</html>\n";
}

/** Every grade and topic, with the current page marked. Sits left on desktop, below the content on phones. */
function sidebar(current) {
  function link(href, html) {
    var on = href === current;
    return '<li><a href="' + href + '"' + (on ? ' class="on" aria-current="page"' : "") + ">" + html + "</a></li>";
  }
  var grades = GRADES.map(function (G) { return link(gradeUrl(G), esc(G.short)); }).join("");
  var topics = TOPICS.map(function (t) {
    return link(topicUrl(t), '<span class="lp-side-ico">' + t.gen.icon + "</span>" + esc(t.name));
  }).join("");
  return '<aside class="lp-side" aria-label="Класове и теми">\n' +
    '<h2>Класове</h2><ul class="lp-side-grades">' + grades + "</ul>\n" +
    '<h2>Всички теми</h2><ul class="lp-side-topics">' + topics + "</ul>\n" +
    "</aside>\n";
}

function footer() {
  var grades = GRADES.map(function (G) { return '<li><a href="' + gradeUrl(G) + '">Задачи за ' + esc(G.name) + "</a></li>"; }).join("");
  return '<footer class="foot"><div class="wrap foot-grid">\n' +
    '<div><a class="brand" href="/">' + BRAND_SVG + "<span>zada4<b>ko</b></span></a>" +
    '<p class="muted tiny" style="max-width:38ch">Задачко — безплатен генератор на задачи по математика за деца ' +
    "от предучилищна до 7. клас. Реши онлайн или принтирай лист с ключ с отговори.</p></div>\n" +
    "<div><h4>По класове</h4><ul>" + grades + "</ul></div>\n" +
    '<div><h4>Бързи връзки</h4><ul><li><a href="/#/studio">Създай задачи</a></li>' +
    '<li><a href="/#/teachers">За учители</a></li><li><a href="/#/about">Как работи</a></li></ul></div>\n' +
    '</div><div class="wrap foot-bot"><span>© ' + TODAY.slice(0, 4) + " zada4ko.com · По идея на Митко</span>" +
    '<span>Създадено от <a href="https://dakovdev.com" target="_blank" rel="noopener">dakovdev.com</a></span></div></footer>\n';
}

function cta(grade, topics) {
  return '<div class="hero-cta">' +
    '<a class="btn btn-lg btn-grape" href="' + studio(grade, topics) + '">✨ Реши онлайн</a>' +
    '<a class="btn btn-lg btn-paper" href="' + studio(grade, topics, "print") + '">🖨️ Лист за печат</a></div>';
}

/* ------------------------------ grade pages ----------------------------- */
function gradePage(G) {
  var gens = TOPICS.filter(function (t) { return t.gen.grades.indexOf(G.g) !== -1; });
  var topicCards = gens.map(function (t) {
    return '<div class="feat lp-topic"><div class="lp-ico">' + t.gen.icon + "</div>" +
      '<h3><a href="' + topicUrl(t) + '">' + esc(t.name) + "</a></h3><p>" + t.desc + "</p>" +
      '<a class="btn btn-sm btn-paper" href="' + studio(G.g, t.gen.id + ".10") + '">Упражнявай</a></div>';
  }).join("");
  var sampleTopics = gens.slice(0, 6).map(function (t) { return { id: t.gen.id, count: t.gen.cols === 1 ? 1 : 2 }; });
  var others = GRADES.filter(function (x) { return x !== G; }).map(function (x) {
    return '<a class="chip" href="' + gradeUrl(x) + '">' + esc(x.short) + "</a>";
  }).join(" ");
  var faq = [
    ["Безплатни ли са задачите за " + G.name + "?",
     "Да. Задачко е изцяло безплатен, без регистрация и без реклами в задачите. Можеш да генерираш колкото листа искаш."],
    ["Как да принтирам лист със задачи за " + G.name + "?",
     "Избери темите, натисни „Лист за печат“ и после „Принтирай“ или „Запази като PDF“. Листът е A4, с място за име, дата и оценка и с отделна страница с отговорите."],
    ["Мога ли да направя различни варианти на едно контролно?",
     "Да. В настройките избери до 4 варианта — темите и трудността са еднакви, а числата са различни, за да няма преписване."]
  ];
  if (G.g <= 1) faq.splice(1, 0, ["Мога ли да дам задачи само с числата, които детето вече знае?",
    "Да. В настройката „Числата до“ избери например 7 — тогава всички числа и отговори в листа са до 7, а голяма част от задачите са точно за новото число."]);

  return page({
    path: gradeUrl(G),
    title: G.title,
    desc: "Безплатни задачи по математика за " + G.name + " (" + G.age + " г.): " +
      gens.slice(0, 6).map(function (t) { return t.name.toLowerCase(); }).join(", ") +
      ". Реши онлайн с проверка или принтирай лист с отговори.",
    trail: [["Начало", "/"], ["Задачи за " + G.name, gradeUrl(G)]],
    faq: faq,
    body:
      "<h1>Задачи по математика за " + esc(G.name) + "</h1>\n" +
      '<p class="hero-lead lp-lead">' + esc(G.lead) + "</p>\n" +
      '<p class="lp-text">Всеки лист е нов — числата се генерират при всяко кликване, затова задачите никога не свършват. ' +
      "Детето решава онлайн и веднага вижда дали е вярно, или ти принтираш готов A4 лист за домашно или контролно, с ключ с отговорите за родителя или учителя.</p>\n" +
      cta(G.g, G.topics) + "\n" +
      '<section class="sec"><h2>Теми в ' + esc(G.name) + "</h2>" + '<div class="feats">' + topicCards + "</div></section>\n" +
      '<section class="sec"><h2>Примерни задачи за ' + esc(G.name) + "</h2>" +
      '<p class="lp-text">Ето как изглежда един лист. Натисни „Реши онлайн“ за нови задачи.</p>' +
      '<div class="card card-pad">' + samples(G.g, sampleTopics) + "</div></section>\n" +
      '<section class="sec"><h2>Често задавани въпроси</h2>' + faqHtml(faq) + "</section>\n" +
      '<section class="sec lp-other"><h2>Задачи за други класове</h2><p>' + others + "</p></section>\n"
  });
}

/* ------------------------------ topic pages ----------------------------- */
function topicPage(t) {
  var gen = t.gen;
  var span = gradeSpan(gen.grades);
  var mid = gen.grades[Math.floor((gen.grades.length - 1) / 2)];
  var perGrade = gen.grades.map(function (g) {
    var G = gradeOf(g);
    return "<li><b>" + esc(G.short) + '</b> <a href="' + studio(g, gen.id + ".12") + '">реши онлайн</a> · ' +
      '<a href="' + studio(g, gen.id + ".12", "print") + '">лист за печат</a> · ' +
      '<a href="' + gradeUrl(G) + '">всички теми за ' + esc(G.name) + "</a></li>";
  }).join("");
  var related = TOPICS.filter(function (x) {
    return x !== t && x.gen.grades.some(function (g) { return gen.grades.indexOf(g) !== -1; });
  }).slice(0, 10).map(function (x) {
    return '<a class="chip" href="' + topicUrl(x) + '">' + x.gen.icon + " " + esc(x.name) + "</a>";
  }).join(" ");
  var count = gen.cols === 1 ? 4 : (gen.cols >= 3 ? 12 : 8);

  return page({
    path: topicUrl(t),
    title: t.name + " — задачи по математика за " + span,
    desc: t.name + ": " + plain(t.desc).toLowerCase() + ". Безплатни задачи за " + span +
      " — реши онлайн с проверка или принтирай лист с отговори.",
    trail: [["Начало", "/"], [t.name, topicUrl(t)]],
    body:
      "<h1>" + gen.icon + " " + esc(t.name) + " — задачи за " + esc(span) + "</h1>\n" +
      '<p class="hero-lead lp-lead">' + t.desc + ". " + esc(plain(Z.i18n.gen(gen, "instr"))) + "</p>\n" +
      '<p class="lp-text">Задачите по темата „' + esc(t.name) + "“ се генерират наново при всяко кликване и следват " +
      "учебната програма — числата и трудността се нагаждат според класа. Реши ги онлайн с моментална проверка или " +
      "принтирай готов A4 лист с ключ с отговорите.</p>\n" +
      cta(mid, gen.id + ".12") + "\n" +
      '<section class="sec"><h2>Примерни задачи (' + esc(gradeOf(mid).name) + ")</h2>" +
      '<div class="card card-pad">' + samples(mid, [{ id: gen.id, count: count }]) + "</div></section>\n" +
      '<section class="sec"><h2>По класове</h2><ul class="lp-list">' + perGrade + "</ul></section>\n" +
      (related ? '<section class="sec lp-other"><h2>Свързани теми</h2><p>' + related + "</p></section>\n" : "")
  });
}

/* --------------------------------- write -------------------------------- */
function write(rel, html) {
  var file = path.join(ROOT, rel, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// start clean, so a renamed topic does not leave its old page behind
fs.rmSync(path.join(ROOT, "zadachi"), { recursive: true, force: true });
GRADES.forEach(function (G) { write(G.slug, gradePage(G)); });
TOPICS.forEach(function (t) { write("zadachi/" + t.slug, topicPage(t)); });

// the home page links to every topic page, so crawlers can find them
var home = path.join(ROOT, "index.html");
fs.writeFileSync(home, fs.readFileSync(home, "utf8").replace(
  /(<!-- topic-links:start[^>]*-->)[\s\S]*?(\s*<!-- topic-links:end -->)/,
  function (m, start, end) {
    return start + TOPICS.map(function (t) {
      return '\n        <a class="chip" href="' + topicUrl(t) + '">' + t.gen.icon + " " + esc(t.name) + "</a>";
    }).join("") + end;
  }));

/* --------------------------- language home pages ------------------------ */
/*
   Each language gets a real address — /en/, /fr/, … — whose HTML already
   says lang="fr", carries a French title and description, a canonical that
   points at itself and the menu text in French. Serving every language from
   "/?lang=fr" with the Bulgarian HTML made Google file them all as duplicates
   of the home page ("Alternate page with proper canonical tag").
*/
var LANGS = Z.i18n.LANGS.map(function (l) { return l.code; });
var OG_LOCALE = { bg: "bg_BG", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT", es: "es_ES", pt: "pt_PT",
  nl: "nl_NL", sv: "sv_SE", el: "el_GR", ro: "ro_RO", pl: "pl_PL" };
function langPath(code) { return code === "bg" ? "/" : "/" + code + "/"; }

var hreflang = LANGS.map(function (c) {
  return '<link rel="alternate" hreflang="' + c + '" href="' + SITE + langPath(c) + '">';
}).concat(['<link rel="alternate" hreflang="x-default" href="' + SITE + '/">']).join("\n");

function attr(v) { return esc(v).replace(/'/g, "&#39;"); }

/** The home page HTML in one language. */
function langHome(html, code) {
  Z.i18n.lang = code;
  var t = Z.i18n.t, url = SITE + langPath(code);
  html = html
    .replace(/(<!-- hreflang:start[^>]*-->)[\s\S]*?(<!-- hreflang:end -->)/, function (m, a, b) { return a + "\n" + hreflang + "\n" + b; });
  if (code === "bg") return html;
  html = html
    .replace(/[ \t]*<!-- bg-only:start[\s\S]*?<!-- bg-only:end -->\n?/g, "")
    // Bulgarian keywords and the Cyrillic brand belong to the Bulgarian page only
    .replace(/<meta name="keywords"[^>]*>\n/, "")
    .replace(/(<meta property="og:site_name" content=")[^"]*(">)/, "$1zada4ko$2")
    .replace(/"name": "Задачко",/g, '"name": "zada4ko",')
    .replace(/("@type": "WebApplication",[\s\S]*?"description": ")[^"]*(")/, function (m, a, b) {
      return a + t("seoDesc").replace(/"/g, '\\"') + b;
    })
    // the no-JavaScript note is Bulgarian + English; other languages keep the English line
    .replace(/(<noscript>[\s\S]*?)\s*<p><strong>За да[\s\S]*?<\/p>/, "$1")
    .replace(/<html lang="[^"]*">/, '<html lang="' + code + '">')
    .replace(/<title>[^<]*<\/title>/, "<title>" + esc(t("seoTitle")) + "</title>")
    .replace(/(<meta name="description" content=")[^"]*(">)/, "$1" + attr(t("seoDesc")) + "$2")
    .replace(/(<meta property="og:title" content=")[^"]*(">)/, "$1" + attr(t("docTitle")) + "$2")
    .replace(/(<meta property="og:description" content=")[^"]*(">)/, "$1" + attr(t("seoDesc")) + "$2")
    .replace(/(<link rel="canonical" href=")[^"]*(">)/, "$1" + url + "$2")
    .replace(/(<meta property="og:url" content=")[^"]*(">)/, "$1" + url + "$2")
    .replace(/(<meta property="og:locale" content=")[^"]*(">)/, "$1" + OG_LOCALE[code] + "$2")
    .replace(/("@type": "WebSite",[\s\S]*?"url": ")[^"]*(",\s*"inLanguage": ")[^"]*(")/, "$1" + url + "$2" + code + "$3")
    // the visible text, so the page reads in its language before any script runs
    .replace(/(<[^>]*\sdata-i18n="(\w+)"[^>]*>)([^<]*)(<)/g, function (m, open, key, txt, close) {
      return open + esc(t(key)) + close;
    })
    .replace(/(<[^>]*\sdata-i18n-ph="(\w+)"[^>]*>)/g, function (tag, all, key) {
      return tag.replace(/placeholder="[^"]*"/, 'placeholder="' + attr(t(key)) + '"');
    })
    .replace(/(<[^>]*\sdata-i18n-aria="(\w+)"[^>]*>)/g, function (tag, all, key) {
      return tag.replace(/aria-label="[^"]*"/, 'aria-label="' + attr(t(key)) + '"');
    });
  return html;
}

var homeSrc = fs.readFileSync(home, "utf8");
fs.writeFileSync(home, langHome(homeSrc, "bg"));
LANGS.filter(function (c) { return c !== "bg"; }).forEach(function (c) { write(c, langHome(homeSrc, c)); });
Z.i18n.lang = "bg";

/* -------------------------------- sitemap -------------------------------- */
var alternates = LANGS.map(function (c) {
  return '<xhtml:link rel="alternate" hreflang="' + c + '" href="' + SITE + langPath(c) + '"/>';
}).join("") + '<xhtml:link rel="alternate" hreflang="x-default" href="' + SITE + '/"/>';

var urls = LANGS.map(function (c) { return [langPath(c), c === "bg" ? "1.0" : "0.9", alternates]; })
  .concat(GRADES.map(function (G) { return [gradeUrl(G), "0.9"]; }))
  .concat(TOPICS.map(function (t) { return [topicUrl(t), "0.7"]; }));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  urls.map(function (u) {
    return "  <url><loc>" + SITE + u[0] + "</loc>" + (u[2] || "") + "<lastmod>" + TODAY + "</lastmod><priority>" + u[1] + "</priority></url>";
  }).join("\n") + "\n</urlset>\n");

console.log("wrote " + (LANGS.length - 1) + " language home pages, " + GRADES.length + " grade pages, " +
  TOPICS.length + " topic pages and sitemap.xml");
