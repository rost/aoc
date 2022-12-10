
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
        const char0 = input[i - 3];
        const char1 = input[i - 2];
        const char2 = input[i - 1];
        const char3 = input[i];

        const set = new Set<string>();
        set.add(char0);
        set.add(char1);
        set.add(char2);
        set.add(char3);

        if (set.size === 4) break;
    }
    return i + 1;
}

function part2(input: string): number {
    const len = input.length;

    let i;
    for (i = 13; i < len; i++) {
        const char0 = input[i - 13];
        const char1 = input[i - 12];
        const char2 = input[i - 11];
        const char3 = input[i - 10];
        const char4 = input[i - 9];
        const char5 = input[i - 8];
        const char6 = input[i - 7];
        const char7 = input[i - 6];
        const char8 = input[i - 5];
        const char9 = input[i - 4];
        const char10 = input[i - 3];
        const char11 = input[i - 2];
        const char12 = input[i - 1];
        const char13 = input[i];

        const set = new Set<string>();
        set.add(char0);
        set.add(char1);
        set.add(char2);
        set.add(char3);
        set.add(char4);
        set.add(char5);
        set.add(char6);
        set.add(char7);
        set.add(char8);
        set.add(char9);
        set.add(char10);
        set.add(char11);
        set.add(char12);
        set.add(char13);

        if (set.size === 14) break;
    }
    return i + 1;
}

export default { run, part1, part2 };
