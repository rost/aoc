
import day01 from "@/day01.ts";

const input = (day: string): Promise<string> => Deno.readTextFile(`./../input/input${day}.txt`);

day01.run(await input("01"));
