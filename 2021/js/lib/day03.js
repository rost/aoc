'use strict';

const run = (s) => {
    const input = s.split('\n');
    console.log(`day03 part 1 => ${part1(input)}`);
    console.log(`day03 part 2 => ${part2(input)}`);
};

/**
 * @example part1([ '00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010' ])
 * //=> 198
 */
const part1 = (input) => {
    const max = input.length;
    const width = input[0].length;

    const parsed = input.map(line => {
        const split = line.split('');
        return split.map(s => parseInt(s));
    });

    const frequencies = Array(width).fill(0);

    parsed.forEach(line => {
        for (const [index, value] of line.entries()) {
            frequencies[index] = frequencies[index] + value;
        }

    });

    let gamma = Array(width).fill(0);
    let epsilon = Array(width).fill(0);

    for (const [index, n] of frequencies.entries()) {
        if (n > (max - n)) {
            gamma[index] = '1';
        } else {
            gamma[index] = '0';
        }
    }

    for (const [index, n] of frequencies.entries()) {
        if (n > (max - n)) {
            epsilon[index] = '0';
        } else {
            epsilon[index] = '1';
        }
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
    const max = input.length;
    const width = input[0].length;


    const select = (candidates, index) => {
        const ones = candidates.filter(c => {
            return c[index] === '1';
        });
        const zeros = candidates.filter(c => {
            return c[index] === '0';
        });

        if (ones.length > zeros.length) {
            return ones;
        } else if (ones.length < zeros.length) {
            return zeros;
        } else if (ones.length === zeros.length) {
            return ones;
        }
    };

    const findMatch = (candidates, index = 0) => {
        if (candidates.length === 1) {
            return candidates;
        }

        const rem = select(candidates, index);

        return findMatch(rem, index + 1);
    };

    const select2 = (candidates, index) => {
        const ones = candidates.filter(c => {
            return c[index] === '1';
        });
        const zeros = candidates.filter(c => {
            return c[index] === '0';
        });

        if (ones.length > zeros.length) {
            return zeros;
        } else if (ones.length < zeros.length) {
            return ones;
        } else if (ones.length === zeros.length) {
            return zeros;
        }
    };

    const findMatch2 = (candidates, index = 0) => {
        if (candidates.length === 1) {
            return candidates;
        }

        const rem = select2(candidates, index);

        return findMatch2(rem, index + 1);
    };

    const oxyMatch = findMatch(input, 0);
    const coMatch = findMatch2(input, 0);

    let oxyDec = parseInt(oxyMatch, 2);
    let coDec = parseInt(coMatch, 2);

    return oxyDec * coDec;
};

module.exports = {
    run,
    part1,
    part2
};