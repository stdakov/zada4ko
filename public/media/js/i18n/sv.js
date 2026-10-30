/* ==========================================================================
   zada4ko.com — Swedish (svenska)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.

   Nouns are [singular, plural, article] — the article is "en" or "ett"
   (read it as noun.f[2]), used where a sentence needs "en mössa" / "ett paraply".
   ========================================================================== */
"use strict";

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("sv", {
  fmt: {
    dec: ",",
    and: " och ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Alice", "Hugo", "Maja", "Liam", "Elsa", "William", "Ella", "Noah", "Wilma", "Oscar",
         "Saga", "Lucas", "Astrid", "Elias", "Alma", "Nils", "Ebba", "Axel", "Olivia", "Leo"],
  nouns: {
    apple: ["äpple", "äpplen", "ett"], banana: ["banan", "bananer", "en"], pencil: ["penna", "pennor", "en"],
    balloon: ["ballong", "ballonger", "en"], book: ["bok", "böcker", "en"], sweet: ["karamell", "karameller", "en"],
    ball: ["boll", "bollar", "en"], flower: ["blomma", "blommor", "en"], sticker: ["klistermärke", "klistermärken", "ett"],
    nut: ["nöt", "nötter", "en"], strawberry: ["jordgubbe", "jordgubbar", "en"], cube: ["kloss", "klossar", "en"],
    cat: ["katt", "katter", "en"], dog: ["hund", "hundar", "en"], bunny: ["kanin", "kaniner", "en"], chick: ["kyckling", "kycklingar", "en"],
    fish: ["fisk", "fiskar", "en"], butterfly: ["fjäril", "fjärilar", "en"], ant: ["myra", "myror", "en"], bee: ["bi", "bin", "ett"],
    notebook: ["skrivbok", "skrivböcker", "en"], backpack: ["ryggsäck", "ryggsäckar", "en"], puzzle: ["pussel", "pussel", "ett"],
    umbrella: ["paraply", "paraplyer", "ett"], cap: ["keps", "kepsar", "en"], toy: ["leksak", "leksaker", "en"], mug: ["mugg", "muggar", "en"],
    icecream: ["glass", "glassar", "en"], ticket: ["biljett", "biljetter", "en"], plantpot: ["blomkruka", "blomkrukor", "en"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("sv", {
  ui: {
    docTitle: "zada4ko — matteuppgifter för barn",
    language: "Språk",
    gshort0: "F", gshort1: "Åk1", gshort2: "Åk2", gshort3: "Åk3", gshort4: "Åk4", gshort5: "Åk5", gshort6: "Åk6", gshort7: "Åk7",
    answerLabel: "Svar:",
    variantLetters: "ABCD",
    brandSub: "matte för barn",
    navHome: "Start", navStudio: "Skapa uppgifter", navTeachers: "För lärare",
    navProgress: "Mina framsteg", navAbout: "Så funkar det", menu: "Meny",
    heroBadge: "Nya uppgifter vid varje klick",
    heroTitle: "Oändligt med matteträning för",
    heroTitleHl: "nyfikna barn",
    heroLead:
      "Välj årskurs och områden och få ett färdigt arbetsblad. Lös uppgifterna online och se direkt om svaret är rätt, eller skriv ut dem till ett prov, en läxa eller extra träning.",
    heroCta1: "Skapa uppgifter",
    heroCta2: "Snabbstart: årskurs 1",
    stat1: "typer av uppgifter", stat2: "årskurser", stat3: "kombinationer",
    gradesTitle: "Vilken årskurs går barnet i?",
    topicsTitle: "Uppgifter efter årskurs och område",
    gradesLead: "Varje årskurs öppnar områden ur läroplanen — från att räkna äpplen till Pythagoras sats.",
    grade0: "Förskola",
    grade1: "Årskurs 1", grade2: "Årskurs 2", grade3: "Årskurs 3", grade4: "Årskurs 4",
    grade5: "Årskurs 5", grade6: "Årskurs 6", grade7: "Årskurs 7",
    ageLabel: "år",
    featTitle: "Det här kan zada4ko",
    f1t: "Lös online", f1d: "Skriv svaret och se direkt om det är rätt. Med poäng, stjärnor och konfetti.",
    f2t: "Skriv ut på papper", f2d: "Ett snyggt A4-blad för läxa eller prov — med plats för namn, datum och betyg.",
    f3t: "Facit", f3d: "En egen sida bara för läraren, med rätt svar på varje uppgift.",
    f4t: "Varianter A / B / C", f4d: "Ett klick skapar olika versioner av samma prov.",
    f5t: "Länk att dela", f5d: "Varje blad har en kod. Dela länken så får alla samma uppgifter.",
    f6t: "Textuppgifter", f6d: "Vardagssituationer med namn, pengar, tid och avstånd.",
    studioTitle: "Uppgiftsverkstad",
    studioLead: "Ställ in bladet till vänster och se det växa fram till höger.",
    stepGrade: "Årskurs", stepTopics: "Områden", stepSettings: "Inställningar",
    panelSetup: "Inställningar för bladet",
    pickTopics: "Välj områden",
    noTopics: "Välj minst ett område till vänster för att se uppgifter.",
    countLabel: "Uppgifter", totalTasks: "Antal uppgifter",
    titleLabel: "Bladets rubrik", titlePlaceholder: "Matteprov",
    difficulty: "Svårighetsgrad", diffEasy: "Lätt", diffNormal: "Normal", diffHard: "Svår",
    maxNum: "Tal upp till", maxAuto: "Efter årskurs",
    colsAuto: "Automatiskt",
    cols1: "1 kolumn", cols2: "2 kolumner", cols3: "3 kolumner", cols4: "4 kolumner",
    columns: "Kolumner vid utskrift", auto: "Auto",
    showKey: "Facit", keyNone: "Inget facit", keySame: "Samma blad", keyPage: "Egen sida",
    workspace: "Plats för uträkning",
    spaceNone: "Ingen (kompakt)",
    spaceNormal: "Normal",
    spaceMore: "Mer",
    pagesWord: "A4-sidor",
    pagesEst: "Ungefärligt antal utskrivna sidor",
    variants: "Varianter", variantsHint: "Samma områden, andra tal — inget fusk.",
    points: "Poäng per uppgift",
    seedLabel: "Bladets kod", reshuffle: "Nya tal",
    modeSolve: "Lös online", modePrint: "Utskriftsblad",
    btnPrint: "Skriv ut", btnPdf: "Spara som PDF", btnShare: "Kopiera länk",
    btnCheckAll: "Rätta allt", btnNew: "Nya uppgifter", btnHint: "Ledtråd",
    linkCopied: "Länken är kopierad!",
    solveScore: "Poäng", solveTime: "Tid", solveStreak: "I rad",
    answerPh: "Svar", check: "Rätta",
    correct: "Rätt! Bra jobbat.", wrong: "Hoppsan, inte riktigt.",
    correctIs: "Rätt svar är", solutionIs: "Lösning",
    resultTitle: "Klart!", resultSub: "Så här gick det",
    ofTasks: "av", tryAgain: "Försök igen", newTasks: "Nya uppgifter", printThese: "Skriv ut dessa",
    perfect: "Perfekt! Allt rätt!", great: "Jättebra jobbat!",
    good: "Bra! Lite mer träning bara.", keepGoing: "Ge inte upp — försök igen!",
    teachTitle: "Gjort för lärare och föräldrar",
    teachLead: "Ett helt klassprov på 30 sekunder — med varianter och facit.",
    t1: "Blanda områden på ett blad — precis så många uppgifter du behöver",
    t2: "Varianter A, B, C med samma svårighetsgrad",
    t3: "Poäng per uppgift och en ruta för betyg",
    t4: "Snygg utskrift i svartvitt, inget slöseri med bläck",
    t5: "Bladets kod tar fram samma uppgifter när som helst",
    t6: "Fungerar offline efter första besöket",
    teachCta: "Skapa ett prov",
    progTitle: "Mina framsteg", progLead: "Allt sparas i den här webbläsaren — inget konto behövs.",
    progSolved: "Lösta uppgifter", progCorrect: "Rätta svar", progAccuracy: "Träffsäkerhet",
    progSheets: "Skapade blad", progBadges: "Märken",
    byTopic: "Per område",
    progReset: "Nollställ framsteg", progResetAsk: "Är du säker? Alla framsteg raderas.",
    progEmpty: "Inga lösta uppgifter än. Sätt igång!",
    aboutTitle: "Så funkar det",
    a1t: "1. Välj årskurs", a1d: "Områdena anpassas efter läroplanen för den åldern.",
    a2t: "2. Välj områden", a2d: "Blanda addition, bråk, textuppgifter och geometri som du vill.",
    a3t: "3. Lös eller skriv ut", a3d: "Online med rättning, eller på papper med facit för läraren.",
    footTagline: "En gratis generator av mattearbetsblad för barn från förskola till årskurs 7.",
    footLinks: "Snabblänkar", footGrades: "Efter årskurs",
    madeBy: "Skapad av", idea: "Inspirerad av Mitko",
    answersKey: "Facit",
    sheetFoot: "zada4ko.com · mattearbetsblad för barn",
    sheetName: "Namn", sheetClass: "Klass", sheetDate: "Datum", sheetScore: "Betyg",
    pts: "p", variant: "Variant", taskWord: "uppgifter", close: "Stäng",
    instrSolve: "Räkna ut.", of: "av"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("sv", {
  badges: {
    first: "Första steget",
    ten: "10 rätt",
    fifty: "50 rätt",
    hundred: "100 rätt",
    fivehund: "500 rätt",
    streak5: "5 i rad",
    streak15: "15 i rad",
    perfect: "Perfekt blad",
    perfect5: "5 perfekta blad",
    explorer: "Upptäckare",
    master: "Alla områden",
    printer: "Utskrivare"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("sv", {
  gen: {
    counting:  { name: "Räkna", desc: "Räkna sakerna och skriv antalet", instr: "Räkna och skriv hur många." },
    addsub:    { name: "Addition och subtraktion", desc: "Grundläggande räknesätt inom årskursens talområde" },
    columnar:  { name: "Uppställning", desc: "Talen skrivs under varandra — perfekt på papper", instr: "Räkna med uppställning." },
    times:     { name: "Multiplikationstabellen", desc: "Multiplikation och division upp till 100" },
    bigmuldiv: { name: "Flersiffrig × och ÷", desc: "Bortom tabellerna, division med rest" },
    order:     { name: "Prioriteringsregler", desc: "Uttryck med parenteser — vad räknas först", instr: "Räkna ut. Tänk på i vilken ordning du räknar." },
    missing:   { name: "Hitta det saknade talet", desc: "□ + 7 = 15 — vilket tal gömmer sig", instr: "Hitta det saknade talet." },
    compare:   { name: "Jämföra tal", desc: "Sätt ut &lt;, &gt; eller =", instr: "Skriv &lt;, &gt; eller = ." },
    sequence:  { name: "Talföljder", desc: "Hitta regeln och fortsätt", instr: "Hitta regeln och skriv det saknade talet." },
    rounding:  { name: "Avrundning", desc: "Till tiotal, hundratal, tusental", instr: "Avrunda talet." },
    place:     { name: "Positionssystemet", desc: "Ental, tiotal, hundratal, tusental", instr: "Svara på frågan om talet." }
  },
  msg: {
    "arith.countSol": "Räkna en i taget: {n}.",

    // division with a remainder: Swedish schools write "17 : 5 = 3 rest 2"
    "arith.remAnswer": "{q} rest {r}",
    "arith.remHint": "skriv som ”kvoten rest resten”",
    "arith.remSol": "{dividend} : {d} = {q} (rest {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "varje tal är {step} mer än det förra",
    "arith.seqRuleSub": "varje tal är {step} mindre än det förra",
    "arith.seqRuleMul": "varje tal är {step} gånger så stort som det förra",
    "arith.seqRuleSquare": "talen i kvadrat",
    "arith.seqRuleFib": "varje tal är summan av de två före",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Avrunda {n} till närmaste {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "tiotal", 100: "hundratal", 1000: "tusental", 10000: "tiotusental" }[v.to];
    },

    // place value: {place} is the first half of "entalssiffran", "tiotalssiffran" …
    "arith.placeDigitQ": "Vilken siffra är {place}siffran i talet {n}?",
    "arith.placeName": function (v) {
      return ["entals", "tiotals", "hundratals", "tusentals", "tiotusentals", "hundratusentals"][v.pos];
    },
    "arith.placeSumQ": "Skriv talet i utvecklad form: {n}",
    "arith.placeFitQ": "Hur många gånger får {m} plats i {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("sv", {
  gen: {
    word: {
      name: "Textuppgifter",
      desc: "Vardagssituationer där du får tänka till",
      instr: "Läs noga och lös uppgiften."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " har " + Z.qty(v.a, v.th) + " och " + v.k1 + " har " + Z.qty(v.b, v.th) +
        ". Hur många " + v.th.pl + " har de tillsammans?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " har " + Z.qty(v.a, v.th) + " och ger " + v.b + " till en kompis. Hur många " + v.th.pl + " har " + v.k + " kvar?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " har " + Z.qty(v.a, v.th) + ". " + v.k1 + " har " + v.d + " fler. Hur många har de tillsammans?";
    },
    "word.animalLegs": function (v, Z) {
      return "På gården finns " + Z.qty(v.n, v.th) + ". Varje djur har " + v.legs + " ben. Hur många ben är det sammanlagt?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " köper " + v.n + " " + v.th.pl + " för " + v.price + " styck. Hur mycket betalar " + v.k + "?";
    },
    "word.change": function (v) {
      return v.k + " köper " + v.th.f[2] + " " + v.th.sg + " som kostar " + v.price + " och betalar med " + v.paid +
        ". Hur mycket pengar får " + v.k + " tillbaka?";
    },
    "word.saveUp": "{k} sparar {week} varje vecka. Efter {weeks} veckor vill {k} köpa en skateboard för {target}. Hur mycket pengar fattas?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v) {
      return "Det finns " + v.n + " lådor med " + v.per + " " + v.th.pl + " i varje. Hur många " + v.th.pl + " är det sammanlagt?";
    },
    "word.shareEqually": function (v) {
      return v.total + " " + v.th.pl + " delas lika mellan " + v.kids + " barn. Hur många får varje barn?";
    },
    "word.boxesRest": function (v) {
      return "Vi har " + v.total + " " + v.th.pl + ". Det får plats " + v.per + " i en låda. Hur många fulla lådor blir det och hur många " +
        v.th.pl + " blir över? (skriv som ”lådor rest över”)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} rest {rest}",
    "word.solRemainder": "rest {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} läser {pages} sidor om dagen i {days} dagar. Boken har {total} sidor. Hur många sidor är kvar att läsa?",
    "word.average": "Tre korgar innehåller {a}, {b} och {c} frukter. Hur många frukter är det i genomsnitt i varje korg?",
    "word.sumDiff": "{k0} och {k1} har tillsammans {total} klistermärken. {k0} har {d} fler än {k1}. Hur många har var och en? (skriv hur många {k0} har)",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "Filmen börjar klockan {start} och är {dur} minuter lång. När slutar den? (tt:mm)",
    "word.solMin": "min",
    "word.carDistance": "En bil kör i {speed} km/h i {hours} timmar. Hur långt kör bilen?",
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Ett tåg kör {dist} km med medelhastigheten {speed} km/h. Hur många timmar tar resan?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "En affär har " + v.whole + " " + v.th.pl + ". " + v.frac + " av dem har sålts. Hur många har sålts?";
    },
    "word.fractionWhole": "{frac} av ett tal är {part}. Vilket är talet?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Hur mycket är {p} % av {base}?",
    "word.saleJacket": "En jacka kostar {price}. På rean sänks priset med {p} %. Vad kostar jackan nu?",
    "word.pctStudents": "Av {whole} elever är det {part} som idrottar. Hur många procent är det?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} arbetare gör klart ett jobb på {days} dagar. Hur många dagar behöver {more} arbetare om alla jobbar lika snabbt?",
    "word.unitDays": "dagar",
    "word.motherAge": "I dag är mamman {mult} gånger så gammal som sin son, som är {child} år. Hur gammal är mamman om {years} år?",
    "word.consecutive": "Summan av tre heltal som följer direkt efter varandra är {sum}. Vilket är det minsta av dem?",
    "word.pencilPacks": "En låda innehåller {a} paket med {per1} pennor och {b} paket med {per2} pennor. Hur många pennor finns det i lådan?",
    "word.treeTaller": "Ett träd är {small} m högt och ett annat är {times} gånger så högt. Hur många meter högre är det andra trädet än det första?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("sv", {
  gen: {
    clock: { name: "Klockan", desc: "Läs av visarna och skriv tiden", instr: "Vad är klockan? Skriv som tt:mm." },
    units: { name: "Enheter", desc: "Omvandla cm, m, km, g, kg, l, minuter", instr: "Omvandla till de angivna enheterna." },
    money: { name: "Pengar", desc: "Euro och cent, växel, att handla", instr: "Räkna ut beloppet." },
    geometry: { name: "Geometri", desc: "Omkrets, area och volym", instr: "Titta på figuren och räkna ut." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Vad är klockan om {n} minuter?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "Klockan är {time}",

    // unit abbreviations (shown after numbers) and family names; "d" = dygn
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": "d",
    "measure.family.len": "längd", "measure.family.mass": "massa",
    "measure.family.vol": "volym", "measure.family.time": "tid",

    // money — "cent" is the same in singular and plural
    "measure.cents": "cent",
    "measure.centsAmount": "{n} cent",
    "measure.coins": "{n} mynt på {c} cent",
    "measure.moneyBox": "I spargrisen finns {list}. Hur många cent är det sammanlagt?",
    "measure.eurToCents": "{eur} euro och {ct} cent = {blank} cent",
    "measure.change": "Vi köper två saker för {p1} och {p2} och betalar med en sedel på {paid}. Hur mycket pengar får vi tillbaka?",

    // geometry
    "measure.askPerim": "Beräkna omkretsen (P).",
    "measure.askPerimSquare": "En kvadrat. Beräkna omkretsen (P).",
    "measure.askArea": "Beräkna arean (S).",
    "measure.askAreaSquare": "En kvadrat. Beräkna arean (S).",
    "measure.askAreaTri": "Beräkna triangelns area (S).",
    "measure.sideFromPerim": "En rektangel har omkretsen P = {p} {u} och en sida som är {a} {u}. Hur lång är den andra sidan?",
    "measure.volCube": "En kub har kanten {a} {u}. Beräkna volymen (V).",
    "measure.volCuboid": "Ett rätblock har måtten {dims} {u}. Beräkna volymen (V).",
    "measure.askCircumference": "Beräkna cirkelns omkrets (C). Räkna med π ≈ {pi}.",
    "measure.askAreaCircle": "Beräkna cirkelns area (S). Räkna med π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("sv", {
  gen: {
    fractions:  { name: "Bråk", desc: "Jämföra, förkorta, addera och subtrahera", instr: "Räkna ut. Skriv bråk som 3/4." },
    decimals:   { name: "Decimaltal", desc: "Räkna med decimaltal", instr: "Räkna ut." },
    percent:    { name: "Procent", desc: "Procent av, rabatt, ökning", instr: "Räkna ut." },
    divis:      { name: "Delbarhet och delare", desc: "Delbarhetsregler, primtal, SGD och MGM", instr: "Svara på frågan." },
    powers:     { name: "Potenser och rötter", desc: "Kvadrater, kuber och kvadratrötter", instr: "Räkna ut." },
    negatives:  { name: "Negativa tal", desc: "Räkna med heltal", instr: "Räkna ut." },
    equations:  { name: "Ekvationer", desc: "Lös ut x — från enkla till x på båda sidor", instr: "Lös ekvationen. Bestäm x." },
    algebra:    { name: "Uttryck och regler", desc: "Multiplicera in i parenteser, kvadrerings- och konjugatregeln", instr: "Beräkna värdet för de givna talen." },
    pythagoras: { name: "Pythagoras sats", desc: "Rätvinklig triangel — hitta den saknade sidan", instr: "Beräkna den saknade sidan." },
    roman:      { name: "Romerska siffror", desc: "Från I till MMXXV och tillbaka", instr: "Skriv med arabiska eller romerska siffror." },
    logic:      { name: "Kluringar", desc: "Gåtor, gömda tal, logik", instr: "Tänk efter och hitta svaret." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Förkorta: {f}",
    "adv.commonDenSol": "Gemensam nämnare {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Skriv i bråkform: {f}",
    "adv.toMixed": "Skriv i blandad form: {f}",
    /* an extra accepted spelling of a mixed number: "2och1/3" */
    "adv.mixedAltAnd": "{w}och{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w} hela, rest {r} → {w} {r}/{d}",
    "adv.fractionOf": "Hur mycket är {f} av {n}?",
    /* percent */
    "adv.percentOf": "{p} % av {n}",
    "adv.decreaseBy": "Minska {n} med {p} %",
    "adv.increaseBy": "Öka {n} med {p} %",
    "adv.whatPercent": "Hur många procent av {n} är {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "ja",
    "adv.no": "nej",
    "adv.isDivisible": "Är {n} delbart med {d}?",
    "adv.divRemainderSol": "{n} : {d} → rest {r}",
    "adv.isPrime": "Är {n} ett primtal?",
    "adv.primeSol": "{n} är bara delbart med 1 och med sig självt.",
    "adv.compositeSol": "{n} är också delbart med {d}.",
    "adv.gcdOf": "SGD({a}, {b})",
    "adv.gcdSol": "Den största gemensamma delaren är {v}",
    "adv.lcmOf": "MGM({a}, {b})",
    "adv.lcmSol": "Den minsta gemensamma multipeln är {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Beräkna {expr} för x = {x}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "Jag tänker på ett tal. Jag multiplicerar det med {m} och adderar {add}. Då får jag {res}. Vilket tal tänker jag på?",
    "adv.chickensRabbits": "På en gård finns höns och kaniner — sammanlagt {heads} huvuden och {legs} ben. Hur många kaniner finns det?",
    "adv.chickensRabbitsSol": "Om alla vore höns: {legs} ben. Skillnaden {diff} : 2 = {b}",
    "adv.magicSquare": "Magisk kvadrat: summan i varje rad, kolumn och diagonal är {sum}. Vilket tal saknas?",
    "adv.magicSquareSol": "Radsumma {sum} → {v}",
    "adv.towers": "{kid} bygger torn av {n} klossar, med {per} klossar i varje torn. Hur många hela torn blir det? (skriv antalet torn)",
    "adv.towersSol": "{n} : {per} = {q} rest {r}"
  }
});
