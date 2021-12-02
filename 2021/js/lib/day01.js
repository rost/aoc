'use strict';

const run = (s) => {
    const input = s.split('\n').map(s => parseInt(s));
    console.log(`day01 part 1 => ${part1(input)}`); // 1374
    console.log(`day01 part 2 => ${part2(input)}`); // 1418
};

/**
 * @example part1([ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ])
 * //=> 7
 */
const part1 = (input) => {
    let count = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i - 1] < input[i]) {
            count = count + 1;
        }
    }
    return count;
};

/**
 * @example part2([ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ])
 * //=> 5
 */
const part2 = (input) => {
    let count = 0;
    for (let i = 2; i < input.length; i++) {
        if ((input[i - 3] + input[i - 2] + input[i - 1]) <
            (input[i - 2] + input[i - 1] + input[i])) {
            count = count + 1;
        }
    }
    return count;
};

module.exports = {
    run,
    part1,
    part2
};
