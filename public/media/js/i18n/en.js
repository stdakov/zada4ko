/* ==========================================================================
   zada4ko.com — English — the reference for every other language: anything a language lacks falls back to this file
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   ========================================================================== */
"use strict";

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("en", {
  fmt: {
    dec: ".",
    and: " and ",
    cur: "€",
    money: function (s) { return "€" + s; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Ivan", "Maria", "George", "Nia", "Boris", "Ellie", "Mitko", "Dara", "Kaloyan", "Ray",
         "Simona", "Theo", "Victor", "Annie", "Peter", "Laura", "Martin", "Joanna", "Kiril", "Deni"],
  nouns: {
    apple: ["apple", "apples"], banana: ["banana", "bananas"], pencil: ["pencil", "pencils"],
    balloon: ["balloon", "balloons"], book: ["book", "books"], sweet: ["sweet", "sweets"],
    ball: ["ball", "balls"], flower: ["flower", "flowers"], sticker: ["sticker", "stickers"],
    nut: ["nut", "nuts"], strawberry: ["strawberry", "strawberries"], cube: ["cube", "cubes"],
    cat: ["cat", "cats"], dog: ["dog", "dogs"], bunny: ["bunny", "bunnies"], chick: ["chick", "chicks"],
    fish: ["fish", "fish"], butterfly: ["butterfly", "butterflies"], ant: ["ant", "ants"], bee: ["bee", "bees"],
    notebook: ["notebook", "notebooks"], backpack: ["backpack", "backpacks"], puzzle: ["puzzle", "puzzles"],
    umbrella: ["umbrella", "umbrellas"], cap: ["cap", "caps"], toy: ["toy", "toys"], mug: ["mug", "mugs"],
    icecream: ["ice cream", "ice creams"], ticket: ["ticket", "tickets"], plantpot: ["plant pot", "plant pots"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("en", {
  ui: {
    /* teachers: ready-made tests · about: privacy note */
    readyT1: "Grades 1–2",
    readyT2: "Grades 3–4",
    readyT3: "Grades 5–6",
    readyT4: "Grade 7",
    readyD1: "Addition and subtraction up to 100, comparing, word problems, telling the time.",
    readyD2: "Multiplication and division, order of operations, units of measure, area and perimeter.",
    readyD3: "Fractions, decimals, percentages, equations, volume and area.",
    readyD4: "Equations, expressions, powers, the Pythagorean theorem, word problems.",
    btnOpen: "Open",
    privacyT: "No sign-up, no ads in the tasks.",
    privacyD: "Progress is kept only in this device's browser and never leaves the computer. Once loaded, the site also works offline.",
    /* search engines: title and description of /en/ */
    seoTitle: "Maths worksheets for kids, grades 1–7 — print or solve online | zada4ko",
    seoDesc: "zada4ko is a free maths worksheet generator for kids from preschool to grade 7: addition and subtraction, times tables, fractions, word problems, geometry. Solve online or print a test with an answer key.",
    docTitle: "zada4ko — maths tasks for kids",
    language: "Language",
    gshort0: "Pre", gshort1: "G1", gshort2: "G2", gshort3: "G3", gshort4: "G4", gshort5: "G5", gshort6: "G6", gshort7: "G7",
    answerLabel: "Answer:",
    variantLetters: "ABCD",
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
    topicsTitle: "Tasks by grade and topic",
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
    maxNum: "Numbers up to", maxAuto: "By grade",
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
  },
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("en", {
  badges: {
    first: "First step",
    ten: "10 correct",
    fifty: "50 correct",
    hundred: "100 correct",
    fivehund: "500 correct",
    streak5: "Streak of 5",
    streak15: "Streak of 15",
    perfect: "Perfect sheet",
    perfect5: "5 perfect sheets",
    explorer: "Explorer",
    master: "All topics",
    printer: "Printer"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("en", {
  gen: {
    counting:  { name: "Counting", desc: "Count the objects and write the number", instr: "Count and write how many." },
    addsub:    { name: "Addition & subtraction", desc: "The core operations within the grade range" },
    columnar:  { name: "Column arithmetic", desc: "Written one under the other — great on paper", instr: "Calculate in columns." },
    times:     { name: "Times tables", desc: "Multiplication and division up to 100" },
    bigmuldiv: { name: "Multi-digit × and ÷", desc: "Beyond the tables, division with remainder" },
    order:     { name: "Order of operations", desc: "Expressions with brackets — what comes first", instr: "Calculate, respecting the order of operations." },
    missing:   { name: "Find the missing number", desc: "□ + 7 = 15 — which number is hiding", instr: "Find the missing number." },
    compare:   { name: "Comparing", desc: "Put &lt;, &gt; or =", instr: "Insert &lt;, &gt; or = ." },
    sequence:  { name: "Number sequences", desc: "Spot the rule and continue", instr: "Find the rule and write the missing number." },
    rounding:  { name: "Rounding", desc: "To tens, hundreds, thousands", instr: "Round the number." },
    place:     { name: "Place value", desc: "Units, tens, hundreds, thousands", instr: "Answer the question about the number." }
  },
  msg: {
    "arith.countSol": "Count one by one: {n}.",

    // division with a remainder: the answer as the child writes it, a hint, the worked line.
    // NOTE: remAnswer is still the Bulgarian form, as it always was in English; "{q} r {r}"
    // is already accepted as an alternative answer.
    "arith.remAnswer": "{q} r {r}",
    "arith.remHint": "write as “quotient r remainder”",
    "arith.remSol": "{dividend} : {d} = {q} (remainder {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "each next is {step} more",
    "arith.seqRuleSub": "each next is {step} less",
    "arith.seqRuleMul": "each next is {step} times bigger",
    "arith.seqRuleSquare": "the squares of the numbers",
    "arith.seqRuleFib": "each is the sum of the two before",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Round {n} to the nearest {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "tens", 100: "hundreds", 1000: "thousands", 10000: "ten thousands" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Which digit is in the {place} place of {n}?",
    "arith.placeName": function (v) {
      return ["units", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"][v.pos];
    },
    "arith.placeSumQ": "Write as a sum of place values: {n}",
    "arith.placeFitQ": "How many times does {m} fit into {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("en", {
  gen: {
    word: {
      name: "Word problems",
      desc: "Real-life situations that need thinking",
      instr: "Read carefully and solve."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " has " + Z.qty(v.a, v.th) + " and " + v.k1 + " has " + Z.qty(v.b, v.th) +
        ". How many " + v.th.pl + " do they have together?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " has " + Z.qty(v.a, v.th) + " and gives " + v.b + " to a friend. How many " + v.th.pl + " are left?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " has " + Z.qty(v.a, v.th) + ". " + v.k1 + " has " + v.d + " more. How many do they have in total?";
    },
    "word.animalLegs": function (v, Z) {
      return (v.n === 1 ? "There is " : "There are ") + Z.qty(v.n, v.th) + " in the yard. Each has " + v.legs + " legs. How many legs in total?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " buys " + v.n + " " + v.th.pl + " at " + v.price + " each. How much does " + v.k + " pay?";
    },
    "word.change": function (v) {
      return v.k + " pays " + v.paid + " for a " + v.th.sg + " that costs " + v.price + ". How much change is returned?";
    },
    "word.saveUp": "{k} saves {week} every week. After {weeks} weeks {k} wants a skateboard for {target}. How much more money is needed?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v) {
      return "There are " + v.per + " " + v.th.pl + " in each of " + v.n + " boxes. How many " + v.th.pl + " in total?";
    },
    "word.shareEqually": function (v) {
      return v.total + " " + v.th.pl + " are shared equally between " + v.kids + " children. How many does each child get?";
    },
    "word.boxesRest": function (v) {
      return "We have " + v.total + " " + v.th.pl + ". A box holds " + v.per + ". How many full boxes and how many " +
        v.th.pl + " are left? (write as “boxes r left”)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} r {rest}",
    "word.solRemainder": "remainder {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} reads {pages} pages a day for {days} days. The book has {total} pages. How many pages are left unread?",
    "word.average": "Three baskets hold {a}, {b} and {c} fruits. What is the average number of fruits per basket?",
    "word.sumDiff": "{k0} and {k1} have {total} stickers together. {k0} has {d} more than {k1}. How many does each have? (write {k0}'s number)",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "The film starts at {start} and lasts {dur} minutes. What time does it end? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": "A car travels at {speed} km/h for {hours} hours. What distance does it cover?",
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "A train covers {dist} km at an average speed of {speed} km/h. How many hours does it travel?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "A shop has " + v.whole + " " + v.th.pl + ". " + v.frac + " of them were sold. How many were sold?";
    },
    "word.fractionWhole": "{frac} of a number is {part}. What is the number?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "What is {p}% of {base}?",
    "word.saleJacket": "A jacket costs {price}. In a sale the price drops by {p}%. What is the new price?",
    "word.pctStudents": "Out of {whole} students, {part} do sports. What percentage is that?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} workers finish a job in {days} days. How many days will {more} workers need, working at the same rate?",
    "word.unitDays": "days",
    "word.motherAge": "Today the mother is {mult} times older than her son, who is {child}. How old will the mother be in {years} years?",
    "word.consecutive": "The sum of three consecutive natural numbers is {sum}. What is the smallest of them?",
    "word.pencilPacks": "A box holds {a} packs of {per1} pencils and {b} packs of {per2} pencils. How many pencils are in the box?",
    "word.treeTaller": "One tree is {small} m tall, the second is {times} times taller. By how many metres is the second tree taller than the first?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("en", {
  gen: {
    clock: { name: "Telling the time", desc: "Read the hands and write the time", instr: "What time is it? Write as hh:mm." },
    units: { name: "Units of measure", desc: "Convert cm, m, km, g, kg, l, minutes", instr: "Convert to the given units." },
    money: { name: "Money", desc: "Euros and cents, change, shopping", instr: "Work out the amount." },
    geometry: { name: "Geometry", desc: "Perimeter, area and volume of shapes", instr: "Look at the drawing and calculate." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "What time will it be in {n} minutes?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "The clock shows {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": function (v) { return v.n === 1 ? "day" : "days"; },
    "measure.family.len": "length", "measure.family.mass": "mass",
    "measure.family.vol": "volume", "measure.family.time": "time",

    // money
    "measure.cents": function (v) { return v.n === 1 ? "cent" : "cents"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n === 1 ? "cent" : "cents"); },
    "measure.coins": function (v) { return v.n + " coin" + (v.n === 1 ? "" : "s") + " of " + v.c + "c"; },
    "measure.moneyBox": "A money box holds {list}. How many cents in total?",
    "measure.eurToCents": function (v) {
      return v.eur + " euro" + (v.eur === 1 ? "" : "s") + " and " + v.ct + " cents = " + v.blank + " cents";
    },
    "measure.change": "We buy two items for {p1} and {p2} and pay with a {paid} note. How much change do we get?",

    // geometry — {grade} is passed so a language can use a simpler word in primary school
    "measure.askPerim": "Find the perimeter (P).",
    "measure.askPerimSquare": "A square. Find the perimeter (P).",
    "measure.askArea": "Find the area (S).",
    "measure.askAreaSquare": "A square. Find the area (S).",
    "measure.askAreaTri": "Find the area (S) of the triangle.",
    "measure.sideFromPerim": "A rectangle has perimeter P = {p} {u} and one side of {a} {u}. How long is the other side?",
    "measure.volCube": "A cube has an edge of {a} {u}. Find the volume (V).",
    "measure.volCuboid": "A cuboid measures {dims} {u}. Find the volume (V).",
    "measure.askCircumference": "Find the circumference (C). Take π ≈ {pi}.",
    "measure.askAreaCircle": "Find the area (S) of the circle. Take π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("en", {
  gen: {
    fractions:  { name: "Fractions", desc: "Compare, simplify, add and subtract", instr: "Calculate. Write a fraction as 3/4." },
    decimals:   { name: "Decimal numbers", desc: "Arithmetic with decimal points", instr: "Calculate." },
    percent:    { name: "Percentages", desc: "Percent of, discount, increase", instr: "Calculate." },
    divis:      { name: "Divisibility & factors", desc: "Divisibility rules, primes, GCD and LCM", instr: "Answer the question." },
    powers:     { name: "Powers & roots", desc: "Squares, cubes and square roots", instr: "Calculate." },
    negatives:  { name: "Negative numbers", desc: "Operations with integers", instr: "Calculate." },
    equations:  { name: "Equations", desc: "Solve for x — simple to two-sided", instr: "Solve the equation. Find x." },
    algebra:    { name: "Expressions & identities", desc: "Expanding brackets, special products", instr: "Evaluate for the given values." },
    pythagoras: { name: "Pythagorean theorem", desc: "Right triangle — find the missing side", instr: "Find the missing side." },
    roman:      { name: "Roman numerals", desc: "From I to MMXXV and back", instr: "Write in Arabic or Roman numerals." },
    logic:      { name: "Brain teasers", desc: "Riddles, hidden numbers, logic", instr: "Think it through and find the answer." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Simplify: {f}",
    "adv.commonDenSol": "Common denominator {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Write as an improper fraction: {f}",
    "adv.toMixed": "Write as a mixed number: {f}",
    /* an extra accepted spelling of a mixed number such as "2и1/3" (whole "and"
       fraction, no spaces). Kept as the Bulgarian "и" for now; a language may
       use its own word for "and". */
    "adv.mixedAltAnd": "{w}and{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w} whole, remainder {r} → {w} {r}/{d}",
    "adv.fractionOf": "What is {f} of {n}?",
    /* percent */
    "adv.percentOf": "{p}% of {n}",
    "adv.decreaseBy": "Decrease {n} by {p}%",
    "adv.increaseBy": "Increase {n} by {p}%",
    "adv.whatPercent": "What percent of {n} is {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "yes",
    "adv.no": "no",
    "adv.isDivisible": "Is {n} divisible by {d}?",
    "adv.divRemainderSol": "{n} : {d} → remainder {r}",
    "adv.isPrime": "Is {n} a prime number?",
    "adv.primeSol": "{n} is divisible only by 1 and itself.",
    "adv.compositeSol": "{n} is also divisible by {d}.",
    "adv.gcdOf": "GCD({a}, {b})",
    "adv.gcdSol": "The greatest common divisor is {v}",
    "adv.lcmOf": "LCM({a}, {b})",
    "adv.lcmSol": "The least common multiple is {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "For x = {x} evaluate {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "I thought of a number, multiplied it by {m} and added {add}. I got {res}. What was my number?",
    "adv.chickensRabbits": "A yard has chickens and rabbits — {heads} heads and {legs} legs in total. How many rabbits are there?",
    "adv.chickensRabbitsSol": "If all were chickens: {legs} legs. The difference {diff} : 2 = {b}",
    "adv.magicSquare": "Magic square: every row, column and diagonal adds up to {sum}. Which number is missing?",
    "adv.magicSquareSol": "Row sum {sum} → {v}",
    "adv.towers": "{kid} stacks {n} cubes into towers of {per}. How many full towers are built? (write the number of towers)",
    "adv.towersSol": "{n} : {per} = {q} r {r}"
  }
});
