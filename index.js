'use strict';

const args = process.argv.slice(2);
const intro = require('./lib/intro');
const setup = require('./lib/setup');
const withdraw = require('./lib/withdraw');

intro();

return args.includes('setup') ? setup() : withdraw();
