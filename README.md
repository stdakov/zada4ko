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
    core.js             seeded RNG, helpers, i18n dictionaries
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
redirect, compression, caching and the single-page fallback. Bump `CACHE` in
`sw.js` whenever assets change, so returning visitors get the new files.

---

Idea by Mitko · built by [dakovdev.com](https://dakovdev.com)
