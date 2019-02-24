'use strict';

const SETTINGS_FILE = '.bills';
const chalk = require('chalk');
const fs = require('fs');
const log = console.log;

const formatCurrency = (value, currency) => Intl
.NumberFormat(void 0, {
  style: 'currency',
  currency }
  )
  .format(value);

const loadSettings = () => {
  try {
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    const bills = data.bills.sort((x, y) => y - x);
    const currency = data.currency;
    const lowestValue = Math.min(...bills);

    return {
      bills,
      currency,
      lowestValue,
    };
  } catch(err) {
    const red = chalk.red.bold;
    const white = chalk.white.bold;
    let message = 'An unknown error occured';

    if (err.code === 'ENOENT') {
      message = `The configuration file (${SETTINGS_FILE}) has not been found`;
    }

    log(`⚠️  ${red(message)}`);
    log(`⚠️  ${red('Run')} ${white('yarn setup')} ${red('to create a new configuration file')}\n`);

    process.exit(1);
  }
};

const writeSettings = (data) => {
  if (data) {
    const json = JSON.stringify(data);

    fs.writeFile(SETTINGS_FILE, json, 'utf8', writeFileCallback);
  }
}

const writeFileCallback = (err) => {
  if (err) {
    throw err;
  }

  log('\n✅ All done! Configuration file has been written!\n');
}

module.exports = {
  formatCurrency,
  loadSettings,
  writeSettings,
};
