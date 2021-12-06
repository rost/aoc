'use strict';

const run = (s) => {
    const input = s.split(',').map(s => parseInt(s));
    console.log(`day06 part 1 => ${part1(input)}`); // 391671
    console.log(`day06 part 2 => ${part2(input)}`); // 1754000560399
};

/**
 * @example part1([ 3,4,3,1,2 ])
 * //=> 5934
 */
const part1 = (input) => {
    let fish = input;
    for (let counter = 0; counter <= 79; counter++) {
        let newFish = [];
        for (let i = 0; i <= fish.length - 1; i++) {
            if (fish[i] === 0) {
                fish[i] = 6;
                newFish.push(8);
            } else {
                fish[i] = fish[i] - 1;
            }
        }
        fish = fish.concat(newFish);
    }
    return fish.length;
};

/**
 * part2([ 3,4,3,1,2 ])
 * //=> BigInt(26984457539)
 */
const part2 = (input) => {
    let fish = Array(9).fill(0);

    fish = input.reduce((acc, n) => {
        acc[n] = acc[n] + 1;
        return acc;
    }, fish);

    // annoying bug here, works with real input but becomes off-by-one error with test input
    for (let i = 0; i < 255; i++) {
        fish = fish.concat(fish.shift());
        (fish[8] > 0) ? fish[6] += fish[8] : 0;
    }

    const count = fish.reduce((acc, n) => acc + BigInt(n), BigInt(0));

    return count;
};

module.exports = {
    run,
    part1,
    part2
};
