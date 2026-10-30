/* ==========================================================================
   zada4ko.com — Portuguese (European, Portugal)
   Sections: formatting & nouns · interface · badges · arithmetic · word
   problems · measurement · advanced. See the i18n notes in core.js.
   ========================================================================== */
"use strict";

(function () {

/* Grammar helpers for this file: nouns are [singular, plural, gender], gender
   "m" or "f" (read as noun.f[2]). */
var PT = {
  g: function (th) { return th.f && th.f[2] === "f" ? "f" : "m"; },
  /** pick the masculine or feminine word for this noun */
  mf: function (th, m, f) { return PT.g(th) === "f" ? f : m; }
};

/* ---- Formatting, kids' names, nouns ------------------------------------ */
Z.i18n.add("pt", {
  fmt: {
    dec: ",",
    and: " e ",
    cur: "€",
    money: function (s) { return s.replace(".", ",") + " €"; },
    qty: function (n, noun) { return n + " " + (n === 1 ? noun.sg : noun.pl); }
  },
  kids: ["Maria", "Francisco", "Leonor", "Santiago", "Matilde", "Afonso", "Beatriz", "Tomás", "Carolina", "Duarte",
         "Inês", "Rodrigo", "Alice", "Lourenço", "Mariana", "Gabriel", "Sofia", "Martim", "Benedita", "Gonçalo"],
  /* [singular, plural, gender "m"/"f"] */
  nouns: {
    apple: ["maçã", "maçãs", "f"], banana: ["banana", "bananas", "f"], pencil: ["lápis", "lápis", "m"],
    balloon: ["balão", "balões", "m"], book: ["livro", "livros", "m"], sweet: ["rebuçado", "rebuçados", "m"],
    ball: ["bola", "bolas", "f"], flower: ["flor", "flores", "f"], sticker: ["autocolante", "autocolantes", "m"],
    nut: ["noz", "nozes", "f"], strawberry: ["morango", "morangos", "m"], cube: ["cubo", "cubos", "m"],
    cat: ["gato", "gatos", "m"], dog: ["cão", "cães", "m"], bunny: ["coelhinho", "coelhinhos", "m"], chick: ["pintainho", "pintainhos", "m"],
    fish: ["peixe", "peixes", "m"], butterfly: ["borboleta", "borboletas", "f"], ant: ["formiga", "formigas", "f"], bee: ["abelha", "abelhas", "f"],
    notebook: ["caderno", "cadernos", "m"], backpack: ["mochila", "mochilas", "f"], puzzle: ["puzzle", "puzzles", "m"],
    umbrella: ["guarda-chuva", "guarda-chuvas", "m"], cap: ["boné", "bonés", "m"], toy: ["brinquedo", "brinquedos", "m"], mug: ["caneca", "canecas", "f"],
    icecream: ["gelado", "gelados", "m"], ticket: ["bilhete", "bilhetes", "m"], plantpot: ["vaso", "vasos", "m"]
  }
});

/* ---- Interface --------------------------------------------------------- */
Z.i18n.add("pt", {
  ui: {
    /* teachers: ready-made tests · about: privacy note */
    readyT1: "1.º–2.º ano",
    readyT2: "3.º–4.º ano",
    readyT3: "5.º–6.º ano",
    readyT4: "7.º ano",
    readyD1: "Somas e subtrações até 100, comparações, problemas, as horas.",
    readyD2: "Multiplicação e divisão, ordem das operações, unidades de medida, área e perímetro.",
    readyD3: "Frações, números decimais, percentagens, equações, volume e área.",
    readyD4: "Equações, expressões, potências, teorema de Pitágoras, problemas.",
    btnOpen: "Abrir",
    privacyT: "Sem registo e sem publicidade nos exercícios.",
    privacyD: "O progresso fica guardado apenas no navegador deste dispositivo e nunca sai do computador. Depois de carregado, o site também funciona offline.",
    /* search engines: title and description of /pt/ */
    seoTitle: "Fichas de matemática para crianças do 1.º ao 7.º ano — para imprimir e online | zada4ko",
    seoDesc: "O zada4ko é um gerador gratuito de exercícios de matemática para crianças, do pré-escolar ao 7.º ano: somas e subtrações, tabuada, frações, problemas, geometria. Resolve online ou imprime uma ficha com as soluções.",
    docTitle: "zada4ko — fichas de matemática para crianças",
    language: "Língua",
    gshort0: "Pré", gshort1: "1.º", gshort2: "2.º", gshort3: "3.º", gshort4: "4.º", gshort5: "5.º", gshort6: "6.º", gshort7: "7.º",
    answerLabel: "Resposta:",
    variantLetters: "ABCD",
    brandSub: "matemática para crianças",
    navHome: "Início", navStudio: "Criar exercícios", navTeachers: "Para professores",
    navProgress: "O meu progresso", navAbout: "Como funciona", menu: "Menu",
    heroBadge: "Exercícios novos a cada clique",
    heroTitle: "Matemática sem fim para",
    heroTitleHl: "crianças curiosas",
    heroLead:
      "Escolhe o ano e os temas e recebe uma ficha pronta. Resolve-a online com correção imediata ou imprime-a para um teste, para os trabalhos de casa ou para praticar mais.",
    heroCta1: "Criar exercícios",
    heroCta2: "Começar já: 1.º ano",
    stat1: "tipos de exercícios", stat2: "anos", stat3: "combinações",
    gradesTitle: "Em que ano anda a criança?",
    topicsTitle: "Exercícios por ano e tema",
    gradesLead: "Cada ano abre os temas do seu programa — desde contar maçãs até ao teorema de Pitágoras.",
    grade0: "Pré-escolar",
    grade1: "1.º ano", grade2: "2.º ano", grade3: "3.º ano", grade4: "4.º ano",
    grade5: "5.º ano", grade6: "6.º ano", grade7: "7.º ano",
    ageLabel: "anos",
    featTitle: "O que o zada4ko faz",
    f1t: "Resolver online", f1d: "Escreve a resposta e fica logo a saber se está certa. Com pontos, estrelas e confetes.",
    f2t: "Imprimir em papel", f2d: "Uma folha A4 limpa para trabalhos de casa ou um teste — com espaço para o nome, a data e a nota.",
    f3t: "Soluções", f3d: "Uma página à parte, só para o professor, com a resposta certa de cada exercício.",
    f4t: "Versões A / B / C", f4d: "Com um clique crias versões diferentes do mesmo teste.",
    f5t: "Link para partilhar", f5d: "Cada ficha tem um código. Partilha o link e todos recebem os mesmos exercícios.",
    f6t: "Problemas", f6d: "Situações do dia a dia com nomes, dinheiro, tempo e distâncias.",
    studioTitle: "Oficina de exercícios",
    studioLead: "Ajusta a ficha à esquerda e vê-a ganhar forma à direita.",
    stepGrade: "Ano", stepTopics: "Temas", stepSettings: "Definições",
    panelSetup: "Configurar a ficha",
    pickTopics: "Escolhe os temas",
    noTopics: "Escolhe pelo menos um tema à esquerda para veres os exercícios.",
    countLabel: "Exercícios", totalTasks: "Total de exercícios",
    titleLabel: "Título da ficha", titlePlaceholder: "Teste de matemática",
    difficulty: "Dificuldade", diffEasy: "Fácil", diffNormal: "Normal", diffHard: "Difícil",
    maxNum: "Números até", maxAuto: "Conforme o ano",
    colsAuto: "Automático",
    cols1: "1 coluna", cols2: "2 colunas", cols3: "3 colunas", cols4: "4 colunas",
    columns: "Colunas na impressão", auto: "Auto",
    showKey: "Soluções", keyNone: "Sem soluções", keySame: "Na mesma folha", keyPage: "Em página à parte",
    workspace: "Espaço para cálculos",
    spaceNone: "Nenhum (compacto)",
    spaceNormal: "Normal",
    spaceMore: "Mais",
    pagesWord: "páginas A4",
    pagesEst: "Número aproximado de páginas impressas",
    variants: "Versões", variantsHint: "Os mesmos temas com outros números — assim ninguém copia.",
    points: "Pontos por exercício",
    seedLabel: "Código da ficha", reshuffle: "Outros números",
    modeSolve: "Resolver online", modePrint: "Ficha para imprimir",
    btnPrint: "Imprimir", btnPdf: "Guardar em PDF", btnShare: "Copiar link",
    btnCheckAll: "Verificar tudo", btnNew: "Exercícios novos", btnHint: "Dica",
    linkCopied: "Link copiado!",
    solveScore: "Pontos", solveTime: "Tempo", solveStreak: "Sequência",
    answerPh: "Resposta", check: "Verificar",
    correct: "Certo! Muito bem.", wrong: "Ups, não é bem assim.",
    correctIs: "A resposta certa é", solutionIs: "Resolução",
    resultTitle: "Terminado!", resultSub: "Vê como correu",
    ofTasks: "de", tryAgain: "Tentar outra vez", newTasks: "Exercícios novos", printThese: "Imprimir estes",
    perfect: "Perfeito! Tudo certo!", great: "Excelente trabalho!",
    good: "Bom trabalho! Só falta praticar mais um pouco.", keepGoing: "Não desistas — tenta outra vez!",
    teachTitle: "Feito para professores e pais",
    teachLead: "Um teste para a turma inteira em 30 segundos — com versões e soluções.",
    t1: "Junta vários temas numa só ficha — exatamente quantos precisares",
    t2: "Versões A, B e C com a mesma dificuldade",
    t3: "Pontos por exercício e um espaço para a nota",
    t4: "Imprime-se limpo a preto e branco, sem gastar tinta a mais",
    t5: "Com o código da ficha recuperas os mesmos exercícios quando quiseres",
    t6: "Funciona offline depois do primeiro carregamento",
    teachCta: "Criar um teste",
    progTitle: "O meu progresso", progLead: "Fica tudo guardado neste navegador — sem registo.",
    progSolved: "Exercícios resolvidos", progCorrect: "Respostas certas", progAccuracy: "Taxa de acerto",
    progSheets: "Fichas criadas", progBadges: "Medalhas",
    byTopic: "Por tema",
    progReset: "Apagar o progresso", progResetAsk: "Tens a certeza? Todo o progresso será apagado.",
    progEmpty: "Ainda não resolveste nenhum exercício. Começa já!",
    aboutTitle: "Como funciona",
    a1t: "1. Escolhe o ano", a1d: "Os temas adaptam-se ao programa dessa idade.",
    a2t: "2. Escolhe os temas", a2d: "Junta somas, frações, problemas e geometria como quiseres.",
    a3t: "3. Resolve ou imprime", a3d: "Online com correção, ou em papel com as soluções para o professor.",
    footTagline: "Um gerador gratuito de fichas de matemática para crianças, do pré-escolar ao 7.º ano.",
    footLinks: "Links rápidos", footGrades: "Por ano",
    madeBy: "Feito por", idea: "Inspirado no Mitko",
    answersKey: "Soluções",
    sheetFoot: "zada4ko.com · fichas de matemática para crianças",
    sheetName: "Nome", sheetClass: "Turma", sheetDate: "Data", sheetScore: "Nota",
    pts: "pts", variant: "Versão", taskWord: "exercícios", close: "Fechar",
    instrSolve: "Calcula.", of: "de"
  }
});

/* ---- Badges ------------------------------------------------------------ */
Z.i18n.add("pt", {
  badges: {
    first: "Primeiro passo",
    ten: "10 certas",
    fifty: "50 certas",
    hundred: "100 certas",
    fivehund: "500 certas",
    streak5: "Sequência de 5",
    streak15: "Sequência de 15",
    perfect: "Ficha perfeita",
    perfect5: "5 fichas perfeitas",
    explorer: "Explorador",
    master: "Todos os temas",
    printer: "Impressor"
  }
});

/* ---- Arithmetic topics ------------------------------------------------- */
Z.i18n.add("pt", {
  gen: {
    counting:  { name: "Contar", desc: "Conta os objetos e escreve o número", instr: "Conta e escreve quantos são." },
    addsub:    { name: "Adição e subtração", desc: "As operações básicas de acordo com o ano" },
    columnar:  { name: "Contas em coluna", desc: "Um número por baixo do outro — ótimo para papel", instr: "Calcula em coluna." },
    times:     { name: "Tabuada", desc: "Multiplicação e divisão até 100" },
    bigmuldiv: { name: "Multiplicar e dividir números grandes", desc: "Para além da tabuada, divisão com resto" },
    order:     { name: "Ordem das operações", desc: "Expressões com parênteses — o que se faz primeiro", instr: "Calcula, respeitando a ordem das operações." },
    missing:   { name: "O número que falta", desc: "□ + 7 = 15 — que número se esconde?", instr: "Descobre o número que falta." },
    compare:   { name: "Comparar", desc: "Coloca &lt;, &gt; ou =", instr: "Escreve &lt;, &gt; ou = ." },
    sequence:  { name: "Sequências de números", desc: "Descobre a regra e continua", instr: "Descobre a regra e escreve o número que falta." },
    rounding:  { name: "Arredondar", desc: "Às dezenas, centenas, unidades de milhar", instr: "Arredonda o número." },
    place:     { name: "Valor de posição", desc: "Unidades, dezenas, centenas, unidades de milhar", instr: "Responde à pergunta sobre o número." }
  },
  msg: {
    "arith.countSol": "Contamos um a um: {n}.",

    // division with a remainder: the answer as the child writes it, a hint, the worked line
    // ("r" stands for "resto")
    "arith.remAnswer": "{q} r {r}",
    "arith.remHint": "escreve «quociente r resto»",
    "arith.remSol": "{dividend} : {d} = {q} (resto {r})",

    // the rule behind a number sequence
    "arith.seqRuleAdd": "cada número é o anterior mais {step}",
    "arith.seqRuleSub": "cada número é o anterior menos {step}",
    "arith.seqRuleMul": "cada número é {step} vezes maior do que o anterior",
    "arith.seqRuleSquare": "os quadrados dos números",
    "arith.seqRuleFib": "cada número é a soma dos dois anteriores",

    // rounding: {unit} is arith.roundUnit for 10 / 100 / 1000 / 10000
    "arith.roundQ": "Arredonda {n} às {unit}",
    "arith.roundUnit": function (v) {
      return { 10: "dezenas", 100: "centenas", 1000: "unidades de milhar", 10000: "dezenas de milhar" }[v.to];
    },

    // place value: {place} is arith.placeName for position 0 = units … 5 = hundred thousands
    "arith.placeDigitQ": "Qual é o algarismo das {place} no número {n}?",
    "arith.placeName": function (v) {
      return ["unidades", "dezenas", "centenas", "unidades de milhar", "dezenas de milhar", "centenas de milhar"][v.pos];
    },
    "arith.placeSumQ": "Decompõe numa soma de acordo com o valor de cada algarismo: {n}",
    "arith.placeFitQ": "Quantas vezes cabe {m} em {big}?"
  }
});

/* ---- Word problems ----------------------------------------------------- */
Z.i18n.add("pt", {
  gen: {
    word: {
      name: "Problemas",
      desc: "Situações do dia a dia que fazem pensar",
      instr: "Lê com atenção e resolve."
    }
  },
  msg: {
    /* ------------------------------ Grades 0–2 ------------------------------ */
    "word.together": function (v, Z) {
      return v.k0 + " tem " + Z.qty(v.a, v.th) + " e " + v.k1 + " tem " + Z.qty(v.b, v.th) +
        ". Quant" + PT.mf(v.th, "os ", "as ") + v.th.pl + " têm ao todo?";
    },
    "word.giveAway": function (v, Z) {
      return v.k + " tem " + Z.qty(v.a, v.th) + " e dá " + v.b + " a um amigo. Com quant" +
        PT.mf(v.th, "os ", "as ") + v.th.pl + " fica " + v.k + "?";
    },
    "word.moreThan": function (v, Z) {
      return v.k0 + " tem " + Z.qty(v.a, v.th) + ". " + v.k1 + " tem mais " + v.d + " do que " + v.k0 +
        ". Quant" + PT.mf(v.th, "os ", "as ") + v.th.pl + " têm " + v.k0 + " e " + v.k1 + " ao todo?";
    },
    "word.animalLegs": function (v, Z) {
      return "No quintal há " + Z.qty(v.n, v.th) + ". " +
        (v.n === 1 ? "Tem " : "Cada " + v.th.sg + " tem ") + v.legs + " patas. Quantas patas há ao todo?";
    },

    /* ------------------------------ Money ---------------------------------- */
    "word.buyMany": function (v) {
      return v.k + " compra " + v.n + " " + v.th.pl + " a " + v.price + " cada " + PT.mf(v.th, "um", "uma") +
        ". Quanto paga " + v.k + "?";
    },
    "word.change": function (v) {
      return v.k + " paga " + v.paid + " por " + PT.mf(v.th, "um ", "uma ") + v.th.sg + " que custa " + v.price +
        ". Quanto recebe de troco?";
    },
    "word.saveUp": "{k} poupa {week} todas as semanas. Ao fim de {weeks} semanas, {k} quer comprar um skate de {target}. Quanto dinheiro ainda falta?",

    /* ------------------------ Sharing / grouping ---------------------------- */
    "word.boxesTotal": function (v, Z) {
      return "Há " + v.n + " caixas e em cada uma há " + Z.qty(v.per, v.th) + ". Quant" +
        PT.mf(v.th, "os ", "as ") + v.th.pl + " há ao todo?";
    },
    "word.shareEqually": function (v) {
      return "Repartem-se " + v.total + " " + v.th.pl + " em partes iguais por " + v.kids + " crianças. Quant" +
        PT.mf(v.th, "os", "as") + " recebe cada criança?";
    },
    "word.boxesRest": function (v) {
      return "Temos " + v.total + " " + v.th.pl + ". Em cada caixa cabem " + v.per + ". Quantas caixas enchemos e quant" +
        PT.mf(v.th, "os ", "as ") + v.th.pl + " sobram? (escreve «caixas r resto»)";
    },
    /* the expected answer, in the form the hint above asks for */
    "word.boxesRestAns": "{boxes} r {rest}",
    "word.solRemainder": "resto {rest}",

    /* --------------------------- Two & three steps -------------------------- */
    "word.pagesLeft": "{k} lê {pages} páginas por dia durante {days} dias. O livro tem {total} páginas. Quantas páginas faltam ler?",
    "word.average": "Três cestos têm {a}, {b} e {c} peças de fruta. Quantas peças de fruta há, em média, em cada cesto?",
    "word.sumDiff": "{k0} e {k1} têm, ao todo, {total} autocolantes. {k0} tem mais {d} do que {k1}. Quantos autocolantes tem {k0} e quantos tem {k1}? (escreve o número de {k0})",

    /* ------------------------------ Time ------------------------------------ */
    "word.filmEnd": "O filme começa às {start} e dura {dur} minutos. A que horas acaba? (hh:mm)",
    "word.solMin": "min",
    "word.carDistance": function (v) {
      return "Um carro anda a " + v.speed + " km/h durante " + v.hours + (v.hours === "1" ? " hora" : " horas") +
        ". Que distância percorre?";
    },
    "word.unitKm": "km",
    "word.solKm": "km",
    "word.trainTime": "Um comboio percorre {dist} km a uma velocidade média de {speed} km/h. Quantas horas dura a viagem?",
    "word.unitH": "h",

    /* ---------------------------- Fractions --------------------------------- */
    "word.fractionSold": function (v) {
      return "Uma loja tem " + v.whole + " " + v.th.pl + ". Vendeu " + v.frac + " d" +
        PT.mf(v.th, "eles", "elas") + ". Quant" + PT.mf(v.th, "os", "as") + " vendeu?";
    },
    "word.fractionWhole": "{frac} de um número é {part}. Qual é o número?",

    /* ---------------------------- Percentages -------------------------------- */
    "word.pctOf": "Quanto é {p}% de {base}?",
    "word.saleJacket": "Um casaco custa {price}. Nos saldos, o preço baixa {p}%. Qual é o novo preço?",
    "word.pctStudents": "De {whole} alunos, {part} praticam desporto. Que percentagem é essa?",

    /* ---------------------- Proportion & logic (older) ----------------------- */
    "word.workers": "{workers} trabalhadores acabam uma obra em {days} dias. De quantos dias precisam {more} trabalhadores, se trabalharem ao mesmo ritmo?",
    "word.unitDays": "dias",
    "word.motherAge": "Hoje a mãe tem {mult} vezes a idade do filho, que tem {child} anos. Que idade terá a mãe daqui a {years} anos?",
    "word.consecutive": "A soma de três números naturais consecutivos é {sum}. Qual é o menor deles?",
    "word.pencilPacks": "Uma caixa tem {a} pacotes de {per1} lápis e {b} pacotes de {per2} lápis. Quantos lápis há na caixa?",
    "word.treeTaller": "Uma árvore mede {small} m e outra é {times} vezes mais alta. Quantos metros mais alta é a segunda árvore do que a primeira?",
    "word.unitM": "m"
  }
});

/* ---- Clock, units, money, geometry ------------------------------------- */
Z.i18n.add("pt", {
  gen: {
    clock: { name: "As horas", desc: "Olha para os ponteiros e escreve as horas", instr: "Que horas são? Escreve como hh:mm." },
    units: { name: "Unidades de medida", desc: "Converte cm, m, km, g, kg, l, minutos", instr: "Converte para a unidade indicada." },
    money: { name: "Dinheiro", desc: "Euros e cêntimos, troco, compras", instr: "Calcula o valor." },
    geometry: { name: "Geometria", desc: "Perímetro, área e volume de figuras", instr: "Observa a figura e calcula." }
  },
  msg: {
    // clock — {from}/{to} are "hh:mm", {n} is minutes
    "measure.clockLater": "Que horas serão daqui a {n} minutos?",
    "measure.clockLaterSol": "{from} + {n} min = {to}",
    "measure.clockShows": "O relógio marca {time}",

    // unit abbreviations (shown after numbers) and family names
    "measure.unit.mm": "mm", "measure.unit.cm": "cm", "measure.unit.dm": "dm",
    "measure.unit.m": "m", "measure.unit.km": "km",
    "measure.unit.g": "g", "measure.unit.kg": "kg", "measure.unit.t": "t",
    "measure.unit.ml": "ml", "measure.unit.l": "l",
    "measure.unit.s": "s", "measure.unit.min": "min", "measure.unit.h": "h", "measure.unit.day": function (v) { return v.n === 1 ? "dia" : "dias"; },
    "measure.family.len": "comprimento", "measure.family.mass": "massa",
    "measure.family.vol": "capacidade", "measure.family.time": "tempo",

    // money
    "measure.cents": function (v) { return v.n === 1 ? "cêntimo" : "cêntimos"; },
    "measure.centsAmount": function (v) { return v.n + " " + (v.n === 1 ? "cêntimo" : "cêntimos"); },
    "measure.coins": function (v) {
      return v.n + (v.n === 1 ? " moeda" : " moedas") + " de " + v.c + (v.c === 1 ? " cêntimo" : " cêntimos");
    },
    "measure.moneyBox": "No mealheiro há {list}. Quantos cêntimos há ao todo?",
    "measure.eurToCents": function (v) {
      return v.eur + (v.eur === 1 ? " euro" : " euros") + " e " + v.ct + " cêntimos = " + v.blank + " cêntimos";
    },
    "measure.change": "Compramos duas coisas por {p1} e {p2} e pagamos com uma nota de {paid}. Quanto recebemos de troco?",

    // geometry
    "measure.askPerim": "Calcula o perímetro (P).",
    "measure.askPerimSquare": "Um quadrado. Calcula o perímetro (P).",
    "measure.askArea": "Calcula a área (S).",
    "measure.askAreaSquare": "Um quadrado. Calcula a área (S).",
    "measure.askAreaTri": "Calcula a área (S) do triângulo.",
    "measure.sideFromPerim": "Um retângulo tem perímetro P = {p} {u} e um lado de {a} {u}. Quanto mede o outro lado?",
    "measure.volCube": "Um cubo tem uma aresta de {a} {u}. Calcula o volume (V).",
    "measure.volCuboid": "Um paralelepípedo retângulo mede {dims} {u}. Calcula o volume (V).",
    "measure.askCircumference": "Calcula o perímetro (C) da circunferência. Usa π ≈ {pi}.",
    "measure.askAreaCircle": "Calcula a área (S) do círculo. Usa π ≈ {pi}."
  }
});

/* ---- Fractions, algebra, number theory --------------------------------- */
Z.i18n.add("pt", {
  gen: {
    fractions:  { name: "Frações", desc: "Comparar, simplificar, somar e subtrair", instr: "Calcula. Escreve as frações assim: 3/4." },
    decimals:   { name: "Números decimais", desc: "Contas com números decimais", instr: "Calcula." },
    percent:    { name: "Percentagens", desc: "Percentagem de um número, descontos, aumentos", instr: "Calcula." },
    divis:      { name: "Divisibilidade", desc: "Critérios de divisibilidade, números primos, m.d.c. e m.m.c.", instr: "Responde à pergunta." },
    powers:     { name: "Potências e raízes", desc: "Quadrados, cubos e raízes quadradas", instr: "Calcula." },
    negatives:  { name: "Números negativos", desc: "Operações com números inteiros", instr: "Calcula." },
    equations:  { name: "Equações", desc: "Descobre x — das mais simples às de dois membros", instr: "Resolve a equação. Descobre x." },
    algebra:    { name: "Expressões e casos notáveis", desc: "Desembaraçar de parênteses, casos notáveis", instr: "Calcula para os valores dados." },
    pythagoras: { name: "Teorema de Pitágoras", desc: "Triângulo retângulo — descobre o lado que falta", instr: "Descobre o lado que falta." },
    roman:      { name: "Numeração romana", desc: "De I a MMXXV e ao contrário", instr: "Escreve em numeração árabe ou romana." },
    logic:      { name: "Desafios", desc: "Adivinhas, números escondidos, lógica", instr: "Pensa bem e descobre a resposta." }
  },
  msg: {
    /* fractions — {f} is fraction HTML */
    "adv.simplify": "Simplifica: {f}",
    "adv.commonDenSol": "Denominador comum {lcm}: {a}/{lcm} + {b}/{lcm} = {ans}",
    "adv.toImproper": "Escreve como fração imprópria: {f}",
    "adv.toMixed": "Escreve como numeral misto: {f}",
    /* an extra accepted spelling of a mixed number: "2e1/3" */
    "adv.mixedAltAnd": "{w}e{n}/{d}",
    "adv.toMixedSol": function (v) {
      return v.imp + " : " + v.d + " = " + v.w + (v.w === 1 ? " inteiro" : " inteiros") + ", resto " + v.r +
        " → " + v.w + " " + v.r + "/" + v.d;
    },
    "adv.fractionOf": "Quanto é {f} de {n}?",
    /* percent */
    "adv.percentOf": "{p}% de {n}",
    "adv.decreaseBy": "Diminui {n} em {p}%",
    "adv.increaseBy": "Aumenta {n} em {p}%",
    "adv.whatPercent": "Que percentagem de {n} é {part}?",
    /* divisibility — yes/no are also the answer choices */
    "adv.yes": "sim",
    "adv.no": "não",
    "adv.isDivisible": "{n} é divisível por {d}?",
    "adv.divRemainderSol": "{n} : {d} → resto {r}",
    "adv.isPrime": "{n} é um número primo?",
    "adv.primeSol": "{n} só é divisível por 1 e por si próprio.",
    "adv.compositeSol": "{n} também é divisível por {d}.",
    "adv.gcdOf": "m.d.c.({a}, {b})",
    "adv.gcdSol": "O máximo divisor comum é {v}",
    "adv.lcmOf": "m.m.c.({a}, {b})",
    "adv.lcmSol": "O mínimo múltiplo comum é {v}",
    /* algebra, pythagoras */
    "adv.evaluateAt": "Para x = {x}, calcula {expr}",
    "adv.unitCm": "cm",
    /* brain teasers */
    "adv.thinkOfNumber": "Pensei num número, multipliquei-o por {m} e somei {add}. Obtive {res}. Em que número pensei?",
    "adv.chickensRabbits": "Num quintal há galinhas e coelhos — ao todo, {heads} cabeças e {legs} patas. Quantos coelhos há?",
    "adv.chickensRabbitsSol": "Se só houvesse galinhas: {legs} patas. A diferença {diff} : 2 = {b}",
    "adv.magicSquare": "Quadrado mágico: cada linha, coluna e diagonal soma {sum}. Que número falta?",
    "adv.magicSquareSol": "Soma da linha {sum} → {v}",
    "adv.towers": "{kid} empilha {n} cubos em torres de {per}. Quantas torres completas consegue fazer? (escreve o número de torres)",
    "adv.towersSol": "{n} : {per} = {q} r {r}"
  }
});
})();
