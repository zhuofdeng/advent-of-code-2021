// Advent of Code - Day 4 - Part One

import { Bingo } from "./bingoGame";

export function part1(input: string): number {
  const bingo = new Bingo(input);
  bingo.play();
  return bingo.score;
}
