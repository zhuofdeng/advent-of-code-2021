// Advent of Code - Day 4 - Part Two

import { Bingo } from "./bingoGame";

export function part2(input: string): number {
  const bingo = new Bingo(input);
  const playUntilTheEnd = true;
  bingo.play(playUntilTheEnd);
  return bingo.score;
}
