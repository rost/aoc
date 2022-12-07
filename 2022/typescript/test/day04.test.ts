import day04 from "@/day04.ts";
const { part1, part2 } = day04;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test("Day04 part1", () => {
    assertEquals(part1(testInput), 2);
});

Deno.test("Day04 part2", () => {
    assertEquals(part2(testInput), 4);
});
