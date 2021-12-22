// Advent of Code - Day 17 - Part Two

import { getValidProbePaths } from "./utils";

export function part2(input: string): number {
  const targetX = input.split(': ')[1].split(', ').map(a=>a.split('=')[1].split('..').map(Number))[0];
  const targetY = input.split(': ')[1].split(', ').map(a=>a.split('=')[1].split('..').map(Number))[1];
  const solutions = getValidProbePaths(targetX, targetY);
  return solutions.length;
}
