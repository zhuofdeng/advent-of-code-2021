// Advent of Code - Day 15 - Part One

import { Cave } from "./Cave";

export function part1(input: string): number {
  const cave = new Cave(input);
  return cave.runDijkstra();
}
