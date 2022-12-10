import day07 from "@/day07.ts";
const { part1, part2 } = day07;

import { assertEquals } from "std/testing/asserts.ts";

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// Deno.test("Day07 part1", () => {
//     assertEquals(part1(testInput), 95437);
// });

// Deno.test("Day07 part2", () => {
//     assertEquals(part2(testInput), 4);
// });
