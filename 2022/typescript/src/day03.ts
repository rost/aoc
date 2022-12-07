
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

    const freqSets = splitLines.map(([f, s]) => [freqSet(f), freqSet(s)]);

    const overlaps = freqSets.map(([f, s]) => {
        const overlap = new Set<string>();
        for (const char of f) {
            if (s.has(char)) {
                overlap.add(char);
            }
        }
        return overlap;
    });

    const priorities = overlaps.map(overlap => {
        let sum = 0;
        for (const char of overlap) {
            sum += priority(char);
        }
        return sum;
    });

    const sum = priorities.reduce((acc, p) => acc + p, 0);

    return sum;
}

function priority(char: string): number {
    const code = char.charCodeAt(0);
    if (code >= 97) {
        return code - 96;
    } else {
        return code - 38;
    }
}

function freqSet(str: string): Set<string> {
    const set = new Set<string>();
    for (const char of str) {
        set.add(char);
    }
    return set;
}

function part2(input: string): number {
    const lines = input.split('\n');
    const groups = elfGroups(lines);

    const freqSets = groups.map(group => {
        const freqSets = group.map(freqSet);
        return freqSets;
    });

    const overlaps = freqSets.map(([f, s, t]) => {
        const overlap = new Set<string>();
        for (const char of f) {
            if (s.has(char) && t.has(char)) {
                overlap.add(char);
            }
        }
        return overlap;
    });

    const priorities = overlaps.map(overlap => {
        let sum = 0;
        for (const char of overlap) {
            sum += priority(char);
        }
        return sum;
    });

    const sum = priorities.reduce((acc, p) => acc + p, 0);

    return sum;
}

function elfGroups(lines: string[]): string[][] {
    const groups = [];
    const chunkSize = 3;
    for (let i = 0; i < lines.length; i += chunkSize) {
        const chunk = lines.slice(i, i + chunkSize);
        groups.push(chunk);
    }
    return groups;
}
export default { run, part1, part2 };
