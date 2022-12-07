
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 01, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 01, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n\n');
    const groups = lines.map((line) => line.split('\n').map(Number));
    const sums = groups.map((group) => group.reduce((acc, b) => acc + b, 0));
    const max = sums.reduce((acc, b) => Math.max(acc, b), 0);
    return max;
}

function part2(input: string): number {
    const lines = input.split('\n\n');
    const groups = lines.map((line) => line.split('\n').map(Number));
    const sums = groups.map((group) => group.reduce((acc, b) => acc + b, 0));
    const sorted = sums.sort((a, b) => a - b);
    const three = sorted.reverse().slice(0, 3);
    const sum = three.reduce((acc, b) => acc + b, 0);
    return sum;
}

export default { run, part1, part2 };
