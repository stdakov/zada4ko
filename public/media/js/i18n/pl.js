/* ==========================================================================
   zada4ko.com — Polish (polski)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.

   Nouns are [one, few, many, gender, accusative-one?]:
     f[0] "1 jabłko"   f[1] "2–4, 22–24 … jabłka" (also the nominative plural)
     f[2] "5+, 12–14 … jabłek" (also the genitive plural: "Ile jabłek?")
     f[3] "m" / "f" / "n"
     f[4] accusative singular, only where it differs ("ma 1 książkę")
   Sentences use the present tense and repeat the child's name, so they
   work for a boy or a girl.
   ========================================================================== */
"use strict";

(function () {
  /** Pick the counted form for n: one / few / many. Fractions take "few" (gen. sg.). */
  function form(n, one, few, many) {
    n = Number(String(n).replace(",", "."));
    if (n !== Math.floor(n)) return few;
    n = Math.abs(n);
    if (n === 1) return one;
    var u = n % 10, t = n % 100;
    return (u >= 2 && u <= 4 && (t < 12 || t > 14)) ? few : many;
  }
  /** "5 stron", "2 strony", "1 strona" */
  function cnt(n, one, few, many) { return n + " " + form(n, one, few, many); }
  /** n + noun, nominative */
  function qty(n, noun) { var f = noun.f; return n + " " + form(n, f[0], f[1], f[2]); }
  /** n + noun, accusative (object of "ma", "kupuje" …) */
  function qtyAcc(n, noun) { var f = noun.f; return n + " " + form(n, f[4] || f[0], f[1], f[2]); }
  /** "jest" / "są" for a counted subject: 1 jabłko jest, 3 jabłka są, 5 jabłek jest */
  function be(n) { return form(n, "jest", "są", "jest"); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---- Formatting, kids' names, nouns ---------------------------------- */
  Z.i18n.add("pl", {
    fmt: {
      dec: ",",
      and: " i ",
      cur: "€",
      money: function (s) { return s.replace(".", ",") + " €"; },
      qty: qty
    },
    kids: ["Zuzia", "Antek", "Julia", "Kuba", "Zosia", "Janek", "Hania", "Franek", "Maja", "Szymon",
           "Lena", "Filip", "Ala", "Olek", "Oliwia", "Kacper", "Laura", "Mikołaj", "Pola", "Staś"],
    nouns: {
      apple: ["jabłko", "jabłka", "jabłek", "n"], banana: ["banan", "banany", "bananów", "m"],
      pencil: ["ołówek", "ołówki", "ołówków", "m"], balloon: ["balonik", "baloniki", "baloników", "m"],
      book: ["książka", "książki", "książek", "f", "książkę"], sweet: ["cukierek", "cukierki", "cukierków", "m"],
      ball: ["piłka", "piłki", "piłek", "f", "piłkę"], flower: ["kwiatek", "kwiatki", "kwiatków", "m"],
      sticker: ["naklejka", "naklejki", "naklejek", "f", "naklejkę"], nut: ["orzech", "orzechy", "orzechów", "m"],
      strawberry: ["truskawka", "truskawki", "truskawek", "f", "truskawkę"], cube: ["klocek", "klocki", "klocków", "m"],
      cat: ["kot", "koty", "kotów", "m", "kota"], dog: ["pies", "psy", "psów", "m", "psa"],
      bunny: ["królik", "króliki", "królików", "m", "królika"], chick: ["kurczątko", "kurczątka", "kurczątek", "n"],
      fish: ["rybka", "rybki", "rybek", "f", "rybkę"], butterfly: ["motyl", "motyle", "motyli", "m", "motyla"],
      ant: ["mrówka", "mrówki", "mrówek", "f", "mrówkę"], bee: ["pszczoła", "pszczoły", "pszczół", "f", "pszczołę"],
      notebook: ["zeszyt", "zeszyty", "zeszytów", "m"], backpack: ["plecak", "plecaki", "plecaków", "m"],
      puzzle: ["układanka", "układanki", "układanek", "f", "układankę"], umbrella: ["parasol", "parasole", "parasoli", "m"],
      cap: ["czapka", "czapki", "czapek", "f", "czapkę"], toy: ["zabawka", "zabawki", "zabawek", "f", "zabawkę"],
      mug: ["kubek", "kubki", "kubków", "m"], icecream: ["rożek lodowy", "rożki lodowe", "rożków lodowych", "m"],
      ticket: ["bilet", "bilety", "biletów", "m"], plantpot: ["doniczka", "doniczki", "doniczek", "f", "doniczkę"]
    }
  });

  /* ---- Interface ------------------------------------------------------- */
  Z.i18n.add("pl", {
    ui: {
      /* teachers: ready-made tests · about: privacy note */
      readyT1: "Klasy 1–2",
      readyT2: "Klasy 3–4",
      readyT3: "Klasy 5–6",
      readyT4: "Klasa 7",
      readyD1: "Dodawanie i odejmowanie do 100, porównywanie, zadania tekstowe, zegar.",
      readyD2: "Mnożenie i dzielenie, kolejność działań, jednostki miary, pole i obwód.",
      readyD3: "Ułamki, liczby dziesiętne, procenty, równania, objętość i pole.",
      readyD4: "Równania, wyrażenia, potęgi, twierdzenie Pitagorasa, zadania tekstowe.",
      btnOpen: "Otwórz",
      privacyT: "Bez rejestracji, bez reklam w zadaniach.",
      privacyD: "Postępy są zapisywane tylko w przeglądarce tego urządzenia i nigdy nie opuszczają komputera. Po pierwszym załadowaniu strona działa także offline.",
      /* search engines: title and description of /pl/ */
      seoTitle: "Zadania z matematyki dla dzieci, klasy 1–7 — do druku i online | zada4ko",
      seoDesc: "zada4ko to darmowy generator zadań z matematyki dla dzieci od zerówki do 7. klasy: dodawanie i odejmowanie, tabliczka mnożenia, ułamki, zadania tekstowe, geometria. Rozwiązuj online lub wydrukuj kartę pracy z odpowiedziami.",
      docTitle: "zada4ko — zadania z matematyki dla dzieci",
      language: "Język",
      gshort0: "0", gshort1: "Kl.1", gshort2: "Kl.2", gshort3: "Kl.3", gshort4: "Kl.4", gshort5: "Kl.5", gshort6: "Kl.6", gshort7: "Kl.7",
      answerLabel: "Odpowiedź:",
      variantLetters: "ABCD",
      brandSub: "matematyka dla dzieci",
      navHome: "Start", navStudio: "Utwórz zadania", navTeachers: "Dla nauczycieli",
      navProgress: "Moje postępy", navAbout: "Jak to działa", menu: "Menu",
      heroBadge: "Nowe zadania przy każdym kliknięciu",
      heroTitle: "Nieskończenie wiele zadań z matematyki dla",
      heroTitleHl: "ciekawych świata dzieci",
      heroLead:
        "Wybierz klasę i tematy, a dostaniesz gotową kartę pracy. Rozwiązuj zadania online i od razu sprawdzaj wyniki albo wydrukuj je na sprawdzian, pracę domową czy dodatkowe ćwiczenia.",
      heroCta1: "Utwórz zadania",
      heroCta2: "Szybki start: klasa 1",
      stat1: "rodzajów zadań", stat2: "klas", stat3: "kombinacji",
      gradesTitle: "Do której klasy chodzi dziecko?",
      topicsTitle: "Zadania według klasy i tematu",
      gradesLead: "Każda klasa odblokowuje tematy z podstawy programowej — od liczenia jabłek po twierdzenie Pitagorasa.",
      grade0: "Zerówka",
      grade1: "Klasa 1", grade2: "Klasa 2", grade3: "Klasa 3", grade4: "Klasa 4",
      grade5: "Klasa 5", grade6: "Klasa 6", grade7: "Klasa 7",
      ageLabel: "lat",
      featTitle: "Co potrafi zada4ko",
      f1t: "Rozwiązuj online", f1d: "Wpisz odpowiedź i od razu zobacz, czy jest dobra. Do tego punkty, gwiazdki i konfetti.",
      f2t: "Drukuj na papierze", f2d: "Przejrzysta kartka A4 na pracę domową lub sprawdzian — z miejscem na imię, datę i ocenę.",
      f3t: "Klucz odpowiedzi", f3d: "Osobna strona tylko dla nauczyciela z poprawną odpowiedzią do każdego zadania.",
      f4t: "Grupy A / B / C", f4d: "Jedno kliknięcie tworzy różne wersje tego samego sprawdzianu.",
      f5t: "Link do udostępnienia", f5d: "Każda karta ma swój kod. Udostępnij link, a wszyscy dostaną te same zadania.",
      f6t: "Zadania tekstowe", f6d: "Sytuacje z życia: imiona, pieniądze, czas i odległości.",
      studioTitle: "Pracownia zadań",
      studioLead: "Ustaw kartę po lewej i patrz, jak powstaje po prawej.",
      stepGrade: "Klasa", stepTopics: "Tematy", stepSettings: "Ustawienia",
      panelSetup: "Ustawienia karty",
      pickTopics: "Wybierz tematy",
      noTopics: "Wybierz po lewej co najmniej jeden temat, aby zobaczyć zadania.",
      countLabel: "Zadania", totalTasks: "Liczba zadań",
      titleLabel: "Tytuł karty", titlePlaceholder: "Sprawdzian z matematyki",
      difficulty: "Poziom trudności", diffEasy: "Łatwy", diffNormal: "Średni", diffHard: "Trudny",
      maxNum: "Liczby do", maxAuto: "Według klasy",
      colsAuto: "Automatycznie",
      cols1: "1 kolumna", cols2: "2 kolumny", cols3: "3 kolumny", cols4: "4 kolumny",
      columns: "Kolumny na wydruku", auto: "Auto",
      showKey: "Klucz odpowiedzi", keyNone: "Bez klucza", keySame: "Na tej samej kartce", keyPage: "Osobna strona",
      workspace: "Miejsce na obliczenia",
      spaceNone: "Brak (zwięźle)",
      spaceNormal: "Normalne",
      spaceMore: "Więcej",
      pagesWord: "strony A4",
      pagesEst: "Szacowana liczba drukowanych stron",
      variants: "Grupy", variantsHint: "Te same tematy, inne liczby — bez ściągania.",
      points: "Punkty za zadanie",
      seedLabel: "Kod karty", reshuffle: "Nowe liczby",
      modeSolve: "Rozwiązuj online", modePrint: "Karta do druku",
      btnPrint: "Drukuj", btnPdf: "Zapisz jako PDF", btnShare: "Kopiuj link",
      btnCheckAll: "Sprawdź wszystko", btnNew: "Nowe zadania", btnHint: "Podpowiedź",
      linkCopied: "Link skopiowany!",
      solveScore: "Wynik", solveTime: "Czas", solveStreak: "Seria",
      answerPh: "Odpowiedź", check: "Sprawdź",
      correct: "Dobrze! Brawo.", wrong: "Ups, nie do końca.",
      correctIs: "Poprawna odpowiedź to", solutionIs: "Rozwiązanie",
      resultTitle: "Gotowe!", resultSub: "Tak ci poszło",
      ofTasks: "z", tryAgain: "Spróbuj jeszcze raz", newTasks: "Nowe zadania", printThese: "Wydrukuj te zadania",
      perfect: "Idealnie! Wszystko dobrze!", great: "Świetna robota!",
      good: "Dobrze! Jeszcze trochę ćwiczeń.", keepGoing: "Nie poddawaj się — spróbuj jeszcze raz!",
      teachTitle: "Stworzone dla nauczycieli i rodziców",
      teachLead: "Cały sprawdzian dla klasy w 30 sekund — z grupami i kluczem odpowiedzi.",
      t1: "Łącz tematy na jednej karcie — dokładnie tyle zadań, ile potrzebujesz",
      t2: "Grupy A, B, C o tym samym poziomie trudności",
      t3: "Punkty za każde zadanie i miejsce na ocenę",
      t4: "Czytelny wydruk w czerni i bieli, bez marnowania tuszu",
      t5: "Kod karty w każdej chwili przywraca te same zadania",
      t6: "Działa offline po pierwszym wczytaniu",
      teachCta: "Utwórz sprawdzian",
      progTitle: "Moje postępy", progLead: "Wszystko zostaje w tej przeglądarce — bez rejestracji.",
      progSolved: "Rozwiązane zadania", progCorrect: "Poprawne odpowiedzi", progAccuracy: "Skuteczność",
      progSheets: "Utworzone karty", progBadges: "Odznaki",
      byTopic: "Według tematu",
      progReset: "Wyzeruj postępy", progResetAsk: "Na pewno? Wszystkie postępy zostaną usunięte.",
      progEmpty: "Nie ma jeszcze rozwiązanych zadań. Zacznij teraz!",
      aboutTitle: "Jak to działa",
      a1t: "1. Wybierz klasę", a1d: "Tematy dopasowują się do programu nauczania dla danego wieku.",
      a2t: "2. Wybierz tematy", a2d: "Łącz dodawanie, ułamki, zadania tekstowe i geometrię, jak chcesz.",
      a3t: "3. Rozwiązuj lub drukuj", a3d: "Online ze sprawdzaniem albo na papierze z kluczem dla nauczyciela.",
      footTagline: "Darmowy generator kart pracy z matematyki dla dzieci od zerówki do 7. klasy.",
      footLinks: "Szybkie linki", footGrades: "Według klasy",
      madeBy: "Stworzone przez", idea: "Pomysł: Mitko",
      answersKey: "Klucz odpowiedzi",
      sheetFoot: "zada4ko.com · karty pracy z matematyki dla dzieci",
      sheetName: "Imię i nazwisko", sheetClass: "Klasa", sheetDate: "Data", sheetScore: "Ocena",
      pts: "pkt", variant: "Grupa", taskWord: "zadań", close: "Zamknij",
      instrSolve: "Oblicz.", of: "z"
    }
  });

  /* ---- Badges ---------------------------------------------------------- */
  Z.i18n.add("pl", {
    badges: {
      first: "Pierwszy krok",
      ten: "10 poprawnych",
      fifty: "50 poprawnych",
      hundred: "100 poprawnych",
      fivehund: "500 poprawnych",
      streak5: "Seria 5",
      streak15: "Seria 15",
      perfect: "Bezbłędna karta",
      perfect5: "5 bezbłędnych kart",
      explorer: "Odkrywca",
      master: "Wszystkie tematy",
      printer: "Drukarz"
    }
  });

  /* ---- Arithmetic topics ----------------------------------------------- */
  Z.i18n.add("pl", {
    gen: {
      counting:  { name: "Liczenie", desc: "Policz przedmioty i wpisz liczbę", instr: "Policz i zapisz, ile ich jest." },
      addsub:    { name: "Dodawanie i odejmowanie", desc: "Podstawowe działania w zakresie liczb dla danej klasy" },
      columnar:  { name: "Działania pisemne", desc: "Liczby zapisane jedna pod drugą — świetne na papierze", instr: "Oblicz pisemnie." },
      times:     { name: "Tabliczka mnożenia", desc: "Mnożenie i dzielenie do 100" },
      bigmuldiv: { name: "Mnożenie i dzielenie wielocyfrowe", desc: "Poza tabliczką mnożenia, dzielenie z resztą" },
      order:     { name: "Kolejność wykonywania działań", desc: "Wyrażenia z nawiasami — co najpierw", instr: "Oblicz, pamiętając o kolejności działań." },
      missing:   { name: "Brakująca liczba", desc: "□ + 7 = 15 — jaka liczba się ukrywa", instr: "Znajdź brakującą liczbę." },
      compare:   { name: "Porównywanie liczb", desc: "Wstaw &lt;, &gt; lub =", instr: "Wstaw &lt;, &gt; lub = ." },
      sequence:  { name: "Ciągi liczbowe", desc: "Odkryj regułę i kontynuuj", instr: "Znajdź regułę i wpisz brakującą liczbę." },
      rounding:  { name: "Zaokrąglanie", desc: "Do dziesiątek, setek, tysięcy", instr: "Zaokrąglij liczbę." },
      place:     { name: "System dziesiątkowy", desc: "Jedności, dziesiątki, setki, tysiące", instr: "Odpowiedz na pytanie o liczbę." }
    },
    msg: {
      "arith.countSol": "Liczymy po kolei: {n}.",

      // division with a remainder: Polish schools write "17 : 5 = 3 r 2"
      "arith.remAnswer": "{q} r {r}",
      "arith.remHint": "zapisz jako „iloraz r reszta”",
      "arith.remSol": "{dividend} : {d} = {q} (reszta {r})",

      // the rule behind a number sequence ("liczba" is feminine)
      "arith.seqRuleAdd": "każda następna liczba jest o {step} większa",
      "arith.seqRuleSub": "każda następna liczba jest o {step} mniejsza",
      "arith.seqRuleMul": "każda następna liczba jest {step} razy większa",
      "arith.seqRuleSquare": "kwadraty kolejnych liczb",
      "arith.seqRuleFib": "każda liczba jest sumą dwóch poprzednich",

      // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000 (genitive)
      "arith.roundQ": "Zaokrąglij {n} do pełnych {unit}",
      "arith.roundUnit": function (v) {
        return { 10: "dziesiątek", 100: "setek", 1000: "tysięcy", 10000: "dziesiątek tysięcy" }[v.to];
      },

      // place value: {place} is arith.placeName (genitive plural)
      "arith.placeDigitQ": "Jaka cyfra stoi w liczbie {n} na miejscu {place}?",
      "arith.placeName": function (v) {
        return ["jedności", "dziesiątek", "setek", "tysięcy", "dziesiątek tysięcy", "setek tysięcy"][v.pos];
      },
      "arith.placeSumQ": "Rozłóż na sumę wartości cyfr: {n}",
      "arith.placeFitQ": "Ile razy {m} mieści się w {big}?"
    }
  });

  /* ---- Word problems --------------------------------------------------- */
  Z.i18n.add("pl", {
    gen: {
      word: {
        name: "Zadania tekstowe",
        desc: "Sytuacje z życia, przy których trzeba pomyśleć",
        instr: "Przeczytaj uważnie i rozwiąż."
      }
    },
    msg: {
      /* ------------------------------ Grades 0–2 ---------------------------- */
      "word.together": function (v) {
        return v.k0 + " ma " + qtyAcc(v.a, v.th) + ", a " + v.k1 + " ma " + qtyAcc(v.b, v.th) +
          ". Ile " + v.th.f[2] + " mają razem?";
      },
      "word.giveAway": function (v) {
        return v.k + " ma " + qtyAcc(v.a, v.th) + " i daje " + v.b + " koledze. Ile " + v.th.f[2] + " zostaje?";
      },
      "word.moreThan": function (v) {
        return v.k0 + " ma " + qtyAcc(v.a, v.th) + ". " + v.k1 + " ma o " + v.d + " więcej. Ile " + v.th.f[2] + " mają razem?";
      },
      "word.animalLegs": function (v) {
        return "Na podwórku " + be(v.n) + " " + qty(v.n, v.th) + ". Każde zwierzę ma " + cnt(v.legs, "nogę", "nogi", "nóg") +
          ". Ile nóg mają wszystkie razem?";
      },

      /* ------------------------------ Money --------------------------------- */
      "word.buyMany": function (v) {
        return v.k + " kupuje " + qtyAcc(v.n, v.th) + " po " + v.price + " za sztukę. Ile płaci " + v.k + "?";
      },
      "word.change": function (v) {
        return cap(v.th.sg) + " kosztuje " + v.price + ". " + v.k + " płaci " + v.paid + ". Ile reszty dostaje " + v.k + "?";
      },
      "word.saveUp": "{k} odkłada {week} co tydzień. Po {weeks} tygodniach {k} chce kupić deskorolkę za {target}. Ile pieniędzy jeszcze brakuje?",

      /* ------------------------ Sharing / grouping -------------------------- */
      "word.boxesTotal": function (v) {
        return "W każdym z " + v.n + " pudełek " + be(v.per) + " " + qty(v.per, v.th) + ". Ile " + v.th.f[2] + " jest razem?";
      },
      "word.shareEqually": function (v) {
        return "Dzielimy " + qtyAcc(v.total, v.th) + " po równo między " + v.kids + " dzieci. Ile dostaje każde dziecko?";
      },
      "word.boxesRest": function (v) {
        return "Mamy " + qtyAcc(v.total, v.th) + ". W jednym pudełku mieści się " + v.per + ". Ile będzie pełnych pudełek i ile " +
          v.th.f[2] + " zostanie? (zapisz jako „pudełka r reszta”)";
      },
      /* the expected answer, in the form the hint above asks for */
      "word.boxesRestAns": "{boxes} r {rest}",
      "word.solRemainder": "reszta {rest}",

      /* --------------------------- Two & three steps ------------------------ */
      "word.pagesLeft": function (v) {
        return v.k + " czyta " + cnt(v.pages, "stronę", "strony", "stron") + " dziennie przez " + cnt(v.days, "dzień", "dni", "dni") +
          ". Książka ma " + cnt(v.total, "stronę", "strony", "stron") + ". Ile stron zostaje do przeczytania?";
      },
      "word.average": "W trzech koszykach są owoce: w pierwszym {a}, w drugim {b}, a w trzecim {c}. Ile owoców jest średnio w jednym koszyku?",
      "word.sumDiff": function (v) {
        return v.k0 + " i " + v.k1 + " mają razem " + cnt(v.total, "naklejkę", "naklejki", "naklejek") + ". " + v.k0 + " ma o " + v.d +
          " więcej niż " + v.k1 + ". Ile naklejek ma każde z nich? (zapisz, ile ma " + v.k0 + ")";
      },

      /* ------------------------------ Time ---------------------------------- */
      "word.filmEnd": function (v) {
        return "Film zaczyna się o " + v.start + " i trwa " + cnt(v.dur, "minutę", "minuty", "minut") + ". O której godzinie się kończy? (gg:mm)";
      },
      "word.solMin": "min",
      "word.carDistance": function (v) {
        return "Samochód jedzie z prędkością " + v.speed + " km/h przez " + cnt(v.hours, "godzinę", "godziny", "godzin") + ". Jaką drogę pokonuje?";
      },
      "word.unitKm": "km",
      "word.solKm": "km",
      "word.trainTime": "Pociąg pokonuje {dist} km ze średnią prędkością {speed} km/h. Ile godzin trwa podróż?",
      "word.unitH": "h",

      /* ---------------------------- Fractions ------------------------------- */
      "word.fractionSold": function (v) {
        return "Sklep ma " + qtyAcc(v.whole, v.th) + ". Sprzedano " + v.frac + " z nich. Ile " + v.th.f[2] + " sprzedano?";
      },
      "word.fractionWhole": "{frac} pewnej liczby to {part}. Jaka to liczba?",

      /* ---------------------------- Percentages ----------------------------- */
      "word.pctOf": "Ile to jest {p}% liczby {base}?",
      "word.saleJacket": "Kurtka kosztuje {price}. Na wyprzedaży cena spada o {p}%. Ile kosztuje kurtka teraz?",
      "word.pctStudents": "Spośród {whole} uczniów {part} uprawia sport. Jaki to procent wszystkich uczniów?",

      /* ---------------------- Proportion & logic (older) -------------------- */
      "word.workers": function (v) {
        return v.workers + " robotników kończy pracę w " + cnt(v.days, "dzień", "dni", "dni") + ". Ile dni potrzebuje " + v.more +
          " robotników, jeśli wszyscy pracują w tym samym tempie?";
      },
      "word.unitDays": "dni",
      "word.motherAge": function (v) {
        return "Mama jest dziś " + v.mult + " razy starsza od syna, który ma " + cnt(v.child, "rok", "lata", "lat") +
          ". Ile lat będzie miała mama za " + cnt(v.years, "rok", "lata", "lat") + "?";
      },
      "word.consecutive": "Suma trzech kolejnych liczb naturalnych wynosi {sum}. Jaka jest najmniejsza z nich?",
      "word.pencilPacks": function (v) {
        return "Pudełko zawiera " + cnt(v.a, "paczkę", "paczki", "paczek") + " po " + cnt(v.per1, "ołówek", "ołówki", "ołówków") +
          " i " + cnt(v.b, "paczkę", "paczki", "paczek") + " po " + cnt(v.per2, "ołówek", "ołówki", "ołówków") +
          ". Ile ołówków jest w pudełku?";
      },
      "word.treeTaller": "Jedno drzewo ma {small} m wysokości, a drugie jest {times} razy wyższe. O ile metrów drugie drzewo jest wyższe od pierwszego?",
      "word.unitM": "m"
    }
  });

  /* ---- Clock, units, money, geometry ----------------------------------- */
  Z.i18n.add("pl", {
    gen: {
      clock: { name: "Zegar", desc: "Odczytaj wskazówki i zapisz godzinę", instr: "Która jest godzina? Zapisz jako gg:mm." },
      units: { name: "Jednostki miary", desc: "Zamiana cm, m, km, g, kg, l, minut", instr: "Zamień na podane jednostki." },
      money: { name: "Pieniądze", desc: "Euro i centy, reszta, zakupy", instr: "Oblicz kwotę." },
      geometry: { name: "Geometria", desc: "Obwód, pole i objętość figur", instr: "Spójrz na rysunek i oblicz." }
    },
    msg: {
      // clock — {from}/{to} are "hh:mm", {n} is minutes
      "measure.clockLater": function (v) { return "Która godzina będzie za " + cnt(v.n, "minutę", "minuty", "minut") + "?"; },
      "measure.clockLaterSol": "{from} + {n} min = {to}",
      "measure.clockShows": "Zegar pokazuje {time}",

      // unit abbreviations (shown after numbers) and family names; "d" = doba
      "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
      "measure.unit.m": "m", "measure.unit.km": "km",
      "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
      "measure.unit.ml": "ml", "measure.unit.l": "l",
      "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": "d",
      "measure.family.len": "długość", "measure.family.mass": "masa",
      "measure.family.vol": "objętość", "measure.family.time": "czas",

      // money — 1 cent, 2 centy, 5 centów; coins as "3 monety 20-centowe"
      "measure.cents": function (v) { return form(v.n, "cent", "centy", "centów"); },
      "measure.centsAmount": function (v) { return cnt(v.n, "cent", "centy", "centów"); },
      "measure.coins": function (v) {
        return v.n + " " + form(v.n, "monetę " + v.c + "-centową", "monety " + v.c + "-centowe", "monet " + v.c + "-centowych");
      },
      "measure.moneyBox": "Do skarbonki wrzucono {list}. Ile centów jest razem w skarbonce?",
      "measure.eurToCents": function (v) {
        return v.eur + " euro i " + cnt(v.ct, "cent", "centy", "centów") + " = " + v.blank + " centów";
      },
      "measure.change": "Kupujemy dwie rzeczy za {p1} i {p2} i płacimy banknotem {paid}. Ile reszty dostajemy?",

      // geometry
      "measure.askPerim": "Oblicz obwód (P).",
      "measure.askPerimSquare": "Kwadrat. Oblicz obwód (P).",
      "measure.askArea": "Oblicz pole (S).",
      "measure.askAreaSquare": "Kwadrat. Oblicz pole (S).",
      "measure.askAreaTri": "Oblicz pole (S) trójkąta.",
      "measure.sideFromPerim": "Prostokąt ma obwód P = {p} {u}, a jeden z jego boków ma {a} {u}. Jaką długość ma drugi bok?",
      "measure.volCube": "Sześcian ma krawędź długości {a} {u}. Oblicz objętość (V).",
      "measure.volCuboid": "Prostopadłościan ma wymiary {dims} {u}. Oblicz objętość (V).",
      "measure.askCircumference": "Oblicz długość okręgu (C). Przyjmij π ≈ {pi}.",
      "measure.askAreaCircle": "Oblicz pole koła (S). Przyjmij π ≈ {pi}."
    }
  });

  /* ---- Fractions, algebra, number theory ------------------------------- */
  Z.i18n.add("pl", {
    gen: {
      fractions:  { name: "Ułamki zwykłe", desc: "Porównywanie, skracanie, dodawanie i odejmowanie", instr: "Oblicz. Ułamek zapisz jako 3/4." },
      decimals:   { name: "Ułamki dziesiętne", desc: "Działania na ułamkach dziesiętnych", instr: "Oblicz." },
      percent:    { name: "Procenty", desc: "Procent liczby, obniżka, podwyżka", instr: "Oblicz." },
      divis:      { name: "Podzielność i dzielniki", desc: "Cechy podzielności, liczby pierwsze, NWD i NWW", instr: "Odpowiedz na pytanie." },
      powers:     { name: "Potęgi i pierwiastki", desc: "Kwadraty, sześciany i pierwiastki kwadratowe", instr: "Oblicz." },
      negatives:  { name: "Liczby ujemne", desc: "Działania na liczbach całkowitych", instr: "Oblicz." },
      equations:  { name: "Równania", desc: "Znajdź x — od prostych do takich z x po obu stronach", instr: "Rozwiąż równanie. Znajdź x." },
      algebra:    { name: "Wyrażenia algebraiczne", desc: "Mnożenie nawiasów, wzory skróconego mnożenia", instr: "Oblicz wartość dla podanych liczb." },
      pythagoras: { name: "Twierdzenie Pitagorasa", desc: "Trójkąt prostokątny — znajdź brakujący bok", instr: "Znajdź brakujący bok." },
      roman:      { name: "Liczby rzymskie", desc: "Od I do MMXXV i z powrotem", instr: "Zapisz cyframi arabskimi lub rzymskimi." },
      logic:      { name: "Łamigłówki", desc: "Zagadki, ukryte liczby, logika", instr: "Pomyśl i znajdź odpowiedź." }
    },
    msg: {
      /* fractions — {f} is fraction HTML */
      "adv.simplify": "Skróć ułamek: {f}",
      "adv.commonDenSol": "Wspólny mianownik {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
      "adv.toImproper": "Zamień na ułamek niewłaściwy: {f}",
      "adv.toMixed": "Zamień na liczbę mieszaną: {f}",
      /* an extra accepted spelling of a mixed number: "2i1/3" */
      "adv.mixedAltAnd": "{w}i{n}/{d}",
      "adv.toMixedSol": function (v) {
        return v.imp + " : " + v.d + " = " + cnt(v.w, "całość", "całości", "całości") + ", reszta " + v.r +
          " → " + v.w + " " + v.r + "/" + v.d;
      },
      "adv.fractionOf": "Ile to jest {f} z {n}?",
      /* percent */
      "adv.percentOf": "{p}% liczby {n}",
      "adv.decreaseBy": "Zmniejsz {n} o {p}%",
      "adv.increaseBy": "Zwiększ {n} o {p}%",
      "adv.whatPercent": "Jakim procentem liczby {n} jest {part}?",
      /* divisibility — yes/no are also the answer choices */
      "adv.yes": "tak",
      "adv.no": "nie",
      "adv.isDivisible": "Czy liczba {n} jest podzielna przez {d}?",
      "adv.divRemainderSol": "{n} : {d} → reszta {r}",
      "adv.isPrime": "Czy {n} jest liczbą pierwszą?",
      "adv.primeSol": "{n} dzieli się tylko przez 1 i przez samą siebie.",
      "adv.compositeSol": "{n} dzieli się także przez {d}.",
      "adv.gcdOf": "NWD({a}, {b})",
      "adv.gcdSol": "Największy wspólny dzielnik to {v}",
      "adv.lcmOf": "NWW({a}, {b})",
      "adv.lcmSol": "Najmniejsza wspólna wielokrotność to {v}",
      /* algebra, pythagoras */
      "adv.evaluateAt": "Oblicz wartość wyrażenia {expr} dla x = {x}",
      "adv.unitCm": "cm",
      /* brain teasers */
      "adv.thinkOfNumber": "Myślę o pewnej liczbie. Mnożę ją przez {m} i dodaję {add}. Wychodzi {res}. O jakiej liczbie myślę?",
      "adv.chickensRabbits": function (v) {
        return "Na podwórku są kury i króliki — razem mają " + cnt(v.heads, "głowę", "głowy", "głów") + " i " +
          cnt(v.legs, "nogę", "nogi", "nóg") + ". Ile jest królików?";
      },
      "adv.chickensRabbitsSol": function (v) {
        return "Gdyby były same kury: " + cnt(v.legs, "noga", "nogi", "nóg") + ". Różnica " + v.diff + " : 2 = " + v.b;
      },
      "adv.magicSquare": "Kwadrat magiczny: suma liczb w każdym wierszu, w każdej kolumnie i na każdej przekątnej wynosi {sum}. Jakiej liczby brakuje?",
      "adv.magicSquareSol": "Suma w wierszu {sum} → {v}",
      "adv.towers": function (v) {
        return v.kid + " układa " + cnt(v.n, "klocek", "klocki", "klocków") + " w wieże po " + cnt(v.per, "klocek", "klocki", "klocków") +
          ". Ile pełnych wież powstaje? (zapisz liczbę wież)";
      },
      "adv.towersSol": "{n} : {per} = {q} r {r}"
    }
  });
})();
