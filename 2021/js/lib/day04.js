'use strict';

const run = (s) => {
    const input = s.split('\n');
    console.log(`day04 part 1 => ${part1(input)}`); // 16716
    console.log(`day04 part 2 => ${part2(input)}`); // 4880
};

/**
 * @example part1([ 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
 * 
 * 22 13 17 11  0
 *  8  2 23  4 24
 * 21  9 14 16  7
 *  6 10  3 18  5
 *  1 12 20 15 19
 * 
 *  3 15  0  2 22
 *  9 18 13 17  5
 * 19  8  7 25 23
 * 20 11 10 24  4
 * 14 21 16 12  6
 * 
 * 14 21 17 24  4
 * 10 16 15  9 19
 * 18  8 23 26 20
 * 22 11 13  6  5
 *  2  0 12  3  7
 * ])
 * //=> 4512
 */
const part1 = (input) => {
    let parts = input.map(line => line.split('\n'));
    const numbers = parts.shift().map(line => line.split(','))[0];
    const boardLines = parts.filter(line => line[0].length !== 0);

    // side effecty, splice mutates the boardLines ref
    const parseBoards = (boardLines, acc) => {
        if (boardLines.length === 0) return acc;
        let board = boardLines.splice(0, 5);
        board = board.map(b => {
            const s = b[0];
            return s.split(' ').filter(c => c !== '');
        });
        if (acc.length === 0) {
            acc[0] = board;
        } else {
            acc.push(board);
        }
        return parseBoards(boardLines, acc);
    };

    const boards = parseBoards(boardLines, []);

    const matchRow = (numbers, row) => {
        let diff = new Set(row);
        const numSet = new Set(numbers);
        for (let n of numSet) {
            diff.delete(n);
        }
        return Array.from(diff);
    };

    const matchCol = (numbers, col) => {
        let diff = new Set(col);
        const numSet = new Set(numbers);
        for (let n of numSet) {
            diff.delete(n);
        }
        return Array.from(diff);
    };

    const buildCols = (rows) => {
        const cols = [];
        const len = rows.length - 1;
        for (let i = 0; i <= len; i++) {
            const col = buildCol(rows, i);
            cols.push(col);
        }
        return cols;
    };

    const buildCol = (rows, index) => {
        const col = [];
        rows.forEach(row => {
            const c = row[index];
            col.push(c);
        });
        return col;
    };

    const match = (input, board) => {
        const rows = board;
        const cols = buildCols(rows);

        const rowResult = rows.map(r => matchRow(input, r));
        const colResult = cols.map(c => matchCol(input, c));

        const rowHit = rowResult.filter(a => a.length === 0);
        if (rowHit.length > 0 && rowHit[0].length === 0) {
            return [true, rowResult];
        }

        const colHit = colResult.filter(a => a.length === 0);
        if (colHit.length > 0 && colHit[0].length === 0) {
            return [true, colResult];
        }
        return [false, []];
    };

    const sumResult = (stuff) => {
        let count = 0;
        stuff.forEach(line => {
            if (line.length > 0) {
                line.forEach(s => {
                    const n = parseInt(s);
                    count = count + n;
                });
            }
        });
        return count;
    };

    const run = (numbers, index = 5) => {
        if (index >= numbers.length) return;
        const inputLen = index;
        const input = numbers.slice(0, inputLen);

        const matches = boards.map(b => {
            return match(input, b);
        });

        let STOP = false;
        let result = undefined;
        matches.forEach(m => {
            let [maybe, res] = m;
            if (maybe) {
                STOP = true;
                result = res;
            }
        });

        if (STOP) {
            const sum = sumResult(result);
            const theOtherVal = parseInt(input[index - 1]);
            const product = sum * theOtherVal;
            return product;
        }

        return run(numbers, index + 1);
    };

    const res = run(numbers);
    return res;
};

/**
 * @example part2([ 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
 * 
 * 22 13 17 11  0
 *  8  2 23  4 24
 * 21  9 14 16  7
 *  6 10  3 18  5
 *  1 12 20 15 19
 * 
 *  3 15  0  2 22
 *  9 18 13 17  5
 * 19  8  7 25 23
 * 20 11 10 24  4
 * 14 21 16 12  6
 * 
 * 14 21 17 24  4
 * 10 16 15  9 19
 * 18  8 23 26 20
 * 22 11 13  6  5
 *  2  0 12  3  7
 * ])
 * //=> 1924
 */
const part2 = (input) => {
    let parts = input.map(line => line.split('\n'));
    const numbers = parts.shift().map(line => line.split(','))[0];
    const boardLines = parts.filter(line => line[0].length !== 0);

    // side effecty, splice mutates the boardLines ref
    const parseBoards = (boardLines, acc) => {
        if (boardLines.length === 0) return acc;
        let board = boardLines.splice(0, 5);
        board = board.map(b => {
            const s = b[0];
            return s.split(' ').filter(c => c !== '');
        });
        if (acc.length === 0) {
            acc[0] = board;
        } else {
            acc.push(board);
        }
        return parseBoards(boardLines, acc);
    };

    const boards = parseBoards(boardLines, []);

    const matchRow = (numbers, row) => {
        let diff = new Set(row);
        const numSet = new Set(numbers);
        for (let n of numSet) {
            diff.delete(n);
        }
        return Array.from(diff);
    };

    const matchCol = (numbers, col) => {
        let diff = new Set(col);
        const numSet = new Set(numbers);
        for (let n of numSet) {
            diff.delete(n);
        }
        return Array.from(diff);
    };

    const buildCols = (rows) => {
        const cols = [];
        const len = rows.length - 1;
        for (let i = 0; i <= len; i++) {
            const col = buildCol(rows, i);
            cols.push(col);
        }
        return cols;
    };

    const buildCol = (rows, index) => {
        const col = [];
        rows.forEach(row => {
            const c = row[index];
            col.push(c);
        });
        return col;
    };

    const match = (input, board) => {
        const rows = board;
        const cols = buildCols(rows);

        const rowResult = rows.map(r => matchRow(input, r));
        const colResult = cols.map(c => matchCol(input, c));

        const rowHit = rowResult.filter(a => a.length === 0);
        if (rowHit.length > 0 && rowHit[0].length === 0) {
            return [true, rowResult];
        }

        const colHit = colResult.filter(a => a.length === 0);
        if (colHit.length > 0 && colHit[0].length === 0) {
            return [true, colResult];
        }
        return [false, []];
    };

    const sumResult = (stuff) => {
        let count = 0;
        stuff.forEach(line => {
            if (line.length > 0) {
                line.forEach(s => {
                    const n = parseInt(s);
                    count = count + n;
                });
            }
        });
        return count;
    };

    const runBoard = (board, numbers, index = 5) => {
        if (index >= numbers.length) return;
        const inputLen = index;
        const input = numbers.slice(0, inputLen);

        const matches = match(input, board);

        let STOP = false;
        let result = undefined;

        let [maybe, res] = matches;
        if (maybe) {
            STOP = true;
            result = res;
        }

        if (STOP) {
            return [index, result];
        }

        return runBoard(board, numbers, index + 1);
    };

    const findLastMatch = (matches) => {
        let hit = 0;
        let cand = [];
        matches.forEach(m => {
            const n = m[0];
            if (n > hit) {
                hit = n;
            }
        });
        matches.forEach(m => {
            if (m[0] === hit) {
                cand = m;
            }
        });
        return cand;
    };

    const run = (numbers) => {
        const res = boards.map(b => runBoard(b, numbers));
        const lastMatch = findLastMatch(res);
        const sum = sumResult(lastMatch[1]);
        const theOtherVal = numbers[lastMatch[0] - 1];
        const product = sum * theOtherVal;
        return product;
    };

    const res = run(numbers);
    return res;
};

module.exports = {
    run,
    part1,
    part2
};
