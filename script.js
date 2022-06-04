'use strict';

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

const getDisplayOperatorSymbol = (operatorSymbol) => {
  return {
    '-': '−',
    '/': '÷',
    '*': '×',
  }[operatorSymbol];
};

const resetDisplayResult = () => {
  const resultTag = document.querySelector('#result');
  resultTag.textContent = '';
};

const getDisplayResultValue = () =>
  parseInt(document.querySelector('#result').textContent);

const updateOperationDisplay = (operation) =>
  (document.querySelector('#operations').textContent = operation);

const resetResultsDisplay = () => {
  const resultTag = document.querySelector('#result');
  resultTag.textContent = '';
};

const updateDisplayOnClick = () => {
  const resultTag = document.querySelector('#result');
  const operatorButtons = document.querySelectorAll('.operator');
  const digitButtons = document.querySelectorAll('.digit');
  let clickedDigits = [];

  for (const digitButton of digitButtons) {
    digitButton.addEventListener('click', () => {
      console.log('Digit click');
      const clickedDigit = digitButton.getAttribute('data-key');
      clickedDigits = [...clickedDigits, clickedDigit];
      resultTag.textContent = clickedDigits.join('');
    });
  }

  for (const button of operatorButtons) {
    button.onclick = () => {
      console.log('operator click');
      clickedDigits = [];
    };
  }
};

const updateDisplayOperations = () => {
  const operatorButtons = document.querySelectorAll('.operator');
  let operatorClicked;
  let currentOperation = [];

  for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => {
      operatorClicked = operatorButton.getAttribute('data-key');

      let displayOperator;
      if (operatorClicked === '+') displayOperator = '+';
      else displayOperator = getDisplayOperatorSymbol(operatorClicked);

      let firstNumber = '';
      firstNumber = getDisplayResultValue();

      const newOperation = `${firstNumber} ${displayOperator}`;
      currentOperation = [newOperation];

      updateOperationDisplay(currentOperation.join(' '));
    });
  }
};

updateDisplayOnClick();
updateDisplayOperations();
