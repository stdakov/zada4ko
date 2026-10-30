/* ==========================================================================
   zada4ko.com — Romanian (Română)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   ========================================================================== */
"use strict";

/* ---- Grammar helpers (Romanian only) ----------------------------------- */
/*
   Noun layout: [singular, plural, gender]. gender is "m" / "f" / "n"; it picks
   "un"/"o" and "câți"/"câte", "mulți"/"multe", "ei"/"ele" (neuter plural
   behaves like feminine).

   Numbers 20 and up whose last two digits are 00 or 20–99 take "de" before
   the noun: "19 mere", "20 de mere", "101 mere", "120 de mere".
*/
var ROG = (function () {
  function de(n) { var r = n % 100; return n >= 20 && (r === 0 || r >= 20) ? " de " : " "; }
  function g(th) { return (th.f && th.f[2]) || "f"; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  return {
    de: de,
    /** "1 zi", "5 zile", "20 de zile" for words that are not nouns from the list */
    n: function (n, sg, pl) { return n + de(n) + (n === 1 ? sg : pl); },
    /** "câți" / "câte" */
    cate: function (th, big) { var s = g(th) === "m" ? "câți" : "câte"; return big ? cap(s) : s; },
    /** "mai mulți" / "mai multe" */
    multe: function (th) { return g(th) === "m" ? "mai mulți" : "mai multe"; },
    /** "ei" / "ele" */
    ele: function (th) { return g(th) === "m" ? "ei" : "ele"; },
    /** "un caiet" / "o minge" */
    one: function (th) { return (g(th) === "f" ? "o " : "un ") + th.sg; }
  };
})();

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("ro", {
  fmt: {
    dec: ",",
    and: " și ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + ROG.de(n) + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Andrei", "Maria", "Alexandru", "Ioana", "David", "Elena", "Ștefan", "Sofia", "Matei", "Ana",
         "Luca", "Daria", "Mihai", "Bianca", "Tudor", "Irina", "Gabriel", "Antonia", "Radu", "Eva"],
  /* [singular, plural, gender] — see the layout note at the top */
  nouns: {
    apple: ["măr", "mere", "n"], banana: ["banană", "banane", "f"], pencil: ["creion", "creioane", "n"],
    balloon: ["balon", "baloane", "n"], book: ["carte", "cărți", "f"], sweet: ["bomboană", "bomboane", "f"],
    ball: ["minge", "mingi", "f"], flower: ["floare", "flori", "f"], sticker: ["abțibild", "abțibilduri", "n"],
    nut: ["nucă", "nuci", "f"], strawberry: ["căpșună", "căpșuni", "f"], cube: ["cub", "cuburi", "n"],
    cat: ["pisică", "pisici", "f"], dog: ["cățel", "căței", "m"], bunny: ["iepuraș", "iepurași", "m"],
    chick: ["puișor", "puișori", "m"],
    fish: ["peștișor", "peștișori", "m"], butterfly: ["fluture", "fluturi", "m"], ant: ["furnică", "furnici", "f"],
    bee: ["albină", "albine", "f"],
    notebook: ["caiet", "caiete", "n"], backpack: ["ghiozdan", "ghiozdane", "n"], puzzle: ["puzzle", "puzzle-uri", "n"],
    umbrella: ["umbrelă", "umbrele", "f"], cap: ["șapcă", "șepci", "f"], toy: ["jucărie", "jucării", "f"],
    mug: ["cană", "căni", "f"],
    icecream: ["înghețată", "înghețate", "f"], ticket: ["bilet", "bilete", "n"], plantpot: ["ghiveci", "ghivece", "n"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("ro", {
  ui: {
    /* teachers: ready-made tests · about: privacy note */
    readyT1: "Clasele I–II",
    readyT2: "Clasele III–IV",
    readyT3: "Clasele V–VI",
    readyT4: "Clasa a VII-a",
    readyD1: "Adunări și scăderi până la 100, comparații, probleme, ceasul.",
    readyD2: "Înmulțiri și împărțiri, ordinea operațiilor, unități de măsură, arie și perimetru.",
    readyD3: "Fracții, numere zecimale, procente, ecuații, volum și arie.",
    readyD4: "Ecuații, expresii, puteri, teorema lui Pitagora, probleme.",
    btnOpen: "Deschide",
    privacyT: "Fără cont, fără reclame în exerciții.",
    privacyD: "Progresul se păstrează doar în browserul acestui dispozitiv și nu părăsește niciodată calculatorul. După prima încărcare, site-ul funcționează și offline.",
    /* search engines: title and description of /ro/ */
    seoTitle: "Exerciții de matematică pentru copii, clasele I–VII — de printat și online | zada4ko",
    seoDesc: "zada4ko este un generator gratuit de exerciții de matematică pentru copii, de la preșcolar la clasa a VII-a: adunări și scăderi, tabla înmulțirii, fracții, probleme, geometrie. Rezolvă online sau printează o fișă cu răspunsuri.",
    docTitle: "zada4ko — exerciții de matematică pentru copii",
    language: "Limba",
    gshort0: "Preș.", gshort1: "I", gshort2: "II", gshort3: "III", gshort4: "IV", gshort5: "V", gshort6: "VI", gshort7: "VII",
    answerLabel: "Răspuns:",
    variantLetters: "ABCD",
      brandSub: "matematică pentru copii",
    navHome: "Acasă", navStudio: "Creează exerciții", navTeachers: "Pentru profesori",
    navProgress: "Progresul meu", navAbout: "Cum funcționează", menu: "Meniu",
    heroBadge: "Exerciții noi la fiecare clic",
    heroTitle: "Exerciții de matematică fără sfârșit pentru",
    heroTitleHl: "copii curioși",
    heroLead:
      "Alege clasa și temele și primești o fișă gata făcută. Rezolv-o online, cu verificare pe loc, sau tipărește-o pentru un test, o temă sau exerciții în plus.",
    heroCta1: "Creează exerciții",
    heroCta2: "Start rapid: clasa I",
    stat1: "tipuri de exerciții", stat2: "clase", stat3: "combinații",
    gradesTitle: "În ce clasă este copilul?",
    topicsTitle: "Exerciții pe clase și teme",
    gradesLead: "Fiecare clasă deschide temele din programa școlară — de la numărat mere până la teorema lui Pitagora.",
    grade0: "Preșcolar",
    grade1: "Clasa I", grade2: "Clasa a II-a", grade3: "Clasa a III-a", grade4: "Clasa a IV-a",
    grade5: "Clasa a V-a", grade6: "Clasa a VI-a", grade7: "Clasa a VII-a",
    ageLabel: "ani",
    featTitle: "Ce știe să facă zada4ko",
    f1t: "Rezolvă online", f1d: "Scrie răspunsul și află imediat dacă e corect. Cu puncte, stele și confetti.",
    f2t: "Tipărește pe hârtie", f2d: "O fișă A4 curată pentru temă sau test — cu loc pentru nume, dată și notă.",
    f3t: "Răspunsuri", f3d: "O pagină separată, doar pentru profesor, cu răspunsul corect la fiecare exercițiu.",
    f4t: "Variante A / B / C", f4d: "Un singur clic face variante diferite ale aceluiași test.",
    f5t: "Link de distribuit", f5d: "Fiecare fișă are un cod. Trimite linkul și toți primesc aceleași exerciții.",
    f6t: "Probleme", f6d: "Situații din viața reală, cu nume, bani, timp și distanțe.",
    studioTitle: "Atelierul de exerciții",
    studioLead: "Reglează fișa în stânga și vezi cum se construiește în dreapta.",
    stepGrade: "Clasa", stepTopics: "Teme", stepSettings: "Setări",
    panelSetup: "Setările fișei",
    pickTopics: "Alege temele",
    noTopics: "Alege cel puțin o temă în stânga ca să apară exerciții.",
    countLabel: "Exerciții", totalTasks: "Total exerciții",
    titleLabel: "Titlul fișei", titlePlaceholder: "Test de matematică",
    difficulty: "Dificultate", diffEasy: "Ușor", diffNormal: "Normal", diffHard: "Greu",
    maxNum: "Numere până la", maxAuto: "După clasă",
    colsAuto: "Automat",
    cols1: "1 coloană", cols2: "2 coloane", cols3: "3 coloane", cols4: "4 coloane",
    columns: "Coloane la tipărire", auto: "Automat",
    showKey: "Răspunsuri", keyNone: "Fără răspunsuri", keySame: "Pe aceeași fișă", keyPage: "Pagină separată",
    workspace: "Spațiu de lucru",
    spaceNone: "Fără (compact)",
    spaceNormal: "Normal",
    spaceMore: "Mai mult",
    pagesWord: "pagini A4",
    pagesEst: "Numărul estimat de pagini tipărite",
    variants: "Variante", variantsHint: "Aceleași teme, alte numere — fără copiat.",
    points: "Puncte pe exercițiu",
    seedLabel: "Codul fișei", reshuffle: "Numere noi",
    modeSolve: "Rezolvă online", modePrint: "Fișă de tipărit",
    btnPrint: "Tipărește", btnPdf: "Salvează ca PDF", btnShare: "Copiază linkul",
    btnCheckAll: "Verifică tot", btnNew: "Exerciții noi", btnHint: "Indiciu",
    linkCopied: "Linkul a fost copiat!",
    solveScore: "Puncte", solveTime: "Timp", solveStreak: "Serie",
    answerPh: "Răspuns", check: "Verifică",
    correct: "Corect! Bravo!", wrong: "Ups, nu chiar.",
    correctIs: "Răspunsul corect este", solutionIs: "Rezolvare",
    resultTitle: "Gata!", resultSub: "Iată cum te-ai descurcat",
    ofTasks: "din", tryAgain: "Încearcă din nou", newTasks: "Exerciții noi", printThese: "Tipărește-le",
    perfect: "Perfect! Totul corect!", great: "Excelent!",
    good: "Bravo! Mai exersează puțin.", keepGoing: "Nu renunța — mai încearcă!",
    teachTitle: "Făcut pentru profesori și părinți",
    teachLead: "Un test pentru toată clasa în 30 de secunde — cu variante și răspunsuri.",
    t1: "Combină teme pe aceeași fișă — exact câte îți trebuie",
    t2: "Variante A, B, C cu aceeași dificultate",
    t3: "Puncte pe exercițiu și căsuță pentru notă",
    t4: "Se tipărește curat, alb-negru, fără cerneală irosită",
    t5: "Codul fișei aduce înapoi aceleași exerciții oricând",
    t6: "Merge și fără internet după prima încărcare",
    teachCta: "Fă un test",
    progTitle: "Progresul meu", progLead: "Totul rămâne în acest browser — fără cont.",
    progSolved: "Exerciții rezolvate", progCorrect: "Răspunsuri corecte", progAccuracy: "Precizie",
    progSheets: "Fișe create", progBadges: "Insigne",
    byTopic: "Pe teme",
    progReset: "Șterge progresul", progResetAsk: "Sigur? Tot progresul va fi șters.",
    progEmpty: "Încă niciun exercițiu rezolvat. Începe acum!",
    aboutTitle: "Cum funcționează",
    a1t: "1. Alege clasa", a1d: "Temele se potrivesc cu programa pentru vârsta respectivă.",
    a2t: "2. Alege temele", a2d: "Combină adunări, fracții, probleme și geometrie cum vrei.",
    a3t: "3. Rezolvă sau tipărește", a3d: "Online, cu verificare, sau pe hârtie, cu răspunsuri pentru profesor.",
    footTagline: "Generator gratuit de fișe de matematică pentru copii, de la grădiniță până în clasa a VII-a.",
    footLinks: "Linkuri rapide", footGrades: "Pe clase",
    madeBy: "Creat de", idea: "După o idee a lui Mitko",
    answersKey: "Răspunsuri",
    sheetFoot: "zada4ko.com · fișe de matematică pentru copii",
    sheetName: "Nume", sheetClass: "Clasa", sheetDate: "Data", sheetScore: "Nota",
    pts: "p", variant: "Varianta", taskWord: "exerciții", close: "Închide",
    instrSolve: "Calculează.", of: "din"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("ro", {
  badges: {
    first: "Primul pas",
    ten: "10 corecte",
    fifty: "50 corecte",
    hundred: "100 corecte",
    fivehund: "500 corecte",
    streak5: "Serie de 5",
    streak15: "Serie de 15",
    perfect: "Fișă perfectă",
    perfect5: "5 fișe perfecte",
    explorer: "Explorator",
    master: "Toate temele",
    printer: "Tipograf"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("ro", {
  gen: {
    counting:  { name: "Numărare", desc: "Numără obiectele și scrie numărul", instr: "Numără și scrie câte sunt." },
    addsub:    { name: "Adunare și scădere", desc: "Operațiile de bază, în limitele clasei" },
    columnar:  { name: "Calcul în coloană", desc: "Numerele scrise unul sub altul — perfect pe hârtie", instr: "Calculează în coloană." },
    times:     { name: "Tabla înmulțirii", desc: "Înmulțire și împărțire până la 100" },
    bigmuldiv: { name: "× și ÷ cu numere mari", desc: "Dincolo de tabla înmulțirii, împărțire cu rest" },
    order:     { name: "Ordinea operațiilor", desc: "Exerciții cu paranteze — ce se calculează mai întâi", instr: "Calculează, respectând ordinea operațiilor." },
    missing:   { name: "Află numărul lipsă", desc: "□ + 7 = 15 — ce număr se ascunde", instr: "Află numărul care lipsește." },
    compare:   { name: "Comparare", desc: "Pune &lt;, &gt; sau =", instr: "Pune &lt;, &gt; sau = ." },
    sequence:  { name: "Șiruri de numere", desc: "Descoperă regula și continuă", instr: "Descoperă regula și scrie numărul care lipsește." },
    rounding:  { name: "Rotunjire", desc: "La zeci, sute, mii", instr: "Rotunjește numărul." },
    place:     { name: "Ordinele numerelor", desc: "Unități, zeci, sute, mii", instr: "Răspunde la întrebarea despre număr." }
  },
  msg: {
    "arith.countSol": "Numărăm unul câte unul: {n}.",

    // division with a remainder: the answer as the child writes it, a hint, the worked line
    "arith.remAnswer": "{q} rest {r}",
    "arith.remHint": "scrie așa: „câtul rest restul”",
    "arith.remSol": "{dividend} : {d} = {q} (rest {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "fiecare număr este cu {step} mai mare decât cel dinainte",
    "arith.seqRuleSub": "fiecare număr este cu {step} mai mic decât cel dinainte",
    "arith.seqRuleMul": "fiecare număr este de {step} ori mai mare decât cel dinainte",
    "arith.seqRuleSquare": "pătratele numerelor",
    "arith.seqRuleFib": "fiecare număr este suma celor două dinainte",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Rotunjește {n} la {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "zeci", 100: "sute", 1000: "mii", 10000: "zeci de mii" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Ce cifră este pe locul {place} în numărul {n}?",
    "arith.placeName": function (v) {
      return ["unităților", "zecilor", "sutelor", "miilor", "zecilor de mii", "sutelor de mii"][v.pos];
    },
    "arith.placeSumQ": "Descompune în sumă de unități, zeci, sute…: {n}",
    "arith.placeFitQ": "De câte ori se cuprinde {m} în {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("ro", {
  gen: {
    word: {
      name: "Probleme",
      desc: "Situații din viața reală care cer gândire",
      instr: "Citește cu atenție și rezolvă."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " are " + Z.qty(v.a, v.th) + ", iar " + v.k1 + " are " + Z.qty(v.b, v.th) +
        ". " + ROG.cate(v.th, true) + " " + v.th.pl + " au împreună?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " are " + Z.qty(v.a, v.th) + " și îi dă " + v.b + " unui prieten. " + ROG.cate(v.th, true) + " " +
        v.th.pl + " îi rămân?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " are " + Z.qty(v.a, v.th) + ". " + v.k1 + " are cu " + v.d + " " + ROG.multe(v.th) + ". " +
        ROG.cate(v.th, true) + " " + v.th.pl + " au în total?";
    },
    "word.animalLegs": function (v, Z) {
      return "În curte " + (v.n === 1 ? "este " : "sunt ") + Z.qty(v.n, v.th) + ". Fiecare are câte " + v.legs +
        " picioare. Câte picioare sunt în total?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v, Z) {
      return v.k + " cumpără " + Z.qty(v.n, v.th) + ", cu " + v.price + " bucata. Câți bani plătește " + v.k + "?";
    },
    "word.change": function (v) {
      return v.k + " plătește " + v.paid + " pentru " + ROG.one(v.th) + " care costă " + v.price + ". Cât rest primește?";
    },
    "word.saveUp": function (v) {
      return v.k + " pune deoparte " + v.week + " în fiecare săptămână. După " + ROG.n(v.weeks, "săptămână", "săptămâni") +
        ", " + v.k + " vrea să-și cumpere un skateboard care costă " + v.target + ". Câți bani îi mai trebuie?";
    },

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "În fiecare dintre cele " + v.n + " cutii sunt " + Z.qty(v.per, v.th) + ". " + ROG.cate(v.th, true) + " " +
        v.th.pl + " sunt în total?";
    },
    "word.shareEqually": function (v, Z) {
      return Z.qty(v.total, v.th) + " se împart în mod egal la " + v.kids + " copii. " + ROG.cate(v.th, true) + " " +
        v.th.pl + " primește fiecare copil?";
    },
    "word.boxesRest": function (v, Z) {
      return "Avem " + Z.qty(v.total, v.th) + ". Într-o cutie încap " + v.per + ". Câte cutii umplem complet și " +
        ROG.cate(v.th) + " " + v.th.pl + " rămân? (scrie așa: „cutii rest rămase”)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} rest {rest}",
    "word.solRemainder": "rest {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": function (v) {
      return v.k + " citește " + ROG.n(v.pages, "pagină", "pagini") + " pe zi, timp de " + ROG.n(v.days, "zi", "zile") +
        ". Cartea are " + ROG.n(v.total, "pagină", "pagini") + ". Câte pagini mai sunt de citit?";
    },
    "word.average": function (v) {
      return "Trei coșuri au " + v.a + ", " + v.b + " și " + ROG.n(v.c, "fruct", "fructe") +
        ". Câte fructe are, în medie, un coș?";
    },
    "word.sumDiff": function (v) {
      return v.k0 + " și " + v.k1 + " au împreună " + ROG.n(v.total, "abțibild", "abțibilduri") + ". " + v.k0 +
        " are cu " + v.d + " mai multe decât " + v.k1 + ". Câte abțibilduri are fiecare? (scrie câte are " + v.k0 + ")";
    },

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": function (v) {
      return "Filmul începe la " + v.start + " și durează " + ROG.n(v.dur, "minut", "minute") +
        ". La ce oră se termină? (hh:mm)";
    },
    "word.solMin": "min",
    "word.carDistance": "O mașină merge cu {speed} km/h timp de {hours} ore. Ce distanță parcurge?",
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Un tren parcurge {dist} km cu o viteză medie de {speed} km/h. Câte ore călătorește?",
    "word.unitH": "ore",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v, Z) {
      return "Un magazin are " + Z.qty(v.whole, v.th) + ". S-au vândut " + v.frac + " din " + ROG.ele(v.th) + ". " +
        ROG.cate(v.th, true) + " " + v.th.pl + " s-au vândut?";
    },
    "word.fractionWhole": "{frac} dintr-un număr înseamnă {part}. Care este numărul?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Cât este {p}% din {base}?",
    "word.saleJacket": "O geacă costă {price}. La reduceri, prețul scade cu {p}%. Care este noul preț?",
    "word.pctStudents": function (v) {
      return "Din " + ROG.n(v.whole, "elev", "elevi") + ", " + v.part + " fac sport. Ce procent din elevi fac sport?";
    },

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": function (v) {
      return ROG.n(v.workers, "muncitor", "muncitori") + " termină o lucrare în " + ROG.n(v.days, "zi", "zile") +
        ". În câte zile o vor termina " + ROG.n(v.more, "muncitor", "muncitori") + ", dacă lucrează la fel de repede?";
    },
    "word.unitDays": "zile",
    "word.motherAge": function (v) {
      return "Astăzi mama este de " + v.mult + " ori mai în vârstă decât fiul ei, care are " + ROG.n(v.child, "an", "ani") +
        ". Câți ani va avea mama peste " + ROG.n(v.years, "an", "ani") + "?";
    },
    "word.consecutive": "Suma a trei numere naturale consecutive este {sum}. Care este cel mai mic dintre ele?",
    "word.pencilPacks": function (v) {
      return "O cutie conține " + ROG.n(v.a, "pachet", "pachete") + " cu câte " + v.per1 + " creioane și " +
        ROG.n(v.b, "pachet", "pachete") + " cu câte " + v.per2 + " creioane. Câte creioane sunt în cutie?";
    },
    "word.treeTaller": "Un copac are {small} m înălțime, iar al doilea este de {times} ori mai înalt. Cu câți metri este al doilea copac mai înalt decât primul?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("ro", {
  gen: {
    clock: { name: "Ceasul", desc: "Citește acele și scrie ora", instr: "Cât este ceasul? Scrie ca hh:mm." },
    units: { name: "Unități de măsură", desc: "Transformări: cm, m, km, g, kg, l, minute", instr: "Transformă în unitățile cerute." },
    money: { name: "Bani", desc: "Euro și cenți, rest, cumpărături", instr: "Calculează suma." },
    geometry: { name: "Geometrie", desc: "Perimetrul, aria și volumul figurilor", instr: "Privește desenul și calculează." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": function (v) { return "Cât va fi ceasul peste " + ROG.n(v.n, "minut", "minute") + "?"; },
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "Ceasul arată {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": function (v) { var t = v.n % 100; return v.n === 1 ? "zi" : (v.n >= 20 && (t === 0 || t >= 20) ? "de zile" : "zile"); },
    "measure.family.len": "lungime", "measure.family.mass": "masă",
    "measure.family.vol": "volum", "measure.family.time": "timp",

    // money: "1 cent", "5 cenți", "20 de cenți"; "euro" never changes form
    "measure.cents": function (v) { return v.n === 1 ? "cent" : "cenți"; },
    "measure.centsAmount": function (v) { return ROG.n(v.n, "cent", "cenți"); },
    "measure.coins": function (v) {
      return ROG.n(v.n, "monedă", "monede") + " de " + ROG.n(v.c, "cent", "cenți");
    },
    "measure.moneyBox": "În pușculiță avem {list}. Câți cenți avem în total?",
    "measure.eurToCents": function (v) {
      return v.eur + ROG.de(v.eur) + "euro și " + ROG.n(v.ct, "cent", "cenți") + " = " + v.blank + " cenți";
    },
    "measure.change": "Cumpărăm două lucruri, de {p1} și de {p2}, și plătim cu o bancnotă de {paid}. Cât rest primim?",

    // geometry
    "measure.askPerim": "Află perimetrul (P).",
    "measure.askPerimSquare": "Un pătrat. Află perimetrul (P).",
    "measure.askArea": "Află aria (S).",
    "measure.askAreaSquare": "Un pătrat. Află aria (S).",
    "measure.askAreaTri": "Află aria (S) triunghiului.",
    "measure.sideFromPerim": "Un dreptunghi are perimetrul P = {p} {u}, iar o latură are {a} {u}. Cât are cealaltă latură?",
    "measure.volCube": "Un cub are muchia de {a} {u}. Află volumul (V).",
    "measure.volCuboid": "Un paralelipiped dreptunghic are dimensiunile {dims} {u}. Află volumul (V).",
    "measure.askCircumference": "Află lungimea cercului (C). Ia π ≈ {pi}.",
    "measure.askAreaCircle": "Află aria (S) cercului. Ia π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("ro", {
  gen: {
    fractions:  { name: "Fracții", desc: "Comparare, simplificare, adunare și scădere", instr: "Calculează. Scrie fracția ca 3/4." },
    decimals:   { name: "Numere zecimale", desc: "Operații cu numere cu virgulă", instr: "Calculează." },
    percent:    { name: "Procente", desc: "Procent dintr-un număr, reducere, creștere", instr: "Calculează." },
    divis:      { name: "Divizibilitate și divizori", desc: "Criterii de divizibilitate, numere prime, c.m.m.d.c. și c.m.m.m.c.", instr: "Răspunde la întrebare." },
    powers:     { name: "Puteri și radicali", desc: "Pătrate, cuburi și rădăcini pătrate", instr: "Calculează." },
    negatives:  { name: "Numere negative", desc: "Operații cu numere întregi", instr: "Calculează." },
    equations:  { name: "Ecuații", desc: "Află x — de la simple la x în ambii membri", instr: "Rezolvă ecuația. Află x." },
    algebra:    { name: "Expresii și formule", desc: "Desfacerea parantezelor, formule de calcul prescurtat", instr: "Calculează pentru valorile date." },
    pythagoras: { name: "Teorema lui Pitagora", desc: "Triunghi dreptunghic — află latura care lipsește", instr: "Află latura care lipsește." },
    roman:      { name: "Cifre romane", desc: "De la I la MMXXV și înapoi", instr: "Scrie cu cifre arabe sau romane." },
    logic:      { name: "Probleme de logică", desc: "Ghicitori, numere ascunse, logică", instr: "Gândește-te bine și află răspunsul." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Simplifică: {f}",
    "adv.commonDenSol": "Numitor comun {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Scrie ca fracție supraunitară: {f}",
    "adv.toMixed": "Scoate întregii din fracție: {f}",
    /* an extra accepted spelling of a mixed number: "2și1/3" (spaces are removed before comparing) */
    "adv.mixedAltAnd": "{w}și{n}/{d}",
    "adv.toMixedSol": function (v) {
      return v.imp + " : " + v.d + " = " + v.w + (v.w === 1 ? " întreg" : " întregi") + ", rest " + v.r +
        " → " + v.w + " " + v.r + "/" + v.d;
    },
    "adv.fractionOf": "Cât reprezintă {f} din {n}?",
    /* percent */
    "adv.percentOf": "{p}% din {n}",
    "adv.decreaseBy": "Micșorează {n} cu {p}%",
    "adv.increaseBy": "Mărește {n} cu {p}%",
    "adv.whatPercent": "Ce procent din {n} reprezintă {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "da",
    "adv.no": "nu",
    "adv.isDivisible": "Este {n} divizibil cu {d}?",
    "adv.divRemainderSol": "{n} : {d} → rest {r}",
    "adv.isPrime": "Este {n} număr prim?",
    "adv.primeSol": "{n} se împarte exact doar la 1 și la el însuși.",
    "adv.compositeSol": "{n} se împarte exact și la {d}.",
    "adv.gcdOf": "c.m.m.d.c.({a}, {b})",
    "adv.gcdSol": "Cel mai mare divizor comun este {v}",
    "adv.lcmOf": "c.m.m.m.c.({a}, {b})",
    "adv.lcmSol": "Cel mai mic multiplu comun este {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Pentru x = {x}, calculează {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "M-am gândit la un număr, l-am înmulțit cu {m} și am adunat {add}. Am obținut {res}. La ce număr m-am gândit?",
    "adv.chickensRabbits": function (v) {
      return "Într-o curte sunt găini și iepuri — în total " + ROG.n(v.heads, "cap", "capete") + " și " +
        ROG.n(v.legs, "picior", "picioare") + ". Câți iepuri sunt?";
    },
    "adv.chickensRabbitsSol": function (v) {
      return "Dacă toate ar fi găini: " + ROG.n(v.legs, "picior", "picioare") + ". Diferența " + v.diff + " : 2 = " + v.b;
    },
    "adv.magicSquare": "Pătrat magic: suma pe fiecare rând, coloană și diagonală este {sum}. Ce număr lipsește?",
    "adv.magicSquareSol": "Suma pe rând {sum} → {v}",
    "adv.towers": function (v) {
      return v.kid + " așază " + ROG.n(v.n, "cub", "cuburi") + " în turnuri de câte " + v.per +
        ". Câte turnuri complete construiește? (scrie numărul de turnuri)";
    },
    "adv.towersSol": "{n} : {per} = {q} rest {r}"
  }
});
