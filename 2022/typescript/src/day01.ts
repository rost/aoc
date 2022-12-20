import { maxBy, sortBy, sumOf } from "std/collections/mod.ts";

function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 01, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 01, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n\n');
    const groups = lines.map((line) => line.split('\n').map(Number));
    const sums = groups.map((group) => sumOf(group, Number));
    const max = maxBy(sums, Number) ?? 0;
    return max;
}

function part2(input: string): number {
    const lines = input.split('\n\n');
    const groups = lines.map((line) => line.split('\n').map(Number));
    const sums = groups.map((group) => sumOf(group, Number));
    const sorted = sortBy(sums, Number);
    const three = sorted.reverse().slice(0, 3);
    const sum = sumOf(three, Number);
    return sum;
}

export default { run, part1, part2 };
