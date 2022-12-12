
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 12, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 12, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n').map(line => line.split(""));
    console.log('lines :>> ', lines);
    // const graph = buildGraph(lines);

    const [start, dest] = points(lines);

    console.log('start :>> ', start);
    console.log('dest :>> ', dest);



    return 0;
}

function points(lines: string[][]): [[number, number], [number, number]] {
    let start: [number, number] = [0, 0];
    let dest: [number, number] = [0, 0];
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === 'S') {
                start = [i, j];
            }
            if (lines[i][j] === 'E') {
                dest = [i, j];
            }
        }
    }
    return [start, dest];
}

// function buildGraph(lines: string[][]): Map<string, string[]> {
// }

function part2(input: string): number {
    const lines = input.split('\n\n');
    return 0;
}

export default { run, part1, part2 };
