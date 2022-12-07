
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 04, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 04, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n');
    const pairs = lines.map(lineToPair);
    const containedPairs = pairs.filter(([f, s]) => contains(f, s));
    return containedPairs.length;
}

function lineToPair(line: string): [[number, number], [number, number]] {
    const [f, s] = line.split(',');
    const [fa, fb] = f.split('-');
    const [sa, sb] = s.split('-');
    return [[Number(fa), Number(fb)], [Number(sa), Number(sb)]];
}

function contains(f: number[], s: number[]): boolean {
    const [fa, fb] = f;
    const [sa, sb] = s;
    if (fa <= sa && fb >= sb) return true;
    if (sa <= fa && sb >= fb) return true;
    return false;
}

function part2(input: string): number {
    const lines = input.split('\n');
    const pairs = lines.map(lineToPair);
    const overlappedPairs = pairs.filter(([f, s]) => overlap(f, s));
    return overlappedPairs.length;
}

function overlap(f: number[], s: number[]): boolean {
    const [fa, fb] = f;
    const [sa, sb] = s;
    // seems odd with three checks, but it works for both the test and real input
    if (fa >= sa && fa <= sb) return true;
    if (fb >= sa && fb <= sb) return true;
    if (sa >= fa && sb <= fb) return true;
    return false;
}

export default { run, part1, part2 };
