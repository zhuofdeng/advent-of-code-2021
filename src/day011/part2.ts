// Advent of Code - Day 11 - Part Two

import { increaseEnergy } from "./utils";

export function part2(input: string): number {
  const grid:number[][] = input.split('\n').map((l) => l.split('').map((n) => parseInt(n)));
  let step = 0;
  let totalFlashes = 0;
  while(totalFlashes !== grid.length * grid[0].length) {
    totalFlashes = 0;
    const flashedSet: Map<string, boolean> = new Map();
    grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        increaseEnergy(grid, rowIndex, columnIndex, grid.length, row.length, flashedSet)
      });
    });
    
    grid.forEach((row) => {
      const num = row.filter((column) => column === 0);
      totalFlashes += num.length;
    });

    step += 1;
  }
  return step;
}
