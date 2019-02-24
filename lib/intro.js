'use strict';

const intro = () => {
  const chalk = require('chalk');
  const color = chalk.green;
  const log = console.log;

  console.clear();

  log(`
  ${color(' █████╗ ████████╗███╗   ███╗')}
  ${color('██╔══██╗╚══██╔══╝████╗ ████║')}
  ${color('███████║   ██║   ██╔████╔██║')}
  ${color('██╔══██║   ██║   ██║╚██╔╝██║')}
  ${color('██║  ██║   ██║   ██║ ╚═╝ ██║')}
  ${color('╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝')}
  `);
};

module.exports = intro;
