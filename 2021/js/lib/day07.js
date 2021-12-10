'use strict';

const { sum: usum, range: urange } = require('./utils.js');

const run = (s) => {
    const input = s.split(',').map(s => Number(s));
    console.log(`day07 part 1 => ${part1(input)}`); // 352331
    console.log(`day07 part 2 => ${part2(input)}`); // 99266250
};

/**
 * @example part1([ 16,1,2,0,4,2,7,1,2,14 ])
 * //=> 37
 */
const part1 = (input) => {
    const max = Math.max(...input);
    const min = Math.min(...input);

    let sums = [];

    for (let i = min; i < max; i++) {
        let sum = 0;
        input.forEach(n => {
            const dist = Math.abs(i - n);
            sum = sum + dist;
        });
        sums.push(sum);
    }

    const minSum = Math.min(...sums);

    return minSum;
};

/**
 * @example part2([ 16,1,2,0,4,2,7,1,2,14 ])
 * //=> 168
 */
const part2 = (input) => {
    const max = Math.max(...input);
    const min = Math.min(...input);

    const sums = urange(min, max).reduce((acc, i) => {
        const innerSums = input.reduce((acc, n) => {
            const dist = Math.abs(i - n);
            const innerSum = (dist * (dist + 1)) / 2;
            if (typeof (acc) === 'object') acc.push(innerSum);
            return acc;
        }, []);

        const sum = usum(innerSums);

        return [...acc, sum];
    }, []);

    const minSum = Math.min(...sums);

    return minSum;
};

module.exports = {
    run,
    part1,
    part2
};
