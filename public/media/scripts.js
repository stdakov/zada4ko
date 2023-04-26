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

    function generateMathTasks(size, maxSum, operations = null) {
        //const defaultOperations = ['+', '-', '*', '/']; // Default array of available operations
        const defaultOperations = ['+', '-']; // Default array of available operations
        const tasks = [];

        // Use the specified operations array, or use the default operations array if not provided
        const availableOperations = operations && operations.length > 0 ? operations : defaultOperations;

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
            if (!tasks.includes(task)) {
                tasks.push(task); // Add the task to the tasks array if it doesn't already exist
            }
        }

        return tasks;
    }

    $("#phones").append("<li class=\"list-group-item\"> asdasd</li>");
    $("#phones").append("<li class=\"list-group-item\">asdasd2</li>");
    $(document).on("click", "#generateTasks", function (e) {
        e.preventDefault();

        var maxSum = $("#maxSum").val();
        var taskCount = $("#taskCount").val();
        const checkedCheckbox = $('input[type="checkbox"]:checked'); // Select all checked checkboxes
        const checkedValues = checkedCheckbox.map(function () { // Map to an array of values
            return $(this).val();
        }).get();
// Example usage:
        const mathTasks = generateMathTasks(taskCount, maxSum, checkedValues); // Generate 10 tasks with a maximum sum of 10
        console.log(mathTasks);
        // Loop through the mathTasks array and append each item as an <li> element with the class "list-group-item"
        mathTasks.forEach((task, index) => {
            console.log(task)
            var item = "<div class=\"row g-3 align-items-center mb-1\">\n" +
                "                <div class=\"col-auto\">\n" +
                "                    <label for=\"inputTask" + index + "\" style=\"width: 60px\" class=\"col-form-label\">"+task+"</label>\n" +
                "                </div>\n" +
                "                <div class=\"col-auto\">\n" +
                "                    <input type=\"text\" id=\"inputTask" + index + "\" style=\"width: 50px\" class=\"form-control\">\n" +
                "                </div>\n" +
                "            </div>";
            $("#generatedTasks").append(item);
        });
    });


});