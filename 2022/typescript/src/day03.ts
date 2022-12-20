import { chunk, intersect, sumOf } from "std/collections/mod.ts";

function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 03, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 03, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n');

    const splitLines = lines.map(line => {
        const n = line.length / 2;
        const f = line.slice(0, n);
        const s = line.slice(n);
        return [f, s];
    });

    const overlaps = splitLines.map(([f, s]) => {
        const overlap = intersect(Array.from(f), Array.from(s));
        return overlap;
    });

    const priorities = overlaps.map(overlap => {
        return sumOf(overlap, priority)
    });

    const sum = sumOf(priorities, Number);

    return sum;
}

function priority(char: string): number {
    const code = char.charCodeAt(0);
    return (code >= 97) ? code - 96 : code - 38;
}

function part2(input: string): number {
    const lines = input.split('\n');
    // const groups = elfGroups(lines);
    const groups = chunk(lines, 3);

    const overlaps = groups.map((strings) => {
        const as = strings.map(s => s ? Array.from(s) : []);
        const overlap = intersect(...as);
        return overlap;
    });

    const priorities = overlaps.map(overlap => {
        return sumOf(Array.from(overlap), priority)
    });

    const sum = sumOf(priorities, Number);

    return sum;
}

export default { run, part1, part2 };
