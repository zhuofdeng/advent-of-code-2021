// Advent of Code - Day 17 - Part One

import { getValidProbePaths, Probe } from "./utils";

export function part1(input: string): number {
  const targetX = input.split(': ')[1].split(', ').map(a=>a.split('=')[1].split('..').map(Number))[0];
  const targetY = input.split(': ')[1].split(', ').map(a=>a.split('=')[1].split('..').map(Number))[1];
  const solutions = getValidProbePaths(targetX, targetY);
  const highestY: Probe = solutions.sort((a, b) => b.maxY - a.maxY)[0];
  return highestY.maxY || 0;
}
