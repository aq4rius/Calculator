const output = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
let firstValue = "";
let secondValue = "";
let operator = "";
let clicked = false;

function handleDotButtonClick(button) {
  if (clicked && secondValue.includes(".")) {
    return;
  }
  if (!clicked && firstValue.includes(".")) {
    return;
  }
  output.textContent += button.innerText;
  if (!clicked) {
    firstValue += button.innerText;
  } else {
    secondValue += button.innerText;
  }
}

function handleDeleteButtonClick() {
  let text = output.textContent;
  if (
    !output.textContent.includes("+") &&
    !output.textContent.includes("*") &&
    !output.textContent.includes("/") &&
    !output.textContent.includes("-")
  ) {
    output.textContent = text.slice(0, -1);
    firstValue = output.textContent;
  } else if (
    output.textContent[output.textContent.length - 1] === "+" ||
    output.textContent[output.textContent.length - 1] === "-" ||
    output.textContent[output.textContent.length - 1] === "*" ||
    output.textContent[output.textContent.length - 1] === "/"
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
  } else if (output.textContent.includes("*")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("*");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  } else if (output.textContent.includes("/")) {
    output.textContent = text.slice(0, -1);
    let index = output.textContent.indexOf("/");
    let text2 = output.textContent;
    secondValue = text2.slice(index + 1);
    console.log(secondValue);
  }
  if (output.textContent === "") {
    handleClearButtonClick();
  }
}

function handleNumberButtonClick(button) {
  if (!clicked && output.textContent.length < 12) {
    output.textContent += button.innerText;
    firstValue = firstValue.concat(button.innerText);
  } else if (output.textContent.length < 12) {
    output.textContent += button.innerText;
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
      !output.textContent.includes("*") &&
      !output.textContent.includes("/")
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
    } else if (["+", "-", "*", "/"].includes(button.innerText)) {
      handleOperatorButtonClick(button);
    } else if (button.innerText === ".") {
      handleDotButtonClick(button);
    } else if (button.innerText === "Delete") {
      handleDeleteButtonClick();
    } else if (button.innerText === "=") {
      handleEqualsButtonClick();
    } else if (button.innerText === "c") {
      handleClearButtonClick();
    }
  });
});

document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  console.log(e.key);
  if (/[0-9]/.test(e.key)) {
    handleNumberButtonClick({ innerText: e.key });
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    handleOperatorButtonClick({ innerText: e.key });
  } else if (e.key === ".") {
    handleDotButtonClick({ innerText: e.key });
  } else if (e.key === "Backspace") {
    handleDeleteButtonClick();
  } else if (e.key === "=") {
    handleEqualsButtonClick();
  } else if (e.key === "c") {
    handleClearButtonClick();
  }
}

function add(a, b) {
  let result = a + b;
  result = parseFloat(result.toFixed(11));
  output.textContent = result;
  return result;
}

function subtract(a, b) {
  let result = a - b;
  result = parseFloat(result.toFixed(11));
  output.textContent = result;
  return result;
}

function multiply(a, b) {
  let result = a * b;
  result = parseFloat(result.toFixed(11));
  output.textContent = result;
  return result;
}

function divide(a, b) {
  let result = a / b;
  result = parseFloat(result.toFixed(11));
  output.textContent = result;
  return result;
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
    case "*":
      result = multiply(a, b);
      break;
    case "/":
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
