
import day01 from "@/day01.ts";
import day02 from "@/day02.ts";

const input = (day: string): Promise<string> => Deno.readTextFile(`./../input/input${day}.txt`);

day01.run(await input("01"));
day02.run(await input("02"));
