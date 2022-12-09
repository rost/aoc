
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 05, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 05, part 2:', res2);
}

type Crane = (from: string[], to: string[], num: number) => void;

function part1(input: string): string {
    const crane: Crane = (fromStack, toStack, num) => {
        toStack.push(...fromStack.splice(fromStack.length - num).reverse());
        return
    };
    const result = runCrane(input, crane);
    return result;
}

function part2(input: string): string {
    const crane: Crane = (fromStack, toStack, num) => {
        toStack.push(...fromStack.splice(fromStack.length - num));
        return
    }
    const result = runCrane(input, crane);
    return result;
}

function runCrane(input: string, crane: Crane): string {
    const [crateSection, instructionSection] = input.split('\n\n');
    const crateLines = crateSection.split('\n');
    const instructionLines = instructionSection.split('\n');
    const stacks = parseCrates(crateLines);
    const instructions = parseInstructions(instructionLines);
    const result = executeInstructions(stacks, instructions, crane);
    return result;
}

function parseCrates(crateLinesInput: string[]): Map<number, string[]> {
    const numberLine = crateLinesInput[crateLinesInput.length - 1];
    const crateLines = crateLinesInput.slice(0, crateLinesInput.length - 1).reverse();
    const stackNumbers = numberLine.trim().split("   ").map(Number);
    const stacks = new Map<number, string[]>();
    for (const n of stackNumbers) {
        const pos = numberLine.indexOf(n.toString());
        for (const line of crateLines) {
            const c = line[pos];
            if (c === ' ' || c === '[' || c === ']') {
                continue;
            } else {
                const oldStack = stacks.get(n) ?? [];
                oldStack.push(c)
                stacks.set(n, oldStack);
            }
        }
    }
    return stacks;
}

function parseInstructions(instructionLines: string[]): number[][] {
    const instructions = instructionLines.map(line => {
        line = line.replace("move ", "");
        line = line.replace("from ", "");
        line = line.replace("to ", "");
        const [num, from, to] = line.split(" ");
        return [Number(num), Number(from), Number(to)];
    });
    return instructions;
}

function executeInstructions(stacks: Map<number, string[]>, instructions: number[][], crane: Crane): string {
    for (const [num, from, to] of instructions) {
        const fromStack = stacks.get(from) ?? [];
        const toStack = stacks.get(to) ?? [];
        crane(fromStack, toStack, num);
    }
    const result = Array.from(stacks.values()).map(stack => stack[stack.length - 1]).join("");
    return result;
}

export default { run, part1, part2 };
