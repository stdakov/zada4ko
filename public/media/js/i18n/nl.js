/* ==========================================================================
   zada4ko.com — Dutch (Nederlands)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   Children and parents are addressed with "je/jij" throughout. Grades follow
   the Dutch school system: grade 1 = groep 3 … grade 6 = groep 8, grade 7 =
   brugklas, preschool = kleuters (groep 1–2).
   ========================================================================== */
"use strict";

/* ---- Formatting, kids' names, nouns ------------------------------------ */
/* Noun layout: [singular, plural, article] — article is "de" or "het", kept
   for future templates (noun.f[2]); the current sentences only need "een". */
Z.i18n.add("nl", {
  fmt: {
    dec: ",",
    and: " en ",
    cur: "€",
    money: function (s) { return "€ " + s.replace(".", ","); },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Daan", "Emma", "Sem", "Julia", "Lucas", "Tess", "Levi", "Sophie", "Finn", "Mila",
         "Noah", "Zoë", "Bram", "Lotte", "Liam", "Saar", "Jesse", "Fenna", "Thijs", "Anna"],
  nouns: {
    apple: ["appel", "appels", "de"], banana: ["banaan", "bananen", "de"], pencil: ["potlood", "potloden", "het"],
    balloon: ["ballon", "ballonnen", "de"], book: ["boek", "boeken", "het"], sweet: ["snoepje", "snoepjes", "het"],
    ball: ["bal", "ballen", "de"], flower: ["bloem", "bloemen", "de"], sticker: ["sticker", "stickers", "de"],
    nut: ["noot", "noten", "de"], strawberry: ["aardbei", "aardbeien", "de"], cube: ["blokje", "blokjes", "het"],
    cat: ["poes", "poezen", "de"], dog: ["hond", "honden", "de"], bunny: ["konijntje", "konijntjes", "het"], chick: ["kuiken", "kuikens", "het"],
    fish: ["vis", "vissen", "de"], butterfly: ["vlinder", "vlinders", "de"], ant: ["mier", "mieren", "de"], bee: ["bij", "bijen", "de"],
    notebook: ["schrift", "schriften", "het"], backpack: ["rugzak", "rugzakken", "de"], puzzle: ["puzzel", "puzzels", "de"],
    umbrella: ["paraplu", "paraplu's", "de"], cap: ["pet", "petten", "de"], toy: ["knuffel", "knuffels", "de"], mug: ["mok", "mokken", "de"],
    icecream: ["ijsje", "ijsjes", "het"], ticket: ["kaartje", "kaartjes", "het"], plantpot: ["bloempot", "bloempotten", "de"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("nl", {
  ui: {
    /* teachers: ready-made tests · about: privacy note */
    readyT1: "Groep 3–4",
    readyT2: "Groep 5–6",
    readyT3: "Groep 7–8",
    readyT4: "Brugklas",
    readyD1: "Plussen en minnen tot 100, vergelijken, verhaaltjessommen, klokkijken.",
    readyD2: "Keersommen en deelsommen, volgorde van bewerkingen, maten, oppervlakte en omtrek.",
    readyD3: "Breuken, kommagetallen, procenten, vergelijkingen, inhoud en oppervlakte.",
    readyD4: "Vergelijkingen, formules, machten, stelling van Pythagoras, verhaaltjessommen.",
    btnOpen: "Openen",
    privacyT: "Geen account, geen reclame in de sommen.",
    privacyD: "De voortgang blijft alleen in de browser van dit apparaat en verlaat de computer nooit. Na de eerste keer laden werkt de site ook offline.",
    /* search engines: title and description of /nl/ */
    seoTitle: "Rekensommen voor kinderen, groep 3 tot de brugklas — printen en online | zada4ko",
    seoDesc: "zada4ko is een gratis generator van rekensommen voor kinderen, van de kleuters tot de brugklas: plus- en minsommen, tafels, breuken, verhaaltjessommen, meetkunde. Online oefenen of een werkblad met antwoorden printen.",
    docTitle: "zada4ko — rekensommen voor kinderen",
    language: "Taal",
    gshort0: "Kl.", gshort1: "Gr3", gshort2: "Gr4", gshort3: "Gr5", gshort4: "Gr6", gshort5: "Gr7", gshort6: "Gr8", gshort7: "Brug",
    answerLabel: "Antwoord:",
    variantLetters: "ABCD",
    brandSub: "rekenen voor kinderen",
    navHome: "Home", navStudio: "Sommen maken", navTeachers: "Voor leerkrachten",
    navProgress: "Mijn voortgang", navAbout: "Hoe werkt het?", menu: "Menu",
    heroBadge: "Bij elke klik nieuwe sommen",
    heroTitle: "Eindeloos rekenen oefenen voor",
    heroTitleHl: "nieuwsgierige kinderen",
    heroLead:
      "Kies een groep en de onderwerpen en je krijgt meteen een kant-en-klaar werkblad. Maak het online met directe controle, of print het voor een toets, huiswerk of extra oefening.",
    heroCta1: "Sommen maken",
    heroCta2: "Snel starten: groep 3",
    stat1: "soorten sommen", stat2: "groepen", stat3: "combinaties",
    gradesTitle: "In welke groep zit je kind?",
    topicsTitle: "Sommen per groep en onderwerp",
    gradesLead: "Elke groep opent de onderwerpen uit het lesprogramma – van appels tellen tot de stelling van Pythagoras.",
    grade0: "Kleuters",
    grade1: "Groep 3", grade2: "Groep 4", grade3: "Groep 5", grade4: "Groep 6",
    grade5: "Groep 7", grade6: "Groep 8", grade7: "Brugklas",
    ageLabel: "jaar",
    featTitle: "Wat zada4ko kan",
    f1t: "Online oefenen", f1d: "Typ het antwoord en zie meteen of het klopt. Met punten, sterren en confetti.",
    f2t: "Op papier printen", f2d: "Een net A4-blad voor huiswerk of een toets – met ruimte voor naam, datum en cijfer.",
    f3t: "Antwoordblad", f3d: "Een aparte pagina alleen voor de leerkracht, met het juiste antwoord bij elke som.",
    f4t: "Versies A / B / C", f4d: "Met één klik maak je verschillende versies van dezelfde toets.",
    f5t: "Link om te delen", f5d: "Elk blad heeft een code. Deel de link en iedereen krijgt dezelfde sommen.",
    f6t: "Verhaaltjessommen", f6d: "Echte situaties uit het dagelijks leven met namen, geld, tijd en afstanden.",
    studioTitle: "Sommenwerkplaats",
    studioLead: "Stel links het blad in en kijk rechts hoe het ontstaat.",
    stepGrade: "Groep", stepTopics: "Onderwerpen", stepSettings: "Instellingen",
    panelSetup: "Blad instellen",
    pickTopics: "Kies onderwerpen",
    noTopics: "Kies links minstens één onderwerp om sommen te zien.",
    countLabel: "Sommen", totalTasks: "Totaal aantal sommen",
    titleLabel: "Titel van het blad", titlePlaceholder: "Rekentoets",
    difficulty: "Moeilijkheid", diffEasy: "Makkelijk", diffNormal: "Gemiddeld", diffHard: "Moeilijk",
    maxNum: "Getallen tot", maxAuto: "Per groep",
    colsAuto: "Automatisch",
    cols1: "1 kolom", cols2: "2 kolommen", cols3: "3 kolommen", cols4: "4 kolommen",
    columns: "Kolommen bij printen", auto: "Auto",
    showKey: "Antwoorden", keyNone: "Geen antwoorden", keySame: "Op hetzelfde blad", keyPage: "Aparte pagina",
    workspace: "Ruimte om te rekenen",
    spaceNone: "Geen (compact)",
    spaceNormal: "Normaal",
    spaceMore: "Meer",
    pagesWord: "A4-pagina's",
    pagesEst: "Geschat aantal geprinte pagina's",
    variants: "Versies", variantsHint: "Dezelfde onderwerpen, andere getallen – afkijken heeft geen zin.",
    points: "Punten per som",
    seedLabel: "Bladcode", reshuffle: "Nieuwe getallen",
    modeSolve: "Online oefenen", modePrint: "Blad om te printen",
    btnPrint: "Printen", btnPdf: "Opslaan als pdf", btnShare: "Link kopiëren",
    btnCheckAll: "Alles nakijken", btnNew: "Nieuwe sommen", btnHint: "Tip",
    linkCopied: "Link gekopieerd!",
    solveScore: "Score", solveTime: "Tijd", solveStreak: "Reeks",
    answerPh: "Antwoord", check: "Controleer",
    correct: "Goed zo! Knap gedaan.", wrong: "Oeps, net niet.",
    correctIs: "Het goede antwoord is", solutionIs: "Uitwerking",
    resultTitle: "Klaar!", resultSub: "Zo heb je het gedaan",
    ofTasks: "van de", tryAgain: "Opnieuw proberen", newTasks: "Nieuwe sommen", printThese: "Deze printen",
    perfect: "Perfect! Alles goed!", great: "Uitstekend gedaan!",
    good: "Goed gedaan! Nog even oefenen.", keepGoing: "Niet opgeven – probeer het nog eens!",
    teachTitle: "Gemaakt voor leerkrachten en ouders",
    teachLead: "Een complete toets voor de klas in 30 seconden – met versies en antwoordblad.",
    t1: "Combineer onderwerpen op één blad – precies zoveel als je nodig hebt",
    t2: "Versies A, B, C met dezelfde moeilijkheid",
    t3: "Punten per som en een vakje voor het cijfer",
    t4: "Print netjes in zwart-wit, zonder inkt te verspillen",
    t5: "Met de bladcode krijg je altijd dezelfde sommen terug",
    t6: "Werkt na de eerste keer laden ook offline",
    teachCta: "Maak een toets",
    progTitle: "Mijn voortgang", progLead: "Alles blijft in deze browser – je hoeft je niet aan te melden.",
    progSolved: "Sommen gemaakt", progCorrect: "Goede antwoorden", progAccuracy: "Percentage goed",
    progSheets: "Bladen gemaakt", progBadges: "Badges",
    byTopic: "Per onderwerp",
    progReset: "Voortgang wissen", progResetAsk: "Weet je het zeker? Al je voortgang wordt gewist.",
    progEmpty: "Nog geen sommen gemaakt. Begin meteen!",
    aboutTitle: "Hoe werkt het?",
    a1t: "1. Kies een groep", a1d: "De onderwerpen passen bij het lesprogramma voor die leeftijd.",
    a2t: "2. Kies onderwerpen", a2d: "Combineer optellen, breuken, verhaaltjessommen en meetkunde zoals je wilt.",
    a3t: "3. Oefen of print", a3d: "Online met controle, of op papier met een antwoordblad voor de leerkracht.",
    footTagline: "Een gratis generator voor rekenwerkbladen, van de kleuters tot de brugklas.",
    footLinks: "Snelle links", footGrades: "Per groep",
    madeBy: "Gemaakt door", idea: "Geïnspireerd door Mitko",
    answersKey: "Antwoorden",
    sheetFoot: "zada4ko.com · rekenwerkbladen voor kinderen",
    sheetName: "Naam", sheetClass: "Groep", sheetDate: "Datum", sheetScore: "Cijfer",
    pts: "p.", variant: "Versie", taskWord: "sommen", close: "Sluiten",
    instrSolve: "Reken uit.", of: "van"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("nl", {
  badges: {
    first: "Eerste stap",
    ten: "10 goed",
    fifty: "50 goed",
    hundred: "100 goed",
    fivehund: "500 goed",
    streak5: "5 op een rij",
    streak15: "15 op een rij",
    perfect: "Foutloos blad",
    perfect5: "5 foutloze bladen",
    explorer: "Ontdekker",
    master: "Alle onderwerpen",
    printer: "Printkampioen"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("nl", {
  gen: {
    counting:  { name: "Tellen", desc: "Tel de plaatjes en schrijf het getal op", instr: "Tel en schrijf op hoeveel het er zijn." },
    addsub:    { name: "Optellen en aftrekken", desc: "De basissommen binnen het getallenbereik van de groep" },
    columnar:  { name: "Cijferen", desc: "Onder elkaar geschreven – ideaal op papier", instr: "Reken onder elkaar uit." },
    times:     { name: "Tafels", desc: "Keer- en deelsommen tot 100" },
    bigmuldiv: { name: "Grote keer- en deelsommen", desc: "Verder dan de tafels, delen met rest" },
    order:     { name: "Volgorde van bewerkingen", desc: "Sommen met haakjes – wat doe je eerst?", instr: "Reken uit en let op de volgorde van de bewerkingen." },
    missing:   { name: "Het ontbrekende getal", desc: "□ + 7 = 15 – welk getal verstopt zich?", instr: "Zoek het ontbrekende getal." },
    compare:   { name: "Vergelijken", desc: "Zet &lt;, &gt; of = ertussen", instr: "Vul in: &lt;, &gt; of = ." },
    sequence:  { name: "Getallenrijen", desc: "Ontdek de regel en ga verder", instr: "Zoek de regel en schrijf het ontbrekende getal op." },
    rounding:  { name: "Afronden", desc: "Op tientallen, honderdtallen, duizendtallen", instr: "Rond het getal af." },
    place:     { name: "Plaatswaarde", desc: "Eenheden, tientallen, honderdtallen, duizendtallen", instr: "Beantwoord de vraag over het getal." }
  },
  msg: {
    "arith.countSol": "Tel ze één voor één: {n}.",

    // division with a remainder: Dutch schools write "17 rest 3"
    "arith.remAnswer": "{q} rest {r}",
    "arith.remHint": "schrijf als „uitkomst rest restgetal“",
    "arith.remSol": "{dividend} : {d} = {q} (rest {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "elk getal is {step} meer dan het vorige",
    "arith.seqRuleSub": "elk getal is {step} minder dan het vorige",
    "arith.seqRuleMul": "elk getal is {step} keer zo groot als het vorige",
    "arith.seqRuleSquare": "de kwadraten van de getallen",
    "arith.seqRuleFib": "elk getal is de som van de twee vorige",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Rond {n} af op {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "tientallen", 100: "honderdtallen", 1000: "duizendtallen", 10000: "tienduizendtallen" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Welk cijfer staat in {n} op de plaats van de {place}?",
    "arith.placeName": function (v) {
      return ["eenheden", "tientallen", "honderdtallen", "duizendtallen", "tienduizendtallen", "honderdduizendtallen"][v.pos];
    },
    "arith.placeSumQ": "Schrijf als som van de plaatswaarden: {n}",
    "arith.placeFitQ": "Hoe vaak past {m} in {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("nl", {
  gen: {
    word: {
      name: "Verhaaltjessommen",
      desc: "Situaties uit het echte leven om over na te denken",
      instr: "Lees goed en los de som op."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " heeft " + Z.qty(v.a, v.th) + " en " + v.k1 + " heeft " + Z.qty(v.b, v.th) +
        ". Hoeveel " + v.th.pl + " hebben ze samen?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " heeft " + Z.qty(v.a, v.th) + " en geeft er " + v.b + " weg aan een vriend. Hoeveel " + v.th.pl + " zijn er nog over?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " heeft " + Z.qty(v.a, v.th) + ". " + v.k1 + " heeft er " + v.d + " meer. Hoeveel hebben ze samen?";
    },
    "word.animalLegs": function (v, Z) {
      return "In de tuin " + (v.n === 1 ? "is " : "zijn ") + Z.qty(v.n, v.th) + ". " +
        (v.n === 1 ? "Het dier heeft " : "Elk dier heeft ") + v.legs + " poten. Hoeveel poten zijn dat samen?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " koopt " + v.n + " " + v.th.pl + " van " + v.price + " per stuk. Hoeveel moet " + v.k + " betalen?";
    },
    "word.change": function (v) {
      return v.k + " koopt een " + v.th.sg + " van " + v.price + " en betaalt met " + v.paid +
        ". Hoeveel wisselgeld krijgt " + v.k + " terug?";
    },
    "word.saveUp": "{k} spaart elke week {week}. Na {weeks} weken wil {k} een skateboard van {target} kopen. Hoeveel geld is er nog nodig?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v) {
      return "In elke doos zitten " + v.per + " " + v.th.pl + ". Er zijn " + v.n + " dozen. Hoeveel " + v.th.pl + " zijn dat samen?";
    },
    "word.shareEqually": function (v) {
      return v.total + " " + v.th.pl + " worden eerlijk verdeeld over " + v.kids + " kinderen. Hoeveel krijgt elk kind?";
    },
    "word.boxesRest": function (v) {
      return "We hebben " + v.total + " " + v.th.pl + ". In een doos passen er " + v.per + ". Hoeveel volle dozen zijn er en hoeveel " +
        v.th.pl + " blijven er over? (schrijf als „dozen rest over“)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} rest {rest}",
    "word.solRemainder": "rest {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} leest {days} dagen lang elke dag {pages} bladzijden. Het boek heeft {total} bladzijden. Hoeveel bladzijden moet {k} nog lezen?",
    "word.average": "In drie manden zitten {a}, {b} en {c} stuks fruit. Hoeveel stuks fruit zitten er gemiddeld in een mand?",
    "word.sumDiff": "{k0} en {k1} hebben samen {total} stickers. {k0} heeft er {d} meer dan {k1}. Hoeveel heeft elk kind? (schrijf het aantal van {k0})",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "De film begint om {start} en duurt {dur} minuten. Hoe laat is de film afgelopen? (uu:mm)",
    "word.solMin": "min",
    "word.carDistance": "Een auto rijdt {hours} uur met een snelheid van {speed} km/u. Hoeveel kilometer legt de auto af?",
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Een trein legt {dist} km af met een gemiddelde snelheid van {speed} km/u. Hoeveel uur is de trein onderweg?",
    "word.unitH": "u",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Een winkel heeft " + v.whole + " " + v.th.pl + ". Daarvan is " + v.frac + " verkocht. Hoeveel zijn er verkocht?";
    },
    "word.fractionWhole": "{frac} van een getal is {part}. Welk getal is het?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Hoeveel is {p}% van {base}?",
    "word.saleJacket": "Een jas kost {price}. In de uitverkoop gaat de prijs {p}% omlaag. Wat is de nieuwe prijs?",
    "word.pctStudents": "Van de {whole} leerlingen sporten er {part}. Hoeveel procent is dat?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} bouwvakkers doen een klus in {days} dagen. Hoeveel dagen hebben {more} bouwvakkers nodig als ze allemaal even snel werken?",
    "word.unitDays": "dagen",
    "word.motherAge": "Een moeder is nu {mult} keer zo oud als haar zoon. De zoon is {child} jaar. Hoe oud is de moeder over {years} jaar?",
    "word.consecutive": "De som van drie opeenvolgende natuurlijke getallen is {sum}. Wat is het kleinste van die getallen?",
    "word.pencilPacks": "In een doos zitten {a} pakjes met elk {per1} potloden en {b} pakjes met elk {per2} potloden. Hoeveel potloden zitten er in de doos?",
    "word.treeTaller": "Een boom is {small} m hoog, een tweede boom is {times} keer zo hoog. Hoeveel meter is de tweede boom hoger dan de eerste?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("nl", {
  gen: {
    clock: { name: "Klokkijken", desc: "Lees de wijzers af en schrijf de tijd op", instr: "Hoe laat is het? Schrijf als uu:mm." },
    units: { name: "Maten en eenheden", desc: "Omrekenen: cm, m, km, g, kg, l, minuten", instr: "Reken om naar de gevraagde eenheid." },
    money: { name: "Geld", desc: "Euro's en centen, wisselgeld, boodschappen", instr: "Reken het bedrag uit." },
    geometry: { name: "Meetkunde", desc: "Omtrek, oppervlakte en inhoud van figuren", instr: "Bekijk de tekening en reken uit." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Hoe laat is het over {n} minuten?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "De klok wijst {time} aan",

    // unit abbreviations (shown after numbers) and family names; "u" = uur, "d" = dag
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "u", "measure.unit.day": "d",
    "measure.family.len": "lengte", "measure.family.mass": "gewicht",
    "measure.family.vol": "inhoud", "measure.family.time": "tijd",

    // money — "cent" stays the same after a number
    "measure.cents": function () { return "cent"; },
    "measure.centsAmount": function (v) { return v.n + " cent"; },
    "measure.coins": function (v) { return v.n + " " + (v.n === 1 ? "munt" : "munten") + " van " + v.c + " cent"; },
    "measure.moneyBox": "In een spaarpot zitten {list}. Hoeveel cent is dat samen?",
    "measure.eurToCents": function (v) {
      return v.eur + " euro en " + v.ct + " cent = " + v.blank + " cent";
    },
    "measure.change": "We kopen twee dingen van {p1} en {p2} en betalen met een briefje van {paid}. Hoeveel wisselgeld krijgen we terug?",

    // geometry — {grade} is passed so a language can use a simpler word in primary school
    "measure.askPerim": "Bereken de omtrek (P).",
    "measure.askPerimSquare": "Een vierkant. Bereken de omtrek (P).",
    "measure.askArea": "Bereken de oppervlakte (S).",
    "measure.askAreaSquare": "Een vierkant. Bereken de oppervlakte (S).",
    "measure.askAreaTri": "Bereken de oppervlakte (S) van de driehoek.",
    "measure.sideFromPerim": "Een rechthoek heeft een omtrek P = {p} {u}. Eén zijde is {a} {u}. Hoe lang is de andere zijde?",
    "measure.volCube": "Een kubus heeft ribben van {a} {u}. Bereken de inhoud (V).",
    "measure.volCuboid": "Een balk is {dims} {u}. Bereken de inhoud (V).",
    "measure.askCircumference": "Bereken de omtrek (C) van de cirkel. Neem π ≈ {pi}.",
    "measure.askAreaCircle": "Bereken de oppervlakte (S) van de cirkel. Neem π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("nl", {
  gen: {
    fractions:  { name: "Breuken", desc: "Vergelijken, vereenvoudigen, optellen en aftrekken", instr: "Reken uit. Schrijf een breuk als 3/4." },
    decimals:   { name: "Kommagetallen", desc: "Rekenen met kommagetallen", instr: "Reken uit." },
    percent:    { name: "Procenten", desc: "Procent van, korting, verhoging", instr: "Reken uit." },
    divis:      { name: "Deelbaarheid en delers", desc: "Deelbaarheidsregels, priemgetallen, ggd en kgv", instr: "Beantwoord de vraag." },
    powers:     { name: "Machten en wortels", desc: "Kwadraten, derde machten en wortels", instr: "Reken uit." },
    negatives:  { name: "Negatieve getallen", desc: "Rekenen met gehele getallen", instr: "Reken uit." },
    equations:  { name: "Vergelijkingen", desc: "Los op voor x – van eenvoudig tot x aan beide kanten", instr: "Los de vergelijking op. Bereken x." },
    algebra:    { name: "Formules en merkwaardige producten", desc: "Haakjes wegwerken, merkwaardige producten", instr: "Bereken de waarde voor de gegeven getallen." },
    pythagoras: { name: "Stelling van Pythagoras", desc: "Rechthoekige driehoek – zoek de ontbrekende zijde", instr: "Bereken de ontbrekende zijde." },
    roman:      { name: "Romeinse cijfers", desc: "Van I tot MMXXV en terug", instr: "Schrijf in gewone of Romeinse cijfers." },
    logic:      { name: "Denkpuzzels", desc: "Raadsels, verborgen getallen, logica", instr: "Denk goed na en vind het antwoord." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Vereenvoudig: {f}",
    "adv.commonDenSol": "Gelijke noemer {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Schrijf als onechte breuk: {f}",
    "adv.toMixed": "Schrijf als gemengd getal: {f}",
    /* an extra accepted spelling of a mixed number, e.g. "2en1/3" */
    "adv.mixedAltAnd": "{w}en{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w} hele, rest {r} → {w} {r}/{d}",
    "adv.fractionOf": "Hoeveel is {f} van {n}?",
    /* percent */
    "adv.percentOf": "{p}% van {n}",
    "adv.decreaseBy": "Verminder {n} met {p}%",
    "adv.increaseBy": "Verhoog {n} met {p}%",
    "adv.whatPercent": "Hoeveel procent van {n} is {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "ja",
    "adv.no": "nee",
    "adv.isDivisible": "Is {n} deelbaar door {d}?",
    "adv.divRemainderSol": "{n} : {d} → rest {r}",
    "adv.isPrime": "Is {n} een priemgetal?",
    "adv.primeSol": "{n} is alleen deelbaar door 1 en door zichzelf.",
    "adv.compositeSol": "{n} is ook deelbaar door {d}.",
    "adv.gcdOf": "ggd({a}, {b})",
    "adv.gcdSol": "De grootste gemene deler is {v}",
    "adv.lcmOf": "kgv({a}, {b})",
    "adv.lcmSol": "Het kleinste gemene veelvoud is {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Bereken {expr} voor x = {x}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "Ik neem een getal in gedachten, doe het keer {m} en tel er {add} bij op. Dan krijg ik {res}. Welk getal had ik in gedachten?",
    "adv.chickensRabbits": "Op een boerderij lopen kippen en konijnen – samen {heads} koppen en {legs} poten. Hoeveel konijnen zijn er?",
    "adv.chickensRabbitsSol": "Als het allemaal kippen waren: {legs} poten. Het verschil {diff} : 2 = {b}",
    "adv.magicSquare": "Magisch vierkant: elke rij, elke kolom en elke diagonaal is samen {sum}. Welk getal ontbreekt?",
    "adv.magicSquareSol": "Som {sum} → {v}",
    "adv.towers": "{kid} bouwt met {n} blokjes torens van elk {per} blokjes. Hoeveel volle torens worden het? (schrijf het aantal torens)",
    "adv.towersSol": "{n} : {per} = {q} rest {r}"
  }
});
