'use strict';

const run = (s) => {
    const input = s.split('\n');
    console.log(`day02 part 1 => ${part1(input)}`); // 1507611
    console.log(`day02 part 2 => ${part2(input)}`); // 1880593125
};

const parseOp = (line) => {
    const [cmd, val] = line.split(' ');
    return [cmd, parseInt(val)];
};

/**
 * @example part1([ 'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2' ])
 * //=> 150
 */
const part1 = (input) => {
    const ops = input.map(line => parseOp(line));
    const { h, d } = ops.reduce((acc, [cmd, val]) => {
        if (cmd === 'forward') return { ...acc, h: acc.h + val };
        if (cmd === 'down') return { ...acc, d: acc.d - val };
        if (cmd === 'up') return { ...acc, d: acc.d + val };
        return acc;
    }, { h: 0, d: 0 });

    return Math.abs(h * d);
};

/**
 * @example part2([ 'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2' ])
 * //=> 900
 */
const part2 = (input) => {
    const ops = input.map(o => parseOp(o));
    const { h, d } = ops.reduce((acc, [cmd, val]) => {
        if (cmd === 'forward') return { ...acc, h: acc.h + val, d: acc.d + (val * acc.a) };
        if (cmd === 'down') return { ...acc, a: acc.a + val };
        if (cmd === 'up') return { ...acc, a: acc.a - val };
        return acc;
    }, { h: 0, d: 0, a: 0 });

    return Math.abs(h * d);
};

module.exports = {
    run,
    part1,
    part2
};
