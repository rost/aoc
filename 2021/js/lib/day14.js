'use strict';

const run = (s) => {
    const input = s;
    console.log(`day14 part 1 => ${part1(input)}`); // 2587
    console.log(`day14 part 2 => ${part2(input)}`); // 3318837563123
};

const part1 = (input) => {
    return runPolymerise(input, 10);
};

const part2 = (input) => {
    return runPolymerise(input, 40);
};

const runPolymerise = (input, steps) => {
    const parsed = parse(input);
    const [template, rules] = parsed;
    const startPairs = pairs(template);
    const startChars = chars(template);
    const charMap = updateCharMap(new Map(), startChars);
    const polymer = polymerise(charMap, startPairs, rules, steps);
    const numbers = Array.from(polymer).reduce((acc, p) => {
        const [_, n] = p;
        return acc.concat(n);
    }, []);
    const max = numbers.reduce((m, e) => e > m ? e : m);
    const min = numbers.reduce((m, e) => e < m ? e : m);
    return max - min;
};

const parse = (input) => {
    let [template, rules] = input.split('\n\n');
    const rulesList = rules.trim().split('\n').map((rule) => rule.split(' -> '));
    const rulesMap = new Map(rulesList);
    return [template, rulesMap];
};

const pairs = (template) => {
    const pairs = [];
    for (let i = 0; i < template.length - 1; i++) {
        const pair = template.slice(i, i + 2);
        pairs.push([pair, BigInt(1)]);
    }
    return pairs;
};

const chars = (template) => {
    return template.split('').map((c) => [c, BigInt(1)]);
};

const updateCharMap = (charMap, chars) => {
    return Array.from(chars).reduce((acc, char) => {
        const [key, val] = char;
        return updateCount(key, val, acc);
    }, charMap);
};

const updateCount = (key, count, collection) => {
    const value = (collection.has(key)) ? collection.get(key) + BigInt(count) : BigInt(count);
    collection.set(key, value);
    return collection;
};

const polymerise = (charMap, pairs, rules, maxsteps, step = 0) => {
    if (step + 1 > maxsteps) return charMap;
    const [newPairs, newChars] = Array.from(pairs).reduce(([pairs, chars], [pair, count]) => {
        return newPolymer(pairs, chars, rules, [pair, count]);
    }, [new Map(), new Map()]);
    const newCharMap = updateCharMap(charMap, newChars);
    return polymerise(newCharMap, newPairs, rules, maxsteps, step + 1);
};

const newPolymer = (pairsAccMap, charsAccMap, rules, [pair, count]) => {
    const outChar = rules.get(pair);
    const newPair0 = `${pair[0]}${outChar}`;
    const newPair1 = `${outChar}${pair[1]}`;
    count = (count === 0) ? 1 : count;
    pairsAccMap = updateCount(newPair0, count, pairsAccMap);
    pairsAccMap = updateCount(newPair1, count, pairsAccMap);
    charsAccMap = updateCount(outChar, count, charsAccMap);
    return [pairsAccMap, charsAccMap];
};

module.exports = {
    run,
    part1,
    part2
};
