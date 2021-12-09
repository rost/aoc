'use strict';

const { sum: usum } = require('./utils.js');

const run = (s) => {
    const input = s.trim().split('\n').map(line => line.split('').map(c => Number(c)));
    console.log(`day09 part 1 => ${part1(input)}`); // 631
    console.log(`day09 part 2 => ${part2(input)}`); // 821560
};

/**
 * example part1([ 2199943210 3987894921 9856789892 8767896789 9899965678 ])
 * //=> 15
 */
const part1 = (grid) => {

    const map = buildMap(grid);

    const lowPoints = findLowPoints(map, grid);
    const numbers = lowPoints.map(entry => entry[1] + 1);
    const result = usum(numbers);
    return result;
};

const buildMap = (grid) => {
    const w = grid[0].length;
    const h = grid.length;

    let map = new Map();

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const k = [i, j].toString();
            map.set(k, grid[i][j]);
        }
    }

    return map;
};

const findLowPoints = (map, grid) => {
    const compare = (grid, coord) => {
        const [x, y] = toCoord(coord[0]);
        const current = coord[1];
        let k;
        let above = map.get(toKey([x - 1, y]));
        above = (above === undefined) ? Number.MAX_VALUE : above;
        let right = map.get(toKey([x, y + 1]));
        right = (right === undefined) ? Number.MAX_VALUE : right;
        let below = map.get(toKey([x + 1, y]));
        below = (below === undefined) ? Number.MAX_VALUE : below;
        let left = map.get(toKey([x, y - 1]));
        left = (left === undefined) ? Number.MAX_VALUE : left;
        const surroundings = [above, right, below, left];
        const f = surroundings.filter(n => n <= current);
        return (f.length === 0);
    };

    const lowPoints = Array.from(map).filter(xy => compare(grid, xy));
    return lowPoints;
};

/**
 * example part2([ 2199943210 3987894921 9856789892 8767896789 9899965678 ])
 * //=> 15
 */
const part2 = (grid) => {
    const map = buildMap(grid);
    const lowPoints = findLowPoints(map, grid);

    const basins = lowPoints.map(p => findBasin(map, [p[0]]));
    const basinSizes = basins.map(b => b.length);
    const sortedSums = basinSizes.sort((a, b) => b - a);
    const three = sortedSums.slice(0, 3);

    const product = three.reduce((acc, n) => acc * n);

    return product;
};

const findBasin = (map, queue, visited = [], acc = []) => {
    if (queue.length === 0) return acc;
    const coord = queue.shift();
    if (!visited.includes(coord)) visited.push(coord);
    const neighbours = findNeighbours(coord, map);
    neighbours.forEach(n => {
        if (!queue.includes(n) && !visited.includes(n)) queue.push(n);
        if (!acc.includes(n)) acc.push(n);
    });
    return findBasin(map, queue, visited, acc);
};

const findNeighbours = (coord, map) => {
    const [x, y] = toCoord(coord);

    const neighbours = [];

    const aboveKey = toKey([x - 1, y]);
    let above = map.get(aboveKey);
    if (above !== undefined && above !== 9) neighbours.push(aboveKey);

    const rightKey = toKey([x, y + 1]);
    let right = map.get(rightKey);
    if (right !== undefined && right !== 9) neighbours.push(rightKey);

    const belowKey = toKey([x + 1, y]);
    let below = map.get(belowKey);
    if (below !== undefined && below !== 9) neighbours.push(belowKey);

    const leftKey = toKey([x, y - 1]);
    let left = map.get(leftKey);
    if (left !== undefined && left !== 9) neighbours.push(leftKey);

    return neighbours;
};

const toCoord = (key) => {
    const [x, y] = key.split(',').map(n => Number(n));
    return [x, y];
};

const toKey = (coord) => {
    const key = coord.toString();
    return key;
};

module.exports = {
    run,
    part1,
    part2
};
