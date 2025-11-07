"use strict";
$(document).ready(function () {

    const translations = {
        bg: {
            pageTitle: "Задачи по математика",
            metaDescription: "Сайт за детски задачки. Да поиграем с малко задачи - за малки и пораснали деца. Задачи по математика",
            heroLead: "Време е за игри с числата!",
            heading: "zada4ko.com - Задачи за деца",
            heroSub: "Изберете задачки според възрастта и играйте заедно с детето.",
            tabSmall: "За най-малките",
            tabBig: "За по-големите",
            tabUnknown: "Открий Х",
            labelTaskCount: "Брой задачи",
            labelMaxValue: "Максимална стойност",
            labelOperations: "Операции",
            buttonGenerate: "Генерирай задачки",
            labelTemplate: "Темплейт",
            templateHint: "<strong>{1,10}</strong> може да съдържа стойност между <strong>1</strong> и <strong>10</strong>",
            buttonAddTemplate: "Добави",
            buttonDeleteTasks: "Изтрий задачки",
            buttonPrintTasks: "Принтиране",
            modalHintTitle: "Подсказване",
            buttonClose: "Затвори",
            modalTemplateTitle: "Редакция на темплейт",
            buttonSaveChanges: "Запази промените",
            confirmDeleteTasks: "Сигурни ли сте, че искате да изтрийте всичките задачи?",
            confirmDeleteTemplate: "Сигурни ли сте, че искате да изтрийте темплейта?",
            quickTitle: "Бързи предизвикателства",
            quickSubtitle: "Изберете готово приключение и започнете решаването веднага.",
            presetAddTitle: "Весело събиране",
            presetAddText: "8 задачи до 15 с резултати само от събиране.",
            presetSubTitle: "Смели изваждания",
            presetSubText: "10 задачи до 20 без отрицателни резултати.",
            presetMixTitle: "Смесени приключения",
            presetMixText: "12 задачи до 30 с плюс, минус и множене.",
            presetButton: "Старт",
            comparisonTitle: "Игра: кой е по-голям?",
            comparisonDesc: "Сравнете двете изразчета и изберете правилния знак.",
            comparisonButton: "Генерирай сравнения",
            comparisonCorrect: "Браво! Позна.",
            comparisonTryAgain: "Опитай пак!",
            unknownHint: "X може да е отляво или отдясно на знака. Намерете стойността, която прави равенството вярно.",
            footerText: "© 2023 zada4ko.com - По идея на Митко",
            footerCredit: "<a href=\"https://dakovdev.com\" class=\"text-muted text-decoration-none\" target=\"_blank\" rel=\"noopener\">Създадено от dakovdev.com</a>"
        },
        en: {
            pageTitle: "Math challenges for kids",
            metaDescription: "Printable math worksheets and playful exercises for kids in Bulgarian and English.",
            heroLead: "Let's play with numbers!",
            heading: "zada4ko.com - Math for kids",
            heroSub: "Pick the right challenge level and solve the puzzles together.",
            tabSmall: "For the little ones",
            tabBig: "For the big kids",
            tabUnknown: "Find the X",
            labelTaskCount: "Number of tasks",
            labelMaxValue: "Maximum value",
            labelOperations: "Operations",
            buttonGenerate: "Generate worksheets",
            labelTemplate: "Template",
            templateHint: "<strong>{1,10}</strong> can contain any value between <strong>1</strong> and <strong>10</strong>",
            buttonAddTemplate: "Add",
            buttonDeleteTasks: "Clear tasks",
            buttonPrintTasks: "Print",
            modalHintTitle: "Hint",
            buttonClose: "Close",
            modalTemplateTitle: "Edit template",
            buttonSaveChanges: "Save changes",
            confirmDeleteTasks: "Are you sure you want to delete all tasks?",
            confirmDeleteTemplate: "Are you sure you want to delete this template?",
            quickTitle: "Quick challenges",
            quickSubtitle: "Pick a ready-made adventure and start solving instantly.",
            presetAddTitle: "Happy addition",
            presetAddText: "8 tasks up to 15 focusing only on addition.",
            presetSubTitle: "Brave subtraction",
            presetSubText: "10 subtraction tasks up to 20 with no negative answers.",
            presetMixTitle: "Mixed adventures",
            presetMixText: "12 tasks up to 30 mixing +, -, and x.",
            presetButton: "Start",
            comparisonTitle: "Game: Which is bigger?",
            comparisonDesc: "Compare the two expressions and pick the correct sign.",
            comparisonButton: "Generate comparisons",
            comparisonCorrect: "Great job!",
            comparisonTryAgain: "Try again!",
            unknownHint: "X can appear on either side of the equals sign. Find the value that makes the equation true.",
            footerText: "© 2023 zada4ko.com - Inspired by Mitko",
            footerCredit: "<a href=\"https://dakovdev.com\" class=\"text-muted text-decoration-none\" target=\"_blank\" rel=\"noopener\">Crafted by dakovdev.com</a>"
        }
    };

    const supportedLanguages = Object.keys(translations);
    const comparisonStorageKey = "comparisonTasks";

    function resolveInitialLanguage() {
        const saved = localStorage.getItem("zada4ko_lang");
        if (saved && supportedLanguages.includes(saved)) {
            return saved;
        }
        const browserLang = ((navigator.language || navigator.userLanguage || "")).slice(0, 2).toLowerCase();
        if (supportedLanguages.includes(browserLang)) {
            return browserLang;
        }
        return "en";
    }

    const initialLanguage = resolveInitialLanguage();
    let currentLanguage = initialLanguage;

    function getTranslation(lang, key) {
        if (!translations[lang] || !translations[lang][key]) {
            return translations.bg[key] || "";
        }

        return translations[lang][key];
    }

    function applyTranslations(lang) {
        $("[data-i18n]").each(function () {
            const key = $(this).data("i18n");
            const textValue = getTranslation(lang, key);
            if (textValue) {
                $(this).text(textValue);
            }
        });

        $("[data-i18n-html]").each(function () {
            const key = $(this).data("i18nHtml");
            const htmlValue = getTranslation(lang, key);
            if (htmlValue) {
                $(this).html(htmlValue);
            }
        });
    }

    function setLanguage(lang) {
        const targetLang = translations[lang] ? lang : "en";
        currentLanguage = targetLang;
        localStorage.setItem("zada4ko_lang", targetLang);
        document.documentElement.lang = targetLang;
        applyTranslations(targetLang);
        const pageTitle = getTranslation(targetLang, "pageTitle");
        if (pageTitle) {
            document.title = pageTitle;
        }
        const description = getTranslation(targetLang, "metaDescription");
        if (description) {
            $('meta[name="description"]').attr("content", description);
        }
        $(".btn-language").removeClass("active");
        $(`.btn-language[data-lang="${targetLang}"]`).addClass("active");
    }

    setLanguage(initialLanguage);

    function sanitizeExpression(expr) {
        if (expr === undefined || expr === null) {
            return "";
        }
        return String(expr).replace(/[^-()\d/*+.]/g, '');
    }

    function buildTaskView(taskItem) {
        if (typeof taskItem === "object" && taskItem !== null) {
            const display = taskItem.display || taskItem.text || taskItem.expression || "";
            const rawExpression = taskItem.evalExpression || taskItem.expression || display || "";
            const evalExpressionSanitized = sanitizeExpression(rawExpression);
            const storageKey = taskItem.storageKey !== undefined ? taskItem.storageKey : (evalExpressionSanitized || null);
            const expectedAnswer = typeof taskItem.answer !== "undefined" ? taskItem.answer : undefined;
            return {display, evalExpressionSanitized, storageKey, expectedAnswer};
        }
        const sanitized = sanitizeExpression(taskItem);
        return {
            display: taskItem,
            evalExpressionSanitized: sanitized,
            storageKey: sanitized || null,
            expectedAnswer: undefined
        };
    }

    function updateQuickSectionVisibility(targetTab) {
        const isSmallKidsTab = targetTab === "#nav-home";
        const quickSection = $("#quickChallenges");
        if (!quickSection.length) {
            return;
        }
        if (isSmallKidsTab) {
            quickSection.show();
        } else {
            quickSection.hide();
        }
    }

    updateQuickSectionVisibility("#nav-home");

    $('button[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
        const target = $(e.target).attr("data-bs-target");
        updateQuickSectionVisibility(target);
    });

    $(document).on("click", ".btn-language", function () {
        const lang = $(this).data("lang");
        setLanguage(lang);
    });

    function generateMathTasksOld(size, maxSum, operation) {
        const tasks = new Set();
        var randomOpr = (operation == null);
        while (tasks.size < size) {
            if (randomOpr) {
                operation = Math.random() < 0.5 ? '+' : '-'; // Randomly choose addition or subtraction
            }
            const num1 = Math.floor(Math.random() * (maxSum - 1)) + 2; // Random number between 2 and maxSum
            let num2;
            if (operation === '+') {
                num2 = Math.floor(Math.random() * (maxSum - num1)) + 1; // Random number between 1 and (maxSum - num1)
            } else if (operation === '-') {
                num2 = Math.floor(Math.random() * num1) + 1; // Random number between 1 and num1
            } else {
                throw new Error('Invalid operation. Only "+" and "-" are allowed.'); // Throw an error for invalid operation
            }
            const result = operation === '+' ? num1 + num2 : num1 - num2; // Calculate the result based on the operation
            if (result === 0) continue; // Skip tasks with a result of 0
            const task = `${num1} ${operation} ${num2} = ?`; // Create the task string
            tasks.add(task); // Add the task to the set
        }
        return Array.from(tasks); // Convert the set to an array and return
    }

    let mathTasks = JSON.parse(localStorage.getItem('mathTasks')); // Get mathTasks from local storage
    let mathTaskAnswers = JSON.parse(localStorage.getItem("mathTaskAnswers")) || {};
    if (mathTasks && Array.isArray(mathTasks) && mathTasks.length > 0) {
        displayMathTasks(mathTasks, mathTaskAnswers);
        checkAll();
    }

    function generateMathTasks(size, maxSum, operations = null) {
        const defaultOperations = ['+', '-'];
        const availableOperations = operations && operations.length > 0 ? operations : defaultOperations;
        const tasks = [];
        const seenTasks = new Set(Array.isArray(mathTasks) ? mathTasks : []);
        const maxAttempts = size * 60;
        let attempts = 0;

        function createTask(requireIntegerResult = true) {
            const num1 = Math.floor(Math.random() * (maxSum - 1)) + 2;
            const op = availableOperations[Math.floor(Math.random() * availableOperations.length)];
            let num2;

            if (op === '+') {
                num2 = Math.max(1, Math.floor(Math.random() * (maxSum - num1)) + 1);
            } else if (op === '-') {
                num2 = Math.floor(Math.random() * num1) + 1;
            } else if (op === '*') {
                num2 = Math.max(1, Math.floor(Math.random() * Math.max(1, maxSum / num1)) + 1);
            } else if (op === '/') {
                num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            } else {
                throw new Error('Invalid operation. Only "+", "-", "*", and "/" are allowed.');
            }

            const result = op === '+' ? num1 + num2 : op === '-' ? num1 - num2 : op === '*' ? num1 * num2 : num1 / num2;
            if (requireIntegerResult && (result === 0 || result % 1 !== 0)) {
                return null;
            }

            return `${num1} ${op} ${num2}`;
        }

        while (tasks.length < size && attempts < maxAttempts) {
            attempts++;
            const task = createTask();
            if (!task) continue;
            if (!seenTasks.has(task)) {
                seenTasks.add(task);
                tasks.push(task);
            }
        }

        let fallbackAttempts = 0;
        const fallbackLimit = size * 20;
        while (tasks.length < size && fallbackAttempts < fallbackLimit) {
            fallbackAttempts++;
            const fallbackTask = createTask();
            if (fallbackTask) {
                tasks.push(fallbackTask);
            }
        }

        while (tasks.length < size) {
            const baseNumber = tasks.length + 2;
            tasks.push(`${baseNumber} + 0`);
        }

        return tasks;
    }

    $(document).on("click", "#printTasksBtn", function (e) {
        e.preventDefault();
        window.print();
    });

    $(document).on("click", "#deleteTasksBtn", function (e) {
        e.preventDefault();
        const confirmation = confirm(getTranslation(currentLanguage, "confirmDeleteTasks")); // Display confirmation popup
        if (confirmation) {
            cleanTasks();
            $("#deleteTasksBtn").hide();
            $("#printTasksBtn").hide();
            location.reload()
        }
    });

    function cleanTasks() {
        $("#generatedTasksList").html(""); // Clear the math tasks list on the page
        $("#generatedTasksPrint").html("");
        localStorage.removeItem("mathTasks"); // Remove mathTasks from local storage
        localStorage.removeItem("mathTasksTemplates"); // Remove mathTasks from local storage
        localStorage.removeItem("mathTaskAnswers"); // Remove mathTasks from local storage
        localStorage.removeItem(comparisonStorageKey);
        $("#comparisonTasksList").html("");
        mathTasks = [];
        mathTaskAnswers = {};
    }


    $("#generatedTasks").on("focusout", ".task-result", function (e) {
        e.preventDefault();
        const inputElement = $(this);
        inputElement.parents(".task-box").find(".task-label").removeClass("task-label-active");
        const result = inputElement.val();
        if (result != null && result !== "") {
            const evalExpression = inputElement.data("eval") || "";
            const expectedAnswerAttr = inputElement.attr("data-expected");
            const storageKey = inputElement.data("key");
            const sanitizedEval = sanitizeExpression(evalExpression);

            let answersStore = JSON.parse(localStorage.getItem("mathTaskAnswers")) || {};
            let shouldPersist = !expectedAnswerAttr && (storageKey || sanitizedEval);
            const storageIdentifier = storageKey || sanitizedEval;

            let isCorrect = false;
            if (expectedAnswerAttr !== undefined) {
                const expectedAnswer = Number(expectedAnswerAttr);
                isCorrect = parseFloat(result) === expectedAnswer;
            } else if (sanitizedEval) {
                isCorrect = checkAnswer(sanitizedEval, result);
            }

            if (shouldPersist) {
                answersStore[storageIdentifier] = result;
                localStorage.setItem("mathTaskAnswers", JSON.stringify(answersStore));
                mathTaskAnswers = answersStore;
            }

            if (isCorrect) {
                inputElement.removeClass("border border-3 border-danger");
                inputElement.addClass("border border-3 border-success");
                inputElement.attr('disabled', 'disabled');
                inputElement.parents(".task-box").find(".task-hint").hide();

                checkAll();
            } else {
                inputElement.removeClass("border border-3 border-success");
                inputElement.addClass("border border-3 border-danger");
                const hintBtn = inputElement.parents(".task-box").find(".task-hint");
                if (hintBtn.length) {
                    hintBtn.show();
                }
            }
        }

    });

    function checkAnswer(task, result) {
        return (parseFloat(result) === parseFloat(eval(task)));
    }

    function checkAll() {
        var numItems = $('.border-success').length;
        let mathTasksTemplates = JSON.parse(localStorage.getItem('mathTasksTemplates')); // Get mathTasksTemplates from local storage
        if (mathTasksTemplates && Array.isArray(mathTasksTemplates) && numItems === mathTasksTemplates.length) {
            startConfetti();
            startStars();
        }
        let mathTasks2 = JSON.parse(localStorage.getItem('mathTasks'));
        if (numItems && Array.isArray(mathTasks2) && numItems === mathTasks2.length) {
            startConfetti();
            startStars();
        }
    }

    function startStars() {
        var defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };

        function shoot() {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ['star']
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ['circle']
            });
        }

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
        setTimeout(shoot, 300);
        setTimeout(shoot, 400);
        setTimeout(shoot, 1000);

        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            shoot();
        }, 550);

    }

    function startConfetti() {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
            }));
        }, 250);
    }

    $('body').on('keydown', 'input.task-result', function (e) {
        // e.preventDefault();
        if (e.which === 13 || e.which === 40) {
            var self = $(this), form = self.parents('#generatedTasks:eq(0)'), focusable, next;
            focusable = form.find('input').filter(':visible');
            next = focusable.eq(focusable.index(this) + 1);
            if (next.length) {
                next.focus();
            }
            return false;
        }

        if (e.which === 38) {
            var self = $(this), form = self.parents('#generatedTasks:eq(0)'), focusable, next;
            focusable = form.find('input').filter(':visible');
            next = focusable.eq(focusable.index(this) - 1);
            if (next.length) {
                next.focus();
            }
            return false;
        }
    });


    $("#generatedTasks").on("focusin", ".task-result", function (e) {
        e.preventDefault();
        $(this).parents(".task-box").find(".task-label").addClass("task-label-active");
    });

    $("#generatedTasks").on("click", ".task-hint", function (e) {
        $("#hint-modal .task-task-operation span").html("");
        $("#hint-modal .task-left").html("");
        $("#hint-modal .task-right").html("");
        $("#hint-modal .hint-result").html("");
        var task = $(this).data("task").replace(/[^-()\d/*+.]/g, '');
        var splitUp = task.match(/[^\d()]+|[\d.]+/g);
        if (splitUp[1] === "+") {
            for (let i = 0; i < splitUp[0]; i++) {
                $("#hint-modal .task-left").append("<span class=\"dot dot-blue\"></span>");
                $("#hint-modal .hint-result").append("<span class=\"dot dot-blue\"></span>");
            }
            for (let i = 0; i < splitUp[2]; i++) {
                $("#hint-modal .task-right").append("<span class=\"dot dot-green\"></span>");
                $("#hint-modal .hint-result").append("<span class=\"dot dot-green\"></span>");

            }
        }

        if (splitUp[1] === "-") {
            for (let i = 0; i < splitUp[0]; i++) {
                $("#hint-modal .task-left").append("<span class=\"dot dot-blue\"></span>");
                if (i >= (splitUp[0] - splitUp[2])) {
                    $("#hint-modal .hint-result").append("<span class=\"dot\"></span>");
                } else {
                    $("#hint-modal .hint-result").append("<span class=\"dot dot-blue\"></span>");
                }
            }
            for (let i = 0; i < splitUp[2]; i++) {
                $("#hint-modal .task-right").append("<span class=\"dot dot-green\"></span>");
            }
        }

        if (splitUp[1] === "*") {
            for (let i = 0; i < splitUp[0]; i++) {
                $("#hint-modal .task-left").append("<span class=\"dot dot-blue\"></span>");
            }
            for (let i = 0; i < splitUp[2]; i++) {
                $("#hint-modal .task-right").append("<span class=\"dot dot-green\"></span>");
            }

            for (let i = 0; i < splitUp[2]; i++) {
                for (let k = 0; k < splitUp[0]; k++) {
                    $("#hint-modal .hint-result").append("<span class=\"dot dot-blue\"></span>");
                }
                $("#hint-modal .hint-result").append("<br />");
            }
        }

        if (splitUp[1] === "/") {
            for (let i = 0; i < splitUp[0]; i++) {
                $("#hint-modal .task-left").append("<span class=\"dot dot-blue\"></span>");
            }
            for (let i = 0; i < splitUp[2]; i++) {
                $("#hint-modal .task-right").append("<span class=\"dot dot-green\"></span>");
            }

            for (let k = 0; k < splitUp[0] / splitUp[2]; k++) {
                for (let i = 0; i < splitUp[2]; i++) {
                    $("#hint-modal .hint-result").append("<span class=\"dot dot-blue\"></span>");

                }
                $("#hint-modal .hint-result").append("<br />");
            }
        }

        $("#hint-modal .task-operation span").html(splitUp[1]);

        $("#hint-modal").modal('show');
    });

    $(document).on("click", "#generateTasks", function (e) {
        e.preventDefault();
        cleanTasks();
        var maxSum = $("#smallChildrenForm").find('input[name="maxSum"]').val();
        var taskCount = $("#smallChildrenForm").find('input[name="taskCount"]').val();
        const checkedCheckbox = $('input[type="checkbox"]:checked'); // Select all checked checkboxes
        const checkedValues = checkedCheckbox.map(function () { // Map to an array of values
            return $(this).val();
        }).get();
// Example usage:
        const newMathTasks = generateMathTasks(taskCount, maxSum, checkedValues); // Generate 10 tasks with a maximum sum of 10
        displayMathTasks(newMathTasks);
        const element = document.getElementById("generatedTasksList");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        mathTasks = newMathTasks;
        localStorage.setItem('mathTasks', JSON.stringify(newMathTasks)); // Store merged math tasks array in local storage
    });

    $(document).on("click", ".preset-btn", function (e) {
        e.preventDefault();
        cleanTasks();
        const maxSum = Number($(this).data("max"));
        const taskCount = Number($(this).data("count"));
        const operations = $(this).data("ops").split(",").filter(Boolean);
        $("#smallChildrenForm").find('input[name="maxSum"]').val(maxSum);
        $("#smallChildrenForm").find('input[name="taskCount"]').val(taskCount);
        $(".btn-check").prop("checked", false);
        operations.forEach(op => {
            $(`input.btn-check[value="${op}"]`).prop("checked", true);
        });
        const tasks = generateMathTasks(taskCount, maxSum, operations);
        displayMathTasks(tasks);
        const element = document.getElementById("generatedTasksList");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        mathTasks = tasks;
        localStorage.setItem('mathTasks', JSON.stringify(tasks));
    });

    $(document).on("submit", "#unknownXForm", function (e) {
        e.preventDefault();
        cleanTasks();
        const maxSum = parseInt($(this).find('input[name="maxSum"]').val(), 10) || 20;
        const taskCount = parseInt($(this).find('input[name="taskCount"]').val(), 10) || 8;
        const operations = $(this).find('input[name="unknownOps"]:checked').map(function () {
            return $(this).val();
        }).get();
        const tasks = generateUnknownXTasks(taskCount, maxSum, operations);
        displayMathTasks(tasks);
        const element = document.getElementById("generatedTasksList");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        mathTasks = tasks;
        localStorage.setItem('mathTasks', JSON.stringify(tasks));
    });

    function displayMathTasks(tasks, storedAnswers = null) {
        if ($("#deleteTasksBtn").is(":hidden")) {
            $("#deleteTasksBtn").show();
        }
        if ($("#printTasksBtn").is(":hidden")) {
            $("#printTasksBtn").show();
        }
        const grid = $("#generatedTasksList");
        grid.html("");

        const printList = document.createElement('ul');
        printList.classList.add('print-task-list');

        const answers = storedAnswers || mathTaskAnswers || {};

        if (tasks.length > 15) {
            printList.classList.add('print-two-columns');
        }

        tasks.forEach((taskItem, index) => {
            const normalized = buildTaskView(taskItem);
            const taskKey = normalized.storageKey;
            const storedAnswer = taskKey && answers && answers[taskKey] !== undefined ? answers[taskKey] : "";
            let classVer = "";
            let disabled = "";
            let correctAnswer = true;
            if (storedAnswer !== "") {
                if (normalized.expectedAnswer !== undefined) {
                    if (parseFloat(storedAnswer) === parseFloat(normalized.expectedAnswer)) {
                        classVer = "border border-3 border-success";
                        disabled = "disabled";
                    } else {
                        classVer = "border border-3 border-danger";
                        correctAnswer = false;
                    }
                } else if (normalized.evalExpressionSanitized && checkAnswer(normalized.evalExpressionSanitized, storedAnswer)) {
                    classVer = "border border-3 border-success";
                    disabled = "disabled";
                } else {
                    classVer = "border border-3 border-danger";
                    correctAnswer = false;
                }
            }

            const hintButton = normalized.expectedAnswer !== undefined ? "" :
                "<button type=\"button\" data-task=\"" + normalized.display + "\" class=\"task-hint hide text-center btn btn-light " + (correctAnswer ? "hidden" : "") + "\"><span class=\"wave\">👋</span></button>";

            const expectedAttr = normalized.expectedAnswer !== undefined ? " data-expected=\"" + normalized.expectedAnswer + "\"" : "";
            const keyAttr = taskKey ? " data-key=\"" + taskKey + "\"" : "";
            const evalAttr = normalized.evalExpressionSanitized ? " data-eval=\"" + normalized.evalExpressionSanitized + "\"" : "";

            const cardMarkup = "<div class=\"task-card task-box\">\n" +
                "    <span class=\"task-number\">#" + (index + 1) + "</span>\n" +
                "    <div class=\"task-line\">\n" +
                "        <span class=\"task-label\">" + normalized.display + "</span>\n" +
                "        <span class=\"task-equals\">" + (normalized.expectedAnswer !== undefined ? "X =" : "=") + "</span>\n" +
                "        <input " + disabled + " type=\"text\" autocomplete=\"off\" inputmode=\"numeric\" value=\"" + storedAnswer + "\" data-task=\"" + normalized.display + "\"" + evalAttr + keyAttr + expectedAttr + " class=\"form-control task-result text-center " + classVer + "\">\n" +
                "        " + hintButton + "\n" +
                "    </div>\n" +
                "</div>";
            grid.append(cardMarkup);

            const printItem = document.createElement('li');
            printItem.textContent = normalized.expectedAnswer !== undefined ? `${normalized.display}  X =` : `${normalized.display} =`;
            printList.appendChild(printItem);
        });
        $("#generatedTasksPrint").html(printList);
    }

    function displayMathTasksTemplates(tasks, storedAnswers = null) {
        if ($("#deleteTasksBtn").is(":hidden")) {
            $("#deleteTasksBtn").show();
        }
        if ($("#printTasksBtn").is(":hidden")) {
            $("#printTasksBtn").show();
        }
        const grid = $("#generatedTasksList");
        grid.html("");

        const printList = document.createElement('ul');
        printList.classList.add('print-task-list');

        const answers = storedAnswers || mathTaskAnswers || {};

        if (tasks.length > 15) {
            printList.classList.add('print-two-columns');
        }

        tasks.forEach((taskItem, index) => {
            const normalized = buildTaskView(taskItem);
            const taskKey = normalized.storageKey;
            const storedAnswer = taskKey && answers && answers[taskKey] !== undefined ? answers[taskKey] : "";
            let classVer = "";
            let disabled = "";
            if (storedAnswer !== "") {
                if (normalized.evalExpressionSanitized && checkAnswer(normalized.evalExpressionSanitized, storedAnswer)) {
                    classVer = "border border-3 border-success";
                    disabled = "disabled";
                } else {
                    classVer = "border border-3 border-danger";
                }
            }

            const keyAttr = taskKey ? " data-key=\"" + taskKey + "\"" : "";
            const evalAttr = normalized.evalExpressionSanitized ? " data-eval=\"" + normalized.evalExpressionSanitized + "\"" : "";

            const cardMarkup = "<div class=\"task-card task-box\">\n" +
                "    <span class=\"task-number\">#" + (index + 1) + "</span>\n" +
                "    <div class=\"task-line\">\n" +
                "        <span class=\"task-label\">" + normalized.display + "</span>\n" +
                "        <span class=\"task-equals\">=</span>\n" +
                "        <input " + disabled + " type=\"text\" autocomplete=\"off\" inputmode=\"numeric\" value=\"" + storedAnswer + "\" data-task=\"" + normalized.display + "\"" + evalAttr + keyAttr + " class=\"form-control task-result text-center " + classVer + "\">\n" +
                "    </div>\n" +
                "</div>";
            grid.append(cardMarkup);

            const printItem = document.createElement('li');
            printItem.textContent = `${normalized.display} =`;
            printList.appendChild(printItem);
        });
        $("#generatedTasksPrint").html(printList);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function buildExpression(max, operations) {
        const allowedOps = operations && operations.length ? operations : ['+', '-'];
        const op = allowedOps[Math.floor(Math.random() * allowedOps.length)];
        let expression;
        let value;

        if (op === '+') {
            const a = getRandomInt(1, max);
            const b = getRandomInt(1, max);
            expression = `${a} + ${b}`;
            value = a + b;
        } else if (op === '-') {
            const a = getRandomInt(2, Math.max(3, max + 2));
            const b = getRandomInt(1, a - 1);
            expression = `${a} - ${b}`;
            value = a - b;
        } else if (op === '*') {
            const factorLimit = Math.max(3, Math.floor(Math.sqrt(max * 2)));
            const a = getRandomInt(2, factorLimit);
            const b = getRandomInt(2, factorLimit);
            expression = `${a} * ${b}`;
            value = a * b;
        } else if (op === '/') {
            const divisor = getRandomInt(2, Math.max(3, Math.min(max, 10)));
            const quotient = getRandomInt(1, Math.max(3, Math.floor(max / 2))); 
            const dividend = divisor * quotient;
            expression = `${dividend} / ${divisor}`;
            value = quotient;
        } else {
            const a = getRandomInt(1, max);
            const b = getRandomInt(1, max);
            expression = `${a} + ${b}`;
            value = a + b;
        }

        return {expression, value};
    }

    function generateComparisonTasks(count, maxSum, operations) {
        const ops = operations && operations.length ? operations : ['+', '-'];
        const tasks = [];
        for (let i = 0; i < count; i++) {
            const left = buildExpression(maxSum, ops);
            const right = buildExpression(maxSum, ops);
            tasks.push({
                leftExpr: left.expression,
                leftValue: left.value,
                rightExpr: right.expression,
                rightValue: right.value
            });
        }
        return tasks;
    }

    function displayComparisonTasks(tasks) {
        const container = $("#comparisonTasksList");
        container.html("");
        tasks.forEach((task, index) => {
            const card = $(
                `<div class="comparison-card" data-left-value="${task.leftValue}" data-right-value="${task.rightValue}">
                    <div class="comparison-equation">
                        <span class="comparison-expr">${task.leftExpr}</span>
                        <select class="form-select comparison-select" aria-label="Choose comparison">
                            <option value="" selected>?</option>
                            <option value=">">&gt;</option>
                            <option value="=">=</option>
                            <option value="<">&lt;</option>
                        </select>
                        <span class="comparison-expr">${task.rightExpr}</span>
                    </div>
                    <div class="comparison-feedback" data-default=""></div>
                </div>`
            );
            card.find(".comparison-select").attr("data-task-index", index);
            container.append(card);
        });
    }

    $(document).on("click", "#generateCompareTasks", function (e) {
        e.preventDefault();
        const maxSum = parseInt($("#smallChildrenForm").find('input[name="maxSum"]').val(), 10) || 20;
        const taskCount = parseInt($("#smallChildrenForm").find('input[name="taskCount"]').val(), 10) || 6;
        const operations = $("#smallChildrenForm .btn-check:checked").map(function () {
            return $(this).val();
        }).get();
        const clampedCount = Math.min(20, Math.max(3, taskCount));
        const comparisonTasks = generateComparisonTasks(clampedCount, Math.max(5, maxSum), operations);
        displayComparisonTasks(comparisonTasks);
        localStorage.setItem(comparisonStorageKey, JSON.stringify(comparisonTasks));
    });

    function evaluateComparison(left, right) {
        if (left > right) {
            return ">";
        }
        if (left < right) {
            return "<";
        }
        return "=";
    }

    $(document).on("change", ".comparison-select", function () {
        const select = $(this);
        const card = select.closest('.comparison-card');
        const left = Number(card.data('left-value'));
        const right = Number(card.data('right-value'));
        const chosen = select.val();
        const feedback = card.find('.comparison-feedback');
        if (!chosen) {
            feedback.removeClass('success try-again').text('');
            return;
        }
        const correctSign = evaluateComparison(left, right);
        if (chosen === correctSign) {
            feedback.removeClass('try-again').addClass('success').text(getTranslation(currentLanguage, 'comparisonCorrect'));
        } else {
            feedback.removeClass('success').addClass('try-again').text(getTranslation(currentLanguage, 'comparisonTryAgain'));
        }
    });

    const storedComparisonTasks = JSON.parse(localStorage.getItem(comparisonStorageKey));
    if (storedComparisonTasks && Array.isArray(storedComparisonTasks) && storedComparisonTasks.length > 0) {
        displayComparisonTasks(storedComparisonTasks);
    }

    function generateUnknownXTasks(count, maxValue, operations = null) {
        const availableOperations = operations && operations.length > 0 ? operations : ['+', '-'];
        const tasks = [];
        const maxAttempts = count * 40;
        let attempts = 0;

        function createAdditionTask() {
            const addend = getRandomInt(1, Math.max(2, maxValue));
            const answer = getRandomInt(1, Math.max(2, maxValue));
            const sumLimit = Math.max(maxValue * 2, maxValue + 5);
            const sum = addend + answer;
            if (sum > sumLimit) {
                return null;
            }
            if (Math.random() < 0.5) {
                return {display: `X + ${addend} = ${sum}`, answer};
            }
            return {display: `${addend} + X = ${sum}`, answer};
        }

        function createSubtractionTask() {
            if (Math.random() < 0.5) {
                const answer = getRandomInt(2, Math.max(3, maxValue + 2));
                const subtrahend = getRandomInt(1, answer - 1);
                const result = answer - subtrahend;
                return {display: `X - ${subtrahend} = ${result}`, answer};
            }
            const minuend = getRandomInt(3, Math.max(5, maxValue + 5));
            const result = getRandomInt(0, minuend - 1);
            const answer = minuend - result;
            return {display: `${minuend} - X = ${result}`, answer};
        }

        while (tasks.length < count && attempts < maxAttempts) {
            attempts++;
            const op = availableOperations[Math.floor(Math.random() * availableOperations.length)];
            let task;
            if (op === '+') {
                task = createAdditionTask();
            } else if (op === '-') {
                task = createSubtractionTask();
            } else {
                continue;
            }
            if (task) {
                tasks.push({
                    display: task.display,
                    answer: task.answer,
                    storageKey: null
                });
            }
        }

        while (tasks.length < count) {
            const filler = tasks.length + 3;
            tasks.push({
                display: `X + 1 = ${filler + 1}`,
                answer: filler,
                storageKey: null
            });
        }

        return tasks;
    }

    function getRandomTask(templates, count) {
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function replacePlaceholders(template) {
            return template.template.replace(/{(\d+),(\d+)}/g, (_, min, max) => getRandomNumber(Number(min), Number(max)));
        }

        function adjustForSubtraction(task, randomTemplate) {
            let result = eval(task);
            while (result <= 0 || result % 1 !== 0) {
                task = replacePlaceholders(randomTemplate);
                result = eval(task);
            }
            return task;
        }

        const tasks = [];
        for (let i = 0; i < count; i++) {
            let randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            let task = replacePlaceholders(randomTemplate);
            task = adjustForSubtraction(task, randomTemplate);
            tasks.push(task);
        }

        return tasks;
    }

    $(document).on("click", "#button-add-template", function (e) {
        e.preventDefault();
        var template = $(this).parents("form").find('input[name="template"]').val();

        const data = getFromLocalStorage();
        data.push({"template": template});
        saveToLocalStorage(data);

        displayTemplates();
    });

    displayTemplates();

    function displayTemplates() {
        $("#template-list").html("");
        const data = getFromLocalStorage();
        const tableBody = document.createElement('tbody');

        data.forEach((row, index) => {

            let item = "<li data-index-id=\"" + index + "\" data-template-name=\"" + row.template + "\" data-minValue=\"" + row.minValue + "\"\n" +
                "                                        data-maxValue=\"" + row.maxValue + "\"\n" +
                "                                        class=\"list-group-item d-flex justify-content-between align-items-center   \">\n" +
                "                                        " + row.template + "\n" +
                "                                        <div>\n" +
                "                                            <!-- Button trigger modal -->\n" +
                "                                            <button class=\"edit_record btn btn-sm btn-info\" data-bs-toggle=\"modal\"\n" +
                "                                                    data-bs-target=\"#updateTemplateModal\">\n" +
                "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"\n" +
                "                                                     fill=\"currentColor\" class=\"bi bi-pencil-square\"\n" +
                "                                                     viewBox=\"0 0 16 16\">\n" +
                "                                                    <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"></path>\n" +
                "                                                    <path fill-rule=\"evenodd\"\n" +
                "                                                          d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"></path>\n" +
                "                                                </svg>\n" +
                "                                            </button>\n" +
                "                                            <button class=\"remove_record btn btn-sm btn-danger\">\n" +
                "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"\n" +
                "                                                     fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n" +
                "                                                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"></path>\n" +
                "                                                    <path fill-rule=\"evenodd\"\n" +
                "                                                          d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"></path>\n" +
                "                                                </svg>\n" +
                "                                            </button>\n" +
                "                                        </div>\n" +
                "                                    </li>";

            $("#template-list").append(item);
        });
    }

    $(document).on("click", ".edit_record", function (e) {
        e.preventDefault();
        var parent = $(this).parents("li")
        var indexId = parent.data('index-id');
        const data = getFromLocalStorage();
        let templateData = data[indexId];

        $("#updateTemplateModal").find('input[name="index"]').val(indexId);
        $("#updateTemplateModal").find('input[name="template"]').val(templateData.template);
    });

    $(document).on("click", "#updateTemplateModalButton", function (e) {
        e.preventDefault();
        var template = $("#updateTemplateModal").find('input[name="template"]').val();
        var index = $("#updateTemplateModal").find('input[name="index"]').val();

        updateRow(index, template);
        var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('updateTemplateModal'));
        myModal.toggle();
        displayTemplates();
    });

    $(document).on("click", ".remove_record", function (e) {
        e.preventDefault();
        const confirmation = confirm(getTranslation(currentLanguage, "confirmDeleteTemplate")); // Display confirmation popup
        if (confirmation) {
            var parent = $(this).parents("li")
            var indexId = parent.data('index-id');

            deleteRow(indexId);
            displayTemplates();
        }
    });

    function saveTasks(data) {
        localStorage.setItem('mathTasks', JSON.stringify(data));
    }

    function getTasks() {
        const data = localStorage.getItem('mathTasks');
        return data ? JSON.parse(data) : [];
    }

    function saveToLocalStorage(data) {
        localStorage.setItem('templates', JSON.stringify(data));
    }

    // Function to get data from localStorage
    function getFromLocalStorage() {
        const data = localStorage.getItem('templates');
        return data ? JSON.parse(data) : [];
    }

    // Function to update a row in the data list
    function updateRow(rowIndex, template) {
        const data = getFromLocalStorage();
        if (rowIndex >= 0 && rowIndex < data.length) {
            data[rowIndex] = {"template": template};
            saveToLocalStorage(data);
        }
    }

    function deleteRow(rowIndex) {
        const data = getFromLocalStorage();
        if (rowIndex >= 0 && rowIndex < data.length) {
            data.splice(rowIndex, 1); // Remove the row from the array
            saveToLocalStorage(data);
        }
    }

    $(document).on("click", "#generateTasksTemplates", function (e) {
        e.preventDefault();
        cleanTasks();
        var taskCount = $("#biggerChildrenForm").find('input[name="taskCount"]').val();
        const templates = getFromLocalStorage();
        const checkboxTemplates = document.querySelectorAll('input.checkbox-template[type="checkbox"]');
        checkboxTemplates.forEach(checkbox => {
            if (checkbox.checked) {
                templates.push({"template": checkbox.value});
            }
        });
        if (templates && Array.isArray(templates) && templates.length === 0) {
            var template = $("#biggerChildrenForm").find('input[name="template"]').val();

            templates.push({"template": template});
        }
        const randomTasks = getRandomTask(templates, taskCount);

        displayMathTasksTemplates(randomTasks);
        const element = document.getElementById("generatedTasksList");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        localStorage.setItem('mathTasksTemplates', JSON.stringify(randomTasks)); // Store merged math tasks array in local storage
    });

    let mathTasksTemplates = JSON.parse(localStorage.getItem('mathTasksTemplates')); // Get mathTasksTemplates from local storage
    if (mathTasksTemplates && Array.isArray(mathTasksTemplates) && mathTasksTemplates.length > 0) {
        displayMathTasksTemplates(mathTasksTemplates, mathTaskAnswers);
        checkAll();
    }
});
