'use strict';

const log = console.log;
const chalk = require('chalk');
const { formatCurrency } = require('./helpers');
const settings = require('./helpers').loadSettings;

const validate = (result) => {
  const value = result.toString().trim();
  const hasOnlyNumbers = /^\d+$/.test(value);

  if (value < 0) {
    return handleError('InvalidArgumentException', value);
  }

  if (!hasOnlyNumbers) {
    return handleError('NotNumericException', value);
  }

  if (!value || value === '0') {
    return handleError('EmptySet', value);
  }

  if (value % settings().lowestValue) {
    return handleError('NoteUnavailableException', value);
  }


  return {
    isValid: true,
    message: value
  };
};

const handleError = (error, value) => {
  return Errors(value)[error];
};

const showError = ({ message }) => {
  const red = chalk.red.bold;
  const white = chalk.white.bold;

  log(white(`\n\n⛔️ ${red('An error occurred:')} ${message}\n`));
};

const Errors = (value) => {
  const formattedValue = formatCurrency(value, settings().currency);

  return {
    EmptySet: {
      isValid: false,
      message: 'The withdrawal amount cannot be empty.',
    },

    InvalidArgumentException: {
      isValid: false,
      message: `The withdrawal amount must be positive.`,
    },

    NoteUnavailableException: {
      isValid: false,
      message: `It's not possible to withdraw (${formattedValue}) with the available bills.`,
    },

    NotNumericException: {
      isValid: false,
      message: 'The withdrawal amount must contain only numbers.',
    }
  }
};

exports.showError = showError;
exports.validate = validate;
