const output = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
let firstValue = "";
let secondValue = "";
let operator = "";
let clicked = false;
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (/[0-9]/.test(button.innerText)) {
      if (!clicked) {
        firstValue = firstValue.concat(button.innerText);
        output.textContent += button.innerText;
      } else {
        secondValue = secondValue.concat(button.innerText);
        output.textContent += button.innerText;
      }
    } else if (button.innerText === "+") {
      clicked = true;
      output.textContent += button.innerText;
      operator = button.innerText;
    } else if (button.innerText === "-") {
      clicked = true;
      output.textContent += button.innerText;
      operator = button.innerText;
    } else if (button.innerText === "x") {
      clicked = true;
      output.textContent += button.innerText;
      operator = button.innerText;
    } else if (button.innerText === "÷") {
      clicked = true;
      output.textContent += button.innerText;
      operator = button.innerText;
    } else if (button.innerText === "=") {
      output.textContent += button.innerText;
      operate(operator, parseInt(firstValue), parseInt(secondValue));
    } else if (button.innerText === "C") {
      window.location.reload();
    }
  });
});

function add(a, b) {
  output.textContent += `${a + b}`;
  return a + b;
}

function subtract(a, b) {
  output.textContent += `${a - b}`;
  return a - b;
}

function multiply(a, b) {
  output.textContent += `${a * b}`;
  return a * b;
}

function divide(a, b) {
  output.textContent += `${a / b}`;
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "x":
      multiply(a, b);
      break;
    case "÷":
      divide(a, b);
      break;
  }
}
