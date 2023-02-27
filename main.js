const output = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
let firstValue = "";
let secondValue = "";
let operator = "";
let clicked = false;

function handleDeleteButtonClick() {
  let text = output.textContent;
  if (
    !output.textContent.includes("+") &&
    !output.textContent.includes("x") &&
    !output.textContent.includes("÷") &&
    !output.textContent.includes("-")
  ) {
    output.textContent = text.slice(0, -1);
    firstValue = output.textContent;
  } else if (
    output.textContent[output.textContent.length - 1] === "+" ||
    output.textContent[output.textContent.length - 1] === "-" ||
    output.textContent[output.textContent.length - 1] === "x" ||
    output.textContent[output.textContent.length - 1] === "÷"
  ) {
    output.textContent = text.slice(0, -1);
    operator = "";
  } else if (output.textContent.includes("+")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("+");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  } else if (output.textContent.includes("-")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("-");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  } else if (output.textContent.includes("x")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("x");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  } else if (output.textContent.includes("÷")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("÷");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  }
  if (output.textContent === "") {
    handleClearButtonClick();
  }
}

function handleNumberButtonClick(button) {
  output.textContent += button.innerText;
  if (!clicked) {
    firstValue = firstValue.concat(button.innerText);
  } else {
    secondValue = secondValue.concat(button.innerText);
  }
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
  } else if (button.innerText === "-") {
    output.textContent += button.innerText;
    firstValue = output.textContent;
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
    } else if (button.innerText === "Delete") {
      handleDeleteButtonClick();
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
        setTimeout(() => {
          handleClearButtonClick();
        }, "1000");
        break;
      } else {
        result = divide(a, b);
      }
      break;
  }
  return result;
}
