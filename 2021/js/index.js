'use strict';

const fs = require('fs');

const readInput = (day) => {
    return fs.readFileSync(`../input/input${day}.txt`, 'utf8');
};

require('./lib/day01').run(readInput('01'));
require('./lib/day02').run(readInput('02'));
require('./lib/day03').run(readInput('03'));
require('./lib/day04').run(readInput('04'));
require('./lib/day05').run(readInput('05'));
