// Advent of Code - Day 9 - Part One

import { isLocalMinium } from "./utils";

export function part1(input: string): number {
  const grid: number[][] = input.split('\n').map(v => v.split('').map((l) => parseInt(l)));
  let total = 0;
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if (isLocalMinium(grid, x, y)) {
        total += (1+grid[x][y]);
      }
    }
  }

  return total;
}
