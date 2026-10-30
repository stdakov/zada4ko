/* ==========================================================================
   zada4ko.com — Italian (Italiano)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   Grades follow the Italian school system: preschool = scuola dell'infanzia,
   grade 1–5 = 1ª–5ª elementare, grade 6 = 1ª media, grade 7 = 2ª media.
   ========================================================================== */
"use strict";

/* "Quanti libri" / "Quante mele" — agrees with the noun's gender (f[2]). */
function itQuanti(noun) { return noun.f[2] === "f" ? "Quante " : "Quanti "; }
/* the article before a percentage: "il 25%" but "l'8%", "l'11%", "l'80%" */
function itPctEl(p) { var s = String(p); return s === "1" || s === "11" || s.charAt(0) === "8"; }
function itIl(p) { return (itPctEl(p) ? "l'" : "il ") + p + "%"; }
function itDel(p) { return (itPctEl(p) ? "dell'" : "del ") + p + "%"; }

/* ---- Formatting, kids' names, nouns ------------------------------------ */
/* noun layout: [singular, plural, gender "m" | "f", indefinite article with
   its trailing space or apostrophe: "un ", "uno ", "una ", "un'"] */
Z.i18n.add("it", {
  fmt: {
    dec: ",",
    and: " e ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Leonardo", "Sofia", "Francesco", "Giulia", "Alessandro", "Aurora", "Lorenzo", "Ginevra", "Mattia", "Alice",
         "Beatrice", "Tommaso", "Riccardo", "Emma", "Gabriele", "Giorgia", "Edoardo", "Chiara", "Andrea", "Vittoria"],
  nouns: {
    apple: ["mela", "mele", "f", "una "], banana: ["banana", "banane", "f", "una "], pencil: ["matita", "matite", "f", "una "],
    balloon: ["palloncino", "palloncini", "m", "un "], book: ["libro", "libri", "m", "un "], sweet: ["caramella", "caramelle", "f", "una "],
    ball: ["palla", "palle", "f", "una "], flower: ["fiore", "fiori", "m", "un "], sticker: ["adesivo", "adesivi", "m", "un "],
    nut: ["noce", "noci", "f", "una "], strawberry: ["fragola", "fragole", "f", "una "], cube: ["cubetto", "cubetti", "m", "un "],
    cat: ["gatto", "gatti", "m", "un "], dog: ["cane", "cani", "m", "un "], bunny: ["coniglietto", "coniglietti", "m", "un "],
    chick: ["pulcino", "pulcini", "m", "un "], fish: ["pesce", "pesci", "m", "un "], butterfly: ["farfalla", "farfalle", "f", "una "],
    ant: ["formica", "formiche", "f", "una "], bee: ["ape", "api", "f", "un'"],
    notebook: ["quaderno", "quaderni", "m", "un "], backpack: ["zaino", "zaini", "m", "uno "], puzzle: ["puzzle", "puzzle", "m", "un "],
    umbrella: ["ombrello", "ombrelli", "m", "un "], cap: ["cappellino", "cappellini", "m", "un "], toy: ["giocattolo", "giocattoli", "m", "un "],
    mug: ["tazza", "tazze", "f", "una "], icecream: ["gelato", "gelati", "m", "un "], ticket: ["biglietto", "biglietti", "m", "un "],
    plantpot: ["vaso", "vasi", "m", "un "]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("it", {
  ui: {
    docTitle: "zada4ko — esercizi di matematica per bambini",
    language: "Lingua",
    gshort0: "Inf", gshort1: "1ª", gshort2: "2ª", gshort3: "3ª", gshort4: "4ª", gshort5: "5ª", gshort6: "1ªM", gshort7: "2ªM",
    answerLabel: "Risposta:",
    variantLetters: "ABCD",
    brandSub: "matematica per bambini",
    navHome: "Home", navStudio: "Crea esercizi", navTeachers: "Per insegnanti",
    navProgress: "I miei progressi", navAbout: "Come funziona", menu: "Menu",
    heroBadge: "Esercizi nuovi a ogni clic",
    heroTitle: "Matematica senza fine per",
    heroTitleHl: "bambini curiosi",
    heroLead:
      "Scegli la classe e gli argomenti e ottieni una scheda pronta. Risolvila online con correzione immediata, oppure stampala per una verifica, i compiti o un po' di allenamento.",
    heroCta1: "Crea esercizi",
    heroCta2: "Inizia subito: 1ª elementare",
    stat1: "tipi di esercizi", stat2: "classi", stat3: "combinazioni",
    gradesTitle: "In che classe è il bambino?",
    topicsTitle: "Esercizi per classe e argomento",
    gradesLead: "Ogni classe apre gli argomenti del programma — dal contare le mele al teorema di Pitagora.",
    grade0: "Scuola dell'infanzia",
    grade1: "1ª elementare", grade2: "2ª elementare", grade3: "3ª elementare", grade4: "4ª elementare",
    grade5: "5ª elementare", grade6: "1ª media", grade7: "2ª media",
    ageLabel: "anni",
    featTitle: "Cosa sa fare zada4ko",
    f1t: "Risolvi online", f1d: "Scrivi la risposta e scopri subito se è giusta. Con punti, stelle e coriandoli.",
    f2t: "Stampa su carta", f2d: "Una scheda A4 pulita per i compiti o una verifica — con lo spazio per nome, data e voto.",
    f3t: "Soluzioni", f3d: "Una pagina a parte, solo per l'insegnante, con la risposta giusta a ogni esercizio.",
    f4t: "Varianti A / B / C", f4d: "Con un clic, versioni diverse della stessa verifica.",
    f5t: "Link da condividere", f5d: "Ogni scheda ha un codice. Condividi il link e tutti ricevono gli stessi esercizi.",
    f6t: "Problemi", f6d: "Situazioni di tutti i giorni con nomi, soldi, orari e distanze.",
    studioTitle: "Laboratorio di esercizi",
    studioLead: "Imposta la scheda a sinistra e guardala prendere forma a destra.",
    stepGrade: "Classe", stepTopics: "Argomenti", stepSettings: "Impostazioni",
    panelSetup: "Impostazioni della scheda",
    pickTopics: "Scegli gli argomenti",
    noTopics: "Scegli almeno un argomento a sinistra per vedere gli esercizi.",
    countLabel: "Esercizi", totalTasks: "Esercizi in tutto",
    titleLabel: "Titolo della scheda", titlePlaceholder: "Verifica di matematica",
    difficulty: "Difficoltà", diffEasy: "Facile", diffNormal: "Media", diffHard: "Difficile",
    maxNum: "Numeri fino a", maxAuto: "In base alla classe",
    colsAuto: "Automatico",
    cols1: "1 colonna", cols2: "2 colonne", cols3: "3 colonne", cols4: "4 colonne",
    columns: "Colonne in stampa", auto: "Auto",
    showKey: "Soluzioni", keyNone: "Senza soluzioni", keySame: "Sulla stessa scheda", keyPage: "Pagina a parte",
    workspace: "Spazio per i calcoli",
    spaceNone: "Nessuno (compatto)",
    spaceNormal: "Normale",
    spaceMore: "Di più",
    pagesWord: "pagine A4",
    pagesEst: "Numero stimato di pagine stampate",
    variants: "Varianti", variantsHint: "Stessi argomenti, numeri diversi — niente copiature.",
    points: "Punti per esercizio",
    seedLabel: "Codice della scheda", reshuffle: "Nuovi numeri",
    modeSolve: "Risolvi online", modePrint: "Scheda da stampare",
    btnPrint: "Stampa", btnPdf: "Salva in PDF", btnShare: "Copia il link",
    btnCheckAll: "Controlla tutto", btnNew: "Nuovi esercizi", btnHint: "Suggerimento",
    linkCopied: "Link copiato!",
    solveScore: "Punteggio", solveTime: "Tempo", solveStreak: "Serie",
    answerPh: "Risposta", check: "Controlla",
    correct: "Giusto! Ben fatto!", wrong: "Ops, non proprio.",
    correctIs: "La risposta giusta è", solutionIs: "Soluzione",
    resultTitle: "Finito!", resultSub: "Ecco com'è andata",
    ofTasks: "su", tryAgain: "Riprova", newTasks: "Nuovi esercizi", printThese: "Stampa questi",
    perfect: "Perfetto! Tutto giusto!", great: "Ottimo lavoro!",
    good: "Bene! Ancora un po' di allenamento.", keepGoing: "Non mollare — riprova!",
    teachTitle: "Pensato per insegnanti e genitori",
    teachLead: "Una verifica per tutta la classe in 30 secondi — con varianti e soluzioni.",
    t1: "Mescola gli argomenti in una sola scheda — tutti gli esercizi che ti servono",
    t2: "Varianti A, B, C con la stessa difficoltà",
    t3: "Punti per esercizio e casella per il voto",
    t4: "Stampa pulita in bianco e nero, senza sprecare inchiostro",
    t5: "Il codice della scheda ripropone gli stessi esercizi quando vuoi",
    t6: "Funziona offline dopo il primo caricamento",
    teachCta: "Prepara una verifica",
    progTitle: "I miei progressi", progLead: "Tutto resta in questo browser — senza registrazione.",
    progSolved: "Esercizi risolti", progCorrect: "Risposte giuste", progAccuracy: "Precisione",
    progSheets: "Schede create", progBadges: "Medaglie",
    byTopic: "Per argomento",
    progReset: "Azzera i progressi", progResetAsk: "Davvero? Tutti i progressi verranno cancellati.",
    progEmpty: "Nessun esercizio risolto per ora. Comincia subito!",
    aboutTitle: "Come funziona",
    a1t: "1. Scegli la classe", a1d: "Gli argomenti seguono il programma scolastico di quell'età.",
    a2t: "2. Scegli gli argomenti", a2d: "Mescola addizioni, frazioni, problemi e geometria come preferisci.",
    a3t: "3. Risolvi o stampa", a3d: "Online con correzione, oppure su carta con le soluzioni per l'insegnante.",
    footTagline: "Un generatore gratuito di schede di matematica per bambini, dalla scuola dell'infanzia alla 2ª media.",
    footLinks: "Link rapidi", footGrades: "Per classe",
    madeBy: "Creato da", idea: "Ispirato da Mitko",
    answersKey: "Soluzioni",
    sheetFoot: "zada4ko.com · schede di matematica per bambini",
    sheetName: "Nome", sheetClass: "Classe", sheetDate: "Data", sheetScore: "Voto",
    pts: "punti", variant: "Variante", taskWord: "esercizi", close: "Chiudi",
    instrSolve: "Calcola.", of: "su"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("it", {
  badges: {
    first: "Primo passo",
    ten: "10 risposte giuste",
    fifty: "50 risposte giuste",
    hundred: "100 risposte giuste",
    fivehund: "500 risposte giuste",
    streak5: "Serie di 5",
    streak15: "Serie di 15",
    perfect: "Scheda perfetta",
    perfect5: "5 schede perfette",
    explorer: "Curiosità",
    master: "Tutti gli argomenti",
    printer: "Schede stampate"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("it", {
  gen: {
    counting:  { name: "Contare", desc: "Conta gli oggetti e scrivi il numero", instr: "Conta e scrivi quanti sono." },
    addsub:    { name: "Addizione e sottrazione", desc: "Le operazioni di base, adatte alla classe" },
    columnar:  { name: "Operazioni in colonna", desc: "Scritte una sotto l'altra — perfette su carta", instr: "Calcola in colonna." },
    times:     { name: "Tabelline", desc: "Moltiplicazioni e divisioni fino a 100" },
    bigmuldiv: { name: "× e ÷ con più cifre", desc: "Oltre le tabelline, divisione con resto" },
    order:     { name: "Ordine delle operazioni", desc: "Espressioni con parentesi — cosa si calcola prima", instr: "Calcola rispettando l'ordine delle operazioni." },
    missing:   { name: "Il numero mancante", desc: "□ + 7 = 15 — quale numero si nasconde?", instr: "Trova il numero mancante." },
    compare:   { name: "Confrontare", desc: "Metti &lt;, &gt; o =", instr: "Inserisci &lt;, &gt; o = ." },
    sequence:  { name: "Successioni di numeri", desc: "Scopri la regola e continua", instr: "Trova la regola e scrivi il numero mancante." },
    rounding:  { name: "Arrotondare", desc: "Alle decine, alle centinaia, alle migliaia", instr: "Arrotonda il numero." },
    place:     { name: "Valore posizionale", desc: "Unità, decine, centinaia, migliaia", instr: "Rispondi alla domanda sul numero." }
  },
  msg: {
    "arith.countSol": "Conta uno alla volta: {n}.",

    // division with a remainder: "r" = resto
    "arith.remAnswer": "{q} r {r}",
    "arith.remHint": "scrivi “quoziente r resto”",
    "arith.remSol": "{dividend} : {d} = {q} (resto {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "ogni volta si aggiunge {step}",
    "arith.seqRuleSub": "ogni volta si toglie {step}",
    "arith.seqRuleMul": "ogni volta si moltiplica per {step}",
    "arith.seqRuleSquare": "sono i quadrati dei numeri",
    "arith.seqRuleFib": "ogni numero è la somma dei due precedenti",

    // rounding: {unit} already holds its preposition ("alla decina")
    "arith.roundQ": "Arrotonda {n} {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "alla decina", 100: "al centinaio", 1000: "al migliaio", 10000: "alla decina di migliaia" }[v.to];
    },

    // place value: "la cifra delle decine"
    "arith.placeDigitQ": "Qual è la cifra delle {place} in {n}?",
    "arith.placeName": function (v) {
      return ["unità", "decine", "centinaia", "migliaia", "decine di migliaia", "centinaia di migliaia"][v.pos];
    },
    "arith.placeSumQ": "Scomponi in unità, decine, centinaia…: {n}",
    "arith.placeFitQ": "Quante volte {m} sta in {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("it", {
  gen: {
    word: {
      name: "Problemi",
      desc: "Situazioni di tutti i giorni che fanno pensare",
      instr: "Leggi con attenzione e risolvi."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " ha " + Z.qty(v.a, v.th) + " e " + v.k1 + " ha " + Z.qty(v.b, v.th) +
        ". " + itQuanti(v.th) + v.th.pl + " hanno in tutto?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " ha " + Z.qty(v.a, v.th) + " e ne regala " + v.b + " a un amico. " + itQuanti(v.th) + v.th.pl +
        " restano a " + v.k + "?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " ha " + Z.qty(v.a, v.th) + ". " + v.k1 + " ne ha " + v.d + " in più. " + itQuanti(v.th) + v.th.pl +
        " hanno in tutto?";
    },
    "word.animalLegs": function (v, Z) {
      return "Nel cortile " + (v.n === 1 ? "c'è " : "ci sono ") + Z.qty(v.n, v.th) + ". Ogni animale ha " + v.legs +
        " zampe. Quante zampe ci sono in tutto?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v, Z) {
      return v.k + " compra " + Z.qty(v.n, v.th) + " a " + v.price + (v.th.f[2] === "f" ? " l'una" : " l'uno") +
        ". Quanto paga " + v.k + " in tutto?";
    },
    "word.change": function (v) {
      return v.k + " compra " + v.th.f[3] + v.th.sg + " che costa " + v.price + " e paga con " + v.paid +
        ". Quanto resto riceve " + v.k + "?";
    },
    "word.saveUp": "{k} mette da parte {week} ogni settimana. Dopo {weeks} settimane, {k} vuole comprare uno skateboard da {target}. Quanti soldi mancano ancora?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "In ognuna delle " + v.n + " scatole " + (v.per === 1 ? "c'è " : "ci sono ") + Z.qty(v.per, v.th) + ". " +
        itQuanti(v.th) + v.th.pl + " ci sono in tutto?";
    },
    "word.shareEqually": function (v) {
      return "Si dividono " + v.total + " " + v.th.pl + " in parti uguali tra " + v.kids + " bambini. " +
        itQuanti(v.th) + "ne riceve ogni bambino?";
    },
    "word.boxesRest": function (v, Z) {
      return "Abbiamo " + Z.qty(v.total, v.th) + ". In una scatola ne entrano " + v.per +
        ". Quante scatole si riempiono del tutto e " + itQuanti(v.th).toLowerCase() + v.th.pl +
        " avanzano? (scrivi “scatole r resto”)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} r {rest}",
    "word.solRemainder": "resto {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} legge {pages} pagine al giorno per {days} giorni. Il libro ha {total} pagine. Quante pagine restano da leggere?",
    "word.average": "Tre cestini contengono {a}, {b} e {c} frutti. In media, quanti frutti ci sono in un cestino?",
    "word.sumDiff": "{k0} e {k1} hanno in tutto {total} adesivi. {k0} ne ha {d} più di {k1}. Quanti adesivi ha {k0} e quanti {k1}? (scrivi il numero di {k0})",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "Il film inizia alle {start} e dura {dur} minuti. A che ora finisce? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": function (v) {
      return "Un'auto viaggia a " + v.speed + " km/h per " + v.hours + (String(v.hours) === "1" ? " ora" : " ore") +
        ". Quanti chilometri percorre?";
    },
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Un treno percorre {dist} km a una velocità media di {speed} km/h. Per quante ore viaggia?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Un negozio ha " + v.whole + " " + v.th.pl + " e ne vende " + v.frac + ". " + itQuanti(v.th) + v.th.pl +
        " vende?";
    },
    "word.fractionWhole": "{frac} di un numero è {part}. Qual è il numero?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": function (v) { return "Quanto fa " + itIl(v.p) + " di " + v.base + "?"; },
    "word.saleJacket": function (v) {
      return "Una giacca costa " + v.price + ". Con i saldi il prezzo scende " + itDel(v.p) + ". Qual è il nuovo prezzo?";
    },
    "word.pctStudents": "Su {whole} alunni, {part} fanno sport. Che percentuale è?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} operai finiscono un lavoro in {days} giorni. Quanti giorni servono a {more} operai che lavorano allo stesso ritmo?",
    "word.unitDays": "giorni",
    "word.motherAge": "Oggi una mamma ha {mult} volte l'età di suo figlio, che ha {child} anni. Quanti anni avrà la mamma tra {years} anni?",
    "word.consecutive": "La somma di tre numeri naturali consecutivi è {sum}. Qual è il più piccolo dei tre?",
    "word.pencilPacks": "Una scatola contiene {a} confezioni da {per1} matite e {b} confezioni da {per2} matite. Quante matite ci sono nella scatola?",
    "word.treeTaller": "Un albero è alto {small} m, un secondo albero è {times} volte più alto. Di quanti metri il secondo albero è più alto del primo?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("it", {
  gen: {
    clock: { name: "Leggere l'orologio", desc: "Guarda le lancette e scrivi l'ora", instr: "Che ore sono? Scrivi nella forma hh:mm." },
    units: { name: "Unità di misura", desc: "Trasforma cm, m, km, g, kg, l, minuti", instr: "Trasforma nell'unità indicata." },
    money: { name: "Soldi", desc: "Euro e centesimi, resto, spesa", instr: "Calcola la somma." },
    geometry: { name: "Geometria", desc: "Perimetro, area e volume delle figure", instr: "Guarda il disegno e calcola." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Che ore saranno tra {n} minuti?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "L'orologio segna {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": "gg",
    "measure.family.len": "lunghezza", "measure.family.mass": "massa",
    "measure.family.vol": "capacità", "measure.family.time": "tempo",

    // money — "euro" never changes in the plural
    "measure.cents": function (v) { return v.n === 1 ? "centesimo" : "centesimi"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n === 1 ? "centesimo" : "centesimi"); },
    "measure.coins": function (v) {
      return v.n + (v.n === 1 ? " moneta" : " monete") + " da " + v.c + (v.c === 1 ? " centesimo" : " centesimi");
    },
    "measure.moneyBox": "Nel salvadanaio ci sono {list}. Quanti centesimi ci sono in tutto?",
    "measure.eurToCents": "{eur} euro e {ct} centesimi = {blank} centesimi",
    "measure.change": "Compriamo due cose da {p1} e {p2} e paghiamo con una banconota da {paid}. Quanto resto riceviamo?",

    // geometry
    "measure.askPerim": "Calcola il perimetro (P).",
    "measure.askPerimSquare": "Un quadrato. Calcola il perimetro (P).",
    "measure.askArea": "Calcola l'area (S).",
    "measure.askAreaSquare": "Un quadrato. Calcola l'area (S).",
    "measure.askAreaTri": "Calcola l'area (S) del triangolo.",
    "measure.sideFromPerim": "Un rettangolo ha perimetro P = {p} {u} e un lato di {a} {u}. Quanto misura l'altro lato?",
    "measure.volCube": "Un cubo ha lo spigolo di {a} {u}. Calcola il volume (V).",
    "measure.volCuboid": "Un parallelepipedo misura {dims} {u}. Calcola il volume (V).",
    "measure.askCircumference": "Calcola la circonferenza (C). Usa π ≈ {pi}.",
    "measure.askAreaCircle": "Calcola l'area (S) del cerchio. Usa π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("it", {
  gen: {
    fractions:  { name: "Frazioni", desc: "Confrontare, semplificare, sommare e sottrarre", instr: "Calcola. Scrivi una frazione come 3/4." },
    decimals:   { name: "Numeri decimali", desc: "Calcoli con la virgola", instr: "Calcola." },
    percent:    { name: "Percentuali", desc: "Percentuale di un numero, sconto, aumento", instr: "Calcola." },
    divis:      { name: "Divisibilità e divisori", desc: "Criteri di divisibilità, numeri primi, MCD e mcm", instr: "Rispondi alla domanda." },
    powers:     { name: "Potenze e radici", desc: "Quadrati, cubi e radici quadrate", instr: "Calcola." },
    negatives:  { name: "Numeri negativi", desc: "Operazioni con i numeri relativi", instr: "Calcola." },
    equations:  { name: "Equazioni", desc: "Trova x — dalle più semplici a quelle con x da entrambe le parti", instr: "Risolvi l'equazione. Trova x." },
    algebra:    { name: "Espressioni e prodotti notevoli", desc: "Sviluppare le parentesi, prodotti notevoli", instr: "Calcola per i valori dati." },
    pythagoras: { name: "Teorema di Pitagora", desc: "Triangolo rettangolo — trova il lato mancante", instr: "Trova il lato mancante." },
    roman:      { name: "Numeri romani", desc: "Da I a MMXXV e viceversa", instr: "Scrivi in numeri arabi o romani." },
    logic:      { name: "Rompicapi", desc: "Indovinelli, numeri nascosti, logica", instr: "Pensaci bene e trova la risposta." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Semplifica: {f}",
    "adv.commonDenSol": "Denominatore comune {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Scrivi come frazione impropria: {f}",
    "adv.toMixed": "Scrivi come numero misto: {f}",
    /* extra accepted spelling of a mixed number, e.g. "2e1/3" */
    "adv.mixedAltAnd": "{w}e{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w} interi, resto {r} → {w} {r}/{d}",
    "adv.fractionOf": "Quanto fa {f} di {n}?",
    /* percent */
    "adv.percentOf": function (v) { var s = itIl(v.p); return s.charAt(0).toUpperCase() + s.slice(1) + " di " + v.n; },
    "adv.decreaseBy": function (v) { return "Diminuisci " + v.n + " " + itDel(v.p); },
    "adv.increaseBy": function (v) { return "Aumenta " + v.n + " " + itDel(v.p); },
    "adv.whatPercent": "Che percentuale di {n} è {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "sì",
    "adv.no": "no",
    "adv.isDivisible": "{n} è divisibile per {d}?",
    "adv.divRemainderSol": "{n} : {d} → resto {r}",
    "adv.isPrime": "{n} è un numero primo?",
    "adv.primeSol": "{n} è divisibile solo per 1 e per se stesso.",
    "adv.compositeSol": "{n} è divisibile anche per {d}.",
    "adv.gcdOf": "MCD({a}, {b})",
    "adv.gcdSol": "Il massimo comune divisore è {v}",
    "adv.lcmOf": "mcm({a}, {b})",
    "adv.lcmSol": "Il minimo comune multiplo è {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Per x = {x} calcola {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "Ho pensato un numero, l'ho moltiplicato per {m} e ho aggiunto {add}. Ho ottenuto {res}. Che numero avevo pensato?",
    "adv.chickensRabbits": "In un cortile ci sono galline e conigli: in tutto {heads} teste e {legs} zampe. Quanti conigli ci sono?",
    "adv.chickensRabbitsSol": "Se fossero tutte galline: {legs} zampe. La differenza {diff} : 2 = {b}",
    "adv.magicSquare": "Quadrato magico: ogni riga, colonna e diagonale ha somma {sum}. Quale numero manca?",
    "adv.magicSquareSol": "Somma di una riga {sum} → {v}",
    "adv.towers": "{kid} impila {n} cubetti in torri da {per}. Quante torri complete si costruiscono? (scrivi il numero di torri)",
    "adv.towersSol": "{n} : {per} = {q} r {r}"
  }
});
