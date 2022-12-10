
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 06, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 06, part 2:', res2);
}

function part1(input: string): number {
    const len = input.length;

    let i;
    for (i = 3; i < len; i++) {
        const set = new Set<string>();

        for (let j = 0; j < 4; j++) {
            const char = input[i - j];
            set.add(char);
        }

        if (set.size === 4) break;
    }
    return i + 1;
}

function part2(input: string): number {
    const len = input.length;

    let i;
    for (i = 13; i < len; i++) {
        const set = new Set<string>();

        for (let j = 0; j < 14; j++) {
            const char = input[i - j];
            set.add(char);
        }

        if (set.size === 14) break;
    }
    return i + 1;
}

export default { run, part1, part2 };
