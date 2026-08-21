/* ==========================================================================
   zada4ko.com — generators: word problems
   Every template is grade-gated, so a 1st-grader never meets a percentage.
   ========================================================================== */
"use strict";

(function (Z) {
  var reg = Z.reg, T = Z.T, H = Z.H;

  function L(bg, en) { return Z.i18n.lang === "en" ? en : bg; }
  function cur() { return "€"; }
  /** Bulgarian writes the amount then the symbol: "12,50 €". English: "€12.50". */
  function money(v) {
    var s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.00$/, "");
    return L(s.replace(".", ",") + " €", "€" + s);
  }
  function ansMoney(v) { return String(Math.round(v * 100) / 100).replace(/\.0+$/, ""); }

  /* Each template: { g:[grades], f:function(rng,ctx) -> task } */
  var TPL = [
    /* ------------------------------ Grades 0–2 ------------------------------ */
    {
      g: [0, 1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2), th = Z.pickThing(rng);
        var max = ctx.grade <= 1 ? 10 : (ctx.grade === 2 ? 40 : 200);
        var a = rng.int(2, max), b = rng.int(2, max);
        return T.word(
          L(k[0] + " има " + Z.qty(a, th) + ", а " + k[1] + " има " + Z.qty(b, th) +
            ". Колко " + th[1] + " имат двамата заедно?",
            k[0] + " has " + a + " " + th[1] + " and " + k[1] + " has " + b + " " + th[1] +
            ". How many " + th[1] + " do they have together?"),
          a + b, { sol: a + " + " + b + " = " + (a + b) }
        );
      }
    },
    {
      g: [0, 1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng);
        var max = ctx.grade <= 1 ? 12 : (ctx.grade === 2 ? 60 : 300);
        var a = rng.int(5, max), b = rng.int(1, a - 1);
        return T.word(
          L(k + " има " + Z.qty(a, th) + " и подарява " + b + " на приятел. Колко " + th[1] + " му остават?",
            k + " has " + a + " " + th[1] + " and gives " + b + " to a friend. How many " + th[1] + " are left?"),
          a - b, { sol: a + " − " + b + " = " + (a - b) }
        );
      }
    },
    {
      g: [1, 2, 3], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2), th = Z.pickThing(rng);
        var max = ctx.grade === 1 ? 10 : (ctx.grade === 2 ? 40 : 150);
        var a = rng.int(3, max), d = rng.int(2, Math.max(3, Math.floor(max / 3)));
        return T.word(
          L(k[0] + " има " + Z.qty(a, th) + ". " + k[1] + " има с " + d + " повече. Колко " + th[1] + " имат общо?",
            k[0] + " has " + a + " " + th[1] + ". " + k[1] + " has " + d + " more. How many do they have in total?"),
          a + (a + d), { work: 2, sol: (a + d) + " + " + a + " = " + (a + a + d) }
        );
      }
    },
    {
      g: [1, 2, 3], f: function (rng, ctx) {
        var th = Z.pickThing(rng, "animals");
        var legs = rng.pick([2, 4]);
        var n = rng.int(3, ctx.grade === 1 ? 6 : 12);
        return T.word(
          L("В двора има " + Z.qty(n, th) + ". Всяко животно има по " + legs + " крака. Колко крака има общо?",
            "There are " + n + " " + th[1] + " in the yard. Each has " + legs + " legs. How many legs in total?"),
          n * legs, { sol: n + " · " + legs + " = " + n * legs }
        );
      }
    },

    /* ------------------------------ Money ---------------------------------- */
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng, "shop");
        var cap = Math.min(th[3] || 15, ctx.grade === 2 ? 6 : 15);
        var price = rng.int(2, Math.max(3, cap));
        var n = rng.int(2, 9);
        return T.word(
          L(k + " купува " + Z.qty(n, th) + " по " + money(price) + ". Колко пари плаща?",
            k + " buys " + n + " " + th[1] + " at " + money(price) + " each. How much does " + k + " pay?"),
          price * n, { unit: cur(), sol: n + " · " + price + " = " + (n * price) + " " + cur() }
        );
      }
    },
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var k = Z.pickKid(rng), th = Z.pickThing(rng, "shop");
        var price = rng.int(2, Math.max(3, Math.min(th[3] || 12, 12)));
        var paid = price + rng.int(2, 15);
        return T.word(
          L(k + " плаща " + money(paid) + " за " + th[0] + " на цена " + money(price) + ". Колко ресто получава?",
            k + " pays " + money(paid) + " for a " + th[0] + " that costs " + money(price) + ". How much change is returned?"),
          paid - price, { unit: cur(), sol: paid + " − " + price + " = " + (paid - price) + " " + cur() }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var k = Z.pickKid(rng);
        var week = rng.int(2, 8), weeks = rng.int(4, 12), target = week * weeks + rng.int(5, 30);
        return T.word(
          L(k + " спестява по " + money(week) + " всяка седмица. След " + weeks + " седмици иска да си купи скейтборд за " +
            money(target) + ". Колко пари още ще му трябват?",
            k + " saves " + money(week) + " every week. After " + weeks + " weeks " + k + " wants a skateboard for " +
            money(target) + ". How much more money is needed?"),
          target - week * weeks,
          { unit: cur(), work: 3, sol: week + " · " + weeks + " = " + week * weeks + "; " + target + " − " + week * weeks + " = " + (target - week * weeks) }
        );
      }
    },

    /* ------------------------ Sharing / grouping ---------------------------- */
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var th = Z.pickThing(rng), n = rng.int(2, 8), per = rng.int(2, ctx.grade === 2 ? 6 : 12);
        return T.word(
          L("В " + n + " кутии има по " + Z.qty(per, th) + ". Колко " + th[1] + " има общо?",
            "There are " + per + " " + th[1] + " in each of " + n + " boxes. How many " + th[1] + " in total?"),
          n * per, { sol: n + " · " + per + " = " + n * per }
        );
      }
    },
    {
      g: [2, 3, 4], f: function (rng, ctx) {
        var th = Z.pickThing(rng), kids = rng.int(2, 8), per = rng.int(2, 12);
        var total = kids * per;
        return T.word(
          L(total + " " + th[1] + " се разделят поравно между " + kids + " деца. По колко получава всяко дете?",
            total + " " + th[1] + " are shared equally between " + kids + " children. How many does each child get?"),
          per, { sol: total + " : " + kids + " = " + per }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var th = Z.pickThing(rng), per = rng.int(3, 9), boxes = rng.int(4, 15), rest = rng.int(1, per - 1);
        var total = per * boxes + rest;
        return T.word(
          L("Имаме " + Z.qty(total, th) + ". В една кутия влизат по " + per + ". Колко кутии ще напълним докрай и колко " +
            th[1] + " ще останат? (запиши като „кутии ост. брой“)",
            "We have " + total + " " + th[1] + ". A box holds " + per + ". How many full boxes and how many " +
            th[1] + " are left? (write as “boxes r left”)"),
          boxes + L(" ост. ", " r ") + rest,
          {
            kind: "text", work: 2,
            alts: [boxes + "ост" + rest, boxes + " " + rest, boxes + "r" + rest],
            sol: total + " : " + per + " = " + boxes + " (" + L("остатък", "remainder") + " " + rest + ")"
          }
        );
      }
    },

    /* --------------------------- Two & three steps -------------------------- */
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var k = Z.pickKid(rng);
        var pages = rng.int(8, 30), days = rng.int(4, 12), total = pages * days + rng.int(10, 90);
        return T.word(
          L(k + " чете по " + pages + " страници на ден в продължение на " + days + " дни. Книгата има " + total +
            " страници. Колко страници остават непрочетени?",
            k + " reads " + pages + " pages a day for " + days + " days. The book has " + total +
            " pages. How many pages are left unread?"),
          total - pages * days,
          { work: 3, sol: pages + " · " + days + " = " + pages * days + "; " + total + " − " + pages * days + " = " + (total - pages * days) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var a = rng.int(15, 60), b = rng.int(15, 60), c = rng.int(15, 60), n = 3;
        var sum = a + b + c;
        return T.word(
          L("В три кошници има съответно " + a + ", " + b + " и " + c + " плода. Колко плода средно има в една кошница?",
            "Three baskets hold " + a + ", " + b + " and " + c + " fruits. What is the average number of fruits per basket?"),
          Math.round((sum / n) * 100) / 100,
          { work: 2, sol: "(" + a + " + " + b + " + " + c + ") : 3 = " + (Math.round((sum / n) * 100) / 100) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var k = Z.pickKids(rng, 2);
        var total = rng.step(40, 300, 2), d = rng.step(4, 40, 2);
        var big = (total + d) / 2, small = (total - d) / 2;
        return T.word(
          L(k[0] + " и " + k[1] + " заедно имат " + total + " стикера. " + k[0] + " има с " + d +
            " повече от " + k[1] + ". По колко стикера има всеки? (запиши първо колко има " + k[0] + ")",
            k[0] + " and " + k[1] + " have " + total + " stickers together. " + k[0] + " has " + d +
            " more than " + k[1] + ". How many does each have? (write " + k[0] + "'s number)"),
          big,
          { work: 3, sol: "(" + total + " + " + d + ") : 2 = " + big + "; " + k[1] + ": " + small }
        );
      }
    },

    /* ------------------------------ Time ------------------------------------ */
    {
      g: [2, 3, 4, 5], f: function (rng, ctx) {
        var h = rng.int(7, 18), m = rng.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
        var dur = rng.pick([25, 35, 40, 45, 50, 55, 70, 90, 105]);
        var tot = h * 60 + m + dur;
        var eh = Math.floor(tot / 60) % 24, em = tot % 60;
        var f = function (a, b) { return (a < 10 ? "0" + a : a) + ":" + (b < 10 ? "0" + b : b); };
        return T.word(
          L("Филмът започва в " + f(h, m) + " ч. и трае " + dur + " минути. В колко часа свършва? (чч:мм)",
            "The film starts at " + f(h, m) + " and lasts " + dur + " minutes. What time does it end? (hh:mm)"),
          f(eh, em),
          { kind: "text", alts: [eh + ":" + (em < 10 ? "0" + em : em)], sol: f(h, m) + " + " + dur + " min = " + f(eh, em) }
        );
      }
    },
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var speed = rng.pick([40, 50, 60, 70, 80, 90, 100]);
        var hours = rng.pick([2, 3, 4, 5, 1.5, 2.5]);
        return T.word(
          L("Автомобил се движи със скорост " + speed + " км/ч в продължение на " + H.num(hours) +
            " часа. Какво разстояние изминава?",
            "A car travels at " + speed + " km/h for " + H.num(hours) + " hours. What distance does it cover?"),
          speed * hours, { unit: "км", sol: speed + " · " + H.num(hours) + " = " + (speed * hours) + " km" }
        );
      }
    },
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var speed = rng.pick([45, 60, 75, 80, 90, 120]);
        var dist = speed * rng.pick([2, 3, 4]);
        return T.word(
          L("Влак изминава " + dist + " км със средна скорост " + speed + " км/ч. За колко часа пътува?",
            "A train covers " + dist + " km at an average speed of " + speed + " km/h. How many hours does it travel?"),
          dist / speed, { unit: L("ч", "h"), sol: dist + " : " + speed + " = " + (dist / speed) }
        );
      }
    },

    /* ---------------------------- Fractions --------------------------------- */
    {
      g: [4, 5, 6], f: function (rng, ctx) {
        var d = rng.pick([2, 3, 4, 5, 6, 8, 10]);
        var n = rng.int(1, d - 1);
        var whole = d * rng.int(3, 20);
        var th = Z.pickThing(rng);
        return T.word(
          L("В магазина има " + Z.qty(whole, th) + ". Продадени са " + H.frac(n, d) + " от тях. Колко " + th[1] + " са продадени?",
            "A shop has " + whole + " " + th[1] + ". " + H.frac(n, d) + " of them were sold. How many were sold?"),
          (whole / d) * n,
          { work: 2, sol: whole + " : " + d + " · " + n + " = " + (whole / d) * n }
        );
      }
    },
    {
      g: [5, 6], f: function (rng, ctx) {
        var d = rng.pick([3, 4, 5, 6, 8]);
        var n = rng.int(1, d - 1);
        var part = rng.int(2, 15) * n;
        var whole = (part / n) * d;
        return T.word(
          L(H.frac(n, d) + " от едно число е " + part + ". Кое е числото?",
            H.frac(n, d) + " of a number is " + part + ". What is the number?"),
          whole, { work: 2, sol: part + " : " + n + " · " + d + " = " + whole }
        );
      }
    },

    /* ---------------------------- Percentages -------------------------------- */
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var p = rng.pick([5, 10, 15, 20, 25, 40, 50, 60, 75]);
        var base = rng.step(40, 800, 20);
        return T.word(
          L("Колко е " + p + "% от " + base + "?", "What is " + p + "% of " + base + "?"),
          Math.round(base * p) / 100,
          { work: 1, sol: base + " · " + p + " : 100 = " + (Math.round(base * p) / 100) }
        );
      }
    },
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var p = rng.pick([10, 15, 20, 25, 30, 40, 50]);
        var price = rng.step(30, 300, 10);
        var final = price * (100 - p) / 100;
        return T.word(
          L("Яке струва " + money(price) + ". В разпродажба цената пада с " + p + "%. Колко струва якето след намалението?",
            "A jacket costs " + money(price) + ". In a sale the price drops by " + p + "%. What is the new price?"),
          ansMoney(final),
          { unit: cur(), work: 3, sol: price + " · " + (100 - p) + " : 100 = " + ansMoney(final) + " " + cur() }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var part = rng.int(3, 60), whole = part * rng.pick([2, 4, 5, 10, 20]);
        return T.word(
          L("От " + whole + " ученици " + part + " спортуват. Колко процента са те?",
            "Out of " + whole + " students, " + part + " do sports. What percentage is that?"),
          Math.round((part / whole) * 10000) / 100,
          { unit: "%", work: 2, sol: part + " : " + whole + " · 100 = " + (Math.round((part / whole) * 10000) / 100) + "%" }
        );
      }
    },

    /* ---------------------- Proportion & logic (older) ----------------------- */
    {
      g: [5, 6, 7], f: function (rng, ctx) {
        var workers = rng.int(2, 6), days = rng.int(4, 15);
        var k = rng.pick([2, 3]);
        return T.word(
          L(workers + " работници завършват работа за " + (days * k) + " дни. За колко дни ще я завършат " +
            (workers * k) + " работници, ако работят еднакво бързо?",
            workers + " workers finish a job in " + (days * k) + " days. How many days will " +
            (workers * k) + " workers need, working at the same rate?"),
          days, { unit: L("дни", "days"), work: 2, sol: (workers * days * k) + " : " + (workers * k) + " = " + days }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var child = rng.int(8, 16), mult = rng.int(2, 4), years = rng.int(3, 12);
        var parent = child * mult;
        return T.word(
          L("Днес майката е " + mult + " пъти по-възрастна от сина си, който е на " + child +
            " години. На колко години ще бъде майката след " + years + " години?",
            "Today the mother is " + mult + " times older than her son, who is " + child +
            ". How old will the mother be in " + years + " years?"),
          parent + years,
          { work: 2, sol: child + " · " + mult + " = " + parent + "; " + parent + " + " + years + " = " + (parent + years) }
        );
      }
    },
    {
      g: [6, 7], f: function (rng, ctx) {
        var n = rng.int(4, 40);
        var sum = n + (n + 1) + (n + 2);
        return T.word(
          L("Сборът на три последователни естествени числа е " + sum + ". Кое е най-малкото от тях?",
            "The sum of three consecutive natural numbers is " + sum + ". What is the smallest of them?"),
          n, { work: 2, sol: "x + (x+1) + (x+2) = " + sum + " → 3x = " + (sum - 3) + " → x = " + n }
        );
      }
    },
    {
      g: [4, 5, 6, 7], f: function (rng, ctx) {
        var a = rng.int(4, 25), b = rng.int(4, 25);
        var per1 = rng.int(2, 9), per2 = rng.int(2, 9);
        var total = a * per1 + b * per2;
        return T.word(
          L("В една кутия има " + a + " пакета по " + per1 + " моливa и " + b + " пакета по " + per2 +
            " молива. Колко молива има в кутията?",
            "A box holds " + a + " packs of " + per1 + " pencils and " + b + " packs of " + per2 +
            " pencils. How many pencils are in the box?"),
          total,
          { work: 3, sol: a + " · " + per1 + " + " + b + " · " + per2 + " = " + total }
        );
      }
    },
    {
      g: [3, 4, 5], f: function (rng, ctx) {
        var small = rng.int(4, 30), times = rng.int(2, 6);
        return T.word(
          L("Едно дърво е високо " + small + " м, а второто е " + times + " пъти по-високо. С колко метра " +
            "второто дърво е по-високо от първото?",
            "One tree is " + small + " m tall, the second is " + times + " times taller. By how many metres " +
            "is the second tree taller than the first?"),
          small * times - small,
          { unit: "м", work: 2, sol: small + " · " + times + " − " + small + " = " + (small * times - small) }
        );
      }
    }
  ];

  reg.add({
    id: "word",
    icon: "📖",
    grades: [0, 1, 2, 3, 4, 5, 6, 7],
    cols: 1,
    name: { bg: "Текстови задачи", en: "Word problems" },
    desc: { bg: "Житейски ситуации, които искат мислене", en: "Real-life situations that need thinking" },
    instr: { bg: "Прочети внимателно и реши.", en: "Read carefully and solve." },
    make: function (rng, ctx) {
      var pool = TPL.filter(function (t) { return t.g.indexOf(ctx.grade) !== -1; });
      if (!pool.length) pool = TPL.filter(function (t) { return t.g.indexOf(4) !== -1; });
      var t = rng.pick(pool).f(rng, ctx);
      t.layout = "text";
      if (t.work === undefined) t.work = 2;
      return t;
    }
  });
})(window.Z);
