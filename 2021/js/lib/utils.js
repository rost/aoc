'use strict';

const range = (first, last) => {
    if (last === undefined) {
        last = first;
        first = 0;
    }
    const r = [];
    for (let i = first; i < last; i++) {
        r.push(i);
    }
    return r;
};

const sum = (arr) => arr.reduce((acc, n) => acc + n, 0);

module.exports = {
    range,
    sum
};