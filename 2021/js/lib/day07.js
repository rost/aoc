'use strict';

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
    const max = input.reduce((acc, n) => n > acc ? n : acc, 0);
    const min = input.reduce((acc, n) => n < acc ? n : acc, 0);

    let sums = [];

    for (let i = min; i < max; i++) {
        let sum = 0;
        input.forEach(n => {
            const dist = Math.abs(i - n);
            sum = sum + dist;
        });
        sums.push(sum);
    }

    const maxSum = sums.reduce((acc, n) => n > acc ? n : acc, 0);
    const minSum = sums.reduce((acc, n) => n < acc ? n : acc, maxSum);

    return minSum;
};

/**
 * @example part2([ 16,1,2,0,4,2,7,1,2,14 ])
 * //=> 168
 */
const part2 = (input) => {
    const max = input.reduce((acc, n) => n > acc ? n : acc, 0);
    const min = input.reduce((acc, n) => n < acc ? n : acc, 0);

    let sums = [];

    for (let i = min; i < max; i++) {
        let innerSums = [];
        let sum = 0;
        input.forEach(n => {
            const dist = Math.abs(i - n);
            // this ooms the machine :D
            // const r = range(0, dist);
            // const innerSum = r.reduce((acc, n) => acc + n, 0);
            const innerSum = (dist * (dist + 1)) / 2;
            innerSums.push(innerSum);
        });
        sum = innerSums.reduce((acc, n) => acc + n, 0);
        sums.push(sum);
    }

    const maxSum = sums.reduce((acc, n) => n > acc ? n : acc, 0);
    const minSum = sums.reduce((acc, n) => n < acc ? n : acc, maxSum);

    return minSum;
};

module.exports = {
    run,
    part1,
    part2
};
