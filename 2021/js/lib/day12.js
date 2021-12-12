'use strict';

const { range: urange, sum: usum } = require('./utils.js');

const run = (s) => {
    const input = s;
    console.log(`day12 part 1 => ${part1(input)}`); // 
    console.log(`day12 part 2 => ${part2(input)}`); // 
};

const part1 = (input) => {
    const nodes = input.trim().split('\n').map(line => parse(line));
    const graph = buildGraph(nodes);
    const pathList = paths(graph, 'start', 'end');
    return pathList.length;
};

const part2 = (input) => {
    const nodes = input.trim().split('\n').map(line => parse(line));
    const graph = buildGraph(nodes);
    const pathList = paths2(graph, 'start', 'end');
    return pathList.length;
};

const parse = (str) => str.split('-');

const buildGraph = (list) => {
    return list.reduce((graph, [n1, n2]) => {
        graph[n1] = (graph[n1] === undefined) ? [n2] : graph[n1].concat(n2);
        graph[n2] = (graph[n2] === undefined) ? [n1] : graph[n2].concat(n1);
        return graph;
    }, {});
};

const paths = (graph, node, stopNode, visited = [], path = []) => {
    if (node === stopNode) return [path.concat(node)];
    const nodes = (graph[node] !== undefined) ? graph[node] : [];
    const visitable = nodes.filter(n => (!visited.includes(n) || n === n.toUpperCase()));
    return visitable.flatMap(vnode => {
        return paths(graph, vnode, stopNode, visited.concat(node), path.concat(node));
    });
};

const paths2 = (graph, node, stopNode, visited = [], path = [], maxDupes = false) => {
    if (node === stopNode) return [path.concat(node)];
    const nodes = (graph[node] !== undefined) ? graph[node] : [];
    let visitable = nodes.filter(n => n !== 'start');
    if (maxDupes) {
        visitable = visitable.filter(n => n === n.toUpperCase() || !visited.includes(n));
        return visitable.flatMap(n => {
            return paths2(graph, n, stopNode, visited.concat(node), path.concat(node), maxDupes);
        });
    } else {
        return visitable.flatMap(n => {
            maxDupes = (n === n.toLowerCase() && visited.includes(n)) ? true : false;
            return paths2(graph, n, stopNode, visited.concat(node), path.concat(node), maxDupes);
        });
    }
};

// // why does this not work? RAGE!
// const paths2 = (graph, node, stopNode, visited = [], path = [], step = 0) => {
//     if (node === stopNode) return [path.concat(node)];
//     const nodes = (graph[node] !== undefined) ? graph[node] : [];
//     const dupes = visited.filter((cand, index) => (cand === cand.toLowerCase() && index !== visited.indexOf(cand)));
//     let visitable = nodes.filter(n => n !== 'start');
//     if (dupes.length > 0) {
//         visitable = visitable.filter(n => n === n.toUpperCase() || !visited.includes(n));
//         return visitable.flatMap(n => {
//             return paths2(graph, n, stopNode, visited.concat(node), path.concat(node), step + 1);
//         });
//     } else {
//         return visitable.flatMap(n => {
//             return paths2(graph, n, stopNode, visited.concat(node), path.concat(node), step + 1);
//         });
//     }
// };

module.exports = {
    run,
    part1,
    part2
};
