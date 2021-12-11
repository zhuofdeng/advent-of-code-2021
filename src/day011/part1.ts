// Advent of Code - Day 11 - Part One

import { increaseEnergy } from "./utils";

export function part1(input: string): number {
  const grid:number[][] = input.split('\n').map((l) => l.split('').map((n) => parseInt(n)));
  let totalFlashes = 0;
  for(let i = 0; i < 100; i++) {
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
  }
  return totalFlashes;
}
