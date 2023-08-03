import $ from 'jquery';
import 'bootstrap';

import JSConfetti from 'js-confetti';
import '../scss/main.scss';

const jsConfetti = new JSConfetti();

declare global {
  interface Window {
    localStorage: WindowLocalStorage;
  }
}

$(() => {
  let mathTasks = JSON.parse(localStorage.getItem('mathTasks') || '{}');
  let mathTaskAnswers = JSON.parse(localStorage.getItem("mathTaskAnswers") || '{}');
  if (mathTasks && Array.isArray(mathTasks) && mathTasks.length > 0) {
    displayMathTasks(mathTasks, mathTaskAnswers);
    checkAll();
  }

  function generateMathTasks(size: string | number | string[] | undefined, maxSum: string | number | string[] | undefined, operations: any = null) {
    //const defaultOperations = ['+', '-', '*', '/']; // Default array of available operations
    const defaultOperations = ['+', '-']; // Default array of available operations
    const tasks: any[] = [];
    let allTasks: any[] = [];
    if (mathTasks && Array.isArray(mathTasks) && mathTasks.length > 0) {
      allTasks = mathTasks;
    }

    // Use the specified operations array, or use the default operations array if not provided
    const availableOperations = operations && operations.length > 0 ? operations : defaultOperations;
    let tries = 0;
    while (tasks.length < Number(size)) {
      maxSum = Number(maxSum);
      const num1 = Math.floor(Math.random() * (maxSum - 1)) + 2; // Random number between 2 and maxSum
      const op = availableOperations[Math.floor(Math.random() * availableOperations.length)]; // Randomly select an operation from the available operations
      let num2: number;

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

      const task: string = `${num1} ${op} ${num2} = `; // Create the task string
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

  const generateTasksSelector = $("#generateTasks");

  $(document).on("click", "#deleteTasksBtn", function (e) {
    e.preventDefault();
    const confirmation = confirm("Сигурни ли сте, че искате да изтрийте всичките задачи?"); // Display confirmation popup
    if (confirmation) {
      localStorage.removeItem("mathTasks"); // Remove mathTasks from local storage
      localStorage.removeItem("mathTaskAnswers"); // Remove mathTasks from local storage
      generateTasksSelector.html(""); // Clear the math tasks list on the page
      $("#deleteTasksBtn").hide();
      $("#printTasksBtn").hide();
      location.reload()
    }
  });

  generateTasksSelector.on("focusout", ".task-result", function (e) {
    e.preventDefault();
    $(this).parents(".task-box").find(".task-label").removeClass("task-label-active");
    const result: string | undefined = $(this).val()?.toString().trim();
    if (result != null && result !== "") {
      const task = $(this).data("task").replace(/[^-()\d/*+.]/g, '');

      const mathTaskAnswers = JSON.parse(localStorage.getItem("mathTaskAnswers") || '{}');
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

  function checkAll() {
    const numItems = $('.border-success').length;
    if (numItems === mathTasks.length) {
      startConfetti();
      startStars();
    }
  }

  function startStars() {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      emojis: ['⭐️'],
      confettiColors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
      jsConfetti.addConfetti({
        ...defaults,
        confettiNumber: 40
      });

      jsConfetti.addConfetti({
        ...defaults,
        confettiNumber: 10,
        emojis: ['💥', '✨', '💫', '🌟', '⭐️'],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
    setTimeout(shoot, 400);
    setTimeout(shoot, 1000);

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      shoot();
    }, 550);

  }

  function startConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      jsConfetti.addConfetti({
        ...defaults,
        ...{
          confettiNumber: particleCount,
          origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
        }
      });

      jsConfetti.addConfetti({
        ...defaults,
        ...{
          confettiNumber: particleCount,
          origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
        }
      });
    }, 250);
  }

  $('body').on('keydown', 'input.task-result', function (e) {
    // e.preventDefault();
    if (e.which === 13 || e.which === 40) {
      let self = $(this), form = self.parents('#generatedTasks:eq(0)'), focusable: JQuery<HTMLInputElement>,
        next: JQuery<HTMLInputElement>;
      focusable = form.find('input').filter(':visible');
      next = focusable.eq(focusable.index(this) + 1);
      if (next.length) {
        next.trigger('focus');
      }
      return false;
    }

    if (e.which === 38) {
      let self = $(this), form = self.parents('#generatedTasks:eq(0)'), focusable: JQuery<HTMLInputElement>,
        next: JQuery<HTMLInputElement>;
      focusable = form.find('input').filter(':visible');
      next = focusable.eq(focusable.index(this) - 1);
      if (next.length) {
        next.trigger('focus');
      }
      return false;
    }
  });


  $("#generatedTasks").on("focusin", ".task-result", function (e) {
    e.preventDefault();
    $(this).parents(".task-box").find(".task-label").addClass("task-label-active");
  }).on("click", ".task-hint", function (e) {
    const hintModalSelector = $("#hint-modal");

    hintModalSelector.find(".task-task-operation span").html("");
    hintModalSelector.find(".task-left").html("");
    hintModalSelector.find(".task-right").html("");
    hintModalSelector.find(".hint-result").html("");
    const task = $(this).data("task").replace(/[^-()\d/*+.]/g, '');
    const splitUp = task.match(/[^\d()]+|[\d.]+/g);
    if (splitUp[1] === "+") {
      for (let i = 0; i < splitUp[0]; i++) {
        hintModalSelector.find(".task-left").append("<span class=\"dot dot-blue\"></span>");
        hintModalSelector.find(".hint-result").append("<span class=\"dot dot-blue\"></span>");
      }
      for (let i = 0; i < splitUp[2]; i++) {
        hintModalSelector.find(".task-right").append("<span class=\"dot dot-green\"></span>");
        hintModalSelector.find(".hint-result").append("<span class=\"dot dot-green\"></span>");

      }
    }

    if (splitUp[1] === "-") {
      for (let i = 0; i < splitUp[0]; i++) {
        hintModalSelector.find(".task-left").append("<span class=\"dot dot-blue\"></span>");
        if (i >= (splitUp[0] - splitUp[2])) {
          hintModalSelector.find(".hint-result").append("<span class=\"dot\"></span>");
        } else {
          hintModalSelector.find(".hint-result").append("<span class=\"dot dot-blue\"></span>");
        }
      }
      for (let i = 0; i < splitUp[2]; i++) {
        hintModalSelector.find(".task-right").append("<span class=\"dot dot-green\"></span>");
      }
    }

    if (splitUp[1] === "*") {
      for (let i = 0; i < splitUp[0]; i++) {
        hintModalSelector.find(".task-left").append("<span class=\"dot dot-blue\"></span>");
      }
      for (let i = 0; i < splitUp[2]; i++) {
        hintModalSelector.find(".task-right").append("<span class=\"dot dot-green\"></span>");
      }

      for (let i = 0; i < splitUp[2]; i++) {
        for (let k = 0; k < splitUp[0]; k++) {
          hintModalSelector.find(".hint-result").append("<span class=\"dot dot-blue\"></span>");
        }
        hintModalSelector.find(".hint-result").append("<br />");
      }
    }

    if (splitUp[1] === "/") {
      for (let i = 0; i < splitUp[0]; i++) {
        hintModalSelector.find(".task-left").append("<span class=\"dot dot-blue\"></span>");
      }
      for (let i = 0; i < splitUp[2]; i++) {
        hintModalSelector.find(".task-right").append("<span class=\"dot dot-green\"></span>");
      }

      for (let k = 0; k < splitUp[0] / splitUp[2]; k++) {
        for (let i = 0; i < splitUp[2]; i++) {
          hintModalSelector.find(".hint-result").append("<span class=\"dot dot-blue\"></span>");

        }
        hintModalSelector.find(".hint-result").append("<br />");
      }
    }

    hintModalSelector.find(".task-operation span").html(splitUp[1]);

    hintModalSelector.modal('show');
  });

  $(document).on("click", "#generateTasks", function (e) {
    e.preventDefault();

    const maxSum = $("#maxSum").val();
    const taskCount = $("#taskCount").val();
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

  function displayMathTasks(tasks: any[], mathTaskAnswers: string | null = null) {
    const deleteTaskBtnSelector = $("#deleteTasksBtn");
    const printTaskBtnSelector = $("#printTasksBtn");
    if (deleteTaskBtnSelector.is(":hidden")) {
      deleteTaskBtnSelector.show();
    }
    if (printTaskBtnSelector.is(":hidden")) {
      printTaskBtnSelector.show();
    }

    tasks.forEach((task, index: number) => {
      const taskClean = task.replace(/[^-()\d/*+.]/g, '');
      const answer = mathTaskAnswers !== null && mathTaskAnswers[taskClean] !== undefined ? mathTaskAnswers[taskClean] : "";
      let classVer = "";
      let disabled = "";
      let correctAnswer = true;
      if (answer !== "") {
        if (parseInt(answer) === eval(taskClean)) {
          classVer = "border border-3 border-success";
          disabled = "disabled";
        } else {
          classVer = "border border-3 border-danger";
          correctAnswer = false;
        }
      }

      const itemContainer: HTMLDivElement = document.createElement("div");
      itemContainer.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "g-3", "task-box", "align-items-center", "mb-1");

      const item: HTMLDivElement = document.createElement("div");
      item.classList.add("row", "align-items-center");

      const labelContainer: HTMLDivElement = document.createElement("div");
      labelContainer.classList.add("col-auto");

      const label: HTMLLabelElement = document.createElement("label");
      label.setAttribute("for", "inputTask" + index);
      label.classList.add("task-label", "col-form-label");
      label.innerHTML = task;

      labelContainer.append(label);

      const inputContainer: HTMLDivElement = document.createElement("div");
      inputContainer.classList.add("col-auto");

      const input: HTMLInputElement = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("autocomplete", "off");
      input.setAttribute("inputmode", "numeric");
      input.setAttribute("data-task", task);
      input.setAttribute("value", answer);
      input.setAttribute("id", "inputTask" + index);
      input.classList.add("form-control", "task-result", "text-center", "border", "border-3");

      if(classVer) {
        input.classList.add(classVer);
      }

      inputContainer.append(input);

      const buttonContainer: HTMLDivElement = document.createElement("div");
      buttonContainer.classList.add("col-auto");

      const button: HTMLButtonElement = document.createElement("button");
      button.setAttribute("data-task", task);
      button.classList.add("form-control", "task-hint", "hide", "text-center");

      if (correctAnswer) {
        button.classList.add("hidden");
      }
      button.innerHTML = "<span class='wave'>👋</span>";

      buttonContainer.append(button);

      item.append(labelContainer);
      item.append(inputContainer);
      item.append(buttonContainer);

      itemContainer.append(item);

      document.getElementById("generatedTasks")?.append(itemContainer);
    });
  }
});
