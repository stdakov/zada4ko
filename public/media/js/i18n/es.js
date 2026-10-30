/* ==========================================================================
   zada4ko.com — Spanish (Spain)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   ========================================================================== */
"use strict";

(function () {

/* Grammar helpers for this file: nouns are [singular, plural, gender], gender
   "m" or "f" (read as noun.f[2]). */
var ES = {
  g: function (th) { return th.f && th.f[2] === "f" ? "f" : "m"; },
  /** pick the masculine or feminine word for this noun */
  mf: function (th, m, f) { return ES.g(th) === "f" ? f : m; }
};

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("es", {
  fmt: {
    dec: ",",
    and: " y ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Lucía", "Hugo", "Martina", "Pablo", "Sofía", "Daniel", "Julia", "Mateo", "Valeria", "Álvaro",
         "Paula", "Leo", "Carla", "Martín", "Alba", "Lucas", "Noa", "Manuel", "Emma", "Diego"],
  /* [singular, plural, gender "m"/"f"] */
  nouns: {
    apple: ["manzana", "manzanas", "f"], banana: ["plátano", "plátanos", "m"], pencil: ["lápiz", "lápices", "m"],
    balloon: ["globo", "globos", "m"], book: ["libro", "libros", "m"], sweet: ["caramelo", "caramelos", "m"],
    ball: ["pelota", "pelotas", "f"], flower: ["flor", "flores", "f"], sticker: ["pegatina", "pegatinas", "f"],
    nut: ["nuez", "nueces", "f"], strawberry: ["fresa", "fresas", "f"], cube: ["cubo", "cubos", "m"],
    cat: ["gato", "gatos", "m"], dog: ["perro", "perros", "m"], bunny: ["conejito", "conejitos", "m"], chick: ["pollito", "pollitos", "m"],
    fish: ["pez", "peces", "m"], butterfly: ["mariposa", "mariposas", "f"], ant: ["hormiga", "hormigas", "f"], bee: ["abeja", "abejas", "f"],
    notebook: ["cuaderno", "cuadernos", "m"], backpack: ["mochila", "mochilas", "f"], puzzle: ["puzle", "puzles", "m"],
    umbrella: ["paraguas", "paraguas", "m"], cap: ["gorra", "gorras", "f"], toy: ["juguete", "juguetes", "m"], mug: ["taza", "tazas", "f"],
    icecream: ["helado", "helados", "m"], ticket: ["entrada", "entradas", "f"], plantpot: ["maceta", "macetas", "f"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("es", {
  ui: {
    docTitle: "zada4ko — fichas de matemáticas para niños",
    language: "Idioma",
    gshort0: "Inf", gshort1: "1.º", gshort2: "2.º", gshort3: "3.º", gshort4: "4.º", gshort5: "5.º", gshort6: "6.º", gshort7: "ESO",
    answerLabel: "Respuesta:",
    variantLetters: "ABCD",
    brandSub: "matemáticas para niños",
    navHome: "Inicio", navStudio: "Crear ejercicios", navTeachers: "Para docentes",
    navProgress: "Mi progreso", navAbout: "Cómo funciona", menu: "Menú",
    heroBadge: "Ejercicios nuevos con cada clic",
    heroTitle: "Matemáticas sin fin para",
    heroTitleHl: "niños curiosos",
    heroLead:
      "Elige un curso y los temas, y tendrás una ficha lista al momento. Resuélvela en línea con corrección instantánea o imprímela para un examen, los deberes o para practicar más.",
    heroCta1: "Crear ejercicios",
    heroCta2: "Empieza ya: 1.º de Primaria",
    stat1: "tipos de ejercicios", stat2: "cursos", stat3: "combinaciones",
    gradesTitle: "¿En qué curso está el niño o la niña?",
    topicsTitle: "Ejercicios por curso y tema",
    gradesLead: "Cada curso abre los temas de su programa: desde contar manzanas hasta el teorema de Pitágoras.",
    grade0: "Infantil",
    grade1: "1.º de Primaria", grade2: "2.º de Primaria", grade3: "3.º de Primaria", grade4: "4.º de Primaria",
    grade5: "5.º de Primaria", grade6: "6.º de Primaria", grade7: "1.º de ESO",
    ageLabel: "años",
    featTitle: "Qué puede hacer zada4ko",
    f1t: "Resolver en línea", f1d: "Escribe la respuesta y sabrás al instante si está bien. Con puntos, estrellas y confeti.",
    f2t: "Imprimir en papel", f2d: "Una hoja A4 limpia para deberes o un examen, con espacio para el nombre, la fecha y la nota.",
    f3t: "Soluciones", f3d: "Una página aparte, solo para el docente, con la respuesta correcta de cada ejercicio.",
    f4t: "Modelos A / B / C", f4d: "Con un clic tienes distintas versiones del mismo examen.",
    f5t: "Enlace para compartir", f5d: "Cada ficha tiene un código. Comparte el enlace y todos tendrán los mismos ejercicios.",
    f6t: "Problemas", f6d: "Situaciones de la vida real con nombres, dinero, tiempo y distancias.",
    studioTitle: "Taller de ejercicios",
    studioLead: "Ajusta la ficha a la izquierda y mira cómo se crea a la derecha.",
    stepGrade: "Curso", stepTopics: "Temas", stepSettings: "Ajustes",
    panelSetup: "Configurar la ficha",
    pickTopics: "Elige los temas",
    noTopics: "Elige al menos un tema a la izquierda para ver los ejercicios.",
    countLabel: "Ejercicios", totalTasks: "Total de ejercicios",
    titleLabel: "Título de la ficha", titlePlaceholder: "Examen de matemáticas",
    difficulty: "Dificultad", diffEasy: "Fácil", diffNormal: "Normal", diffHard: "Difícil",
    maxNum: "Números hasta", maxAuto: "Según el curso",
    colsAuto: "Automático",
    cols1: "1 columna", cols2: "2 columnas", cols3: "3 columnas", cols4: "4 columnas",
    columns: "Columnas al imprimir", auto: "Auto",
    showKey: "Soluciones", keyNone: "Sin soluciones", keySame: "En la misma hoja", keyPage: "En página aparte",
    workspace: "Espacio para trabajar",
    spaceNone: "Ninguno (compacto)",
    spaceNormal: "Normal",
    spaceMore: "Más",
    pagesWord: "páginas A4",
    pagesEst: "Número aproximado de páginas impresas",
    variants: "Modelos", variantsHint: "Los mismos temas con otros números: así nadie copia.",
    points: "Puntos por ejercicio",
    seedLabel: "Código de la ficha", reshuffle: "Otros números",
    modeSolve: "Resolver en línea", modePrint: "Ficha para imprimir",
    btnPrint: "Imprimir", btnPdf: "Guardar como PDF", btnShare: "Copiar enlace",
    btnCheckAll: "Comprobar todo", btnNew: "Ejercicios nuevos", btnHint: "Pista",
    linkCopied: "¡Enlace copiado!",
    solveScore: "Puntos", solveTime: "Tiempo", solveStreak: "Racha",
    answerPh: "Respuesta", check: "Comprobar",
    correct: "¡Correcto! Muy bien.", wrong: "Uy, no es así.",
    correctIs: "La respuesta correcta es", solutionIs: "Solución",
    resultTitle: "¡Terminado!", resultSub: "Así te ha ido",
    ofTasks: "de", tryAgain: "Inténtalo otra vez", newTasks: "Ejercicios nuevos", printThese: "Imprimir estos",
    perfect: "¡Perfecto! ¡Todo bien!", great: "¡Excelente trabajo!",
    good: "¡Bien hecho! Un poco más de práctica.", keepGoing: "¡No te rindas, inténtalo otra vez!",
    teachTitle: "Pensado para docentes y familias",
    teachLead: "Un examen para toda la clase en 30 segundos, con modelos y soluciones.",
    t1: "Mezcla temas en una misma ficha, tantos como necesites",
    t2: "Modelos A, B y C con la misma dificultad",
    t3: "Puntos por ejercicio y casilla para la nota",
    t4: "Se imprime limpio en blanco y negro, sin gastar tinta de más",
    t5: "Con el código de la ficha recuperas los mismos ejercicios cuando quieras",
    t6: "Funciona sin conexión después de la primera carga",
    teachCta: "Crear un examen",
    progTitle: "Mi progreso", progLead: "Todo se guarda en este navegador, sin registrarse.",
    progSolved: "Ejercicios resueltos", progCorrect: "Respuestas correctas", progAccuracy: "Acierto",
    progSheets: "Fichas creadas", progBadges: "Insignias",
    byTopic: "Por tema",
    progReset: "Borrar el progreso", progResetAsk: "¿Seguro? Se borrará todo el progreso.",
    progEmpty: "Todavía no has resuelto ningún ejercicio. ¡Empieza ya!",
    aboutTitle: "Cómo funciona",
    a1t: "1. Elige un curso", a1d: "Los temas se adaptan al programa de esa edad.",
    a2t: "2. Elige los temas", a2d: "Mezcla sumas, fracciones, problemas y geometría como quieras.",
    a3t: "3. Resuelve o imprime", a3d: "En línea con corrección, o en papel con las soluciones para el docente.",
    footTagline: "Un generador gratuito de fichas de matemáticas para niños, desde Infantil hasta 1.º de ESO.",
    footLinks: "Enlaces rápidos", footGrades: "Por curso",
    madeBy: "Hecho por", idea: "Inspirado por Mitko",
    answersKey: "Soluciones",
    sheetFoot: "zada4ko.com · fichas de matemáticas para niños",
    sheetName: "Nombre", sheetClass: "Clase", sheetDate: "Fecha", sheetScore: "Nota",
    pts: "p.", variant: "Modelo", taskWord: "ejercicios", close: "Cerrar",
    instrSolve: "Calcula.", of: "de"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("es", {
  badges: {
    first: "Primer paso",
    ten: "10 aciertos",
    fifty: "50 aciertos",
    hundred: "100 aciertos",
    fivehund: "500 aciertos",
    streak5: "Racha de 5",
    streak15: "Racha de 15",
    perfect: "Ficha perfecta",
    perfect5: "5 fichas perfectas",
    explorer: "Explorador",
    master: "Todos los temas",
    printer: "Impresor"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("es", {
  gen: {
    counting:  { name: "Contar", desc: "Cuenta los objetos y escribe el número", instr: "Cuenta y escribe cuántos hay." },
    addsub:    { name: "Sumas y restas", desc: "Las operaciones básicas según el curso" },
    columnar:  { name: "Operaciones en columna", desc: "Un número debajo de otro, ideal para papel", instr: "Calcula en columna." },
    times:     { name: "Tablas de multiplicar", desc: "Multiplicaciones y divisiones hasta 100" },
    bigmuldiv: { name: "Multiplicar y dividir números grandes", desc: "Más allá de las tablas, división con resto" },
    order:     { name: "Orden de las operaciones", desc: "Expresiones con paréntesis: qué va primero", instr: "Calcula respetando el orden de las operaciones." },
    missing:   { name: "El número que falta", desc: "□ + 7 = 15: ¿qué número se esconde?", instr: "Encuentra el número que falta." },
    compare:   { name: "Comparar", desc: "Pon &lt;, &gt; o =", instr: "Escribe &lt;, &gt; o = ." },
    sequence:  { name: "Series de números", desc: "Descubre la regla y continúa", instr: "Descubre la regla y escribe el número que falta." },
    rounding:  { name: "Redondear", desc: "A las decenas, centenas, unidades de millar", instr: "Redondea el número." },
    place:     { name: "Valor posicional", desc: "Unidades, decenas, centenas, unidades de millar", instr: "Responde a la pregunta sobre el número." }
  },
  msg: {
    "arith.countSol": "Contamos uno a uno: {n}.",

    // division with a remainder: the answer as the child writes it, a hint, the worked line
    // ("r" stands for "resto")
    "arith.remAnswer": "{q} r {r}",
    "arith.remHint": "escribe «cociente r resto»",
    "arith.remSol": "{dividend} : {d} = {q} (resto {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "cada número es {step} más que el anterior",
    "arith.seqRuleSub": "cada número es {step} menos que el anterior",
    "arith.seqRuleMul": "cada número es {step} veces mayor que el anterior",
    "arith.seqRuleSquare": "los cuadrados de los números",
    "arith.seqRuleFib": "cada número es la suma de los dos anteriores",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Redondea {n} a las {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "decenas", 100: "centenas", 1000: "unidades de millar", 10000: "decenas de millar" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "¿Qué cifra ocupa el lugar de las {place} en {n}?",
    "arith.placeName": function (v) {
      return ["unidades", "decenas", "centenas", "unidades de millar", "decenas de millar", "centenas de millar"][v.pos];
    },
    "arith.placeSumQ": "Descompón en una suma según el valor de cada cifra: {n}",
    "arith.placeFitQ": "¿Cuántas veces cabe {m} en {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("es", {
  gen: {
    word: {
      name: "Problemas",
      desc: "Situaciones de la vida real para pensar",
      instr: "Lee con atención y resuelve."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " tiene " + Z.qty(v.a, v.th) + " y " + v.k1 + " tiene " + Z.qty(v.b, v.th) +
        ". ¿Cuánt" + ES.mf(v.th, "os ", "as ") + v.th.pl + " tienen en total?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " tiene " + Z.qty(v.a, v.th) + " y le da " + v.b + " a un amigo. ¿Cuánt" +
        ES.mf(v.th, "os ", "as ") + v.th.pl + " le quedan?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " tiene " + Z.qty(v.a, v.th) + ". " + v.k1 + " tiene " + v.d + " más que " + v.k0 +
        ". ¿Cuánt" + ES.mf(v.th, "os ", "as ") + v.th.pl + " tienen entre " + v.k0 + " y " + v.k1 + "?";
    },
    "word.animalLegs": function (v, Z) {
      return "En el patio hay " + Z.qty(v.n, v.th) + ". " +
        (v.n === 1 ? "Tiene " : "Cada " + v.th.sg + " tiene ") + v.legs + " patas. ¿Cuántas patas hay en total?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " compra " + v.n + " " + v.th.pl + " a " + v.price + " cada " + ES.mf(v.th, "uno", "una") +
        ". ¿Cuánto paga " + v.k + "?";
    },
    "word.change": function (v) {
      return v.k + " paga " + v.paid + " por " + ES.mf(v.th, "un ", "una ") + v.th.sg + " que cuesta " + v.price +
        ". ¿Cuánto dinero le devuelven?";
    },
    "word.saveUp": "{k} ahorra {week} cada semana. Después de {weeks} semanas, {k} quiere comprarse un monopatín de {target}. ¿Cuánto dinero le falta todavía?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "Hay " + v.n + " cajas y en cada una hay " + Z.qty(v.per, v.th) + ". ¿Cuánt" +
        ES.mf(v.th, "os ", "as ") + v.th.pl + " hay en total?";
    },
    "word.shareEqually": function (v) {
      return "Se reparten " + v.total + " " + v.th.pl + " a partes iguales entre " + v.kids + " niños. ¿Cuánt" +
        ES.mf(v.th, "os", "as") + " recibe cada niño?";
    },
    "word.boxesRest": function (v) {
      return "Tenemos " + v.total + " " + v.th.pl + ". En cada caja caben " + v.per + ". ¿Cuántas cajas llenamos y cuánt" +
        ES.mf(v.th, "os ", "as ") + v.th.pl + " sobran? (escribe «cajas r resto»)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} r {rest}",
    "word.solRemainder": "resto {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} lee {pages} páginas al día durante {days} días. El libro tiene {total} páginas. ¿Cuántas páginas quedan por leer?",
    "word.average": "Tres cestas tienen {a}, {b} y {c} frutas. ¿Cuántas frutas hay de media en cada cesta?",
    "word.sumDiff": "Entre {k0} y {k1} tienen {total} pegatinas. {k0} tiene {d} más que {k1}. ¿Cuántas pegatinas tiene {k0} y cuántas {k1}? (escribe las de {k0})",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "La película empieza a las {start} y dura {dur} minutos. ¿A qué hora termina? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": function (v) {
      return "Un coche va a " + v.speed + " km/h durante " + v.hours + (v.hours === "1" ? " hora" : " horas") +
        ". ¿Qué distancia recorre?";
    },
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Un tren recorre {dist} km a una velocidad media de {speed} km/h. ¿Cuántas horas dura el viaje?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Una tienda tiene " + v.whole + " " + v.th.pl + ". Ha vendido " + v.frac + " de " +
        ES.mf(v.th, "ellos", "ellas") + ". ¿Cuánt" + ES.mf(v.th, "os", "as") + " ha vendido?";
    },
    "word.fractionWhole": "{frac} de un número es {part}. ¿Cuál es el número?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "¿Cuánto es el {p}% de {base}?",
    "word.saleJacket": "Una chaqueta cuesta {price}. En las rebajas, el precio baja un {p}%. ¿Cuál es el nuevo precio?",
    "word.pctStudents": "De {whole} alumnos, {part} hacen deporte. ¿Qué porcentaje es?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} obreros terminan un trabajo en {days} días. ¿Cuántos días necesitarán {more} obreros si trabajan al mismo ritmo?",
    "word.unitDays": "días",
    "word.motherAge": "Hoy la madre tiene {mult} veces la edad de su hijo, que tiene {child} años. ¿Cuántos años tendrá la madre dentro de {years} años?",
    "word.consecutive": "La suma de tres números naturales consecutivos es {sum}. ¿Cuál es el menor de ellos?",
    "word.pencilPacks": "Una caja tiene {a} paquetes de {per1} lápices y {b} paquetes de {per2} lápices. ¿Cuántos lápices hay en la caja?",
    "word.treeTaller": "Un árbol mide {small} m y otro es {times} veces más alto. ¿Cuántos metros más alto es el segundo árbol que el primero?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("es", {
  gen: {
    clock: { name: "La hora", desc: "Mira las agujas y escribe la hora", instr: "¿Qué hora es? Escríbela como hh:mm." },
    units: { name: "Unidades de medida", desc: "Convierte cm, m, km, g, kg, l, minutos", instr: "Pasa a la unidad indicada." },
    money: { name: "Dinero", desc: "Euros y céntimos, cambio, compras", instr: "Calcula la cantidad." },
    geometry: { name: "Geometría", desc: "Perímetro, área y volumen de figuras", instr: "Mira el dibujo y calcula." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "¿Qué hora será dentro de {n} minutos?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "El reloj marca {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": function (v) { return v.n === 1 ? "día" : "días"; },
    "measure.family.len": "longitud", "measure.family.mass": "masa",
    "measure.family.vol": "capacidad", "measure.family.time": "tiempo",

    // money
    "measure.cents": function (v) { return v.n === 1 ? "céntimo" : "céntimos"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n === 1 ? "céntimo" : "céntimos"); },
    "measure.coins": function (v) {
      return v.n + (v.n === 1 ? " moneda" : " monedas") + " de " + v.c + (v.c === 1 ? " céntimo" : " céntimos");
    },
    "measure.moneyBox": "En la hucha hay {list}. ¿Cuántos céntimos hay en total?",
    "measure.eurToCents": function (v) {
      return v.eur + (v.eur === 1 ? " euro" : " euros") + " y " + v.ct + " céntimos = " + v.blank + " céntimos";
    },
    "measure.change": "Compramos dos cosas por {p1} y {p2} y pagamos con un billete de {paid}. ¿Cuánto nos devuelven?",

    // geometry
    "measure.askPerim": "Calcula el perímetro (P).",
    "measure.askPerimSquare": "Un cuadrado. Calcula el perímetro (P).",
    "measure.askArea": "Calcula el área (S).",
    "measure.askAreaSquare": "Un cuadrado. Calcula el área (S).",
    "measure.askAreaTri": "Calcula el área (S) del triángulo.",
    "measure.sideFromPerim": "Un rectángulo tiene un perímetro P = {p} {u} y un lado de {a} {u}. ¿Cuánto mide el otro lado?",
    "measure.volCube": "Un cubo tiene una arista de {a} {u}. Calcula el volumen (V).",
    "measure.volCuboid": "Un prisma rectangular mide {dims} {u}. Calcula el volumen (V).",
    "measure.askCircumference": "Calcula la longitud de la circunferencia (C). Toma π ≈ {pi}.",
    "measure.askAreaCircle": "Calcula el área (S) del círculo. Toma π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("es", {
  gen: {
    fractions:  { name: "Fracciones", desc: "Comparar, simplificar, sumar y restar", instr: "Calcula. Escribe las fracciones así: 3/4." },
    decimals:   { name: "Números decimales", desc: "Operaciones con decimales", instr: "Calcula." },
    percent:    { name: "Porcentajes", desc: "Porcentaje de un número, descuentos, aumentos", instr: "Calcula." },
    divis:      { name: "Divisibilidad", desc: "Criterios de divisibilidad, primos, m.c.d. y m.c.m.", instr: "Responde a la pregunta." },
    powers:     { name: "Potencias y raíces", desc: "Cuadrados, cubos y raíces cuadradas", instr: "Calcula." },
    negatives:  { name: "Números negativos", desc: "Operaciones con números enteros", instr: "Calcula." },
    equations:  { name: "Ecuaciones", desc: "Halla x: de las más sencillas a las de dos miembros", instr: "Resuelve la ecuación. Halla x." },
    algebra:    { name: "Expresiones e identidades", desc: "Quitar paréntesis, identidades notables", instr: "Calcula para los valores dados." },
    pythagoras: { name: "Teorema de Pitágoras", desc: "Triángulo rectángulo: halla el lado que falta", instr: "Halla el lado que falta." },
    roman:      { name: "Números romanos", desc: "De I a MMXXV y al revés", instr: "Escribe en números arábigos o romanos." },
    logic:      { name: "Acertijos", desc: "Adivinanzas, números escondidos, lógica", instr: "Piensa bien y encuentra la respuesta." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Simplifica: {f}",
    "adv.commonDenSol": "Denominador común {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Escribe como fracción impropia: {f}",
    "adv.toMixed": "Escribe como número mixto: {f}",
    /* an extra accepted spelling of a mixed number: "2y1/3" */
    "adv.mixedAltAnd": "{w}y{n}/{d}",
    "adv.toMixedSol": function (v) {
      return v.imp + " : " + v.d + " = " + v.w + (v.w === 1 ? " entero" : " enteros") + ", resto " + v.r +
        " → " + v.w + " " + v.r + "/" + v.d;
    },
    "adv.fractionOf": "¿Cuánto es {f} de {n}?",
    /* percent */
    "adv.percentOf": "El {p}% de {n}",
    "adv.decreaseBy": "Disminuye {n} en un {p}%",
    "adv.increaseBy": "Aumenta {n} en un {p}%",
    "adv.whatPercent": "¿Qué porcentaje de {n} es {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "sí",
    "adv.no": "no",
    "adv.isDivisible": "¿Es {n} divisible entre {d}?",
    "adv.divRemainderSol": "{n} : {d} → resto {r}",
    "adv.isPrime": "¿Es {n} un número primo?",
    "adv.primeSol": "{n} solo es divisible entre 1 y entre sí mismo.",
    "adv.compositeSol": "{n} también es divisible entre {d}.",
    "adv.gcdOf": "m.c.d.({a}, {b})",
    "adv.gcdSol": "El máximo común divisor es {v}",
    "adv.lcmOf": "m.c.m.({a}, {b})",
    "adv.lcmSol": "El mínimo común múltiplo es {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Para x = {x}, calcula {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "He pensado un número, lo he multiplicado por {m} y le he sumado {add}. Me ha dado {res}. ¿Qué número he pensado?",
    "adv.chickensRabbits": "En un corral hay gallinas y conejos: {heads} cabezas y {legs} patas en total. ¿Cuántos conejos hay?",
    "adv.chickensRabbitsSol": "Si solo hubiera gallinas: {legs} patas. La diferencia {diff} : 2 = {b}",
    "adv.magicSquare": "Cuadrado mágico: cada fila, columna y diagonal suma {sum}. ¿Qué número falta?",
    "adv.magicSquareSol": "Suma de la fila {sum} → {v}",
    "adv.towers": "{kid} apila {n} cubos en torres de {per}. ¿Cuántas torres completas consigue? (escribe el número de torres)",
    "adv.towersSol": "{n} : {per} = {q} r {r}"
  }
});
})();
