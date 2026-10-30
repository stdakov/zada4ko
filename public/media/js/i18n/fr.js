/* ==========================================================================
   zada4ko.com — French (Français)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   Grades follow the French school system: preschool = maternelle,
   grade 1 = CP … grade 5 = CM2, grade 6 = 6e, grade 7 = 5e.
   ========================================================================== */
"use strict";

/* "de pommes" but "d'abeilles", "que Lucas" but "qu'Emma" (h is mute in
   every noun and name used here). */
var FR_V = /^[aeiouyhâàäéèêëîïôöœûùü]/i;
function frDe(w) { return (FR_V.test(w) ? "d'" : "de ") + w; }
function frQue(w) { return (FR_V.test(w) ? "qu'" : "que ") + w; }

/* ---- Formatting, kids' names, nouns ------------------------------------ */
/* noun layout: [singular, plural, gender "m" | "f"] */
Z.i18n.add("fr", {
  fmt: {
    dec: ",",
    and: " et ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    /* French uses the singular for 0 and 1 */
    qty: function (n, noun) { return n + " " + (n <= 1 ? noun.sg : noun.pl); }
  },
  kids: ["Lucas", "Emma", "Hugo", "Léa", "Louis", "Chloé", "Gabriel", "Manon", "Jules", "Camille",
         "Inès", "Arthur", "Nathan", "Zoé", "Adam", "Alice", "Raphaël", "Jade", "Théo", "Louise"],
  nouns: {
    apple: ["pomme", "pommes", "f"], banana: ["banane", "bananes", "f"], pencil: ["crayon", "crayons", "m"],
    balloon: ["ballon", "ballons", "m"], book: ["livre", "livres", "m"], sweet: ["bonbon", "bonbons", "m"],
    ball: ["balle", "balles", "f"], flower: ["fleur", "fleurs", "f"], sticker: ["autocollant", "autocollants", "m"],
    nut: ["noix", "noix", "f"], strawberry: ["fraise", "fraises", "f"], cube: ["cube", "cubes", "m"],
    cat: ["chat", "chats", "m"], dog: ["chien", "chiens", "m"], bunny: ["lapin", "lapins", "m"], chick: ["poussin", "poussins", "m"],
    fish: ["poisson", "poissons", "m"], butterfly: ["papillon", "papillons", "m"], ant: ["fourmi", "fourmis", "f"], bee: ["abeille", "abeilles", "f"],
    notebook: ["cahier", "cahiers", "m"], backpack: ["sac à dos", "sacs à dos", "m"], puzzle: ["puzzle", "puzzles", "m"],
    umbrella: ["parapluie", "parapluies", "m"], cap: ["casquette", "casquettes", "f"], toy: ["jouet", "jouets", "m"], mug: ["tasse", "tasses", "f"],
    icecream: ["glace", "glaces", "f"], ticket: ["billet", "billets", "m"], plantpot: ["pot de fleurs", "pots de fleurs", "m"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("fr", {
  ui: {
    /* teachers: ready-made tests · about: privacy note */
    readyT1: "CP–CE1",
    readyT2: "CE2–CM1",
    readyT3: "CM2–6e",
    readyT4: "5e",
    readyD1: "Additions et soustractions jusqu'à 100, comparaisons, problèmes, lecture de l'heure.",
    readyD2: "Multiplications et divisions, priorités des opérations, unités de mesure, aire et périmètre.",
    readyD3: "Fractions, nombres décimaux, pourcentages, équations, volume et aire.",
    readyD4: "Équations, expressions, puissances, théorème de Pythagore, problèmes.",
    btnOpen: "Ouvrir",
    privacyT: "Sans inscription, sans publicité dans les exercices.",
    privacyD: "La progression reste uniquement dans le navigateur de cet appareil et ne quitte jamais l'ordinateur. Une fois chargé, le site fonctionne aussi hors ligne.",
    /* search engines: title and description of /fr/ */
    seoTitle: "Exercices de maths pour enfants, du CP à la 5e — à imprimer et en ligne | zada4ko",
    seoDesc: "zada4ko est un générateur gratuit d'exercices de maths pour les enfants, de la maternelle à la 5e : additions et soustractions, tables de multiplication, fractions, problèmes, géométrie. À faire en ligne ou à imprimer avec le corrigé.",
    docTitle: "zada4ko — exercices de maths pour enfants",
    language: "Langue",
    gshort0: "Mat", gshort1: "CP", gshort2: "CE1", gshort3: "CE2", gshort4: "CM1", gshort5: "CM2", gshort6: "6e", gshort7: "5e",
    answerLabel: "Réponse :",
    variantLetters: "ABCD",
    brandSub: "les maths pour les enfants",
    navHome: "Accueil", navStudio: "Créer des exercices", navTeachers: "Enseignants",
    navProgress: "Mes progrès", navAbout: "Comment ça marche", menu: "Menu",
    heroBadge: "De nouveaux exercices à chaque clic",
    heroTitle: "Des maths à volonté pour les",
    heroTitleHl: "enfants curieux",
    heroLead:
      "Choisis une classe et des thèmes, et obtiens une fiche prête à l'emploi. Résous-la en ligne avec correction immédiate, ou imprime-la pour un contrôle, les devoirs ou un peu d'entraînement.",
    heroCta1: "Créer des exercices",
    heroCta2: "Démarrage rapide : CP",
    stat1: "types d'exercices", stat2: "niveaux", stat3: "combinaisons",
    gradesTitle: "En quelle classe est l'enfant ?",
    topicsTitle: "Exercices par classe et par thème",
    gradesLead: "Chaque classe ouvre les thèmes du programme — du comptage de pommes au théorème de Pythagore.",
    grade0: "Maternelle",
    grade1: "CP", grade2: "CE1", grade3: "CE2", grade4: "CM1",
    grade5: "CM2", grade6: "6e", grade7: "5e",
    ageLabel: "ans",
    featTitle: "Ce que zada4ko sait faire",
    f1t: "Résoudre en ligne", f1d: "Écris la réponse et découvre tout de suite si c'est juste. Points, étoiles et confettis en prime.",
    f2t: "Imprimer sur papier", f2d: "Une fiche A4 bien nette pour les devoirs ou un contrôle — avec de la place pour le nom, la date et la note.",
    f3t: "Corrigé", f3d: "Une page à part, réservée à l'enseignant, avec la bonne réponse à chaque exercice.",
    f4t: "Variantes A / B / C", f4d: "En un clic, plusieurs versions différentes du même contrôle.",
    f5t: "Lien à partager", f5d: "Chaque fiche a un code. Partage le lien et tout le monde reçoit les mêmes exercices.",
    f6t: "Problèmes", f6d: "Des situations de la vie de tous les jours, avec des prénoms, de l'argent, des horaires et des distances.",
    studioTitle: "Atelier d'exercices",
    studioLead: "Règle la fiche à gauche et regarde-la se construire à droite.",
    stepGrade: "Classe", stepTopics: "Thèmes", stepSettings: "Réglages",
    panelSetup: "Réglages de la fiche",
    pickTopics: "Choisis les thèmes",
    noTopics: "Choisis au moins un thème à gauche pour voir les exercices.",
    countLabel: "Exercices", totalTasks: "Total des exercices",
    titleLabel: "Titre de la fiche", titlePlaceholder: "Contrôle de maths",
    difficulty: "Difficulté", diffEasy: "Facile", diffNormal: "Moyen", diffHard: "Difficile",
    maxNum: "Nombres jusqu'à", maxAuto: "Selon la classe",
    colsAuto: "Automatique",
    cols1: "1 colonne", cols2: "2 colonnes", cols3: "3 colonnes", cols4: "4 colonnes",
    columns: "Colonnes à l'impression", auto: "Auto",
    showKey: "Corrigé", keyNone: "Sans corrigé", keySame: "Sur la même fiche", keyPage: "Page à part",
    workspace: "Espace pour les calculs",
    spaceNone: "Aucun (compact)",
    spaceNormal: "Normal",
    spaceMore: "Plus grand",
    pagesWord: "pages A4",
    pagesEst: "Nombre estimé de pages imprimées",
    variants: "Variantes", variantsHint: "Mêmes thèmes, autres nombres — impossible de copier.",
    points: "Points par exercice",
    seedLabel: "Code de la fiche", reshuffle: "Nouveaux nombres",
    modeSolve: "Résoudre en ligne", modePrint: "Fiche à imprimer",
    btnPrint: "Imprimer", btnPdf: "Enregistrer en PDF", btnShare: "Copier le lien",
    btnCheckAll: "Tout vérifier", btnNew: "Nouveaux exercices", btnHint: "Indice",
    linkCopied: "Lien copié !",
    solveScore: "Score", solveTime: "Temps", solveStreak: "Série",
    answerPh: "Réponse", check: "Vérifier",
    correct: "Bravo, c'est juste !", wrong: "Oups, pas tout à fait.",
    correctIs: "La bonne réponse est", solutionIs: "Solution",
    resultTitle: "C'est fini !", resultSub: "Voici ton résultat",
    ofTasks: "sur", tryAgain: "Réessayer", newTasks: "Nouveaux exercices", printThese: "Imprimer ces exercices",
    perfect: "Parfait ! Tout est juste !", great: "Excellent travail !",
    good: "Bien joué ! Encore un peu d'entraînement.", keepGoing: "N'abandonne pas — réessaie !",
    teachTitle: "Pensé pour les enseignants et les parents",
    teachLead: "Un contrôle complet pour toute la classe en 30 secondes — avec variantes et corrigé.",
    t1: "Mélange les thèmes sur une même fiche — autant d'exercices qu'il t'en faut",
    t2: "Variantes A, B, C de même difficulté",
    t3: "Points par exercice et case pour la note",
    t4: "Impression nette en noir et blanc, sans gaspiller d'encre",
    t5: "Le code de la fiche redonne les mêmes exercices à tout moment",
    t6: "Fonctionne hors ligne après le premier chargement",
    teachCta: "Créer un contrôle",
    progTitle: "Mes progrès", progLead: "Tout reste dans ce navigateur — sans inscription.",
    progSolved: "Exercices résolus", progCorrect: "Bonnes réponses", progAccuracy: "Réussite",
    progSheets: "Fiches créées", progBadges: "Badges",
    byTopic: "Par thème",
    progReset: "Effacer les progrès", progResetAsk: "Vraiment ? Tous les progrès seront effacés.",
    progEmpty: "Aucun exercice résolu pour l'instant. Lance-toi !",
    aboutTitle: "Comment ça marche",
    a1t: "1. Choisis une classe", a1d: "Les thèmes suivent le programme scolaire de cet âge.",
    a2t: "2. Choisis les thèmes", a2d: "Mélange additions, fractions, problèmes et géométrie comme tu veux.",
    a3t: "3. Résous ou imprime", a3d: "En ligne avec correction, ou sur papier avec un corrigé pour l'enseignant.",
    footTagline: "Un générateur gratuit de fiches de maths pour les enfants, de la maternelle à la 5e.",
    footLinks: "Liens rapides", footGrades: "Par classe",
    madeBy: "Créé par", idea: "Inspiré par Mitko",
    answersKey: "Corrigé",
    sheetFoot: "zada4ko.com · fiches de maths pour enfants",
    sheetName: "Nom", sheetClass: "Classe", sheetDate: "Date", sheetScore: "Note",
    pts: "pts", variant: "Variante", taskWord: "exercices", close: "Fermer",
    instrSolve: "Calcule.", of: "sur"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("fr", {
  badges: {
    first: "Premier pas",
    ten: "10 bonnes réponses",
    fifty: "50 bonnes réponses",
    hundred: "100 bonnes réponses",
    fivehund: "500 bonnes réponses",
    streak5: "Série de 5",
    streak15: "Série de 15",
    perfect: "Fiche parfaite",
    perfect5: "5 fiches parfaites",
    explorer: "Curiosité",
    master: "Tous les thèmes",
    printer: "Fiches imprimées"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("fr", {
  gen: {
    counting:  { name: "Compter", desc: "Compte les objets et écris le nombre", instr: "Compte et écris combien il y en a." },
    addsub:    { name: "Addition et soustraction", desc: "Les opérations de base, selon le niveau de la classe" },
    columnar:  { name: "Opérations posées", desc: "Écrites l'une sous l'autre — idéal sur papier", instr: "Pose et calcule." },
    times:     { name: "Tables de multiplication", desc: "Multiplication et division jusqu'à 100" },
    bigmuldiv: { name: "× et ÷ à plusieurs chiffres", desc: "Au-delà des tables, division avec reste" },
    order:     { name: "Priorités de calcul", desc: "Expressions avec parenthèses — que calculer d'abord ?", instr: "Calcule en respectant les priorités." },
    missing:   { name: "Le nombre manquant", desc: "□ + 7 = 15 — quel nombre se cache ?", instr: "Trouve le nombre manquant." },
    compare:   { name: "Comparer", desc: "Place &lt;, &gt; ou =", instr: "Écris &lt;, &gt; ou = ." },
    sequence:  { name: "Suites de nombres", desc: "Trouve la règle et continue", instr: "Trouve la règle et écris le nombre manquant." },
    rounding:  { name: "Arrondir", desc: "À la dizaine, à la centaine, au millier", instr: "Arrondis le nombre." },
    place:     { name: "Valeur des chiffres", desc: "Unités, dizaines, centaines, milliers", instr: "Réponds à la question sur le nombre." }
  },
  msg: {
    "arith.countSol": "Compte un par un : {n}.",

    // division with a remainder: "r" = reste
    "arith.remAnswer": "{q} r {r}",
    "arith.remHint": "écris « quotient r reste »",
    "arith.remSol": "{dividend} : {d} = {q} (reste {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "on ajoute {step} à chaque fois",
    "arith.seqRuleSub": "on enlève {step} à chaque fois",
    "arith.seqRuleMul": "on multiplie par {step} à chaque fois",
    "arith.seqRuleSquare": "ce sont les carrés des nombres",
    "arith.seqRuleFib": "chaque nombre est la somme des deux précédents",

    // rounding: {unit} already holds its preposition ("à la dizaine", "au millier")
    "arith.roundQ": "Arrondis {n} {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "à la dizaine", 100: "à la centaine", 1000: "au millier", 10000: "à la dizaine de milliers" }[v.to];
    },

    // place value: "le chiffre des dizaines"
    "arith.placeDigitQ": "Quel est le chiffre des {place} dans {n} ?",
    "arith.placeName": function (v) {
      return ["unités", "dizaines", "centaines", "milliers", "dizaines de milliers", "centaines de milliers"][v.pos];
    },
    "arith.placeSumQ": "Décompose selon la valeur des chiffres : {n}",
    "arith.placeFitQ": "Combien de fois {m} est-il contenu dans {big} ?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("fr", {
  gen: {
    word: {
      name: "Problèmes",
      desc: "Des situations de la vie qui font réfléchir",
      instr: "Lis attentivement et résous."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " a " + Z.qty(v.a, v.th) + " et " + v.k1 + " a " + Z.qty(v.b, v.th) +
        ". Combien " + frDe(v.th.pl) + " y a-t-il en tout ?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " a " + Z.qty(v.a, v.th) + " et en donne " + v.b + " à un ami. Combien " + frDe(v.th.pl) +
        " reste-t-il à " + v.k + " ?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " a " + Z.qty(v.a, v.th) + ". " + v.k1 + " en a " + v.d + " de plus. Combien " + frDe(v.th.pl) +
        " y a-t-il en tout ?";
    },
    "word.animalLegs": function (v, Z) {
      return "Dans la cour, il y a " + Z.qty(v.n, v.th) + ". Chaque animal a " + v.legs +
        " pattes. Combien de pattes y a-t-il en tout ?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v, Z) {
      return v.k + " achète " + Z.qty(v.n, v.th) + " à " + v.price + " pièce. Combien paie " + v.k + " en tout ?";
    },
    "word.change": function (v) {
      return v.k + " achète " + (v.th.f[2] === "f" ? "une " : "un ") + v.th.sg + " qui coûte " + v.price +
        " et paie avec " + v.paid + ". Combien d'argent rend-on à " + v.k + " ?";
    },
    "word.saveUp": "{k} met {week} de côté chaque semaine. Au bout de {weeks} semaines, {k} veut s'acheter un skateboard à {target}. Combien d'argent manque-t-il encore ?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "Dans chacune des " + v.n + " boîtes, il y a " + Z.qty(v.per, v.th) + ". Combien " + frDe(v.th.pl) +
        " y a-t-il en tout ?";
    },
    "word.shareEqually": function (v) {
      return "On partage " + v.total + " " + v.th.pl + " à parts égales entre " + v.kids +
        " enfants. Combien chaque enfant en reçoit-il ?";
    },
    "word.boxesRest": function (v, Z) {
      return "On a " + Z.qty(v.total, v.th) + ". Une boîte peut en contenir " + v.per +
        ". Combien de boîtes pleines obtient-on et combien " + frDe(v.th.pl) + " reste-t-il ? (écris « boîtes r reste »)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} r {rest}",
    "word.solRemainder": "reste {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} lit {pages} pages par jour pendant {days} jours. Le livre a {total} pages. Combien de pages reste-t-il à lire ?",
    "word.average": "Trois paniers contiennent {a}, {b} et {c} fruits. Combien de fruits y a-t-il en moyenne dans un panier ?",
    "word.sumDiff": function (v) {
      return v.k0 + " et " + v.k1 + " ont ensemble " + v.total + " autocollants. " + v.k0 + " en a " + v.d +
        " de plus " + frQue(v.k1) + ". Combien d'autocollants a chaque enfant ? (écris le nombre " + frDe(v.k0) + ")";
    },

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "Le film commence à {start} et dure {dur} minutes. À quelle heure se termine-t-il ? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": function (v) {
      var h = parseFloat(String(v.hours).replace(",", "."));
      return "Une voiture roule à " + v.speed + " km/h pendant " + v.hours + (h < 2 ? " heure" : " heures") +
        ". Quelle distance parcourt-elle ?";
    },
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Un train parcourt {dist} km à une vitesse moyenne de {speed} km/h. Combien d'heures dure le trajet ?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Un magasin a " + v.whole + " " + v.th.pl + ". Il en vend " + v.frac + ". Combien " + frDe(v.th.pl) +
        " vend-il ?";
    },
    "word.fractionWhole": "{frac} d'un nombre, c'est {part}. Quel est ce nombre ?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Combien font {p} % de {base} ?",
    "word.saleJacket": "Une veste coûte {price}. Pendant les soldes, son prix baisse de {p} %. Quel est le nouveau prix ?",
    "word.pctStudents": "Sur {whole} élèves, {part} font du sport. Quel pourcentage cela représente-t-il ?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} ouvriers terminent un travail en {days} jours. Combien de jours faudra-t-il à {more} ouvriers qui travaillent au même rythme ?",
    "word.unitDays": "jours",
    "word.motherAge": "Aujourd'hui, une maman a {mult} fois l'âge de son fils, qui a {child} ans. Quel âge aura la maman dans {years} ans ?",
    "word.consecutive": "La somme de trois nombres entiers consécutifs est {sum}. Quel est le plus petit des trois ?",
    "word.pencilPacks": "Une boîte contient {a} paquets de {per1} crayons et {b} paquets de {per2} crayons. Combien de crayons y a-t-il dans la boîte ?",
    "word.treeTaller": "Un arbre mesure {small} m de haut, un deuxième est {times} fois plus haut. De combien de mètres le deuxième arbre est-il plus haut que le premier ?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("fr", {
  gen: {
    clock: { name: "Lire l'heure", desc: "Lis les aiguilles et écris l'heure", instr: "Quelle heure est-il ? Écris sous la forme hh:mm." },
    units: { name: "Unités de mesure", desc: "Convertis cm, m, km, g, kg, l, minutes", instr: "Convertis dans l'unité demandée." },
    money: { name: "L'argent", desc: "Euros et centimes, monnaie, achats", instr: "Calcule la somme." },
    geometry: { name: "Géométrie", desc: "Périmètre, aire et volume des figures", instr: "Observe le dessin et calcule." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Quelle heure sera-t-il dans {n} minutes ?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "L'horloge indique {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": "j",
    "measure.family.len": "longueur", "measure.family.mass": "masse",
    "measure.family.vol": "contenance", "measure.family.time": "durée",

    // money — euro cents are "centimes" for French children
    "measure.cents": function (v) { return v.n <= 1 ? "centime" : "centimes"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n <= 1 ? "centime" : "centimes"); },
    "measure.coins": function (v) {
      return v.n + (v.n === 1 ? " pièce" : " pièces") + " de " + v.c + (v.c === 1 ? " centime" : " centimes");
    },
    "measure.moneyBox": "Une tirelire contient {list}. Combien de centimes y a-t-il en tout ?",
    "measure.eurToCents": function (v) {
      return v.eur + (v.eur === 1 ? " euro" : " euros") + " et " + v.ct + " centimes = " + v.blank + " centimes";
    },
    "measure.change": "On achète deux articles à {p1} et {p2} et on paie avec un billet de {paid}. Combien d'argent nous rend-on ?",

    // geometry
    "measure.askPerim": "Calcule le périmètre (P).",
    "measure.askPerimSquare": "Un carré. Calcule son périmètre (P).",
    "measure.askArea": "Calcule l'aire (S).",
    "measure.askAreaSquare": "Un carré. Calcule son aire (S).",
    "measure.askAreaTri": "Calcule l'aire (S) du triangle.",
    "measure.sideFromPerim": "Un rectangle a un périmètre P = {p} {u} et un côté de {a} {u}. Combien mesure l'autre côté ?",
    "measure.volCube": "Un cube a une arête de {a} {u}. Calcule son volume (V).",
    "measure.volCuboid": "Un pavé droit mesure {dims} {u}. Calcule son volume (V).",
    "measure.askCircumference": "Calcule le périmètre du cercle (C). Prends π ≈ {pi}.",
    "measure.askAreaCircle": "Calcule l'aire (S) du disque. Prends π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("fr", {
  gen: {
    fractions:  { name: "Fractions", desc: "Comparer, simplifier, additionner et soustraire", instr: "Calcule. Écris une fraction comme 3/4." },
    decimals:   { name: "Nombres décimaux", desc: "Calculs avec des nombres à virgule", instr: "Calcule." },
    percent:    { name: "Pourcentages", desc: "Pourcentage d'un nombre, réduction, augmentation", instr: "Calcule." },
    divis:      { name: "Divisibilité et diviseurs", desc: "Critères de divisibilité, nombres premiers, PGCD et PPCM", instr: "Réponds à la question." },
    powers:     { name: "Puissances et racines", desc: "Carrés, cubes et racines carrées", instr: "Calcule." },
    negatives:  { name: "Nombres négatifs", desc: "Calculs avec les nombres relatifs", instr: "Calcule." },
    equations:  { name: "Équations", desc: "Trouve x — des plus simples à celles avec x des deux côtés", instr: "Résous l'équation. Trouve x." },
    algebra:    { name: "Expressions et identités", desc: "Développer, identités remarquables", instr: "Calcule pour les valeurs données." },
    pythagoras: { name: "Théorème de Pythagore", desc: "Triangle rectangle — trouve le côté manquant", instr: "Trouve le côté manquant." },
    roman:      { name: "Chiffres romains", desc: "De I à MMXXV et inversement", instr: "Écris en chiffres arabes ou en chiffres romains." },
    logic:      { name: "Casse-têtes", desc: "Énigmes, nombres cachés, logique", instr: "Réfléchis bien et trouve la réponse." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Simplifie : {f}",
    "adv.commonDenSol": "Dénominateur commun {lcm} : {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Écris sous la forme d'une seule fraction : {f}",
    "adv.toMixed": "Extrais la partie entière : {f}",
    /* extra accepted spelling of a mixed number, e.g. "2et1/3" */
    "adv.mixedAltAnd": "{w}et{n}/{d}",
    "adv.toMixedSol": "{imp} : {d} = {w}, reste {r} → {w} {r}/{d}",
    "adv.fractionOf": "Combien font {f} de {n} ?",
    /* percent */
    "adv.percentOf": "{p} % de {n}",
    "adv.decreaseBy": "Diminue {n} de {p} %",
    "adv.increaseBy": "Augmente {n} de {p} %",
    "adv.whatPercent": "Quel pourcentage de {n} représente {part} ?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "oui",
    "adv.no": "non",
    "adv.isDivisible": "{n} est-il divisible par {d} ?",
    "adv.divRemainderSol": "{n} : {d} → reste {r}",
    "adv.isPrime": "{n} est-il un nombre premier ?",
    "adv.primeSol": "{n} n'est divisible que par 1 et par lui-même.",
    "adv.compositeSol": "{n} est aussi divisible par {d}.",
    "adv.gcdOf": "PGCD({a}, {b})",
    "adv.gcdSol": "Le plus grand diviseur commun est {v}",
    "adv.lcmOf": "PPCM({a}, {b})",
    "adv.lcmSol": "Le plus petit multiple commun est {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Pour x = {x}, calcule {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "J'ai pensé à un nombre, je l'ai multiplié par {m} et j'ai ajouté {add}. J'ai obtenu {res}. Quel était mon nombre ?",
    "adv.chickensRabbits": "Dans une cour, il y a des poules et des lapins : {heads} têtes et {legs} pattes en tout. Combien y a-t-il de lapins ?",
    "adv.chickensRabbitsSol": "Si c'étaient toutes des poules : {legs} pattes. La différence {diff} : 2 = {b}",
    "adv.magicSquare": "Carré magique : chaque ligne, chaque colonne et chaque diagonale a pour somme {sum}. Quel nombre manque ?",
    "adv.magicSquareSol": "Somme d'une ligne {sum} → {v}",
    "adv.towers": "{kid} empile {n} cubes en tours de {per}. Combien de tours complètes obtient-on ? (écris le nombre de tours)",
    "adv.towersSol": "{n} : {per} = {q} r {r}"
  }
});
