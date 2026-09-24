const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="equals"]');


let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;


function updateDisplay() {
    display.textContent = currentInput;

    if (operator !== null && previousInput !== "") {
        previousDisplay.textContent =
            `${previousInput} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.textContent = "";
    }
}


function getOperatorSymbol(operator) {
    switch (operator) {
        case "*":
            return "×";

        case "/":
            return "÷";

        case "-":
            return "−";

        default:
            return operator;
    }
}


function inputNumber(number) {

    if (shouldResetDisplay) {
        currentInput = number === "." ? "0." : number;
        shouldResetDisplay = false;

        updateDisplay();
        return;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (number === "." && currentInput === "0") {
        currentInput = "0.";
    }

    else if (currentInput === "0") {
        currentInput = number;
    }

    else {
        currentInput += number;
    }

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (currentInput === "Error") {
        return;
    }

    if (
        operator !== null &&
        previousInput !== "" &&
        !shouldResetDisplay
    ) {
        calculate();

        if (currentInput === "Error") {
            return;
        }
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldResetDisplay = true;

    updateDisplay();
}


function calculate() {

    if (
        operator === null ||
        previousInput === "" ||
        shouldResetDisplay
    ) {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentInput = "Error";
                display.textContent = "Error";
                previousDisplay.textContent =
                    "Cannot divide by zero";

                previousInput = "";
                operator = null;
                shouldResetDisplay = true;

                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    result = Math.round(
        (result + Number.EPSILON) * 100000000
    ) / 100000000;

    currentInput = result.toString();

    previousInput = "";
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}


function clearCalculator() {

    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}


function deleteNumber() {

    if (currentInput === "Error") {
        clearCalculator();
        return;
    }

    if (shouldResetDisplay) {
        return;
    }

    if (currentInput.length <= 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}


numberButtons.forEach((button) => {

    button.addEventListener("click", () => {
        inputNumber(button.dataset.number);
    });

});


operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });

});


clearButton.addEventListener("click", clearCalculator);

deleteButton.addEventListener("click", deleteNumber);

equalsButton.addEventListener("click", calculate);


updateDisplay();