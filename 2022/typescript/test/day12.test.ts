import day12 from "@/day12.ts"
const { part1, part2 } = day12;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

Deno.test("Day12 part1", () => {
    assertEquals(part1(testInput), 31);
});

Deno.test("Day12 part2", () => {
    assertEquals(part2(testInput), 0);
});

