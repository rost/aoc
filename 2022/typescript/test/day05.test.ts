import day05 from "@/day05.ts";
const { part1, part2 } = day05;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

Deno.test("Day05 part1", () => {
    assertEquals(part1(testInput), "CMZ");
});

Deno.test("Day05 part2", () => {
    assertEquals(part2(testInput), "MCD");
});
