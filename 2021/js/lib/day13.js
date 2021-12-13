'use strict';

const { range: urange, sum: usum } = require('./utils.js');

const run = (s) => {
    const input = s;
    console.log(`day13 part 1 => ${part1(input)}`); // 
    console.log(`day13 part 2 => ${part2(input)}`); // 
};

const part1 = (input) => {
    const [coords, folds] = parse(input);

    // console.log('coords :>> ', coords);
    // console.log('folds :>> ', folds);

    const maxX = coords.reduce((acc, [x, _]) => { return x > acc ? x : acc; }, 0);
    const maxY = coords.reduce((acc, [_, y]) => { return y > acc ? y : acc; }, 0);

    // const grid = generateGrid2(maxX, maxY);
    let grid = generate(maxX, maxY);

    // console.log('grid :>> ', grid);

    // grid = coords.reduce((grid, coord) => {
    //     console.log('grid :>> ', grid);
    //     console.log('coord :>> ', coord);
    //     grid[coord] = '#';
    // }, grid);

    // const newGrid = coords.reduce((acc, coord) => {
    //     // console.log('acc :>> ', acc);
    //     // console.log('coord :>> ', coord);
    //     acc[coord] = '#';
    //     return acc;
    // }, grid);

    // console.log('newGrid :>> ', newGrid);

    print(grid);
    // console.log('grid :>> ', grid);
    // const populated = populate(grid, coords);

    // console.log('coords(grid) :>> ', coordinates(grid));

    // const entries = Object.entries(grid);
    // console.log('entries :>> ', entries);

    // printGrid(grid);

    // coords.forEach(([x, y]) => {
    //     console.log('[x,y] :>> ', [x, y]);
    //     grid[y][x] = '#';
    // });

    // const [x0, y0] = coords[0];
    // grid[x0][y0] = '#';

    // const [x1, y1] = coords[1];
    // grid[x1][y1] = '#';

    // const [x2, y2] = coords[2];
    // grid[x2][y2] = '#';


    // console.log('populated :>> ', populated);
    // console.log('grid :>> ', grid);
    // printGrid(grid);

    // console.log('grid :>> ', grid);

    return 'apa';
};

// const coordinates = (object) => Object.keys(object).map(k => fromKey(k));

// const fromKey = (keyStr) => keyStr.split(',').map((n) => Number(n));

// const toKey = (coord) => coord.join('');

const maxes = (grid) => {
    // const coords = coordinates(grid);
    const coords = Array.from(grid.keys());
    // console.log('coords :>> ', coords);
    const maxX = coords.reduce((acc, [x, _]) => { return x > acc ? x : acc; }, 0);
    const maxY = coords.reduce((acc, [_, y]) => { return y > acc ? y : acc; }, 0);
    return [maxX, maxY];
};

const print = async (grid) => {
    // console.log('print grid :>> ', grid);
    const [maxX, maxY] = maxes(grid);

    for (let y = 0; y <= maxY; y++) {
        let row = [];
        for (let x = 0; x <= maxX; x++) {
            const coord = [x, y];
            // console.log('coord :>> ', coord);
            // const val = grid.get(coord);

            // const val = grid.get([x, y]);
            const val = grid.get(coord.toString());

            // const val = grid[coord];
            // console.log('val :>> ', val);
            // const vals = Array.from(grid.entries());
            // const index = vals.indexOf(coord);
            // console.log('index :>> ', index);
            // console.log('vals :>> ', vals);
            // console.log('val :>> ', val);
            row.push(val);
        }
        // console.log('row :>> ', row);
        // console.log('printing row');
        console.log(row.join(''));
    }
};

// const toKey = (coord) => coord.join(',');

// const printGrid = (grid) => {
//     grid.forEach(line => console.log(line.join('')));
//     // console.log('grid[0] :>> ', grid[0]);
//     // console.log('grid[1] :>> ', grid[1]);
// };

const generate = (maxX, maxY) => {
    const map = new Map();
    for (let x = 0; x < maxX + 1; x++) {
        for (let y = 0; y < maxY + 1; y++) {
            map.set([x, y].toString(), '.');
        }
    }
    return map;
};

// const generate = (maxX, maxY) => {
//     const obj = {};
//     for (let x = 0; x < maxX + 1; x++) {
//         for (let y = 0; y < maxY + 1; y++) {
//             const coord = [x, y];
//             obj[coord] = '.';
//         }
//     }
//     return obj;
// };

// const populate = (grid, coords) => {
//     coords.forEach(([x, y]) => {
//         mark(grid, [x, y]);
//     });
// };

// const mark = (grid, [x, y]) => { return grid[x][y] = '#'; };

// const generateGrid = (x, y) => {
//     // return Array(maxY).fill(Array(maxX).fill('.'));
//     let yArr = [];
//     for (let i = 0; i <= y; i++) {
//         let xArr = Array(x + 1).fill('.');
//         yArr.push(xArr);
//     }
//     return yArr;
// };

// const generateGrid2 = (x, y) => {
//     // return Array(maxY).fill(Array(maxX).fill('.'));
//     let arr = [];
//     for (let i = 0; i < y; i++) {
//         let xArr = Array(y - 1).fill('.');
//         arr.push(xArr);
//     }
//     return arr;
// };

const parse = (input) => {
    const [coordStr, foldStr] = input.trim().split('\n\n');

    const coords = coordStr.trim().split('\n').map(s => s.split(',')).map(([x, y]) => [Number(x), Number(y)]);

    // console.log('foldStr :>> ', foldStr);
    const folds = foldStr.trim().split('\n').map(s => s.split('=')).map(([first, n]) => [first.slice(-1), Number(n)]);

    // console.log('coords :>> ', coords);
    // console.log('folds :>> ', folds);
    return [coords, folds];
};

const part2 = (input) => {
    return 'apa';
};

module.exports = {
    run,
    part1,
    part2
};
