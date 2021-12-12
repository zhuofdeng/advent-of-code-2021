// Advent of Code - Day 9 - Part Two
import { flood } from "./utils";

export function part2(input: string): number {
  const grid: number[][] = input.split('\n').map(v => v.split('').map((l) => parseInt(l)));
  const map: number[][] = grid.map((row) => row.map((r) => r === 9 ? 1 : 0));
  const basins: number[] = [];

  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      const neighbors = flood(map, x, y);
      if (neighbors > 0) {
        basins.push(neighbors);
      }
    }
  }

  basins.sort((a, b) => b - a);
  
  let total = basins[0];
  for(let i = 1; i < 3; i++) {
    total *= basins[i];
  }
  return total;
}
