'use strict';

const { sum: usum, range: urange } = require('./utils.js');

const run = (s) => {
    // const input = s.split(',').map(s => Number(s));
    const input = s;
    console.log(`day08 part 1 => ${part1(input)}`); // 521
    console.log(`day08 part 2 => ${part2(input)}`); // 1016804
};

/**
 * example part1([ acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf ])
 * //=> 26
 */
const part1 = (input) => {
    const split = input.split('\n').map(line => line.split(' | '));
    const vals = split.map((arr) => arr[1]).filter(thing => thing !== undefined);
    // console.log('vals :>> ', vals);
    const moreSplit = vals.map(line => line.split(' '));
    const flat = moreSplit.reduce((acc, line) => {
        return acc.concat(line);
    }, []);

    const count = flat.reduce((acc, code) => {
        if (code.length === 2 || code.length === 3 || code.length === 4 || code.length === 7) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return count;
};

/**
 * example part2([ acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf ])
 * //=> 'apa'
 */
const part2 = (input) => {
    return 'apa';
};

module.exports = {
    run,
    part1,
    part2
};
