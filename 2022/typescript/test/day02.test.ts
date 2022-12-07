import day02 from "@/day02.ts";
const { part1, part2 } = day02;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `A Y
B X
C Z`;

Deno.test("Day02 part1", () => {
    assertEquals(part1(testInput), 15);
});

Deno.test("Day02 part2", () => {
    assertEquals(part2(testInput), 12);
});
