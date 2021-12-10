'use strict';

const { sum: usum } = require('./utils.js');

const run = (s) => {
    const input = s;
    console.log(`day10 part 1 => ${part1(input)}`); // 394647
    console.log(`day10 part 2 => ${part2(input)}`); // 2380061249
};

const part1 = (input) => {
    const parsed = input.trim().split('\n').map(line => line.split(''));

    const errors = parsed.reduce((acc, line) => {
        return parseLine(line, acc);
    }, { round: 0, square: 0, curly: 0, ltgt: 0 });

    const sumErrors = (
        (errors.round * 3) +
        (errors.square * 57) +
        (errors.curly * 1197) +
        (errors.ltgt * 25137)
    );
    return sumErrors;
};

const part2 = (input) => {
    const parsed = input.trim().split('\n');

    const errorLines = parsed.map(line => {
        const splitLine = line.split('');
        const errors = parseLine(splitLine, { round: 0, square: 0, curly: 0, ltgt: 0 });
        return [errors, line];
    });

    const correct = errorLines.filter(([errors, _]) => {
        return (sumErrors(errors) === 0);
    });

    const endings = correct.map(entry => {
        const [_, line] = entry;
        const split = line.split('');
        return findEnding(split);
    });

    const scores = endings.map(e => sumEnding(e));
    scores.sort((a, b) => b - a);
    const middleIndex = Math.round(scores.length / 2) - 1;
    const middle = scores[middleIndex];
    return middle;
};

const sumEnding = (ending) => {
    let total = 0;
    ending.forEach(c => {
        if (c === ')') {
            total = total * 5;
            total += 1;
        }
        if (c === ']') {
            total = total * 5;
            total += 2;
        }
        if (c === '}') {
            total = total * 5;
            total += 3;
        }
        if (c === '>') {
            total = total * 5;
            total += 4;
        }
    });
    return total;
};

const findEnding = (chars, acc = [], stack = []) => {
    if (chars.length === 0) return mirror(stack, acc);
    const char = chars.shift();
    if (stack.length === 0) {
        stack.push(char);
        return findEnding(chars, acc, stack);
    } else if (isOpen(char)) {
        stack.push(char);
        return findEnding(chars, acc, stack);
    } else if (isClosed(char)) {
        const prev = stack.pop();
        if (isBalanced(prev, char)) {
            return findEnding(chars, acc, stack);
        } else {
            acc.push(char);
            return findEnding(chars, acc, stack);
        }
    }
};

const mirror = (stack, acc) => {
    if (stack.length === 0) return acc;
    const char = stack.pop();
    if (char === '(') {
        acc.push(')');
    }
    if (char === '[') {
        acc.push(']');
    }
    if (char === '{') {
        acc.push('}');
    }
    if (char === '<') {
        acc.push('>');
    }
    return mirror(stack, acc);
};

const parseLine = (chars, acc, stack = []) => {
    if (chars.length === 0) return acc;
    const char = chars.shift();
    if (stack.length === 0) {
        stack.push(char);
        return parseLine(chars, acc, stack);
    } else if (isOpen(char)) {
        stack.push(char);
        return parseLine(chars, acc, stack);
    } else if (isClosed(char)) {
        const prev = stack.pop();
        if (isBalanced(prev, char)) {
            return parseLine(chars, acc, stack);
        } else {
            const newAcc = updateAcc(acc, char);
            return parseLine(chars, newAcc, stack);
        }
    }
};

const updateAcc = (acc, char) => {
    if (char === ')') {
        acc.round += 1;
    }
    if (char === ']') {
        acc.square += 1;
    }
    if (char === '}') {
        acc.curly += 1;
    }
    if (char === '>') {
        acc.ltgt += 1;
    }
    return acc;
};

const sumErrors = (obj) => {
    return obj.round + obj.square + obj.curly + obj.ltgt;
};

const isOpen = (char) => {
    return (char === '(' || char === '{' || char === '[' || char === '<');
};

const isClosed = (char) => {
    return (char === ')' || char === '}' || char === ']' || char === '>');
};

const isBalanced = (char1, char2) => {
    return (
        (char1 === '(' && char2 === ')') ||
        (char1 === '[' && char2 === ']') ||
        (char1 === '{' && char2 === '}') ||
        (char1 === '<' && char2 === '>')
    );
};

module.exports = {
    run,
    part1,
    part2
};
