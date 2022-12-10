import day06 from "@/day06.ts";
const { part1, part2 } = day06;

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("Day06 part1", () => {
    assertEquals(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
    assertEquals(part1("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
    assertEquals(part1("nppdvjthqldpwncqszvftbrmjlhg"), 6);
    assertEquals(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
    assertEquals(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
});

Deno.test("Day06 part2", () => {
    assertEquals(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
    assertEquals(part2("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
    assertEquals(part2("nppdvjthqldpwncqszvftbrmjlhg"), 23);
    assertEquals(part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
    assertEquals(part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);
});
