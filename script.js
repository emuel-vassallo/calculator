const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  return {
    '+': add(a, b),
    '-': subtract(a, b),
    '*': multiply(a, b),
    '/': divide(a, b),
  }[operator];
};

const updateDisplay = () => {
  const resultTag = document.querySelector('#result');
  const digitButtons = document.querySelectorAll('.digit');
  let clickedButtonValues = [];
  for (const button of digitButtons) {
    button.addEventListener('click', () => {
      const clickedButtonValue = button.getAttribute('data-key');
      clickedButtonValues = [...clickedButtonValues, clickedButtonValue];
      resultTag.textContent = clickedButtonValues.join('');
    });
  }
};

const getResultValue = () =>
  parseInt(document.querySelector('#result').textContent);

updateDisplay();
