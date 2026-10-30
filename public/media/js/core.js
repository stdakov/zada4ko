/* ==========================================================================
   zada4ko.com — core: seeded RNG, helpers, i18n
   ========================================================================== */
"use strict";

window.Z = window.Z || {};

/* Asset version. Keep in step with the ?v= query on the CSS/JS URLs in
   index.html and with CACHE in sw.js — it is printed in the sheet footer so a
   screenshot always says which build produced it. */
window.Z.VERSION = "10";

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
    return (Z.i18n.fmt("dec") || ".") === "," ? s.replace(".", ",") : s;
  };

  /** An answer as the child should read it: "110.5" becomes "110,5" where the language uses a comma. */
  H.showAnswer = function (a) {
    return /^-?\d+\.\d+$/.test(String(a)) ? H.num(a) : String(a);
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
/*
   Every word the app shows lives in media/js/i18n/<code>.js, one file per
   language, registered with Z.i18n.add(code, part). A part may hold:

     ui:     { key: "text" }                   interface labels (Z.t)
     msg:    { "module.key": "text {v}" | fn } generator sentences (Z.m)
     gen:    { genId: { name, desc, instr } }  topic names
     badges: { badgeId: "name" }
     kids:   [20 names]                        same length in every language,
                                               so a seed picks the same slot
     nouns:  { nounId: [forms…] }              see Z.pickThing in registry.js
     fmt:    { dec, and, money(v), qty(n, noun), cur }

   Message functions get (v, Z) and may do any grammar they need. Anything a
   language leaves out falls back to English, then Bulgarian.
   bg and en ship with the page; the others are fetched when chosen.
*/
(function (Z) {
  var LANGS = [
    { code: "bg", name: "Български",  flag: "🇧🇬" },
    { code: "en", name: "English",    flag: "🇬🇧" },
    { code: "de", name: "Deutsch",    flag: "🇩🇪" },
    { code: "fr", name: "Français",   flag: "🇫🇷" },
    { code: "it", name: "Italiano",   flag: "🇮🇹" },
    { code: "es", name: "Español",    flag: "🇪🇸" },
    { code: "pt", name: "Português",  flag: "🇵🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska",    flag: "🇸🇪" },
    { code: "el", name: "Ελληνικά",   flag: "🇬🇷" },
    { code: "ro", name: "Română",     flag: "🇷🇴" },
    { code: "pl", name: "Polski",     flag: "🇵🇱" }
  ];
  var CODES = LANGS.map(function (l) { return l.code; });
  var locales = {};
  var loading = {};

  /** Walk the fallback chain current → en → bg for one section entry. */
  function find(section, key) {
    var chain = [i18n.lang, "en", "bg"];
    for (var i = 0; i < chain.length; i++) {
      var loc = locales[chain[i]];
      if (loc && loc[section] && loc[section][key] !== undefined) return loc[section][key];
    }
    return undefined;
  }

  var i18n = {
    lang: "bg",
    LANGS: LANGS,
    locales: locales,

    /** Merge a part into a language; sections merge key by key. */
    add: function (code, part) {
      var loc = locales[code] || (locales[code] = {});
      Object.keys(part).forEach(function (sec) {
        var v = part[sec];
        if (v && typeof v === "object" && !Array.isArray(v)) {
          loc[sec] = loc[sec] || {};
          Object.keys(v).forEach(function (k) { loc[sec][k] = v[k]; });
        } else {
          loc[sec] = v;
        }
      });
    },

    supported: function (code) { return CODES.indexOf(code) !== -1; },

    /** Fetch a language file once; resolves when it is registered. */
    load: function (code) {
      if (!i18n.supported(code)) return Promise.reject(new Error("lang " + code));
      if (locales[code] && locales[code].ui) return Promise.resolve(code);
      if (loading[code]) return loading[code];
      loading[code] = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "/media/js/i18n/" + code + ".js?v=" + Z.VERSION;
        s.onload = function () { resolve(code); };
        s.onerror = function () { delete loading[code]; reject(new Error("lang " + code)); };
        document.head.appendChild(s);
      });
      return loading[code];
    },

    /** Interface label. */
    t: function (key) {
      var v = find("ui", key);
      return v !== undefined ? v : key;
    },

    /** Generator sentence: a "{name}" template or a function of (v, Z). */
    m: function (key, v) {
      var e = find("msg", key);
      if (e === undefined) return key;
      if (typeof e === "function") return e(v || {}, Z);
      return String(e).replace(/\{(\w+)\}/g, function (all, k) {
        return v && v[k] !== undefined ? v[k] : all;
      });
    },

    /** name / desc / instr of a generator. */
    gen: function (gen, field) {
      var e = find("gen", gen.id);
      if (e && e[field] !== undefined) return e[field];
      var en = locales.en && locales.en.gen && locales.en.gen[gen.id];
      if (en && en[field] !== undefined) return en[field];
      return field === "instr" ? i18n.t("instrSolve") : gen.id;
    },

    badge: function (id) { var v = find("badges", id); return v !== undefined ? v : id; },

    /** A formatting rule (dec, and, money, qty, …) of the current language. */
    fmt: function (key) { return find("fmt", key); },

    /** A whole list (kids) from the current language, falling back as a unit. */
    list: function (sec) {
      var chain = [i18n.lang, "en", "bg"];
      for (var i = 0; i < chain.length; i++) {
        var loc = locales[chain[i]];
        if (loc && loc[sec]) return loc[sec];
      }
      return [];
    },

    noun: function (id) { return find("nouns", id); },

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
      if (m && i18n.supported(m[1].toLowerCase())) return m[1].toLowerCase();
      var saved = localStorage.getItem("z4_lang");
      if (saved && i18n.supported(saved)) return saved;
      // No guessing from navigator.language: Googlebot renders pages with an
      // English browser, so guessing meant Google indexed the Bulgarian home
      // page in English. The app offers the visitor's language instead.
      return "bg";
    },

    /** The visitor's browser language, when we have it and it is not the current one. */
    suggest: function () {
      var b = (navigator.language || "").slice(0, 2).toLowerCase();
      return b && b !== i18n.lang && i18n.supported(b) ? b : null;
    }
  };

  Z.i18n = i18n;
  Z.t = i18n.t;
  Z.m = i18n.m;
})(window.Z);
