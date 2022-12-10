
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 10, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 10, part 2:');
    if (res2.crtPrinter && res2.crt) res2.crtPrinter(res2.crt);
}

const debug = false;
const clog = (...args: unknown[]) => { if (debug) console.log(...args); };

type State = {
    cycle: number;
    register: number;
    signalStrengths: number[];
    crt?: string[][];
    crtPrinter?: (crt: Crt) => void;
};

type Instruction = {
    type: 'noop' | 'addx';
    value: number | null;
    start: number;
};

type Crt = string[][];

const signals = [20, 60, 100, 140, 180, 220];

function part1(input: string): number {
    const lines = input.split('\n');
    const instructions = parseInstructions(lines);
    const state: State = {
        cycle: 1,
        register: 1,
        signalStrengths: [],
    };
    const newState = executeInstructions(instructions, state);
    const sum = newState.signalStrengths.reduce((acc, n) => acc + n, 0);
    return sum;
}

function executeInstructions(instructions: Instruction[], state: State, execFun?: (s: State) => void): State {
    const cycles = instructions.reduce((acc, instruction) => {
        if (instruction.type === 'noop') return acc + 1;
        return acc + 2;
    }, 0);

    while (state.cycle <= cycles) {
        clog(`CYCLE ${state.cycle} START`)
        clog('BEFOR state :>> ', state);

        if (execFun) execFun(state);

        if (signals.includes(state.cycle)) {
            const strength = state.cycle * state.register;
            state.signalStrengths.push(strength);
        }

        const inst = instructions.pop();

        if (inst && inst.type === 'noop') {
            clog('NOOP inst', inst);
        } else {
            clog('ADDX inst', inst);
            if (inst && inst.start + 1 === state.cycle) {
                if (inst.value) state.register += inst.value;
            } else if (inst) {
                instructions.push(inst);
            }
        }

        clog('AFTER state :>> ', state);
        clog(`CYCLE ${state.cycle} STOP`)
        state.cycle += 1;
    }

    return state;
}

function parseInstructions(lines: string[]): Instruction[] {
    const instructions: Instruction[] = [];
    let cycle = 1;
    for (const line of lines) {
        if (line === 'noop') {
            instructions.push({ type: 'noop', value: null, start: cycle });
            cycle += 1;
        } else {
            const n = parseInt(line.split(" ")[1]);
            instructions.push({ type: 'addx', value: n, start: cycle });
            cycle += 2;
        }
    }
    return instructions.reverse();
}

function part2(input: string): State {
    const lines = input.split('\n');
    const instructions = parseInstructions(lines);
    const crt = Array.from({ length: 6 }, () => Array.from({ length: 40 }, () => '.'));
    const crtPrinter = (crt: string[][]) => {
        for (const row of crt) {
            console.log(row.join(''));
        }
    };
    const lightPixel = (state: State) => {
        const x = (state.cycle % 40) - 1;
        const y = (state.cycle - (state.cycle % 40)) / 40;
        const sprite = state.register;
        if (state.crt) {
            if (x === sprite - 1 || x === sprite || x === sprite + 1) state.crt[y][x] = '#';
            if (debug && state.crtPrinter) state.crtPrinter(state.crt);
        }
    };
    const state: State = {
        cycle: 1,
        register: 1,
        signalStrengths: [],
        crt: crt,
        crtPrinter: crtPrinter,
    };
    const newState = executeInstructions(instructions, state, lightPixel);
    return newState;
}

export default { run, part1, part2 };
