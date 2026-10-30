/* ==========================================================================
   zada4ko.com — German (Deutsch)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   Children and parents are addressed with "du" throughout.
   ========================================================================== */
"use strict";

/* ---- Formatting, kids' names, nouns ------------------------------------ */
/* Noun layout: [singular, plural, gender] — gender is "m", "f" or "n" and is
   read as noun.f[2] where an article is needed (accusative "einen/eine/ein"). */
Z.i18n.add("de", {
  fmt: {
    dec: ",",
    and: " und ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Lukas", "Mia", "Leon", "Emma", "Paul", "Hannah", "Finn", "Sophie", "Ben", "Lina",
         "Jonas", "Emilia", "Felix", "Lea", "Noah", "Clara", "Elias", "Marie", "Max", "Ida"],
  nouns: {
    apple: ["Apfel", "Äpfel", "m"], banana: ["Banane", "Bananen", "f"], pencil: ["Bleistift", "Bleistifte", "m"],
    balloon: ["Luftballon", "Luftballons", "m"], book: ["Buch", "Bücher", "n"], sweet: ["Bonbon", "Bonbons", "n"],
    ball: ["Ball", "Bälle", "m"], flower: ["Blume", "Blumen", "f"], sticker: ["Sticker", "Sticker", "m"],
    nut: ["Nuss", "Nüsse", "f"], strawberry: ["Erdbeere", "Erdbeeren", "f"], cube: ["Würfel", "Würfel", "m"],
    cat: ["Katze", "Katzen", "f"], dog: ["Hund", "Hunde", "m"], bunny: ["Häschen", "Häschen", "n"], chick: ["Küken", "Küken", "n"],
    fish: ["Fisch", "Fische", "m"], butterfly: ["Schmetterling", "Schmetterlinge", "m"], ant: ["Ameise", "Ameisen", "f"], bee: ["Biene", "Bienen", "f"],
    notebook: ["Heft", "Hefte", "n"], backpack: ["Rucksack", "Rucksäcke", "m"], puzzle: ["Puzzle", "Puzzles", "n"],
    umbrella: ["Regenschirm", "Regenschirme", "m"], cap: ["Kappe", "Kappen", "f"], toy: ["Kuscheltier", "Kuscheltiere", "n"], mug: ["Tasse", "Tassen", "f"],
    icecream: ["Eistüte", "Eistüten", "f"], ticket: ["Ticket", "Tickets", "n"], plantpot: ["Blumentopf", "Blumentöpfe", "m"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("de", {
  ui: {
    docTitle: "zada4ko — Matheaufgaben für Kinder",
    language: "Sprache",
    gshort0: "Vor", gshort1: "1.", gshort2: "2.", gshort3: "3.", gshort4: "4.", gshort5: "5.", gshort6: "6.", gshort7: "7.",
    answerLabel: "Antwort:",
    variantLetters: "ABCD",
    brandSub: "Mathe für Kinder",
    navHome: "Start", navStudio: "Aufgaben erstellen", navTeachers: "Für Lehrkräfte",
    navProgress: "Mein Fortschritt", navAbout: "So funktioniert's", menu: "Menü",
    heroBadge: "Bei jedem Klick neue Aufgaben",
    heroTitle: "Unendlich viele Matheaufgaben für",
    heroTitleHl: "neugierige Kinder",
    heroLead:
      "Wähle die Klasse und die Themen und du bekommst sofort ein fertiges Arbeitsblatt. Löse es online mit direkter Kontrolle oder drucke es aus – für eine Probe, die Hausaufgaben oder zum Üben.",
    heroCta1: "Aufgaben erstellen",
    heroCta2: "Schnellstart: 1. Klasse",
    stat1: "Aufgabentypen", stat2: "Klassenstufen", stat3: "Kombinationen",
    gradesTitle: "In welche Klasse geht dein Kind?",
    topicsTitle: "Aufgaben nach Klasse und Thema",
    gradesLead: "Jede Klasse schaltet die passenden Lehrplanthemen frei – vom Äpfelzählen bis zum Satz des Pythagoras.",
    grade0: "Vorschule",
    grade1: "1. Klasse", grade2: "2. Klasse", grade3: "3. Klasse", grade4: "4. Klasse",
    grade5: "5. Klasse", grade6: "6. Klasse", grade7: "7. Klasse",
    ageLabel: "Jahre",
    featTitle: "Das kann zada4ko",
    f1t: "Online lösen", f1d: "Antwort eintippen und sofort sehen, ob sie stimmt. Mit Punkten, Sternen und Konfetti.",
    f2t: "Auf Papier drucken", f2d: "Ein sauberes A4-Blatt für Hausaufgaben oder eine Probe – mit Platz für Name, Datum und Note.",
    f3t: "Lösungsblatt", f3d: "Eine eigene Seite nur für Lehrkräfte, mit der richtigen Lösung zu jeder Aufgabe.",
    f4t: "Gruppen A / B / C", f4d: "Ein Klick erstellt verschiedene Versionen derselben Probe.",
    f5t: "Link zum Teilen", f5d: "Jedes Blatt hat einen Code. Teile den Link und alle bekommen dieselben Aufgaben.",
    f6t: "Sachaufgaben", f6d: "Echte Alltagssituationen mit Namen, Geld, Uhrzeiten und Entfernungen.",
    studioTitle: "Aufgaben-Werkstatt",
    studioLead: "Links das Blatt einstellen, rechts zusehen, wie es entsteht.",
    stepGrade: "Klasse", stepTopics: "Themen", stepSettings: "Einstellungen",
    panelSetup: "Blatt einstellen",
    pickTopics: "Themen wählen",
    noTopics: "Wähle links mindestens ein Thema, um Aufgaben zu sehen.",
    countLabel: "Aufgaben", totalTasks: "Aufgaben insgesamt",
    titleLabel: "Titel des Blatts", titlePlaceholder: "Mathe-Probe",
    difficulty: "Schwierigkeit", diffEasy: "Leicht", diffNormal: "Mittel", diffHard: "Schwer",
    maxNum: "Zahlen bis", maxAuto: "Nach Klasse",
    colsAuto: "Automatisch",
    cols1: "1 Spalte", cols2: "2 Spalten", cols3: "3 Spalten", cols4: "4 Spalten",
    columns: "Spalten beim Druck", auto: "Auto",
    showKey: "Lösungen", keyNone: "Keine Lösungen", keySame: "Auf demselben Blatt", keyPage: "Eigene Seite",
    workspace: "Platz zum Rechnen",
    spaceNone: "Keiner (kompakt)",
    spaceNormal: "Normal",
    spaceMore: "Mehr",
    pagesWord: "A4-Seiten",
    pagesEst: "Geschätzte Anzahl gedruckter Seiten",
    variants: "Gruppen", variantsHint: "Gleiche Themen, andere Zahlen – Abschreiben zwecklos.",
    points: "Punkte pro Aufgabe",
    seedLabel: "Blatt-Code", reshuffle: "Neue Zahlen",
    modeSolve: "Online lösen", modePrint: "Blatt zum Drucken",
    btnPrint: "Drucken", btnPdf: "Als PDF speichern", btnShare: "Link kopieren",
    btnCheckAll: "Alles prüfen", btnNew: "Neue Aufgaben", btnHint: "Tipp",
    linkCopied: "Link kopiert!",
    solveScore: "Punkte", solveTime: "Zeit", solveStreak: "Serie",
    answerPh: "Antwort", check: "Prüfen",
    correct: "Richtig! Super gemacht.", wrong: "Hoppla, nicht ganz.",
    correctIs: "Die richtige Antwort ist", solutionIs: "Lösung",
    resultTitle: "Geschafft!", resultSub: "So hast du abgeschnitten",
    ofTasks: "von", tryAgain: "Nochmal versuchen", newTasks: "Neue Aufgaben", printThese: "Diese drucken",
    perfect: "Perfekt! Alles richtig!", great: "Ausgezeichnete Arbeit!",
    good: "Gut gemacht! Noch ein bisschen üben.", keepGoing: "Nicht aufgeben – versuch es nochmal!",
    teachTitle: "Gemacht für Lehrkräfte und Eltern",
    teachLead: "Eine ganze Klassenarbeit in 30 Sekunden – mit Gruppen und Lösungsblatt.",
    t1: "Themen auf einem Blatt mischen – genau so viele, wie du brauchst",
    t2: "Gruppen A, B, C mit gleicher Schwierigkeit",
    t3: "Punkte pro Aufgabe und ein Feld für die Note",
    t4: "Druckt sauber in Schwarz-Weiß, ohne Tinte zu verschwenden",
    t5: "Mit dem Blatt-Code bekommst du jederzeit dieselben Aufgaben zurück",
    t6: "Funktioniert nach dem ersten Laden auch offline",
    teachCta: "Probe erstellen",
    progTitle: "Mein Fortschritt", progLead: "Alles bleibt in diesem Browser – keine Anmeldung nötig.",
    progSolved: "Gelöste Aufgaben", progCorrect: "Richtige Antworten", progAccuracy: "Trefferquote",
    progSheets: "Erstellte Blätter", progBadges: "Abzeichen",
    byTopic: "Nach Thema",
    progReset: "Fortschritt zurücksetzen", progResetAsk: "Bist du sicher? Der ganze Fortschritt wird gelöscht.",
    progEmpty: "Noch keine Aufgaben gelöst. Fang gleich an!",
    aboutTitle: "So funktioniert's",
    a1t: "1. Klasse wählen", a1d: "Die Themen passen sich dem Lehrplan für dieses Alter an.",
    a2t: "2. Themen wählen", a2d: "Mische Plus, Brüche, Sachaufgaben und Geometrie, wie du möchtest.",
    a3t: "3. Lösen oder drucken", a3d: "Online mit Kontrolle oder auf Papier mit Lösungsblatt.",
    footTagline: "Ein kostenloser Generator für Mathe-Arbeitsblätter – von der Vorschule bis zur 7. Klasse.",
    footLinks: "Schnellzugriff", footGrades: "Nach Klasse",
    madeBy: "Gemacht von", idea: "Inspiriert von Mitko",
    answersKey: "Lösungen",
    sheetFoot: "zada4ko.com · Mathe-Arbeitsblätter für Kinder",
    sheetName: "Name", sheetClass: "Klasse", sheetDate: "Datum", sheetScore: "Note",
    pts: "P.", variant: "Gruppe", taskWord: "Aufgaben", close: "Schließen",
    instrSolve: "Rechne.", of: "von"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("de", {
  badges: {
    first: "Erster Schritt",
    ten: "10 richtig",
    fifty: "50 richtig",
    hundred: "100 richtig",
    fivehund: "500 richtig",
    streak5: "5 in Folge",
    streak15: "15 in Folge",
    perfect: "Perfektes Blatt",
    perfect5: "5 perfekte Blätter",
    explorer: "Entdecker",
    master: "Alle Themen",
    printer: "Druckprofi"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("de", {
  gen: {
    counting:  { name: "Zählen", desc: "Zähle die Dinge und schreibe die Zahl auf", instr: "Zähle und schreibe auf, wie viele es sind." },
    addsub:    { name: "Plus und Minus", desc: "Die Grundrechenarten im Zahlenraum der Klasse" },
    columnar:  { name: "Schriftliches Rechnen", desc: "Untereinander geschrieben – ideal auf Papier", instr: "Rechne schriftlich." },
    times:     { name: "Einmaleins", desc: "Mal- und Geteiltaufgaben bis 100" },
    bigmuldiv: { name: "Mehrstelliges Mal und Geteilt", desc: "Über das Einmaleins hinaus, Teilen mit Rest" },
    order:     { name: "Rechenreihenfolge", desc: "Aufgaben mit Klammern – was kommt zuerst?", instr: "Rechne. Achte auf die Reihenfolge: Klammern zuerst, Punkt vor Strich." },
    missing:   { name: "Fehlende Zahl finden", desc: "□ + 7 = 15 – welche Zahl versteckt sich?", instr: "Finde die fehlende Zahl." },
    compare:   { name: "Vergleichen", desc: "Setze &lt;, &gt; oder = ein", instr: "Setze &lt;, &gt; oder = ein." },
    sequence:  { name: "Zahlenfolgen", desc: "Erkenne die Regel und setze die Folge fort", instr: "Finde die Regel und schreibe die fehlende Zahl auf." },
    rounding:  { name: "Runden", desc: "Auf Zehner, Hunderter, Tausender", instr: "Runde die Zahl." },
    place:     { name: "Stellenwerte", desc: "Einer, Zehner, Hunderter, Tausender", instr: "Beantworte die Frage zur Zahl." }
  },
  msg: {
    "arith.countSol": "Zähle eins nach dem anderen: {n}.",

    // division with a remainder: German schools write "17 R 3"
    "arith.remAnswer": "{q} R {r}",
    "arith.remHint": "schreibe so: „Ergebnis R Rest“",
    "arith.remSol": "{dividend} : {d} = {q} (Rest {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "jede Zahl ist um {step} größer als die vorige",
    "arith.seqRuleSub": "jede Zahl ist um {step} kleiner als die vorige",
    "arith.seqRuleMul": "jede Zahl ist {step}-mal so groß wie die vorige",
    "arith.seqRuleSquare": "die Quadratzahlen",
    "arith.seqRuleFib": "jede Zahl ist die Summe der beiden vorigen",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Runde {n} auf {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "Zehner", 100: "Hunderter", 1000: "Tausender", 10000: "Zehntausender" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Welche Ziffer steht in {n} an der {place}stelle?",
    "arith.placeName": function (v) {
      return ["Einer", "Zehner", "Hunderter", "Tausender", "Zehntausender", "Hunderttausender"][v.pos];
    },
    "arith.placeSumQ": "Zerlege in eine Summe aus Stellenwerten: {n}",
    "arith.placeFitQ": "Wie oft passt {m} in {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("de", {
  gen: {
    word: {
      name: "Sachaufgaben",
      desc: "Alltagssituationen zum Nachdenken",
      instr: "Lies genau und löse die Aufgabe."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " hat " + Z.qty(v.a, v.th) + " und " + v.k1 + " hat " + Z.qty(v.b, v.th) +
        ". Wie viele " + v.th.pl + " haben die beiden zusammen?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " hat " + Z.qty(v.a, v.th) + " und verschenkt " + v.b + " davon. Wie viele " + v.th.pl + " bleiben übrig?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " hat " + Z.qty(v.a, v.th) + ". " + v.k1 + " hat " + v.d + " mehr. Wie viele haben die beiden zusammen?";
    },
    "word.animalLegs": function (v, Z) {
      return "Im Garten " + (v.n === 1 ? "ist " : "sind ") + Z.qty(v.n, v.th) + ". " +
        (v.n === 1 ? "Das Tier hat " : "Jedes Tier hat ") + v.legs + " Beine. Wie viele Beine sind das zusammen?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " kauft " + v.n + " " + v.th.pl + " für je " + v.price + ". Wie viel muss " + v.k + " bezahlen?";
    },
    "word.change": function (v) {
      var art = { m: "einen", f: "eine", n: "ein" }[v.th.f[2]] || "ein";
      return v.k + " kauft " + art + " " + v.th.sg + " für " + v.price + " und bezahlt mit " + v.paid +
        ". Wie viel Wechselgeld bekommt " + v.k + " zurück?";
    },
    "word.saveUp": "{k} spart jede Woche {week}. Nach {weeks} Wochen möchte {k} ein Skateboard für {target} kaufen. Wie viel Geld fehlt noch?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v) {
      return "In jeder Kiste sind " + v.per + " " + v.th.pl + ". Es gibt " + v.n + " Kisten. Wie viele " + v.th.pl + " sind das insgesamt?";
    },
    "word.shareEqually": function (v) {
      return v.total + " " + v.th.pl + " werden gerecht unter " + v.kids + " Kindern aufgeteilt. Wie viele bekommt jedes Kind?";
    },
    "word.boxesRest": function (v) {
      return "Wir haben " + v.total + " " + v.th.pl + ". In eine Kiste passen " + v.per + ". Wie viele volle Kisten gibt es und wie viele " +
        v.th.pl + " bleiben übrig? (schreibe so: „Kisten R Rest“)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} R {rest}",
    "word.solRemainder": "Rest {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} liest {days} Tage lang jeden Tag {pages} Seiten. Das Buch hat {total} Seiten. Wie viele Seiten muss {k} noch lesen?",
    "word.average": "In drei Körben liegen {a}, {b} und {c} Früchte. Wie viele Früchte liegen durchschnittlich in einem Korb?",
    "word.sumDiff": "{k0} und {k1} haben zusammen {total} Sticker. {k0} hat {d} mehr als {k1}. Wie viele hat jedes Kind? (schreibe die Zahl von {k0})",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "Der Film beginnt um {start} Uhr und dauert {dur} Minuten. Um wie viel Uhr ist er zu Ende? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": "Ein Auto fährt {hours} Stunden lang mit {speed} km/h. Wie weit fährt es?",
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Ein Zug fährt {dist} km mit einer Durchschnittsgeschwindigkeit von {speed} km/h. Wie viele Stunden ist er unterwegs?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Ein Laden hat " + v.whole + " " + v.th.pl + ". " + v.frac + " davon wurden verkauft. Wie viele wurden verkauft?";
    },
    "word.fractionWhole": "{frac} einer Zahl sind {part}. Wie heißt die Zahl?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Wie viel sind {p} % von {base}?",
    "word.saleJacket": "Eine Jacke kostet {price}. Im Schlussverkauf wird sie um {p} % billiger. Wie viel kostet sie jetzt?",
    "word.pctStudents": "Von {whole} Kindern einer Schule treiben {part} Sport. Wie viel Prozent sind das?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} Arbeiter erledigen einen Auftrag in {days} Tagen. Wie viele Tage brauchen {more} Arbeiter, wenn alle gleich schnell arbeiten?",
    "word.unitDays": "Tage",
    "word.motherAge": "Eine Mutter ist heute {mult}-mal so alt wie ihr Sohn. Der Sohn ist {child} Jahre alt. Wie alt ist die Mutter in {years} Jahren?",
    "word.consecutive": "Die Summe von drei aufeinanderfolgenden natürlichen Zahlen ist {sum}. Wie heißt die kleinste dieser Zahlen?",
    "word.pencilPacks": "In einer Schachtel sind {a} Päckchen mit je {per1} Stiften und {b} Päckchen mit je {per2} Stiften. Wie viele Stifte sind in der Schachtel?",
    "word.treeTaller": "Ein Baum ist {small} m hoch, ein zweiter Baum ist {times}-mal so hoch. Um wie viele Meter ist der zweite Baum höher als der erste?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("de", {
  gen: {
    clock: { name: "Uhrzeit", desc: "Lies die Zeiger ab und schreibe die Uhrzeit auf", instr: "Wie spät ist es? Schreibe als hh:mm." },
    units: { name: "Größen und Einheiten", desc: "Umrechnen: cm, m, km, g, kg, l, Minuten", instr: "Rechne in die angegebene Einheit um." },
    money: { name: "Geld", desc: "Euro und Cent, Wechselgeld, Einkaufen", instr: "Berechne den Betrag." },
    geometry: { name: "Geometrie", desc: "Umfang, Flächeninhalt und Volumen von Figuren", instr: "Sieh dir die Zeichnung an und rechne." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Wie spät ist es in {n} Minuten?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "Die Uhr zeigt {time}",

    // unit abbreviations (shown after numbers) and family names; "d" = Tag
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": "d",
    "measure.family.len": "Länge", "measure.family.mass": "Gewicht",
    "measure.family.vol": "Volumen", "measure.family.time": "Zeit",

    // money — "Cent" does not change in the plural
    "measure.cents": function () { return "Cent"; },
    "measure.centsAmount": function (v) { return v.n + " Cent"; },
    "measure.coins": function (v) { return v.n + " " + (v.n === 1 ? "Münze" : "Münzen") + " zu " + v.c + " Cent"; },
    "measure.moneyBox": "In einer Spardose sind {list}. Wie viele Cent sind das zusammen?",
    "measure.eurToCents": function (v) {
      return v.eur + " Euro und " + v.ct + " Cent = " + v.blank + " Cent";
    },
    "measure.change": "Wir kaufen zwei Sachen für {p1} und {p2} und bezahlen mit einem Schein von {paid}. Wie viel Wechselgeld bekommen wir?",

    // geometry — {grade} is passed so a language can use a simpler word in primary school
    "measure.askPerim": "Berechne den Umfang (P).",
    "measure.askPerimSquare": "Ein Quadrat. Berechne den Umfang (P).",
    "measure.askArea": "Berechne den Flächeninhalt (S).",
    "measure.askAreaSquare": "Ein Quadrat. Berechne den Flächeninhalt (S).",
    "measure.askAreaTri": "Berechne den Flächeninhalt (S) des Dreiecks.",
    "measure.sideFromPerim": "Ein Rechteck hat den Umfang P = {p} {u}. Eine Seite ist {a} {u} lang. Wie lang ist die andere Seite?",
    "measure.volCube": "Ein Würfel hat die Kantenlänge {a} {u}. Berechne das Volumen (V).",
    "measure.volCuboid": "Ein Quader misst {dims} {u}. Berechne das Volumen (V).",
    "measure.askCircumference": "Berechne den Umfang (C) des Kreises. Rechne mit π ≈ {pi}.",
    "measure.askAreaCircle": "Berechne den Flächeninhalt (S) des Kreises. Rechne mit π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("de", {
  gen: {
    fractions:  { name: "Brüche", desc: "Vergleichen, kürzen, addieren und subtrahieren", instr: "Rechne. Schreibe einen Bruch so: 3/4." },
    decimals:   { name: "Dezimalzahlen", desc: "Rechnen mit Kommazahlen", instr: "Rechne." },
    percent:    { name: "Prozentrechnung", desc: "Prozent von, Rabatt, Aufschlag", instr: "Rechne." },
    divis:      { name: "Teilbarkeit und Teiler", desc: "Teilbarkeitsregeln, Primzahlen, ggT und kgV", instr: "Beantworte die Frage." },
    powers:     { name: "Potenzen und Wurzeln", desc: "Quadratzahlen, Kubikzahlen und Quadratwurzeln", instr: "Rechne." },
    negatives:  { name: "Negative Zahlen", desc: "Rechnen mit ganzen Zahlen", instr: "Rechne." },
    equations:  { name: "Gleichungen", desc: "Löse nach x auf – von einfach bis x auf beiden Seiten", instr: "Löse die Gleichung. Bestimme x." },
    algebra:    { name: "Terme und binomische Formeln", desc: "Klammern auflösen, binomische Formeln", instr: "Berechne den Wert für die angegebenen Zahlen." },
    pythagoras: { name: "Satz des Pythagoras", desc: "Rechtwinkliges Dreieck – finde die fehlende Seite", instr: "Berechne die fehlende Seite." },
    roman:      { name: "Römische Zahlen", desc: "Von I bis MMXXV und zurück", instr: "Schreibe mit arabischen oder römischen Ziffern." },
    logic:      { name: "Knobelaufgaben", desc: "Rätsel, versteckte Zahlen, Logik", instr: "Denk gut nach und finde die Antwort." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Kürze: {f}",
    "adv.commonDenSol": "Gemeinsamer Nenner {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Schreibe als unechten Bruch: {f}",
    "adv.toMixed": "Schreibe als gemischte Zahl: {f}",
    /* an extra accepted spelling of a mixed number, e.g. "2und1/3" */
    "adv.mixedAltAnd": "{w}und{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w} Ganze, Rest {r} → {w} {r}/{d}",
    "adv.fractionOf": "Wie viel sind {f} von {n}?",
    /* percent */
    "adv.percentOf": "{p} % von {n}",
    "adv.decreaseBy": "Verringere {n} um {p} %",
    "adv.increaseBy": "Erhöhe {n} um {p} %",
    "adv.whatPercent": "Wie viel Prozent von {n} sind {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "ja",
    "adv.no": "nein",
    "adv.isDivisible": "Ist {n} durch {d} teilbar?",
    "adv.divRemainderSol": "{n} : {d} → Rest {r}",
    "adv.isPrime": "Ist {n} eine Primzahl?",
    "adv.primeSol": "{n} ist nur durch 1 und durch sich selbst teilbar.",
    "adv.compositeSol": "{n} ist auch durch {d} teilbar.",
    "adv.gcdOf": "ggT({a}, {b})",
    "adv.gcdSol": "Der größte gemeinsame Teiler ist {v}",
    "adv.lcmOf": "kgV({a}, {b})",
    "adv.lcmSol": "Das kleinste gemeinsame Vielfache ist {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Berechne {expr} für x = {x}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "Ich habe mir eine Zahl gedacht, sie mit {m} multipliziert und dann {add} addiert. Heraus kam {res}. Welche Zahl habe ich mir gedacht?",
    "adv.chickensRabbits": "Auf einem Hof leben Hühner und Kaninchen – zusammen {heads} Köpfe und {legs} Beine. Wie viele Kaninchen sind es?",
    "adv.chickensRabbitsSol": "Wären alle Hühner: {legs} Beine. Der Unterschied {diff} : 2 = {b}",
    "adv.magicSquare": "Magisches Quadrat: Jede Zeile, jede Spalte und jede Diagonale ergibt zusammen {sum}. Welche Zahl fehlt?",
    "adv.magicSquareSol": "Summe {sum} → {v}",
    "adv.towers": "{kid} baut aus {n} Würfeln Türme mit je {per} Würfeln. Wie viele ganze Türme entstehen? (schreibe die Anzahl der Türme)",
    "adv.towersSol": "{n} : {per} = {q} R {r}"
  }
});
