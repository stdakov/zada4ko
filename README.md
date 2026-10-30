# zada4ko

**A maths worksheet generator for kids — [zada4ko.com](https://zada4ko.com)**

Pick a grade, pick the topics, and get an endless supply of maths tasks.
Solve them online with instant checking, or print a clean A4 worksheet with an
answer key for the teacher. Bulgarian and English.

No build step, no dependencies, no backend — plain HTML, CSS and vanilla JS.

---

## What it does

- **27 task generators** spanning preschool to grade 7: counting, addition and
  subtraction, column arithmetic, times tables, multi-digit × and ÷, order of
  operations, missing numbers, comparing, sequences, rounding, place value,
  word problems, telling the time, units, money, geometry, fractions, decimals,
  percentages, divisibility / GCD / LCM, powers and roots, negative numbers,
  equations, algebraic identities, Pythagoras, Roman numerals and brain teasers.
- **Two modes** — solve online (instant checking, score, streak, stars,
  confetti) or a printable A4 sheet (name/class/date, points per task,
  working space, answer key).
- **Variants A / B / C / D** — the same topics with different numbers, so a
  class can sit the same test without copying.
- **Reproducible sheets** — every worksheet has a short code (the RNG seed).
  The same code always rebuilds the exact same tasks, so a shared link hands
  everyone an identical worksheet.
- **Grade-aware content** — number ranges and topics follow the Bulgarian
  curriculum for each year; a first-grader never meets a percentage.
- **Local progress** — tasks solved, accuracy, per-topic stats and badges, kept
  in `localStorage`. No accounts, nothing leaves the browser.
- **Works offline** after the first visit, via a service worker.

## Layout

```
public/
  index.html            single page, hash-routed views
  sw.js                 service worker (offline shell)
  media/css/
    base.css            design tokens, reset, primitives
    app.css             components and layout
    print.css           A4 print rules
  media/js/
    core.js             seeded RNG, helpers, i18n lookup and loading
    i18n/<code>.js      all text of one language (see Languages)
    store.js            local progress and badges
    sheet.js            sheet model, paper rendering, URL encoding
    solve.js            interactive solving and answer checking
    app.js              routing, studio UI, printing
    gen/
      registry.js       generator registry, task helpers, name pools
      arith.js          numbers and arithmetic
      word.js           word problems
      measure.js        time, units, money, geometry
      advanced.js       fractions, decimals, algebra, number theory
```

## Languages

Every word the app shows lives in `public/media/js/i18n/<code>.js`, one file
per language: interface labels, topic names, the sentences of every task,
nouns with their plural forms, children's names and number/money formatting.
Generators never contain text; they ask for a sentence by key
(`Z.m("word.giveAway", { k: name, a: 5, b: 2, th: noun })`), and a language
can answer with a template string or a small function when its grammar needs
one (Polish plurals, Romanian "20 de mere", Greek cases…).

`en.js` is the reference — anything a language lacks falls back to English.
Bulgarian and English ship with the page; the others are fetched when chosen.

To add a language: copy `en.js` to `xx.js`, translate it, add the code to
`LANGS` in `core.js` and an `hreflang` line in `index.html`, then check it:

```
node tools/check-i18n.js xx      # missing keys, broken text, answers ≠ English
node tools/sample-i18n.js xx     # print sample tasks to read the grammar
```

## Landing pages (SEO)

The app routes with `#/…`, which search engines ignore, so on its own the site
is a single indexable URL. `tools/build-pages.js` writes a static page for every
grade (`/zadachi-po-matematika-1-klas/`, …) and every topic (`/zadachi/<topic>/`)
with its own title, description, text and sample tasks from the real
generators, refreshes the topic links on the home page and rewrites
`sitemap.xml`. Run it after adding or renaming a generator:

```
node tools/build-pages.js
```

## Adding a task generator

Register it and it appears in the studio for the grades you list:

```js
Z.reg.add({
  id: "my-topic",
  icon: "🎲",
  grades: [3, 4],
  cols: 3,                                   // print columns hint
  name: { bg: "Моята тема", en: "My topic" },
  desc: { bg: "Кратко описание", en: "Short description" },
  instr: { bg: "Пресметни.", en: "Calculate." },
  make: function (rng, ctx) {                // ctx = { grade, diff: 0|1|2 }
    var a = rng.int(2, 20), b = rng.int(2, 20);
    return Z.T.expr(a + " + " + b, a + b);
  }
});
```

Use only the passed `rng` for randomness — never `Math.random()` — or sheet
codes stop being reproducible. A task looks like:

| field | meaning |
| --- | --- |
| `q` | prompt HTML, without the answer blank |
| `a` | canonical answer as a string |
| `alts` | other accepted spellings |
| `kind` | `num` \| `text` \| `choice` |
| `choices` | options, for `kind: "choice"` |
| `layout` | `expr` (short) \| `text` (word problem) \| `block` (diagram) |
| `eq` | render ` = ____` after the prompt |
| `unit` | printed after the blank |
| `work` | dotted working lines on paper |
| `sol` | worked explanation, shown after checking |

## URL parameters

The studio keeps its whole state in the hash, so any sheet is a link:

`#/studio?g=4&d=1&s=KONTR1&t=addsub.6_word.3&p=2&v=2&k=page&m=print`

| key | meaning |
| --- | --- |
| `g` | grade, 0–7 |
| `d` | difficulty, 0 easy / 1 normal / 2 hard |
| `s` | sheet code (RNG seed) |
| `t` | topics as `id.count` joined by `_` |
| `h` | sheet title |
| `c` | print columns, 0 = auto |
| `k` | answer key: `none` \| `same` \| `page` |
| `w` | working space: 0 compact / 1 normal / 2 extra |
| `p` | points per task |
| `v` | number of variants, 1–4 |
| `m` | `solve` \| `print` |

`?lang=bg` or `?lang=en` (before the hash) pins the interface language.

## Running locally

Any static server will do — the service worker needs http, not `file://`:

```sh
cd public && python3 -m http.server 8777
```

## Deploying

Upload `public/` as the document root. `.htaccess` handles https, the www
redirect, compression, caching and the single-page fallback.

**After changing any CSS or JS, bump both version markers:**

1. the `?v=N` query on the `media/css/*.css` and `media/js/*.js` URLs in
   `index.html` — CSS and JS are served with a 7-day expiry, so without a new
   URL a returning browser keeps the old file and can end up running new JS
   against old CSS;
2. `CACHE` in `sw.js`, so the service worker drops its old entries;
3. `Z.VERSION` in `media/js/core.js` — it is printed in the sheet footer next to
   the sheet code, so a screenshot of any worksheet says which build made it.
   That is the quickest way to tell a real layout bug from a stale cache.

`index.html` and `sw.js` are sent `no-cache`, which is what makes step 1 work:
a fresh shell always points at fresh assets.

---

Idea by Mitko · built by [dakovdev.com](https://dakovdev.com)
