/* ==========================================================================
   zada4ko.com — core: seeded RNG, helpers, i18n
   ========================================================================== */
"use strict";

window.Z = window.Z || {};

/* Asset version. Keep in step with the ?v= query on the CSS/JS URLs in
   index.html and with CACHE in sw.js — it is printed in the sheet footer so a
   screenshot always says which build produced it. */
window.Z.VERSION = "8";

/* ------------------------------ Seeded RNG ------------------------------ */
(function (Z) {
  function hashSeed(str) {
    var h = 1779033703 ^ String(str).length;
    for (var i = 0; i < String(str).length; i++) {
      h = Math.imul(h ^ String(str).charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  /** Deterministic random source. Same seed -> same worksheet. */
  function RNG(seed) {
    var next = hashSeed(seed);
    var a = next(), b = next(), c = next(), d = next();
    function u32() {
      var t = a + b | 0;
      a = b ^ (b >>> 9);
      b = c + (c << 3) | 0;
      c = (c << 21) | (c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return t >>> 0;
    }
    this.float = function () { return u32() / 4294967296; };
  }
  RNG.prototype.int = function (min, max) {
    if (max === undefined) { max = min; min = 0; }
    if (max < min) { var t = min; min = max; max = t; }
    return min + Math.floor(this.float() * (max - min + 1));
  };
  RNG.prototype.pick = function (arr) { return arr[this.int(0, arr.length - 1)]; };
  RNG.prototype.bool = function (p) { return this.float() < (p === undefined ? 0.5 : p); };
  RNG.prototype.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = this.int(0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  /** Pick n distinct items (or fewer if the pool is small). */
  RNG.prototype.sample = function (arr, n) { return this.shuffle(arr).slice(0, n); };
  /** Random multiple of `step` in [min,max]. */
  RNG.prototype.step = function (min, max, step) {
    var lo = Math.ceil(min / step), hi = Math.floor(max / step);
    return this.int(lo, hi) * step;
  };

  Z.RNG = RNG;
  Z.newSeed = function () {
    var s = "";
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  };
})(window.Z);

/* ------------------------------- Helpers -------------------------------- */
(function (Z) {
  var H = {};

  H.el = function (tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") n.className = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k];
        else if (k === "text") n.textContent = attrs[k];
        else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  };
  H.$ = function (s, r) { return (r || document).querySelector(s); };
  H.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  H.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /** Greatest common divisor. */
  H.gcd = function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; };
  H.lcm = function (a, b) { return Math.abs(a * b) / H.gcd(a, b); };

  H.isPrime = function (n) {
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;
    for (var i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
    return true;
  };
  H.divisors = function (n) {
    var out = [];
    for (var i = 1; i <= n; i++) if (n % i === 0) out.push(i);
    return out;
  };

  /** Format a number the Bulgarian way (decimal comma) when asked. */
  H.num = function (v, decimals) {
    var s = decimals === undefined ? String(v) : Number(v).toFixed(decimals);
    return Z.i18n.lang === "bg" ? s.replace(".", ",") : s;
  };

  /** Fraction rendering, either as an inline a/b or a stacked glyph. */
  H.frac = function (n, d, whole) {
    var w = whole ? '<span class="fr-w">' + whole + "</span>" : "";
    return w + '<span class="fr"><sup>' + n + "</sup>&frasl;<sub>" + d + "</sub></span>";
  };

  H.plural = function (n, one, few, many) {
    if (n === 1) return one;
    return (few && n < 5) ? few : (many || few || one);
  };

  H.clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };

  H.toInt = function (v, fallback) {
    var n = parseInt(v, 10);
    return isNaN(n) ? fallback : n;
  };

  /** Normalise a typed answer for comparison (comma decimals, spaces, case). */
  H.normAnswer = function (s) {
    return String(s).trim().toLowerCase()
      .replace(/\s+/g, "")
      .replace(/,/g, ".")
      .replace(/^\+/, "")
      .replace(/^(-?)\.(\d)/, "$10.$2")   // ",75" typed for 0,75
      .replace(/^(-?)0+(\d)/, "$1$2")
      .replace(/(\.\d*?)0+$/, "$1")
      .replace(/\.$/, "");
  };

  H.debounce = function (fn, ms) {
    var t;
    return function () {
      var a = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, a); }, ms || 200);
    };
  };

  Z.H = H;
})(window.Z);

/* -------------------------------- i18n ---------------------------------- */
(function (Z) {
  var dict = {
    bg: {
      /* nav / chrome */
      brandSub: "математика за деца",
      navHome: "Начало",
      navStudio: "Създай задачи",
      navTeachers: "За учители",
      navProgress: "Моят напредък",
      navAbout: "Как работи",
      menu: "Меню",
      /* hero */
      heroBadge: "Нови задачи при всяко кликване",
      heroTitle: "Безкрайни задачи по математика за",
      heroTitleHl: "любопитни деца",
      heroLead:
        "Избери клас, избери теми и получи готов лист със задачи. Реши ги онлайн с моментална проверка или ги принтирай за контролно, домашно и упражнение.",
      heroCta1: "Създай задачи",
      heroCta2: "Бърз старт за 1. клас",
      stat1: "вида задачи",
      stat2: "класа",
      stat3: "комбинации",
      /* grades */
      gradesTitle: "От кой клас е детето?",
      gradesLead: "Всеки клас отваря темите по учебна програма — от броене на ябълки до Питагорова теорема.",
      grade0: "Предучилищна",
      grade1: "1. клас", grade2: "2. клас", grade3: "3. клас", grade4: "4. клас",
      grade5: "5. клас", grade6: "6. клас", grade7: "7. клас",
      ageLabel: "год.",
      /* features */
      featTitle: "Какво може zada4ko",
      f1t: "Реши онлайн", f1d: "Пиши отговора и разбери веднага дали е вярно. Точки, звезди и конфети за награда.",
      f2t: "Принтирай на лист", f2d: "Чист A4 лист за домашно или контролно — с място за име, дата и оценка.",
      f3t: "Ключ с отговори", f3d: "Отделна страница само за учителя, с верните отговори на всяка задача.",
      f4t: "Варианти А / Б / В", f4d: "Един клик прави различни варианти на едно и също контролно.",
      f5t: "Споделим линк", f5d: "Всеки лист има код. Дай линка на класа и всички получават същите задачи.",
      f6t: "Текстови задачи", f6d: "Истински житейски ситуации с имена, пари, време и разстояния.",
      /* studio */
      studioTitle: "Ателие за задачи",
      studioLead: "Настрой листа отляво, виж резултата отдясно.",
      stepGrade: "Клас",
      stepTopics: "Теми",
      stepSettings: "Настройки",
      panelSetup: "Настройки на листа",
      pickTopics: "Избери теми",
      noTopics: "Избери поне една тема отляво, за да се появят задачи.",
      countLabel: "Задачи",
      totalTasks: "Общо задачи",
      titleLabel: "Заглавие на листа",
      titlePlaceholder: "Контролна работа по математика",
      difficulty: "Трудност",
      diffEasy: "Лесно", diffNormal: "Нормално", diffHard: "Трудно",
      columns: "Колони при печат",
      auto: "Автоматично",
      colsAuto: "Автоматично",
      cols1: "1 колона", cols2: "2 колони", cols3: "3 колони", cols4: "4 колони",
      showKey: "Ключ с отговори",
      keyNone: "Без ключ", keySame: "На същия лист", keyPage: "Отделна страница",
      workspace: "Място за решение",
      spaceNone: "Без (сбито)",
      spaceNormal: "Нормално",
      spaceMore: "Повече",
      pagesWord: "стр. A4",
      pagesEst: "Приблизителен брой страници при печат",
      variants: "Варианти",
      variantsHint: "Различни числа, еднакви теми — срещу преписване.",
      points: "Точки за задача",
      seedLabel: "Код на листа",
      reshuffle: "Нови числа",
      modeSolve: "Реши онлайн",
      modePrint: "Лист за печат",
      btnPrint: "Принтирай",
      btnPdf: "Запази като PDF",
      btnShare: "Копирай линк",
      btnCheckAll: "Провери всичко",
      btnNew: "Нови задачи",
      btnHint: "Подсказка",
      linkCopied: "Линкът е копиран!",
      /* solve */
      solveScore: "Точки", solveTime: "Време", solveStreak: "Серия",
      answerPh: "Отговор",
      check: "Провери",
      correct: "Браво! Вярно е.",
      wrong: "Опа, не е вярно.",
      correctIs: "Верният отговор е",
      solutionIs: "Решение",
      resultTitle: "Готово!",
      resultSub: "Ето как се справи",
      ofTasks: "от",
      tryAgain: "Опитай пак",
      newTasks: "Нови задачи",
      printThese: "Принтирай тези",
      perfect: "Перфектно! Всичко вярно!",
      great: "Отлично се справяш!",
      good: "Добра работа! Още малко упражнение.",
      keepGoing: "Не се предавай — пробвай пак!",
      /* teachers */
      teachTitle: "Направено за учители и родители",
      teachLead: "За 30 секунди имаш контролно за целия клас — с варианти и ключ с отговори.",
      t1: "Смеси теми в един лист — точно колкото ти трябват",
      t2: "Варианти А, Б, В с еднаква трудност",
      t3: "Точки за всяка задача и поле за оценка",
      t4: "Печата се чисто, черно-бяло, без излишно мастило",
      t5: "Кодът на листа връща същите задачи по всяко време",
      t6: "Работи офлайн след първо зареждане",
      teachCta: "Направи контролно",
      /* progress */
      progTitle: "Моят напредък",
      progLead: "Всичко се пази само в този браузър — без регистрация.",
      progSolved: "Решени задачи",
      progCorrect: "Верни отговори",
      progAccuracy: "Точност",
      progSheets: "Направени листа",
      progBadges: "Значки",
      byTopic: "По теми",
      progReset: "Изчисти напредъка",
      progResetAsk: "Сигурни ли сте? Целият напредък ще бъде изтрит.",
      progEmpty: "Още няма решени задачи. Започни сега!",
      /* about */
      aboutTitle: "Как работи",
      a1t: "1. Избери клас", a1d: "Темите се нагаждат към учебната програма за възрастта.",
      a2t: "2. Избери теми", a2d: "Смесвай събиране, дроби, текстови задачи и геометрия — както ти трябва.",
      a3t: "3. Реши или принтирай", a3d: "Онлайн с проверка или на хартия с ключ за учителя.",
      /* misc */
      footTagline: "Безплатен генератор на задачи по математика за деца от предучилищна до 7. клас.",
      footLinks: "Бързи връзки",
      footGrades: "По класове",
      madeBy: "Създадено от",
      idea: "По идея на Митко",
      answersKey: "Ключ с отговори",
      sheetFoot: "zada4ko.com · задачи по математика за деца",
      sheetName: "Име", sheetClass: "Клас", sheetDate: "Дата", sheetScore: "Оценка",
      pts: "т.",
      variant: "Вариант",
      taskWord: "задачи",
      close: "Затвори",
      instrSolve: "Пресметни.",
      of: "от"
    },
    en: {
      brandSub: "maths for kids",
      navHome: "Home", navStudio: "Create tasks", navTeachers: "For teachers",
      navProgress: "My progress", navAbout: "How it works", menu: "Menu",
      heroBadge: "Fresh tasks on every click",
      heroTitle: "Endless maths practice for",
      heroTitleHl: "curious kids",
      heroLead:
        "Pick a grade, pick the topics and get a ready worksheet. Solve it online with instant checking, or print it for a test, homework or extra practice.",
      heroCta1: "Create tasks",
      heroCta2: "Quick start: Grade 1",
      stat1: "task types", stat2: "grades", stat3: "combinations",
      gradesTitle: "Which grade is the child in?",
      gradesLead: "Each grade unlocks curriculum topics — from counting apples to the Pythagorean theorem.",
      grade0: "Preschool",
      grade1: "Grade 1", grade2: "Grade 2", grade3: "Grade 3", grade4: "Grade 4",
      grade5: "Grade 5", grade6: "Grade 6", grade7: "Grade 7",
      ageLabel: "yrs",
      featTitle: "What zada4ko can do",
      f1t: "Solve online", f1d: "Type the answer and know instantly if it is right. Points, stars and confetti included.",
      f2t: "Print on paper", f2d: "A clean A4 sheet for homework or a test — with space for name, date and grade.",
      f3t: "Answer key", f3d: "A separate teacher-only page with the correct answer to every task.",
      f4t: "Variants A / B / C", f4d: "One click builds different versions of the same test.",
      f5t: "Shareable link", f5d: "Every sheet has a code. Share the link and everyone gets the same tasks.",
      f6t: "Word problems", f6d: "Real-life situations with names, money, time and distances.",
      studioTitle: "Task studio",
      studioLead: "Tune the sheet on the left, watch it build on the right.",
      stepGrade: "Grade", stepTopics: "Topics", stepSettings: "Settings",
      panelSetup: "Sheet setup",
      pickTopics: "Pick topics",
      noTopics: "Pick at least one topic on the left to see tasks.",
      countLabel: "Tasks", totalTasks: "Total tasks",
      titleLabel: "Sheet title", titlePlaceholder: "Maths test",
      difficulty: "Difficulty", diffEasy: "Easy", diffNormal: "Normal", diffHard: "Hard",
      colsAuto: "Automatic",
      cols1: "1 column", cols2: "2 columns", cols3: "3 columns", cols4: "4 columns",
      columns: "Print columns", auto: "Auto",
      showKey: "Answer key", keyNone: "No key", keySame: "Same sheet", keyPage: "Separate page",
      workspace: "Working space",
      spaceNone: "None (compact)",
      spaceNormal: "Normal",
      spaceMore: "More",
      pagesWord: "A4 pages",
      pagesEst: "Estimated number of printed pages",
      variants: "Variants", variantsHint: "Same topics, different numbers — no copying.",
      points: "Points per task",
      seedLabel: "Sheet code", reshuffle: "New numbers",
      modeSolve: "Solve online", modePrint: "Printable sheet",
      btnPrint: "Print", btnPdf: "Save as PDF", btnShare: "Copy link",
      btnCheckAll: "Check all", btnNew: "New tasks", btnHint: "Hint",
      linkCopied: "Link copied!",
      solveScore: "Score", solveTime: "Time", solveStreak: "Streak",
      answerPh: "Answer", check: "Check",
      correct: "Correct! Well done.", wrong: "Oops, not quite.",
      correctIs: "The correct answer is", solutionIs: "Solution",
      resultTitle: "All done!", resultSub: "Here is how you did",
      ofTasks: "of", tryAgain: "Try again", newTasks: "New tasks", printThese: "Print these",
      perfect: "Perfect! Everything correct!", great: "Excellent work!",
      good: "Good job! A bit more practice.", keepGoing: "Don't give up — try again!",
      teachTitle: "Built for teachers and parents",
      teachLead: "A full class test in 30 seconds — with variants and an answer key.",
      t1: "Mix topics on one sheet — exactly as many as you need",
      t2: "Variants A, B, C with matching difficulty",
      t3: "Points per task and a grade box",
      t4: "Prints clean in black and white, no wasted ink",
      t5: "The sheet code brings back the same tasks any time",
      t6: "Works offline after the first load",
      teachCta: "Build a test",
      progTitle: "My progress", progLead: "Everything stays in this browser — no sign-up.",
      progSolved: "Tasks solved", progCorrect: "Correct answers", progAccuracy: "Accuracy",
      progSheets: "Sheets made", progBadges: "Badges",
      byTopic: "By topic",
      progReset: "Reset progress", progResetAsk: "Are you sure? All progress will be deleted.",
      progEmpty: "No tasks solved yet. Start now!",
      aboutTitle: "How it works",
      a1t: "1. Pick a grade", a1d: "Topics adapt to the curriculum for that age.",
      a2t: "2. Pick topics", a2d: "Mix addition, fractions, word problems and geometry as you like.",
      a3t: "3. Solve or print", a3d: "Online with checking, or on paper with a teacher key.",
      footTagline: "A free maths worksheet generator for kids from preschool to grade 7.",
      footLinks: "Quick links", footGrades: "By grade",
      madeBy: "Made by", idea: "Inspired by Mitko",
      answersKey: "Answer key",
      sheetFoot: "zada4ko.com · maths worksheets for kids",
      sheetName: "Name", sheetClass: "Class", sheetDate: "Date", sheetScore: "Grade",
      pts: "pts", variant: "Variant", taskWord: "tasks", close: "Close",
      instrSolve: "Calculate.", of: "of"
    }
  };

  var i18n = {
    lang: "bg",
    dict: dict,
    t: function (key) {
      var d = dict[i18n.lang] || dict.bg;
      return d[key] !== undefined ? d[key] : (dict.bg[key] !== undefined ? dict.bg[key] : key);
    },
    /** Pick the right field from a {bg:…, en:…} object. */
    pick: function (obj) {
      if (!obj) return "";
      return obj[i18n.lang] !== undefined ? obj[i18n.lang] : obj.bg;
    },
    apply: function (root) {
      Z.H.$$("[data-i18n]", root || document).forEach(function (n) {
        n.textContent = i18n.t(n.getAttribute("data-i18n"));
      });
      Z.H.$$("[data-i18n-ph]", root || document).forEach(function (n) {
        n.setAttribute("placeholder", i18n.t(n.getAttribute("data-i18n-ph")));
      });
      Z.H.$$("[data-i18n-aria]", root || document).forEach(function (n) {
        n.setAttribute("aria-label", i18n.t(n.getAttribute("data-i18n-aria")));
      });
    },
    detect: function () {
      // an explicit ?lang=bg wins, so a shared link keeps its language
      var m = location.search.match(/[?&]lang=([a-z]{2})/i);
      if (m && dict[m[1].toLowerCase()]) return m[1].toLowerCase();
      var saved = localStorage.getItem("z4_lang");
      if (saved && dict[saved]) return saved;
      var b = (navigator.language || "bg").slice(0, 2).toLowerCase();
      return dict[b] ? b : "bg";
    }
  };

  Z.i18n = i18n;
  Z.t = i18n.t;
})(window.Z);
