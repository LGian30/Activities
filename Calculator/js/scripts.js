const currentOperandElement = document.getElementById("current-operand");
const previousOperandElement = document.getElementById("previous-operand");

let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  previousOperandElement.textContent =
    previousOperand && operation
      ? `${previousOperand} ${getOperationSymbol(operation)}`
      : "";
}

function getOperationSymbol(operator) {
  const symbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };
  return symbols[operator] || operator;
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = "0";
    shouldResetScreen = false;
  }
  if (number === "." && currentOperand.includes(".")) {
    return;
  }
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function chooseOperation(operator) {
  if (currentOperand === "") return;
  if (previousOperand !== "" && operation !== null) {
    calculate();
  }
  previousOperand = currentOperand;
  operation = operator;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  if (operation === null || previousOperand === "") return;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let result;
  switch (operation) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      if (current === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operation = null;
        updateDisplay();
        return;
      }
      result = previous / current;
      break;

    default:
      return;
  }
  currentOperand = Number(result.toFixed(10)).toString();
  previousOperand = "";
  operation = null;
  shouldResetScreen = true;
  updateDisplay();
}

function clearCalculator() {
  currentOperand = "0";
  previousOperand = "";
  operation = null;
  shouldResetScreen = false;

  updateDisplay();
}

function deleteNumber() {
  if (shouldResetScreen || currentOperand === "Error") {
    currentOperand = "0";
    shouldResetScreen = false;
    updateDisplay();
    return;
  }
  currentOperand =
    currentOperand.length > 1
      ? currentOperand.slice(0, -1)
      : "0";

  updateDisplay();
}

function percentage() {
  if (currentOperand === "Error") return;

  currentOperand = (parseFloat(currentOperand) / 100).toString();
  updateDisplay();
}

document.querySelectorAll(".buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const number = button.dataset.number;
    const value = button.dataset.value;

    if (number !== undefined) {
      appendNumber(number);
      return;
    }
    switch (action) {
      case "clear":
        clearCalculator();
        break;
      case "delete":
        deleteNumber();
        break;
      case "percent":
        percentage();
        break;
      case "operator":
        chooseOperation(value);
        break;
      case "equals":
        calculate();
        break;
    }
  });
});

document.addEventListener("keydown", event => {
  if (/^[0-9.]$/.test(event.key)) {
    appendNumber(event.key);
  }
  if (["+", "-", "*", "/"].includes(event.key)) {
    chooseOperation(event.key);
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  }
  if (event.key === "Backspace") {
    deleteNumber();
  }
  if (event.key === "Escape") {
    clearCalculator();
  }
  if (event.key === "%") {
    percentage();
  }
});

updateDisplay();
