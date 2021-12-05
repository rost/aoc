'use strict';

const run = (s) => {
    const input = s.split('\n');
    console.log(`day05 part 1 => ${part1(input)}`); // 5373
    console.log(`day05 part 2 => ${part2(input)}`); // 21514
};

/**
 * @example part1([ 0,9 -> 5,9 8,0 -> 0,8 9,4 -> 3,4 2,2 -> 2,1 7,0 -> 7,4 6,4 -> 2,0 0,9 -> 2,9 3,4 -> 1,4 0,0 -> 8,8 5,5 -> 8,2 ])
 * //=> 5
 */
const part1 = (input) => {
    const parsed = input.map(line => parse(line)).filter(p => p !== undefined);
    const [x, y] = maxes(parsed);
    const grid = multiArray(x, y);

    const lines = parsed.map(pair => calculateLines(pair));

    const populated = populate(lines, grid);
    const count = countOverlaps(populated);

    return count;
};

/**
 * @example part2([ 0,9 -> 5,9 8,0 -> 0,8 9,4 -> 3,4 2,2 -> 2,1 7,0 -> 7,4 6,4 -> 2,0 0,9 -> 2,9 3,4 -> 1,4 0,0 -> 8,8 5,5 -> 8,2 ])
 * //=> 5
 */
const part2 = (input) => {
    const parsed = input.map(line => parse(line)).filter(p => p !== undefined);
    const [x, y] = maxes(parsed);
    const grid = multiArray(x, y);

    const lines = parsed.map(pair => calculateLines(pair));
    const diagonalLines = parsed.map(pair => calculateDiagonalLines(pair));

    let populated = populate(lines, grid);
    populated = populate(diagonalLines, populated);
    const count = countOverlaps(populated);

    return count;
};

const parse = (line) => {
    const pairs = line.split(' -> ').filter(p => p.length !== 0);
    if (pairs.length > 0) {
        let pair1 = pairs[0].split(',');
        pair1 = [parseInt(pair1[0]), parseInt(pair1[1])];
        let pair2 = pairs[1].split(',');
        pair2 = [parseInt(pair2[0]), parseInt(pair2[1])];
        return [pair1, pair2];
    } else {
        return;
    }
};

const maxes = (parsed) => {
    let x = 0;
    let y = 0;
    parsed.forEach(ps => {
        let x1 = ps[0][0];
        let y1 = ps[0][1];
        let x2 = ps[1][0];
        let y2 = ps[1][1];
        x = x1 > x ? x1 : x;
        y = y1 > x ? y1 : y;
        x = x2 > x ? x2 : x;
        y = y2 > x ? y2 : y;
    });
    return [x, y];
};

const multiArray = (x, y) => {
    let arr = [];
    for (let i = 0; i <= x; i++) {
        let yArr = Array(y + 1).fill(0);
        arr.push(yArr);
    }
    return arr;
};

const calculateLines = (pair) => {
    let [p0, p1] = pair;
    let line = [];
    let x1 = p0[0];
    let y1 = p0[1];
    let x2 = p1[0];
    let y2 = p1[1];
    if (x1 === x2) {
        if (y1 < y2) {
            for (let i = y1; i <= y2; i++) {
                line.push([x1, i]);
            }
        } else if (y1 > y2) {
            for (let i = y2; i <= y1; i++) {
                line.push([x1, i]);
            }
        }
        else {
            line.push(p0);
            line.push(p1);
        }
    } else if (y1 === y2) {
        if (x1 < x2) {
            for (let i = x1; i <= x2; i++) {
                line.push([i, y1]);
            }
        } else if (x1 > x2) {
            for (let i = x2; i <= x1; i++) {
                line.push([i, y1]);
            }
        }
        else {
            line.push(p0);
            line.push(p1);
        }
    }
    return line;
};

const calculateDiagonalLines = (pair) => {
    let [p0, p1] = pair;
    let line = [];
    let x1 = p0[0];
    let y1 = p0[1];
    let x2 = p1[0];
    let y2 = p1[1];
    if (x1 < x2 && y1 < y2) {
        let y = y1;
        for (let x = x1; x <= x2; x++) {
            line.push([x, y]);
            y++;
        }
    }
    if (x1 > x2 && y1 > y2) {
        let y = y1;
        for (let x = x1; x >= x2; x--) {
            line.push([x, y]);
            y--;
        }
    }
    if (x1 < x2 && y1 > y2) {
        let y = y1;
        for (let x = x1; x <= x2; x++) {
            line.push([x, y]);
            y--;
        }
    }
    if (x1 > x2 && y1 < y2) {
        let y = y1;
        for (let x = x1; x >= x2; x--) {
            line.push([x, y]);
            y++;
        }
    }
    return line;
};

const populate = (lines, grid) => {
    const populated = grid;
    lines.forEach(line => {
        line.forEach(pair => {
            let x = pair[0];
            let y = pair[1];
            let current = grid[x][y];
            grid[x][y] = current + 1;
        });
    });
    return populated;
};

const countOverlaps = (grid) => {
    let count = 0;
    grid.forEach(line => {
        for (let i = 0; i <= line.length; i++) {
            if (line[i] > 1) {
                count = count + 1;
            }
        }
    });
    return count;
};

module.exports = {
    run,
    part1,
    part2
};
