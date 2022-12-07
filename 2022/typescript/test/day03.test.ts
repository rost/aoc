import day03 from "@/day03.ts";
const { part1, part2 } = day03;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test("Day03 part1", () => {
    assertEquals(part1(testInput), 157);
});

Deno.test("Day03 part2", () => {
    assertEquals(part2(testInput), 70);
});
