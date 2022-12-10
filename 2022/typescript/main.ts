
import day01 from "@/day01.ts";
import day02 from "@/day02.ts";
import day03 from "@/day03.ts";
import day04 from "@/day04.ts";
import day05 from "@/day05.ts";
import day06 from "@/day06.ts";

const input = (day: string): Promise<string> => Deno.readTextFile(`./../input/input${day}.txt`);

day01.run(await input("01"));
day02.run(await input("02"));
day03.run(await input("03"));
day04.run(await input("04"));
day05.run(await input("05"));
day06.run(await input("06"));
