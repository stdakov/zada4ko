/* ==========================================================================
   zada4ko.com — Greek (Ελληνικά)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   ========================================================================== */
"use strict";

/* ---- Grammar helpers (Greek only) -------------------------------------- */
/*
   Noun layout: [nominative singular, nominative plural, gender, accusative
   singular?, accusative plural?]. gender is "m" / "f" / "n". The accusative
   forms are only needed for masculine nouns; when missing, the nominative is
   used (neuter and feminine nouns have the same form in both cases).

   Names take an article in Greek ("ο Γιώργος", "η Μαρία"), so every kid name
   has its gender in KID_G below; ELG.nom / ELG.acc add the right article.
*/
var ELG = (function () {
  var KID_G = {
    "Γιώργος": "m", "Μαρία": "f", "Νίκος": "m", "Ελένη": "f", "Δημήτρης": "m",
    "Κατερίνα": "f", "Γιάννης": "m", "Σοφία": "f", "Κώστας": "m", "Ζωή": "f",
    "Αλέξανδρος": "m", "Αναστασία": "f", "Παναγιώτης": "m", "Δανάη": "f", "Θοδωρής": "m",
    "Ιωάννα": "f", "Άγγελος": "m", "Χριστίνα": "f", "Στέλιος": "m", "Μυρτώ": "f"
  };
  function kg(k) { return KID_G[k] || "m"; }
  // "την" before a vowel and before κ π τ ξ ψ μπ ντ γκ τσ τζ, otherwise "τη"
  function tin(word) {
    return /^([αεηιουωάέήίόύώκπτξψ]|μπ|ντ|γκ|τσ|τζ)/i.test(word) ? "την " : "τη ";
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function g(th) { return (th.f && th.f[2]) || "n"; }
  return {
    /** "ο Γιώργος" / "η Μαρία"; capital article when big is true */
    nom: function (k, big) { var s = (kg(k) === "m" ? "ο " : "η ") + k; return big ? cap(s) : s; },
    /** "τον Γιώργο" / "τη Μαρία" */
    acc: function (k) { return kg(k) === "m" ? "τον " + k.replace(/ς$/, "") : tin(k) + k; },
    /** "πόσα" / "πόσες" / "πόσους" (accusative) or "πόσοι" (nominative) */
    posa: function (th, nomCase, big) {
      var s = { n: "πόσα", f: "πόσες", m: nomCase ? "πόσοι" : "πόσους" }[g(th)];
      return big ? cap(s) : s;
    },
    /** "αυτά" / "αυτές" / "αυτούς" (accusative plural) */
    them: function (th) { return { n: "αυτά", f: "αυτές", m: "αυτούς" }[g(th)]; },
    /** "ένα μήλο" / "μία μπάλα" / "έναν βόλο" (accusative singular) */
    oneAcc: function (th) {
      return { n: "ένα ", f: "μία ", m: "έναν " }[g(th)] + ((th.f && th.f[3]) || th.sg);
    },
    /** accusative plural of the noun */
    plAcc: function (th) { return (th.f && th.f[4]) || th.pl; },
    /** "το" before a fraction 1/d, "τα" otherwise (the numerator is in <sup>) */
    fracArt: function (fr) { var m = /<sup>(\d+)<\/sup>/.exec(String(fr)); return m && m[1] === "1" ? "το" : "τα"; },
    cap: cap
  };
})();

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("el", {
  fmt: {
    dec: ",",
    and: " και ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Γιώργος", "Μαρία", "Νίκος", "Ελένη", "Δημήτρης", "Κατερίνα", "Γιάννης", "Σοφία", "Κώστας", "Ζωή",
         "Αλέξανδρος", "Αναστασία", "Παναγιώτης", "Δανάη", "Θοδωρής", "Ιωάννα", "Άγγελος", "Χριστίνα", "Στέλιος", "Μυρτώ"],
  /* [singular, plural, gender] — see the layout note at the top */
  nouns: {
    apple: ["μήλο", "μήλα", "n"], banana: ["μπανάνα", "μπανάνες", "f"], pencil: ["μολύβι", "μολύβια", "n"],
    balloon: ["μπαλόνι", "μπαλόνια", "n"], book: ["βιβλίο", "βιβλία", "n"], sweet: ["καραμέλα", "καραμέλες", "f"],
    ball: ["μπάλα", "μπάλες", "f"], flower: ["λουλούδι", "λουλούδια", "n"], sticker: ["αυτοκόλλητο", "αυτοκόλλητα", "n"],
    nut: ["καρύδι", "καρύδια", "n"], strawberry: ["φράουλα", "φράουλες", "f"], cube: ["κυβάκι", "κυβάκια", "n"],
    cat: ["γάτα", "γάτες", "f"], dog: ["σκυλάκι", "σκυλάκια", "n"], bunny: ["κουνελάκι", "κουνελάκια", "n"],
    chick: ["κλωσοπουλάκι", "κλωσοπουλάκια", "n"],
    fish: ["ψαράκι", "ψαράκια", "n"], butterfly: ["πεταλούδα", "πεταλούδες", "f"], ant: ["μυρμήγκι", "μυρμήγκια", "n"],
    bee: ["μέλισσα", "μέλισσες", "f"],
    notebook: ["τετράδιο", "τετράδια", "n"], backpack: ["σακίδιο", "σακίδια", "n"], puzzle: ["παζλ", "παζλ", "n"],
    umbrella: ["ομπρέλα", "ομπρέλες", "f"], cap: ["καπέλο", "καπέλα", "n"], toy: ["παιχνίδι", "παιχνίδια", "n"],
    mug: ["κούπα", "κούπες", "f"],
    icecream: ["παγωτό", "παγωτά", "n"], ticket: ["εισιτήριο", "εισιτήρια", "n"], plantpot: ["γλάστρα", "γλάστρες", "f"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("el", {
  ui: {
    docTitle: "zada4ko — ασκήσεις μαθηματικών για παιδιά",
    language: "Γλώσσα",
    gshort0: "Νηπ.", gshort1: "Α΄", gshort2: "Β΄", gshort3: "Γ΄", gshort4: "Δ΄", gshort5: "Ε΄", gshort6: "ΣΤ΄", gshort7: "Α΄Γ",
    answerLabel: "Απάντηση:",
    variantLetters: "ΑΒΓΔ",
      brandSub: "μαθηματικά για παιδιά",
    navHome: "Αρχική", navStudio: "Φτιάξε ασκήσεις", navTeachers: "Για εκπαιδευτικούς",
    navProgress: "Η πρόοδός μου", navAbout: "Πώς λειτουργεί", menu: "Μενού",
    heroBadge: "Νέες ασκήσεις με κάθε κλικ",
    heroTitle: "Ατελείωτη εξάσκηση στα μαθηματικά για",
    heroTitleHl: "περίεργα μυαλά",
    heroLead:
      "Διάλεξε τάξη και θέματα και πάρε έτοιμο φύλλο εργασίας. Λύσε το online με άμεσο έλεγχο ή τύπωσέ το για διαγώνισμα, εργασία για το σπίτι ή επιπλέον εξάσκηση.",
    heroCta1: "Φτιάξε ασκήσεις",
    heroCta2: "Γρήγορη αρχή: Α΄ Δημοτικού",
    stat1: "είδη ασκήσεων", stat2: "τάξεις", stat3: "συνδυασμοί",
    gradesTitle: "Σε ποια τάξη πηγαίνει το παιδί;",
    topicsTitle: "Ασκήσεις ανά τάξη και θέμα",
    gradesLead: "Κάθε τάξη ξεκλειδώνει τα θέματα της ύλης — από το μέτρημα μήλων μέχρι το Πυθαγόρειο θεώρημα.",
    grade0: "Νηπιαγωγείο",
    grade1: "Α΄ Δημοτικού", grade2: "Β΄ Δημοτικού", grade3: "Γ΄ Δημοτικού", grade4: "Δ΄ Δημοτικού",
    grade5: "Ε΄ Δημοτικού", grade6: "ΣΤ΄ Δημοτικού", grade7: "Α΄ Γυμνασίου",
    ageLabel: "ετών",
    featTitle: "Τι μπορεί να κάνει το zada4ko",
    f1t: "Λύσε online", f1d: "Γράψε την απάντηση και μάθε αμέσως αν είναι σωστή. Με πόντους, αστέρια και κομφετί.",
    f2t: "Τύπωσε σε χαρτί", f2d: "Ένα καθαρό φύλλο A4 για το σπίτι ή για διαγώνισμα — με θέση για όνομα, ημερομηνία και βαθμό.",
    f3t: "Λύσεις", f3d: "Ξεχωριστή σελίδα μόνο για τον εκπαιδευτικό, με τη σωστή απάντηση σε κάθε άσκηση.",
    f4t: "Ομάδες Α / Β / Γ", f4d: "Με ένα κλικ φτιάχνεις διαφορετικές εκδοχές του ίδιου διαγωνίσματος.",
    f5t: "Σύνδεσμος για κοινοποίηση", f5d: "Κάθε φύλλο έχει έναν κωδικό. Μοιράσου τον σύνδεσμο και όλοι παίρνουν τις ίδιες ασκήσεις.",
    f6t: "Προβλήματα", f6d: "Καταστάσεις από την καθημερινή ζωή με ονόματα, χρήματα, χρόνο και αποστάσεις.",
    studioTitle: "Εργαστήρι ασκήσεων",
    studioLead: "Ρύθμισε το φύλλο αριστερά και δες το να φτιάχνεται δεξιά.",
    stepGrade: "Τάξη", stepTopics: "Θέματα", stepSettings: "Ρυθμίσεις",
    panelSetup: "Ρυθμίσεις φύλλου",
    pickTopics: "Διάλεξε θέματα",
    noTopics: "Διάλεξε τουλάχιστον ένα θέμα αριστερά για να εμφανιστούν ασκήσεις.",
    countLabel: "Ασκήσεις", totalTasks: "Σύνολο ασκήσεων",
    titleLabel: "Τίτλος φύλλου", titlePlaceholder: "Διαγώνισμα στα μαθηματικά",
    difficulty: "Δυσκολία", diffEasy: "Εύκολο", diffNormal: "Κανονικό", diffHard: "Δύσκολο",
    maxNum: "Αριθμοί έως", maxAuto: "Ανάλογα με την τάξη",
    colsAuto: "Αυτόματα",
    cols1: "1 στήλη", cols2: "2 στήλες", cols3: "3 στήλες", cols4: "4 στήλες",
    columns: "Στήλες στην εκτύπωση", auto: "Αυτόματα",
    showKey: "Λύσεις", keyNone: "Χωρίς λύσεις", keySame: "Στο ίδιο φύλλο", keyPage: "Ξεχωριστή σελίδα",
    workspace: "Χώρος για πράξεις",
    spaceNone: "Καθόλου (πυκνό)",
    spaceNormal: "Κανονικός",
    spaceMore: "Περισσότερος",
    pagesWord: "σελ. A4",
    pagesEst: "Εκτιμώμενος αριθμός σελίδων στην εκτύπωση",
    variants: "Ομάδες", variantsHint: "Ίδια θέματα, διαφορετικοί αριθμοί — χωρίς αντιγραφή.",
    points: "Πόντοι ανά άσκηση",
    seedLabel: "Κωδικός φύλλου", reshuffle: "Νέοι αριθμοί",
    modeSolve: "Λύσε online", modePrint: "Φύλλο για εκτύπωση",
    btnPrint: "Εκτύπωση", btnPdf: "Αποθήκευση ως PDF", btnShare: "Αντιγραφή συνδέσμου",
    btnCheckAll: "Έλεγχος όλων", btnNew: "Νέες ασκήσεις", btnHint: "Βοήθεια",
    linkCopied: "Ο σύνδεσμος αντιγράφηκε!",
    solveScore: "Πόντοι", solveTime: "Χρόνος", solveStreak: "Σερί",
    answerPh: "Απάντηση", check: "Έλεγχος",
    correct: "Σωστά! Μπράβο!", wrong: "Ωχ, όχι ακριβώς.",
    correctIs: "Η σωστή απάντηση είναι", solutionIs: "Λύση",
    resultTitle: "Τέλος!", resultSub: "Δες πώς τα πήγες",
    ofTasks: "από", tryAgain: "Ξανά", newTasks: "Νέες ασκήσεις", printThese: "Τύπωσέ τες",
    perfect: "Τέλεια! Όλα σωστά!", great: "Εξαιρετική δουλειά!",
    good: "Καλή δουλειά! Λίγη εξάσκηση ακόμα.", keepGoing: "Μην τα παρατάς — προσπάθησε ξανά!",
    teachTitle: "Φτιαγμένο για εκπαιδευτικούς και γονείς",
    teachLead: "Ένα διαγώνισμα για όλη την τάξη σε 30 δευτερόλεπτα — με ομάδες και λύσεις.",
    t1: "Συνδύασε θέματα σε ένα φύλλο — όσες ασκήσεις χρειάζεσαι",
    t2: "Ομάδες Α, Β, Γ με την ίδια δυσκολία",
    t3: "Πόντοι ανά άσκηση και κουτάκι για τον βαθμό",
    t4: "Τυπώνεται καθαρά σε ασπρόμαυρο, χωρίς σπατάλη μελανιού",
    t5: "Ο κωδικός του φύλλου φέρνει πίσω τις ίδιες ασκήσεις όποτε θέλεις",
    t6: "Λειτουργεί χωρίς ίντερνετ μετά την πρώτη φόρτωση",
    teachCta: "Φτιάξε διαγώνισμα",
    progTitle: "Η πρόοδός μου", progLead: "Όλα μένουν σε αυτόν τον browser — χωρίς εγγραφή.",
    progSolved: "Λυμένες ασκήσεις", progCorrect: "Σωστές απαντήσεις", progAccuracy: "Ακρίβεια",
    progSheets: "Φύλλα που έφτιαξες", progBadges: "Παράσημα",
    byTopic: "Ανά θέμα",
    progReset: "Διαγραφή προόδου", progResetAsk: "Σίγουρα; Όλη η πρόοδος θα διαγραφεί.",
    progEmpty: "Δεν έχεις λύσει ακόμα καμία άσκηση. Ξεκίνα τώρα!",
    aboutTitle: "Πώς λειτουργεί",
    a1t: "1. Διάλεξε τάξη", a1d: "Τα θέματα προσαρμόζονται στην ύλη της κάθε ηλικίας.",
    a2t: "2. Διάλεξε θέματα", a2d: "Συνδύασε πρόσθεση, κλάσματα, προβλήματα και γεωμετρία όπως θέλεις.",
    a3t: "3. Λύσε ή τύπωσε", a3d: "Online με έλεγχο ή σε χαρτί με λύσεις για τον εκπαιδευτικό.",
    footTagline: "Δωρεάν δημιουργία φύλλων εργασίας στα μαθηματικά για παιδιά από το νηπιαγωγείο έως την Α΄ Γυμνασίου.",
    footLinks: "Γρήγοροι σύνδεσμοι", footGrades: "Ανά τάξη",
    madeBy: "Δημιουργία:", idea: "Ιδέα του Μήτκο",
    answersKey: "Λύσεις",
    sheetFoot: "zada4ko.com · φύλλα μαθηματικών για παιδιά",
    sheetName: "Όνομα", sheetClass: "Τάξη", sheetDate: "Ημερομηνία", sheetScore: "Βαθμός",
    pts: "π.", variant: "Ομάδα", taskWord: "ασκήσεις", close: "Κλείσιμο",
    instrSolve: "Υπολόγισε.", of: "από"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("el", {
  badges: {
    first: "Πρώτο βήμα",
    ten: "10 σωστές",
    fifty: "50 σωστές",
    hundred: "100 σωστές",
    fivehund: "500 σωστές",
    streak5: "Σερί 5",
    streak15: "Σερί 15",
    perfect: "Τέλειο φύλλο",
    perfect5: "5 τέλεια φύλλα",
    explorer: "Εξερευνητής",
    master: "Όλα τα θέματα",
    printer: "Τυπογράφος"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("el", {
  gen: {
    counting:  { name: "Μέτρημα", desc: "Μέτρησε τα αντικείμενα και γράψε τον αριθμό", instr: "Μέτρησε και γράψε πόσα είναι." },
    addsub:    { name: "Πρόσθεση και αφαίρεση", desc: "Οι βασικές πράξεις μέσα στα όρια της τάξης" },
    columnar:  { name: "Κάθετες πράξεις", desc: "Ο ένας αριθμός κάτω από τον άλλον — ιδανικό για χαρτί", instr: "Κάνε τις πράξεις κάθετα." },
    times:     { name: "Προπαίδεια", desc: "Πολλαπλασιασμός και διαίρεση έως το 100" },
    bigmuldiv: { name: "Πολυψήφιοι × και ÷", desc: "Πέρα από την προπαίδεια, διαίρεση με υπόλοιπο" },
    order:     { name: "Σειρά των πράξεων", desc: "Παραστάσεις με παρενθέσεις — τι γίνεται πρώτα", instr: "Υπολόγισε, τηρώντας τη σειρά των πράξεων." },
    missing:   { name: "Βρες τον αριθμό που λείπει", desc: "□ + 7 = 15 — ποιος αριθμός κρύβεται", instr: "Βρες τον αριθμό που λείπει." },
    compare:   { name: "Σύγκριση", desc: "Βάλε &lt;, &gt; ή =", instr: "Βάλε &lt;, &gt; ή = ." },
    sequence:  { name: "Αριθμητικά μοτίβα", desc: "Βρες τον κανόνα και συνέχισε", instr: "Βρες τον κανόνα και γράψε τον αριθμό που λείπει." },
    rounding:  { name: "Στρογγυλοποίηση", desc: "Στις δεκάδες, εκατοντάδες, χιλιάδες", instr: "Στρογγυλοποίησε τον αριθμό." },
    place:     { name: "Αξία θέσης ψηφίων", desc: "Μονάδες, δεκάδες, εκατοντάδες, χιλιάδες", instr: "Απάντησε στην ερώτηση για τον αριθμό." }
  },
  msg: {
    "arith.countSol": "Μετράμε έναν έναν: {n}.",

    // division with a remainder: "υπ." = υπόλοιπο (remainder); the hint shows the exact format
    "arith.remAnswer": "{q} υπ. {r}",
    "arith.remHint": "γράψε ως «πηλίκο υπ. υπόλοιπο»",
    "arith.remSol": "{dividend} : {d} = {q} (υπόλοιπο {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "κάθε επόμενος είναι κατά {step} μεγαλύτερος",
    "arith.seqRuleSub": "κάθε επόμενος είναι κατά {step} μικρότερος",
    "arith.seqRuleMul": "κάθε επόμενος είναι {step} φορές μεγαλύτερος",
    "arith.seqRuleSquare": "τα τετράγωνα των αριθμών",
    "arith.seqRuleFib": "κάθε αριθμός είναι το άθροισμα των δύο προηγούμενων",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Στρογγυλοποίησε το {n} στις {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "δεκάδες", 100: "εκατοντάδες", 1000: "χιλιάδες", 10000: "δεκάδες χιλιάδες" }[v.to];
    },

    // place value: {place} is arith.placeName (genitive plural) for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Ποιο ψηφίο είναι στη θέση των {place} στον αριθμό {n};",
    "arith.placeName": function (v) {
      return ["μονάδων", "δεκάδων", "εκατοντάδων", "χιλιάδων", "δεκάδων χιλιάδων", "εκατοντάδων χιλιάδων"][v.pos];
    },
    "arith.placeSumQ": "Γράψε ως άθροισμα μονάδων, δεκάδων, εκατοντάδων…: {n}",
    "arith.placeFitQ": "Πόσες φορές χωράει το {m} στο {big};"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("el", {
  gen: {
    word: {
      name: "Προβλήματα",
      desc: "Καταστάσεις από την καθημερινή ζωή που θέλουν σκέψη",
      instr: "Διάβασε προσεκτικά και λύσε."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return ELG.nom(v.k0, true) + " έχει " + Z.qty(v.a, v.th) + " και " + ELG.nom(v.k1) + " έχει " + Z.qty(v.b, v.th) +
        ". " + ELG.posa(v.th, false, true) + " " + ELG.plAcc(v.th) + " έχουν μαζί;";
    },
    "word.giveAway": function (v, Z) {
      return ELG.nom(v.k, true) + " έχει " + Z.qty(v.a, v.th) + " και δίνει " + v.b + " σε έναν φίλο. " +
        ELG.posa(v.th, true, true) + " " + v.th.pl + " μένουν;";
    },
    "word.moreThan": function (v, Z) {
      return ELG.nom(v.k0, true) + " έχει " + Z.qty(v.a, v.th) + ". " + ELG.nom(v.k1, true) + " έχει " + v.d +
        " παραπάνω. " + ELG.posa(v.th, false, true) + " " + ELG.plAcc(v.th) + " έχουν συνολικά;";
    },
    "word.animalLegs": function (v, Z) {
      return "Στην αυλή " + (v.n === 1 ? "υπάρχει " : "υπάρχουν ") + Z.qty(v.n, v.th) + ". Κάθε ζώο έχει " + v.legs +
        " πόδια. Πόσα πόδια είναι συνολικά;";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v, Z) {
      return ELG.nom(v.k, true) + " αγοράζει " + Z.qty(v.n, v.th) + ". Κάθε " + v.th.sg + " κοστίζει " + v.price +
        ". Πόσα χρήματα πληρώνει " + ELG.nom(v.k) + ";";
    },
    "word.change": function (v) {
      return ELG.nom(v.k, true) + " πληρώνει " + v.paid + " για " + ELG.oneAcc(v.th) + " που κοστίζει " + v.price +
        ". Πόσα ρέστα παίρνει πίσω;";
    },
    "word.saveUp": function (v) {
      return ELG.nom(v.k, true) + " βάζει στην άκρη " + v.week + " κάθε εβδομάδα. Μετά από " + v.weeks + " εβδομάδες " +
        ELG.nom(v.k) + " θέλει να αγοράσει ένα σκέιτμπορντ που κοστίζει " + v.target + ". Πόσα χρήματα λείπουν ακόμα;";
    },

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "Έχουμε " + v.n + " κουτιά. Σε κάθε κουτί υπάρχουν " + Z.qty(v.per, v.th) + ". " +
        ELG.posa(v.th, true, true) + " " + v.th.pl + " υπάρχουν συνολικά;";
    },
    "word.shareEqually": function (v) {
      return "Μοιράζουμε " + v.total + " " + ELG.plAcc(v.th) + " εξίσου σε " + v.kids + " παιδιά. " +
        ELG.posa(v.th, false, true) + " " + ELG.plAcc(v.th) + " παίρνει κάθε παιδί;";
    },
    "word.boxesRest": function (v) {
      return "Έχουμε " + v.total + " " + ELG.plAcc(v.th) + ". Σε ένα κουτί χωράνε " + v.per + ". Πόσα κουτιά γεμίζουμε εντελώς και " +
        ELG.posa(v.th, true) + " " + v.th.pl + " περισσεύουν; (γράψε ως «κουτιά υπ. όσα περισσεύουν»)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} υπ. {rest}",
    "word.solRemainder": "υπόλοιπο {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": function (v) {
      return ELG.nom(v.k, true) + " διαβάζει " + v.pages + " σελίδες τη μέρα για " + v.days + " μέρες. Το βιβλίο έχει " +
        v.total + " σελίδες. Πόσες σελίδες μένουν ακόμα για διάβασμα;";
    },
    "word.average": "Τρία καλάθια έχουν {a}, {b} και {c} φρούτα. Πόσα φρούτα έχει κατά μέσο όρο κάθε καλάθι;",
    "word.sumDiff": function (v) {
      return ELG.nom(v.k0, true) + " και " + ELG.nom(v.k1) + " έχουν μαζί " + v.total + " αυτοκόλλητα. " +
        ELG.nom(v.k0, true) + " έχει " + v.d + " παραπάνω από " + ELG.acc(v.k1) +
        ". Πόσα έχει ο καθένας; (γράψε πόσα έχει " + ELG.nom(v.k0) + ")";
    },

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "Η ταινία αρχίζει στις {start} και διαρκεί {dur} λεπτά. Τι ώρα τελειώνει; (ωω:λλ)",
    "word.solMin": "λεπτά",
    "word.carDistance": "Ένα αυτοκίνητο τρέχει με {speed} χλμ/ώρα για {hours} ώρες. Πόση απόσταση διανύει;",
    "word.unitKm": "χλμ",
    "word.solKm": "χλμ",
    "word.trainTime": "Ένα τρένο διανύει {dist} χλμ με μέση ταχύτητα {speed} χλμ/ώρα. Πόσες ώρες ταξιδεύει;",
    "word.unitH": "ώρες",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Ένα μαγαζί έχει " + v.whole + " " + v.th.pl + ". Πούλησε " + ELG.fracArt(v.frac) + " " + v.frac + " από " +
        ELG.them(v.th) + ". " + ELG.posa(v.th, false, true) + " " + ELG.plAcc(v.th) + " πούλησε;";
    },
    "word.fractionWhole": function (v) {
      return ELG.cap(ELG.fracArt(v.frac)) + " " + v.frac + " ενός αριθμού είναι " + v.part + ". Ποιος είναι ο αριθμός;";
    },

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Πόσο είναι το {p}% του {base};",
    "word.saleJacket": "Ένα μπουφάν κοστίζει {price}. Στις εκπτώσεις η τιμή του μειώνεται κατά {p}%. Ποια είναι η νέα τιμή;",
    "word.pctStudents": "Από {whole} μαθητές, οι {part} κάνουν αθλητισμό. Τι ποσοστό των μαθητών είναι αυτό;",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} εργάτες τελειώνουν μια δουλειά σε {days} ημέρες. Σε πόσες ημέρες θα την τελειώσουν {more} εργάτες, αν δουλεύουν με τον ίδιο ρυθμό;",
    "word.unitDays": "ημέρες",
    "word.motherAge": "Σήμερα η μητέρα είναι {mult} φορές μεγαλύτερη από τον γιο της, που είναι {child} ετών. Πόσων ετών θα είναι η μητέρα σε {years} χρόνια;",
    "word.consecutive": "Το άθροισμα τριών διαδοχικών φυσικών αριθμών είναι {sum}. Ποιος είναι ο μικρότερος από αυτούς;",
    "word.pencilPacks": "Ένα κουτί έχει {a} πακέτα με {per1} μολύβια και {b} πακέτα με {per2} μολύβια. Πόσα μολύβια έχει το κουτί;",
    "word.treeTaller": "Ένα δέντρο έχει ύψος {small} μ και ένα δεύτερο είναι {times} φορές ψηλότερο. Πόσα μέτρα πιο ψηλό είναι το δεύτερο δέντρο από το πρώτο;",
    "word.unitM": "μ"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("el", {
  gen: {
    clock: { name: "Το ρολόι", desc: "Διάβασε τους δείκτες και γράψε την ώρα", instr: "Τι ώρα είναι; Γράψε ως ωω:λλ." },
    units: { name: "Μονάδες μέτρησης", desc: "Μετατροπές: εκ., μ, χλμ, γρ., κιλά, λίτρα, λεπτά", instr: "Μετάτρεψε στις μονάδες που δίνονται." },
    money: { name: "Χρήματα", desc: "Ευρώ και λεπτά, ρέστα, ψώνια", instr: "Υπολόγισε το ποσό." },
    geometry: { name: "Γεωμετρία", desc: "Περίμετρος, εμβαδόν και όγκος σχημάτων", instr: "Κοίτα το σχήμα και υπολόγισε." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Τι ώρα θα είναι σε {n} λεπτά;",
    "measure.clockLaterSol": "{from} + {n} λεπτά = {to}",
    "measure.clockShows": "Το ρολόι δείχνει {time}",

    // unit abbreviations (shown after numbers, so they must not change with the count) and family names
    "measure.unit.mm": "χιλ.", "measure.unit.cm": "εκ.", "measure.unit.dm": "δεκ.",
    "measure.unit.m": "μ", "measure.unit.km": "χλμ",
    "measure.unit.g": "γρ.", "measure.unit.kg": "κιλ.", "measure.unit.t": "τόν.",
    "measure.unit.ml": "ml", "measure.unit.l": "λίτ.",
    "measure.unit.s": "δευτ.", "measure.unit.min": "λεπ.", "measure.unit.h": "ώρ.", "measure.unit.day": "ημ.",
    "measure.family.len": "μήκος", "measure.family.mass": "μάζα",
    "measure.family.vol": "όγκος", "measure.family.time": "χρόνος",

    // money: euro cents are "λεπτά" in Greek — "1 λεπτό", "5 λεπτά"; "ευρώ" never changes
    "measure.cents": function (v) { return v.n === 1 ? "λεπτό" : "λεπτά"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n === 1 ? "λεπτό" : "λεπτά"); },
    "measure.coins": function (v) {
      return v.n + (v.n === 1 ? " κέρμα" : " κέρματα") + (v.c === 1 ? " του 1 λεπτού" : " των " + v.c + " λεπτών");
    },
    "measure.moneyBox": "Ένας κουμπαράς έχει {list}. Πόσα λεπτά έχει συνολικά;",
    "measure.eurToCents": "{eur} ευρώ και {ct} λεπτά = {blank} λεπτά",
    "measure.change": "Αγοράζουμε δύο πράγματα για {p1} και {p2} και πληρώνουμε με χαρτονόμισμα των {paid}. Πόσα ρέστα παίρνουμε;",

    // geometry
    "measure.askPerim": "Βρες την περίμετρο (P).",
    "measure.askPerimSquare": "Τετράγωνο. Βρες την περίμετρο (P).",
    "measure.askArea": "Βρες το εμβαδόν (S).",
    "measure.askAreaSquare": "Τετράγωνο. Βρες το εμβαδόν (S).",
    "measure.askAreaTri": "Βρες το εμβαδόν (S) του τριγώνου.",
    "measure.sideFromPerim": "Ένα ορθογώνιο έχει περίμετρο P = {p} {u} και η μία πλευρά του είναι {a} {u}. Πόσο είναι η άλλη πλευρά;",
    "measure.volCube": "Ένας κύβος έχει ακμή {a} {u}. Βρες τον όγκο (V).",
    "measure.volCuboid": "Ένα ορθογώνιο παραλληλεπίπεδο έχει διαστάσεις {dims} {u}. Βρες τον όγκο (V).",
    "measure.askCircumference": "Βρες το μήκος του κύκλου (C). Πάρε π ≈ {pi}.",
    "measure.askAreaCircle": "Βρες το εμβαδόν (S) του κύκλου. Πάρε π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("el", {
  gen: {
    fractions:  { name: "Κλάσματα", desc: "Σύγκριση, απλοποίηση, πρόσθεση και αφαίρεση", instr: "Υπολόγισε. Γράψε ένα κλάσμα ως 3/4." },
    decimals:   { name: "Δεκαδικοί αριθμοί", desc: "Πράξεις με δεκαδικούς αριθμούς", instr: "Υπολόγισε." },
    percent:    { name: "Ποσοστά", desc: "Ποσοστό αριθμού, έκπτωση, αύξηση", instr: "Υπολόγισε." },
    divis:      { name: "Διαιρετότητα και διαιρέτες", desc: "Κριτήρια διαιρετότητας, πρώτοι αριθμοί, ΜΚΔ και ΕΚΠ", instr: "Απάντησε στην ερώτηση." },
    powers:     { name: "Δυνάμεις και ρίζες", desc: "Τετράγωνα, κύβοι και τετραγωνικές ρίζες", instr: "Υπολόγισε." },
    negatives:  { name: "Αρνητικοί αριθμοί", desc: "Πράξεις με ακέραιους αριθμούς", instr: "Υπολόγισε." },
    equations:  { name: "Εξισώσεις", desc: "Βρες το x — από απλές έως με x και στα δύο μέλη", instr: "Λύσε την εξίσωση. Βρες το x." },
    algebra:    { name: "Παραστάσεις και ταυτότητες", desc: "Άνοιγμα παρενθέσεων, αξιοσημείωτες ταυτότητες", instr: "Υπολόγισε για τις τιμές που δίνονται." },
    pythagoras: { name: "Πυθαγόρειο θεώρημα", desc: "Ορθογώνιο τρίγωνο — βρες την πλευρά που λείπει", instr: "Βρες την πλευρά που λείπει." },
    roman:      { name: "Ρωμαϊκοί αριθμοί", desc: "Από το I έως το MMXXV και αντίστροφα", instr: "Γράψε με αραβικούς ή ρωμαϊκούς αριθμούς." },
    logic:      { name: "Σπαζοκεφαλιές", desc: "Γρίφοι, κρυμμένοι αριθμοί, λογική", instr: "Σκέψου καλά και βρες την απάντηση." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Απλοποίησε: {f}",
    "adv.commonDenSol": "Κοινός παρονομαστής {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Γράψε ως καταχρηστικό κλάσμα: {f}",
    "adv.toMixed": "Γράψε ως μεικτό αριθμό: {f}",
    /* an extra accepted spelling of a mixed number: "2και1/3" (spaces are removed before comparing) */
    "adv.mixedAltAnd": "{w}και{n}/{d}",
    "adv.toMixedSol": function (v) {
      return v.imp + " : " + v.d + " = " + v.w + (v.w === 1 ? " ακέραιη μονάδα" : " ακέραιες μονάδες") +
        ", υπόλοιπο " + v.r + " → " + v.w + " " + v.r + "/" + v.d;
    },
    "adv.fractionOf": function (v) { return "Πόσο είναι " + ELG.fracArt(v.f) + " " + v.f + " του " + v.n + ";"; },
    /* percent */
    "adv.percentOf": "Το {p}% του {n}",
    "adv.decreaseBy": "Μείωσε το {n} κατά {p}%",
    "adv.increaseBy": "Αύξησε το {n} κατά {p}%",
    "adv.whatPercent": "Τι ποσοστό του {n} είναι το {part};",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "ναι",
    "adv.no": "όχι",
    "adv.isDivisible": "Διαιρείται το {n} με το {d};",
    "adv.divRemainderSol": "{n} : {d} → υπόλοιπο {r}",
    "adv.isPrime": "Είναι το {n} πρώτος αριθμός;",
    "adv.primeSol": "Το {n} διαιρείται μόνο με το 1 και με τον εαυτό του.",
    "adv.compositeSol": "Το {n} διαιρείται και με το {d}.",
    "adv.gcdOf": "ΜΚΔ({a}, {b})",
    "adv.gcdSol": "Ο μέγιστος κοινός διαιρέτης είναι {v}",
    "adv.lcmOf": "ΕΚΠ({a}, {b})",
    "adv.lcmSol": "Το ελάχιστο κοινό πολλαπλάσιο είναι {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Για x = {x} υπολόγισε: {expr}",
    "adv.unitCm": "εκ.",
    /* brain teasers */
    "adv.thinkOfNumber": "Σκέφτηκα έναν αριθμό, τον πολλαπλασίασα με {m} και πρόσθεσα {add}. Βρήκα {res}. Ποιον αριθμό σκέφτηκα;",
    "adv.chickensRabbits": "Σε μια αυλή υπάρχουν κότες και κουνέλια — συνολικά {heads} κεφάλια και {legs} πόδια. Πόσα είναι τα κουνέλια;",
    "adv.chickensRabbitsSol": "Αν όλα ήταν κότες: {legs} πόδια. Η διαφορά {diff} : 2 = {b}",
    "adv.magicSquare": "Μαγικό τετράγωνο: κάθε γραμμή, στήλη και διαγώνιος έχει άθροισμα {sum}. Ποιος αριθμός λείπει;",
    "adv.magicSquareSol": "Άθροισμα γραμμής {sum} → {v}",
    "adv.towers": function (v) {
      return ELG.nom(v.kid, true) + " φτιάχνει πύργους από " + v.n + " κυβάκια, με " + v.per +
        " κυβάκια σε κάθε πύργο. Πόσους ολόκληρους πύργους φτιάχνει; (γράψε τον αριθμό των πύργων)";
    },
    "adv.towersSol": "{n} : {per} = {q} υπ. {r}"
  }
});
