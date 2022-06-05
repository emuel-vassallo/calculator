'use strict';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) =>
  ({
    '+': add(a, b),
    '-': subtract(a, b),
    '*': multiply(a, b),
    '/': divide(a, b),
  }[operator]);

const getDecimalPlacesCount = (number) => {
  number = parseFloat(number);
  if (Math.floor(number) === number) return 0;
  return number.toString().split('.')[1].length || 0;
};

const getRoundedNumber = (number) => number.toFixed(3);

const getDisplayOperatorSign = (operationOperator) =>
  ({
    '-': '−',
    '/': '÷',
    '*': '×',
  }[operationOperator]);

const getOperationOperatorSign = (displayOperator) =>
  ({
    '−': '-',
    '÷': '/',
    '×': '*',
  }[displayOperator]);

const resetDisplayResult = () =>
  (document.querySelector('#input-numbers-display').textContent = '');

const getDisplayResultValue = () =>
  parseInt(document.querySelector('#input-numbers-display').textContent);

const updateOperationDisplay = (operation) =>
  (document.querySelector('#operations-display').textContent = operation);

const resetResultsDisplay = () => {
  document.querySelector('#input-numbers-display').textContent = '';
};

const updateInputNumbersDisplay = () => {
  const resultTag = document.querySelector('#input-numbers-display');
  const operatorButtons = document.querySelectorAll('.operator');
  const digitButtons = document.querySelectorAll('.digit');
  let newInputNumber = [];

  digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const clickedDigit = button.getAttribute('data-key');
      newInputNumber = [...newInputNumber, clickedDigit];
      resultTag.textContent = newInputNumber.join('');
    });
  });

  operatorButtons.forEach((button) =>
    button.addEventListener('click', () => (newInputNumber = []))
  );
};

const updateOnOperatorClick = (operatorButton) => {
  const operationsDisplayTag = document.querySelector('#operations-display');
  const inputDisplayTag = document.querySelector('#input-numbers-display');

  const inputNumbers = inputDisplayTag.textContent;

  const clickedOperator = operatorButton.getAttribute('data-key');
  const displayedOperation = operationsDisplayTag.textContent;
  const displayedOperationValues = displayedOperation.split(' ');
  let firstOperationNumber = parseFloat(displayedOperationValues[0]);

  let displayOperator = displayedOperationValues[1];
  let operationOperator = getOperationOperatorSign(displayOperator);
  if (displayOperator === '+') operationOperator = '+';

  const secondOperationNumber = parseFloat(inputNumbers);
  let operationSolution;
  if (displayedOperation.includes('=')) operationSolution = inputNumbers;
  else
    operationSolution =
      operate(operationOperator, firstOperationNumber, secondOperationNumber) ||
      secondOperationNumber;

  const decimalPlacesCount = getDecimalPlacesCount(operationSolution);
  if (decimalPlacesCount > 3)
    operationSolution = getRoundedNumber(operationSolution);
  if (parseFloat(operationSolution) === 0) operationSolution = 0;

  let clickedDisplayOperator = getDisplayOperatorSign(clickedOperator);
  if (clickedOperator === '+') clickedDisplayOperator = '+';

  /* [BUG: operation does not carry out if first and second numbers are equal] */
  const isInputUnchanged = parseFloat(inputNumbers) === firstOperationNumber;
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

const updateDisplayOnOperatorClick = () =>
  document.querySelectorAll('.operator').forEach((button) => {
    button.addEventListener('click', () => updateOnOperatorClick(button));
  });

const updateOnEqualsClick = () => {
  const operationsDisplayTag = document.querySelector('#operations-display');
  const inputDisplayTag = document.querySelector('#input-numbers-display');
  const inputNumbers = inputDisplayTag.textContent;

  let displayedOperation = operationsDisplayTag.textContent;
  if (displayedOperation === '' || displayedOperation.includes('=')) return;

  let displayedOperationValues = displayedOperation.split(' ');
  let firstOperationNumber = parseFloat(displayedOperationValues[0]);

  let displayOperator = displayedOperationValues[1];
  let operationOperator = getOperationOperatorSign(displayOperator);
  if (displayOperator === '+') operationOperator = '+';

  const secondOperationNumber = parseFloat(inputNumbers);
  let operationSolution = operate(
    operationOperator,
    firstOperationNumber,
    secondOperationNumber
  );
  const decimalPlacesCount = getDecimalPlacesCount(operationSolution);
  if (decimalPlacesCount > 3)
    operationSolution = getRoundedNumber(operationSolution);
  if (parseFloat(operationSolution) === 0) operationSolution = 0;

  inputDisplayTag.textContent = operationSolution;

  displayedOperationValues = [
    ...displayedOperationValues,
    secondOperationNumber,
    '=',
  ];

  displayedOperation = displayedOperationValues.join(' ');
  operationsDisplayTag.textContent = displayedOperation;
};

const updateDisplayOnEqualsClick = () =>
  document
    .querySelector('#equals')
    .addEventListener('click', () => updateOnEqualsClick());

updateInputNumbersDisplay();
updateDisplayOnOperatorClick();
updateDisplayOnEqualsClick();
