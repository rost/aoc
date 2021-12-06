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
 * @example part2([ 3,4,3,1,2 ])
 * //=> BigInt(26984457539)
 */
const part2 = (input) => {

    let fish = Array(9).fill(0);
    let newFish = Array(9).fill(0);

    input.forEach(n => {
        fish[n] = fish[n] + 1;
    });

    for (let counter = 0; counter <= 254; counter++) {
        newFish = fish.concat(fish.shift());
        if (newFish[8] > 0) {
            newFish[6] = newFish[6] + newFish[8];
        }
        fish = newFish;
    }

    let count = BigInt(0);
    fish.forEach(n => {
        count = count + BigInt(n);
    });

    return count;

};

module.exports = {
    run,
    part1,
    part2
};
