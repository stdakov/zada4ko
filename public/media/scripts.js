"use strict";

$(document).ready(function () {

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
        //const defaultOperations = ['+', '-', '*', '/']; // Default array of available operations
        const defaultOperations = ['+', '-']; // Default array of available operations
        const tasks = [];
        var allTasks = [];
        if (mathTasks && Array.isArray(mathTasks) && mathTasks.length > 0) {
            allTasks = mathTasks;
        }

        // Use the specified operations array, or use the default operations array if not provided
        const availableOperations = operations && operations.length > 0 ? operations : defaultOperations;
        var tries = 0;
        while (tasks.length < size) {
            const num1 = Math.floor(Math.random() * (maxSum - 1)) + 2; // Random number between 2 and maxSum
            const op = availableOperations[Math.floor(Math.random() * availableOperations.length)]; // Randomly select an operation from the available operations
            let num2;

            if (op === '+') {
                num2 = Math.floor(Math.random() * (maxSum - num1)) + 1; // Randomly select num2 based on the chosen operation
            } else if (op === '-') {
                num2 = Math.floor(Math.random() * num1) + 1; // Randomly select num2 based on the chosen operation
            } else if (op === '*') {
                num2 = Math.floor(Math.random() * (maxSum / num1)) + 1; // Randomly select num2 based on the chosen operation
            } else if (op === '/') {
                num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // Randomly select num2 based on the chosen operation
            } else {
                throw new Error('Invalid operation. Only "+", "-", "*", and "/" are allowed.'); // Throw an error for invalid operation
            }

            const result = op === '+' ? num1 + num2 : op === '-' ? num1 - num2 : op === '*' ? num1 * num2 : num1 / num2; // Calculate the result based on the operation
            if (result === 0 || result % 1 !== 0) {
                continue; // Skip the iteration if result is 0 or not an integer
            }

            const task = `${num1} ${op} ${num2} = `; // Create the task string
            if (!allTasks.includes(task)) {
                allTasks.push(task);
                tasks.push(task); // Add the task to the tasks array if it doesn't already exist
            } else {
                tries++;
            }

            if (tries === allTasks.length) {
                break;
            }
        }

        return tasks;
    }


    $(document).on("click", "#deleteTasksBtn", function (e) {
        e.preventDefault();
        const confirmation = confirm("Сигурни ли сте, че искате да изтрийте всичките задачи?"); // Display confirmation popup
        if (confirmation) {
            localStorage.removeItem("mathTasks"); // Remove mathTasks from local storage
            localStorage.removeItem("mathTaskAnswers"); // Remove mathTasks from local storage
            $("#generatedTasks").html(""); // Clear the math tasks list on the page
            $("#deleteTasksBtn").hide();
            location.reload()
        }
    });

    $("#generatedTasks").on("focusout", ".task-result", function (e) {
        e.preventDefault();
        $(this).parents(".task-box").find(".task-label").removeClass("task-label-active");
        var result = $(this).val();
        if (result != null && result !== "") {
            var task = $(this).data("task").replace(/[^-()\d/*+.]/g, '');

            const mathTaskAnswers = JSON.parse(localStorage.getItem("mathTaskAnswers")) || {};
            mathTaskAnswers[task] = result;
            localStorage.setItem("mathTaskAnswers", JSON.stringify(mathTaskAnswers));

            if (parseInt(result) === eval(task)) {
                $(this).removeClass("border border-3 border-danger");
                $(this).addClass("border border-3 border-success");
                $(this).attr('disabled', 'disabled');
                $(this).parents(".task-box").find(".task-hint").hide();

                checkAll();

            } else {
                $(this).removeClass("border border-3 border-success");
                $(this).addClass("border border-3 border-danger");
                $(this).parents(".task-box").find(".task-hint").show();
            }
        }

    });

    function checkAll(){
        var numItems = $('.border-success').length;
        if (numItems === mathTasks.length) {
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

        var maxSum = $("#maxSum").val();
        var taskCount = $("#taskCount").val();
        const checkedCheckbox = $('input[type="checkbox"]:checked'); // Select all checked checkboxes
        const checkedValues = checkedCheckbox.map(function () { // Map to an array of values
            return $(this).val();
        }).get();
// Example usage:
        const newMathTasks = generateMathTasks(taskCount, maxSum, checkedValues); // Generate 10 tasks with a maximum sum of 10
        displayMathTasks(newMathTasks);
        if (mathTasks && Array.isArray(mathTasks) && mathTasks.length > 0) {
            mathTasks = [...mathTasks, ...newMathTasks]; // Merge existing math tasks with newly generated tasks
        } else {
            mathTasks = newMathTasks;
        }

        localStorage.setItem('mathTasks', JSON.stringify(mathTasks)); // Store merged math tasks array in local storage
    });

    function displayMathTasks(tasks, mathTaskAnswers = null) {
        if ($("#deleteTasksBtn").is(":hidden")) {
            $("#deleteTasksBtn").show();
        }
        tasks.forEach((task, index) => {
            var taskClean = task.replace(/[^-()\d/*+.]/g, '');
            const answer = mathTaskAnswers !== null && mathTaskAnswers[taskClean] !== undefined ? mathTaskAnswers[taskClean] : "";
            var classVer = "";
            var disabled = "";
            var correctAnswer = true;
            if (answer !== "") {
                if (parseInt(answer) === eval(taskClean)) {
                    classVer = "border border-3 border-success";
                    disabled="disabled";
                } else {
                    classVer = "border border-3 border-danger";
                    correctAnswer = false;
                }
            }

            var item = "<div class=\"row g-3 task-box align-items-center mb-1\">\n" +
                "                <div class=\"col-auto\">\n" +
                "                    <label for=\"inputTask" + index + "\" class=\"task-label col-form-label\">" + task + "</label>\n" +
                "                </div>\n" +
                "                <div class=\"col-auto\">\n" +
                "                    <input type=\"text\" autocomplete=\"off\" " + disabled + " data-task=\"" + task + "\"  value=\"" + answer + "\" id=\"inputTask" + index + "\" class=\"form-control task-result text-center " + classVer + "\">\n" +
                "                </div>\n" +
                "                <div class=\"col-auto\">\n" +
                "                    <button data-task=\"" + task + "\"  data-task=\"" + task + "\" class=\"form-control task-hint hide text-center " + (correctAnswer ? "hidden" : "") + "\"><span class='wave'>👋</span></button>\n" +
                "                </div>\n" +
                "            </div>";
            $("#generatedTasks").append(item);

        });
    }


});