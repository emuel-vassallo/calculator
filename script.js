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

const getDisplayOperatorSymbol = (operationOperator) => {
  return {
    '-': '−',
    '/': '÷',
    '*': '×',
  }[operationOperator];
};

const getOperationOperatorSymbol = (displayOperator) => {
  return {
    '−': '-',
    '÷': '/',
    '×': '*',
  }[displayOperator];
};

const resetDisplayResult = () => {
  const resultTag = document.querySelector('#input-numbers-display');
  resultTag.textContent = '';
};

const getDisplayResultValue = () =>
  parseInt(document.querySelector('#input-numbers-display').textContent);

const updateOperationDisplay = (operation) =>
  (document.querySelector('#operations-display').textContent = operation);

const resetResultsDisplay = () => {
  const resultTag = document.querySelector('#input-numbers-display');
  resultTag.textContent = '';
};

const updateInputNumbersDisplay = () => {
  const resultTag = document.querySelector('#input-numbers-display');
  const operatorButtons = document.querySelectorAll('.operator');
  const digitButtons = document.querySelectorAll('.digit');
  let newInputNumber = [];

  for (const digitButton of digitButtons) {
    digitButton.addEventListener('click', () => {
      const clickedDigit = digitButton.getAttribute('data-key');
      newInputNumber = [...newInputNumber, clickedDigit];
      resultTag.textContent = newInputNumber.join('');
    });
  }

  operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
      newInputNumber = [];
    });
  });
};

const updateDisplayValues = (operatorButton) => {
  const operationsTag = document.querySelector('#operations-display');
  const inputDisplayTag = document.querySelector('#input-numbers-display');

  let clickedOperator;
  clickedOperator = operatorButton.getAttribute('data-key');

  const displayedOperation = operationsTag.textContent;
  const displayedOperationValues = displayedOperation.split(' ');
  let firstOperationNumber = parseInt(displayedOperationValues[0]);

  let displayOperator = displayedOperationValues[1];
  let operationOperator = getOperationOperatorSymbol(displayOperator);
  if (displayOperator === '+') operationOperator = '+';

  const secondOperationNumber = parseInt(inputDisplayTag.textContent);
  const operationSolution =
    operate(operationOperator, firstOperationNumber, secondOperationNumber) ||
    secondOperationNumber;

  let clickedDisplayOperator = getDisplayOperatorSymbol(clickedOperator);
  if (clickedOperator === '+') clickedDisplayOperator = '+';

  const isInputUnchanged = inputDisplayTag.textContent == firstOperationNumber;
  if (isInputUnchanged) {
    updateOperationDisplay(`${firstOperationNumber} ${clickedDisplayOperator}`);
    return;
  }

  let newOperation;
  const isOperationNotDisplayed = !displayedOperation;
  if (isOperationNotDisplayed)
    newOperation = `${secondOperationNumber} ${clickedDisplayOperator}`;
  else newOperation = `${operationSolution} ${clickedDisplayOperator}`;

  updateOperationDisplay(newOperation);
  inputDisplayTag.textContent = operationSolution;
};

const updateDisplay = () => {
  const operatorButtons = document.querySelectorAll('.operator');
  const equalsButton = document.querySelector('[data-key="="]');

  for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => {
      updateDisplayValues(operatorButton);
    });
  }
};

updateInputNumbersDisplay();
updateDisplay();
