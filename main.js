const output = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
let firstValue = "";
let secondValue = "";
let operator = "";
let clicked = false;

function handleDeleteButtonClick(button) {}

function handleNumberButtonClick(button) {
  if (!clicked) {
    firstValue = firstValue.concat(button.innerText);
  } else {
    secondValue = secondValue.concat(button.innerText);
  }
  output.textContent += button.innerText;
}

function handleOperatorButtonClick(button) {
  if (firstValue != "") {
    if (operator === "") {
      clicked = true;
    } else {
      if (firstValue != "" && secondValue != "" && operator != "") {
        const result = operate(
          operator,
          parseFloat(firstValue),
          parseFloat(secondValue)
        );
        firstValue = `${result}`;
        secondValue = "";
      }
    }
    operator = button.innerText;
    if (
      !output.textContent.includes("+") &&
      !output.textContent.includes("x") &&
      !output.textContent.includes("÷")
    ) {
      output.textContent += button.innerText;
    }
    clicked = true;
  }
}

function handleEqualsButtonClick() {
  if (firstValue != "" && secondValue != "" && operator != "") {
    output.textContent += "=";
    const result = operate(
      operator,
      parseFloat(firstValue),
      parseFloat(secondValue)
    );
    firstValue = `${result}`;
    secondValue = "";
    operator = "";
    clicked = true;
  }
}

function handleClearButtonClick() {
  output.textContent = "";
  firstValue = "";
  secondValue = "";
  operator = "";
  clicked = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (/[0-9]/.test(button.innerText)) {
      handleNumberButtonClick(button);
    } else if (["+", "-", "x", "÷"].includes(button.innerText)) {
      handleOperatorButtonClick(button);
    } else if (button.innerText === "=") {
      handleEqualsButtonClick();
    } else if (button.innerText === "C") {
      handleClearButtonClick();
    }
  });
});

function add(a, b) {
  output.textContent = `${a + b}`;
  return a + b;
}

function subtract(a, b) {
  output.textContent = `${a - b}`;
  return a - b;
}

function multiply(a, b) {
  output.textContent = `${a * b}`;
  return a * b;
}

function divide(a, b) {
  output.textContent = `${a / b}`;
  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "x":
      result = multiply(a, b);
      break;
    case "÷":
      if (b === 0) {
        output.textContent = "Error!";
        break;
      } else {
        result = divide(a, b);
      }
      break;
  }
  return result;
}
