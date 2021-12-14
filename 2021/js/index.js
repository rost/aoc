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
require('./lib/day06').run(readInput('06'));
require('./lib/day07').run(readInput('07'));
require('./lib/day08').run(readInput('08'));
require('./lib/day09').run(readInput('09'));
require('./lib/day10').run(readInput('10'));
require('./lib/day12').run(readInput('12'));
require('./lib/day13').run(readInput('13'));
require('./lib/day14').run(readInput('14'));
