const chalk = require('chalk');
const inquirer = require('inquirer');
const log = console.log;
const settings = require('./helpers').loadSettings;
const { formatCurrency } = require('./helpers');
const { showError, validate } = require('./validation');

const questions = [
  {
    type: 'number',
    name: 'value',
    message: 'How much do you need?',
    validate: validateQuestion,
  }
];

function availableBills() {
  const bills = [...settings().bills];
  const color = chalk.bold.green;

  log(color('💵 Available bills:\n'));

  bills
    .sort(sortBills)
    .map(formatBills);
}

function calculate(value) {
  return settings().bills
  .reduce((counter, bill) => {
    const totalBills = Math.floor(value / bill);
    if (totalBills) {
      counter[bill] = totalBills;
      value -= (totalBills * bill);
    }

    return counter;
  }, {});
}

function formatBills(bill) {
  const value = formatCurrency(bill, settings().currency);

  log(` - ${value}`);
}

function showResponse(result) {
  const color = chalk.bold.green;

  log('\n💰 Your money: \n');

  for (const bill in result) {
    const value = formatCurrency(bill, settings().currency);

    log(` - ${result[bill]} x ${color(value)}`);
  }

  log(color('\nThanks! See you soon!'));
}

function sortBills(x, y) {
  return x + y;
}

function validateQuestion(value) {
  const response = validate(value);

  if (!response.isValid) {
    showError(response);
  }

  return response.isValid;
}

const withdraw = () => {
  availableBills();
  log();
  inquirer
    .prompt(questions)
    .then(withdrawCallback);
};

function withdrawCallback(answers) {
  const { value } = answers;
  const calculated = calculate(value);

  return showResponse(calculated);
}


module.exports = withdraw;
