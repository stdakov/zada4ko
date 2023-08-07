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

            const task = `${num1} ${op} ${num2}`; // Create the task string
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

    $(document).on("click", "#printTasksBtn", function (e) {
        e.preventDefault();
        window.print();
    });

    $(document).on("click", "#deleteTasksBtn", function (e) {
        e.preventDefault();
        const confirmation = confirm("Сигурни ли сте, че искате да изтрийте всичките задачи?"); // Display confirmation popup
        if (confirmation) {
            cleanTasks();
            $("#deleteTasksBtn").hide();
            $("#printTasksBtn").hide();
            location.reload()
        }
    });

    function cleanTasks() {
        $("#generatedTasksTable").html(""); // Clear the math tasks list on the page
        localStorage.removeItem("mathTasks"); // Remove mathTasks from local storage
        localStorage.removeItem("mathTasksTemplates"); // Remove mathTasks from local storage
        localStorage.removeItem("mathTaskAnswers"); // Remove mathTasks from local storage
    }


    $("#generatedTasks").on("focusout", ".task-result", function (e) {
        e.preventDefault();
        $(this).parents(".task-box").find(".task-label").removeClass("task-label-active");
        var result = $(this).val();
        if (result != null && result !== "") {
            var task = $(this).data("task").replace(/[^-()\d/*+.]/g, '');

            const mathTaskAnswers = JSON.parse(localStorage.getItem("mathTaskAnswers")) || {};
            mathTaskAnswers[task] = result;
            localStorage.setItem("mathTaskAnswers", JSON.stringify(mathTaskAnswers));
            if (checkAnswer(task, result)) {
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
        const element = document.getElementById("generatedTasksTable");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        localStorage.setItem('mathTasks', JSON.stringify(newMathTasks)); // Store merged math tasks array in local storage
    });

    function displayMathTasks(tasks, mathTaskAnswers = null) {
        if ($("#deleteTasksBtn").is(":hidden")) {
            $("#deleteTasksBtn").show();
        }
        if ($("#printTasksBtn").is(":hidden")) {
            $("#printTasksBtn").show();
        }
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        var rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        containerDiv.appendChild(rowDiv);
        var colDiv = document.createElement('div');
        colDiv.classList.add('col-auto');
        rowDiv.appendChild(colDiv);
        var table = document.createElement('table');
        colDiv.appendChild(table);
        tasks.forEach((task, index) => {
            if (index % 28 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                containerDiv.appendChild(rowDiv);
            }

            if (index % 14 === 0) {
                colDiv = document.createElement('div');
                colDiv.classList.add('col-auto');
                rowDiv.appendChild(colDiv);
                table = document.createElement('table');

                colDiv.appendChild(table);
            }

            var taskClean = task.replace(/[^-()\d/*+.]/g, '');
            const answer = mathTaskAnswers !== null && mathTaskAnswers[taskClean] !== undefined ? mathTaskAnswers[taskClean] : "";
            var classVer = "";
            var disabled = "";
            var correctAnswer = true;
            if (answer !== "") {
                if (checkAnswer(taskClean, answer)) {
                    classVer = "border border-3 border-success";
                    disabled = "disabled";
                } else {
                    classVer = "border border-3 border-danger";
                    correctAnswer = false;
                }
            }

            var item = "<tr class=\"task-box\">\n" +
                "                    <td style=\"text-align: center;font-size: 22px\"><span class=\"task-label col-form-label\">" + task + "</span>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <span style=\"margin-right: 10px;\">=</span>\n" +
                "                    </td>\n" +
                "                    <td><input " + disabled + " type=\"text\" autocomplete=\"off\" inputmode=\"numeric\" value=\"" + answer + "\" data-task=\"" + task + "\"\n" +
                "                               class=\"form-control task-result text-center " + classVer + "\">\n" +
                "                    </td>\n" +
                "\n" +
                "                    <td>\n" +
                "                        <button data-task=\"" + task + "\" class=\"form-control task-hint hide text-center " + (correctAnswer ? "hidden" : "") + "\"\n" +
                "                                style=\"margin-left: 10px\"><span class=\"wave\">👋</span></button>\n" +
                "                    </td>\n" +
                "                </tr>";
            $("#generatedTasksTable").append(item);
            $(table).append(item);
        });
        $("#generatedTasksPrint").html(containerDiv);
    }

    function displayMathTasksTemplates(tasks, mathTaskAnswers = null) {
        if ($("#deleteTasksBtn").is(":hidden")) {
            $("#deleteTasksBtn").show();
        }
        if ($("#printTasksBtn").is(":hidden")) {
            $("#printTasksBtn").show();
        }
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        var rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        containerDiv.appendChild(rowDiv);
        var colDiv = document.createElement('div');
        colDiv.classList.add('col-auto');
        rowDiv.appendChild(colDiv);
        var table = document.createElement('table');
        colDiv.appendChild(table);
        tasks.forEach((task, index) => {
            if (index % 28 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                containerDiv.appendChild(rowDiv);
            }

            if (index % 14 === 0) {
                colDiv = document.createElement('div');
                colDiv.classList.add('col-auto');
                rowDiv.appendChild(colDiv);
                table = document.createElement('table');

                colDiv.appendChild(table);
            }

            var taskClean = task.replace(/[^-()\d/*+.]/g, '');
            const answer = mathTaskAnswers !== null && mathTaskAnswers[taskClean] !== undefined ? mathTaskAnswers[taskClean] : "";
            var classVer = "";
            var disabled = "";
            if (answer !== "") {
                if (checkAnswer(taskClean, answer)) {
                    classVer = "border border-3 border-success";
                    disabled = "disabled";
                } else {
                    classVer = "border border-3 border-danger";
                }
            }

            var item = "<tr class=\"task-box\">\n" +
                "                    <td style=\"text-align: center;font-size: 22px\"><span class=\"task-label col-form-label\">" + task + "</span>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <span style=\"margin-right: 10px;\">=</span>\n" +
                "                    </td>\n" +
                "                    <td><input " + disabled + " type=\"text\" autocomplete=\"off\" inputmode=\"numeric\" value=\"" + answer + "\" data-task=\"" + task + "\"\n" +
                "                               class=\"form-control task-result text-center " + classVer + "\">\n" +
                "                    </td>\n" +
                "                </tr>";
            $("#generatedTasksTable").append(item);
            $(table).append(item);
        });
        $("#generatedTasksPrint").html(containerDiv);
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
        const confirmation = confirm("Сигурни ли сте, че искате да изтрийте темплейта?"); // Display confirmation popup
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
        const element = document.getElementById("generatedTasksTable");
        element.scrollIntoView({behavior: "smooth", inline: "nearest"});
        localStorage.setItem('mathTasksTemplates', JSON.stringify(randomTasks)); // Store merged math tasks array in local storage
    });

    let mathTasksTemplates = JSON.parse(localStorage.getItem('mathTasksTemplates')); // Get mathTasksTemplates from local storage
    if (mathTasksTemplates && Array.isArray(mathTasksTemplates) && mathTasksTemplates.length > 0) {
        displayMathTasksTemplates(mathTasksTemplates, mathTaskAnswers);
        checkAll();
    }
});