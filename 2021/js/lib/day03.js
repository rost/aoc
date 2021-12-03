'use strict';

const run = (s) => {
    const input = s.split('\n');
    console.log(`day03 part 1 => ${part1(input)}`); // 841526
    console.log(`day03 part 2 => ${part2(input)}`); // 4790390
};

/**
 * @example part1([ '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010' ])
 * //=> 198
 */
const part1 = (input) => {
    const max = input.length;
    const width = input[0].length;
    const lines = input.map(line => line.split('').map(s => parseInt(s)));

    const frequencies = Array(width).fill(0);
    lines.forEach(line => {
        for (const [index, value] of line.entries()) {
            frequencies[index] = frequencies[index] + value;
        }
    });

    let gamma = Array(width).fill(0);
    for (const [index, n] of frequencies.entries()) {
        (n > (max - n)) ? gamma[index] = '1' : gamma[index] = '0';
    }

    let epsilon = Array(width).fill(0);
    for (const [index, n] of frequencies.entries()) {
        (n > (max - n)) ? epsilon[index] = '0' : epsilon[index] = '1';
    }

    let gammaDec = parseInt(gamma.join(''), 2);
    let epsilonDec = parseInt(epsilon.join(''), 2);

    return gammaDec * epsilonDec;
};

/**
 * @example part2([ '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010' ])
 * //=> 230
 */
const part2 = (input) => {
    const partition = (candidates, index) => {
        const ones = candidates.filter(c => c[index] === '1');
        const zeros = candidates.filter(c => c[index] === '0');
        return [ones, zeros];
    };

    const findMatch = (candidates, selector, index = 0) => {
        if (candidates.length === 1) return candidates;
        const [ones, zeros] = partition(candidates, index);
        const rem = selector(ones, zeros);
        return findMatch(rem, selector, index + 1);
    };

    const selectorOnes = (ones, zeros) => {
        return (ones.length >= zeros.length) ? ones : zeros;
    };

    const selectorZeros = (ones, zeros) => {
        return (ones.length >= zeros.length) ? zeros : ones;
    };

    const oxyMatch = findMatch(input, selectorOnes, 0);
    const coMatch = findMatch(input, selectorZeros, 0);

    let oxyDec = parseInt(oxyMatch, 2);
    let coDec = parseInt(coMatch, 2);

    return oxyDec * coDec;
};

module.exports = {
    run,
    part1,
    part2
};