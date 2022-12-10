
function run(input: string): void {
    const res1 = part1(input);
    console.log('Day 09, part 1:', res1);
    const res2 = part2(input);
    console.log('Day 09, part 2:', res2);
}

function part1(input: string): number {
    const lines = input.split('\n');
    // console.log('lines :>> ', lines);

    const state = {
        h: 5,
        w: 6,
        head: { x: 0, y: 4 },
        tail: { x: 0, y: 4 },
        visits: new Set()
    };

    const instructions = lines.map(parse);

    printState(state);

    for (const instruction of instructions) {
        const { dir, len } = instruction;
        // console.log('instruction :>> ', instruction);
        for (let i = 0; i < len; i++) {
            switch (dir) {
                case 'R':
                    state.head.x += 1;
                    break;
                case 'L':
                    state.head.x -= 1;
                    break;
                case 'U':
                    state.head.y -= 1;
                    break;
                case 'D':
                    state.head.y += 1;
                    break;
            }

            const distance = Math.abs(state.head.x - state.tail.x) + Math.abs(state.head.y - state.tail.y);
            // console.log('distance :>> ', distance);

            if (distance > 1) {
                if (state.head.x - state.tail.x > 1) {
                    state.tail.x += 1;
                    if (state.head.y - state.tail.y > 0) {
                        state.tail.y += 1;
                    } else if (state.head.y - state.tail.y < 0) {
                        state.tail.y -= 1;
                    }
                }

                if (state.head.x - state.tail.x < -1) {
                    state.tail.x -= 1;
                    if (state.head.y - state.tail.y < 0) {
                        state.tail.y -= 1;
                    } else if (state.head.y - state.tail.y > 0) {
                        state.tail.y += 1;
                    }
                }

                if (state.head.y - state.tail.y > 1) {
                    state.tail.y += 1;
                    if (state.head.x - state.tail.x < 0) {
                        state.tail.x -= 1;
                    } else if (state.head.x - state.tail.x > 0) {
                        state.tail.x += 1;
                    }
                }

                if (state.head.y - state.tail.y < -1) {
                    state.tail.y -= 1;
                    if (state.head.x - state.tail.x > 0) {
                        state.tail.x += 1;
                    } else if (state.head.x - state.tail.x < 0) {
                        state.tail.x -= 1;
                    }
                }
            }
            state.visits.add(`[${state.tail.x}, ${state.tail.y}]`);
        }
    }

    // console.log('state.visits :>> ', state.visits);
    // console.log('state.visits.size :>> ', state.visits.size);

    return state.visits.size;
}

function parse(line: string): { dir: string, len: number } {
    const [dir, len] = line.split(' ');
    return { dir, len: parseInt(len) };
}

function printState(state: any): void {
    const mat = new Array(state.h).fill(0).map(() => new Array(state.w).fill('.'));
    mat[4][0] = "s";
    mat[state.tail.y][state.tail.x] = "T";
    mat[state.head.y][state.head.x] = "H";
    for (const line of mat) {
        console.log(line.join(''));
    }
    console.log("\n");
}

function part2(input: string): number {
    const lines = input.split('\n');
    return 0;
}

export default { run, part1, part2 };
