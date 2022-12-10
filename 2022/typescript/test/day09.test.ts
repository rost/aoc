import day09 from "@/day09.ts";
const { part1, part2 } = day09;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

Deno.test("Day09 part1", () => {
    assertEquals(part1(testInput), 13);
});

Deno.test("Day09 part2", () => {
    assertEquals(part2(testInput), 0);
});
