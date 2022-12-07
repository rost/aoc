import day01 from "@/day01.ts"
const { part1, part2 } = day01;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

Deno.test("Day01 part1", () => {
    assertEquals(part1(testInput), 24_000);
});

Deno.test("Day01 part2", () => {
    assertEquals(part2(testInput), 45_000);
});
