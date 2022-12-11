
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 11, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 11, part 2:', res2);
}

type Monkey = {
    name: string;
    inspections: number;
    items: number[];
    operation: { operator: string, operand: string };
    test: { test: string, true: string, false: string };
}

function part1(input: string): number {
    const rawMonkeys = input.split('\n\n');
    const monkeys = rawMonkeys.map(parseMonkey);
    const rounds = 20;
    const levelDamper = (level: number) => Math.floor(level / 3);
    const res = monkeyBusiness(monkeys, rounds, levelDamper);
    return res;
}

function part2(input: string): number {
    const rawMonkeys = input.split('\n\n');
    const monkeys = rawMonkeys.map(parseMonkey);
    const rounds = 10000;
    const product = monkeys
        .map(m => m.test.test)
        .reduce((acc, t) => acc * Number(t), 1);
    const levelDamper = (level: number) => Math.floor(level % product)
    const res = monkeyBusiness(monkeys, rounds, levelDamper);
    return res;
}

function monkeyBusiness(monkeys: Monkey[], rounds: number, levelDamper: (level: number) => number): number {
    for (let i = 0; i < rounds; i++) {
        for (const monkey of monkeys) {
            for (const level of monkey.items) {
                let inspectLevel = level;
                switch (monkey.operation.operator) {
                    case "+":
                        inspectLevel = level + Number(monkey.operation.operand);
                        break;
                    case "*":
                        inspectLevel = level * (monkey.operation.operand === "old" ? level as number : Number(monkey.operation.operand));
                        break;
                    default:
                        break;
                }
                const dampedLevel = levelDamper(inspectLevel);
                const otherMonkeyName = (dampedLevel % Number(monkey.test.test) === 0) ? monkey.test.true : monkey.test.false;
                const otherMonkey = monkeys.find(m => m.name === otherMonkeyName);
                otherMonkey?.items.push(dampedLevel);
                monkey.inspections += 1;
            }
            monkey.items = [];
        }
    }
    const inspections = monkeys.map(m => m.inspections);
    const sorted = inspections.sort((a, b) => b - a);
    return sorted[0] * sorted[1];
}

function parseMonkey(rawMonkey: string): Monkey {
    const m = {} as Monkey;
    const [nameLine, itemsLine, operationLine, testLine, trueLine, falseLine] = rawMonkey.split("\n");
    m.name = nameLine.split(":")[0].split(" ").pop() as string;
    m.inspections = 0;
    m.items = itemsLine.split(':')[1].split(',').map(i => parseInt(i.trim()));
    const parseOp = (line: string) => {
        const split = line.split(' ');
        const operand = split[split.length - 1];
        const operator = split[split.length - 2];
        return { operator, operand };
    };
    m.operation = parseOp(operationLine);
    const parseTest = (testLine: string, trueLine: string, falseLine: string) => {
        const test = testLine.split(" ").pop() as string;
        const trueDest = trueLine.split(" ").pop() as string;
        const falseDest = falseLine.split(" ").pop() as string;
        return { test, true: trueDest, false: falseDest };
    }
    m.test = parseTest(testLine, trueLine, falseLine);
    return m;
}

export default { run, part1, part2 };
