'use strict';

const setup = () => {
  const inquirer = require('inquirer');
  const intro = require('./intro');
  const { writeSettings } = require('./helpers');

  const questions = [{
    type: 'list',
    name: 'currency',
    message: 'What currency is gonna be available?',
    choices: [
      {
        name: 'Euro (€)',
        value: 'EUR'
      },
      {
        name: 'British Pound (£)',
        value: 'GBP'
      },
      {
        name: 'US Dollar (U$)',
        value: 'USD'
      },
      {
        name: 'Brazilian Real (R$)',
        value: 'BRL'
      },
    ]
  },
  {
    type: 'checkbox',
    name: 'bills',
    message: 'What bills are going to be available?',
    choices: [
      {
        name: '5',
        value: 5,
      },
      {
        name: '10',
        value: 10,
      },
      {
        name: '20',
        value: 20,
      },
      {
        name: '50',
        value: 50,
      },
      {
        name: '100',
        value: 100,
      },
      {
        name: '200',
        value: 200,
      },
      {
        name: '500',
        value: 500,
      },
    ],
    validate(value) {
      return value.length > 0;
    },
  }];

  intro();
  inquirer
    .prompt(questions)
    .then(data => {
      data.bills = data.bills.sort((x, y) => y - x);
      data.lowestValue = Math.min(...data.bills);

      writeSettings(data);
    });
};

module.exports = setup;
