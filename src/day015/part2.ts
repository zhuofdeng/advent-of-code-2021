// Advent of Code - Day 15 - Part Two

import { Cave } from "./Cave";

export function part2(input: string): number {
  const cave = new Cave(input, 5);
  return cave.runDijkstra();
}
