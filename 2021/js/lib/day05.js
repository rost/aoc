'use strict';

const run = (s) => {
    const input = s.trim().split('\n');
    console.log(`day05 part 1 => ${part1(input)}`); // 5373
    console.log(`day05 part 2 => ${part2(input)}`); // 21514
};

/**
 * @example part1([ 0,9 -> 5,9
 * 8,0 -> 0,8
 * 9,4 -> 3,4
 * 2,2 -> 2,1
 * 7,0 -> 7,4
 * 6,4 -> 2,0
 * 0,9 -> 2,9
 * 3,4 -> 1,4
 * 0,0 -> 8,8
 * 5,5 -> 8,2
 * ])
 * //=> 5
 */
const part1 = (input) => {
    const pairs = input.map(line => parsePairs(line));
    const [x, y] = maxes(pairs);
    const grid = matrix(x, y);

    const lines = pairs.map(pair => calculateLines(pair));

    const populated = populate(lines, grid);
    const count = countOverlaps(populated);

    return count;
};

/**
 * @example part2([ 0,9 -> 5,9
 * 8,0 -> 0,8
 * 9,4 -> 3,4
 * 2,2 -> 2,1
 * 7,0 -> 7,4
 * 6,4 -> 2,0
 * 0,9 -> 2,9
 * 3,4 -> 1,4
 * 0,0 -> 8,8
 * 5,5 -> 8,2
 * ])
 * //=> 12
 */
const part2 = (input) => {
    const pairs = input.map(line => parsePairs(line));
    // .filter(p => p !== undefined);
    const [x, y] = maxes(pairs);
    const grid = matrix(x, y);

    const lines = pairs.map(pair => calculateLines(pair));
    const diagonalLines = pairs.map(pair => calculateDiagonalLines(pair));

    let populated = populate(lines, grid);
    populated = populate(diagonalLines, populated);
    const count = countOverlaps(populated);

    return count;
};

const parsePairs = (line) => {
    const [pair0, pair1] = line.split(' -> ');
    let [x1, y1] = pair0.split(',');
    let [x2, y2] = pair1.split(',');
    return [
        [parseInt(x1), parseInt(y1)],
        [parseInt(x2), parseInt(y2)]
    ];
};

const maxes = (pairs) => {
    let [x, y] = pairs.reduce(([x, y], pair) => {
        let [[x1, y1], [x2, y2]] = pair;
        x = x1 > x ? x1 : x;
        y = y1 > y ? y1 : y;
        x = x2 > x ? x2 : x;
        y = y2 > y ? y2 : y;
        return [x, y];
    }, [0, 0]);
    return [x, y];
};

const matrix = (x, y) => {
    let arr = [];
    for (let i = 0; i <= x; i++) {
        let yArr = Array(y + 1).fill(0);
        arr.push(yArr);
    }
    return arr;
};

const calculateLines = (pair) => {
    let line = [];
    let [[x1, y1], [x2, y2]] = pair;
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
    }
    return line;
};

const calculateDiagonalLines = (pair) => {
    let line = [];
    let [[x1, y1], [x2, y2]] = pair;
    if ((x1 < x2 && y1 < y2) || (x1 > x2 && y1 > y2)) {
        let xmax = (x1 < x2) ? x2 : x1;
        let x = (x1 < x2) ? x1 : x2;
        let y = (y1 < y2) ? y1 : y2;
        for (x; x <= xmax; x++) {
            line.push([x, y]);
            y++;
        }
    }
    if (x1 < x2 && y1 > y2) {
        let y = y1;
        let x = x1;
        for (x; x <= x2; x++) {
            line.push([x, y]);
            y--;
        }
    }
    if (x1 > x2 && y1 < y2) {
        let y = y1;
        let x = x1;
        for (x; x >= x2; x--) {
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
            let [x, y] = pair;
            grid[x][y] = grid[x][y] + 1;
        });
    });
    return populated;
};

const countOverlaps = (grid) => {
    const count = grid.reduce((count, line) => {
        return count + line.reduce((count, n) => {
            return n > 1 ? count + 1 : count;
        }, 0);
    }, 0);
    return count;
};

module.exports = {
    run,
    part1,
    part2
};
