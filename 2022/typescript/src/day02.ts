function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 02, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 02, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n');
    const rounds = lines.map((line) => line.split(' '));
    const scores = rounds.map((round) => score(round));
    const sumB = scores.reduce((acc, score) => acc + score[1], 0);
    return sumB;
}

function score(round: string[]): number[] {
    const [a, b] = round;
    const aScore = charToNumber(a);
    const bScore = charToNumber(b);

    let res: number[] = [];
    if (aScore - bScore === 0) res = [aScore + 3, bScore + 3];

    // if (aScore === 1 && bScore === 2) res = [aScore, bScore + 6]; // -1
    // if (aScore === 1 && bScore === 3) res = [aScore + 6, bScore]; // -2
    // if (aScore === 2 && bScore === 3) res = [aScore, bScore + 6]; // -1
    // if (aScore === 2 && bScore === 1) res = [aScore + 6, bScore]; // 1
    // if (aScore === 3 && bScore === 1) res = [aScore, bScore + 6]; // 2
    // if (aScore === 3 && bScore === 2) res = [aScore + 6, bScore]; // 1

    const diff = aScore - bScore;
    if (diff === -2 || diff === 1) res = [aScore + 6, bScore];
    if (diff === -1 || diff === 2) res = [aScore, bScore + 6];

    return res;
}

function charToNumber(char: string): number {
    if (char === 'A' || char === 'X') return 1;
    if (char === 'B' || char === 'Y') return 2;
    if (char === 'C' || char === 'Z') return 3;
    return 0;
}

function part2(input: string): number {
    const lines = input.split('\n');
    const rounds = lines.map((line) => line.split(' '));
    const newRounds = rounds.map((round) => strategy_guide(round));
    const scores = newRounds.map((round) => score(round));
    const sumB = scores.reduce((acc, score) => acc + score[1], 0);
    return sumB;
}

function strategy_guide(round: string[]): string[] {
    const [a, b] = round;
    const strategyB = strategyToChar(a, b);
    return [a, strategyB];
}

function strategyToChar(a: string, b: string): string {
    if (b === 'X') return shiftChar(a, - 1);
    if (b === 'Y') return a;
    if (b === 'Z') return shiftChar(a, + 1);
    return '';
}

function shiftChar(char: string, shift: number): string {
    const num = charToNumber(char);
    if (num === 2) return numberToChar(num + shift);
    if (num === 1 && shift === -1) return numberToChar(3);
    if (num === 3 && shift === +1) return numberToChar(1);
    return numberToChar(num + shift);
}

function numberToChar(num: number): string {
    if (num === 1) return 'A';
    if (num === 2) return 'B';
    if (num === 3) return 'C';
    return '';
}
export default { run, part1, part2 };
