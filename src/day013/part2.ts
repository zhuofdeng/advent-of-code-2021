// Advent of Code - Day 13 - Part Two

import { MapFold } from "./MapFold";

const fs = require('fs');
export function part2(): number {
  const input = fs
  .readFileSync('src/day013/resources/input.txt')
  .toString()
  .split('\n')
  .filter(line => line !== '');
  // debugger
  const foldStartIdx = input.findIndex(line => line.startsWith('fold'));
  const points = input.slice(0, foldStartIdx);
  const folds = input.slice(foldStartIdx);
  
  const parseInstruction = fold => {
    const [, , instruction] = fold.split(' ');
    const [axis, value] = instruction.split('=');
    return { axis, value: parseInt(value) };
  };
  
  const foldPoints = (points, fold) => {
    const { axis, value } = parseInstruction(fold);
  
    for (const point of points) {
      let [x, y] = point.split(',').map(Number);
      let folded = false;
  
      if (axis === 'x' && x > value) {
        x = value - (x - value);
        folded = true;
      }
  
      if (axis === 'y' && y > value) {
        y = value - (y - value);
        folded = true;
      }
  
      if (folded) {
        points.delete(point);
        points.add(x + ',' + y);
      }
    }
  };
  
  // Part 2: What code do you use to activate the infrared thermal imaging camera system?
  const p2 = (points, folds) => {
    const uniquePoints = new Set(points);
  
    // Characters are of height 6 (added extra row for console output padding)
    // Message length is 8, letter width is 4 + single char of padding between each letter
    const messageGrid = Array.from(Array(7), () => Array(39).fill(' '));
  
    for (const fold of folds) {
      foldPoints(uniquePoints, fold);
    }
  
    for (const point of uniquePoints) {
      const [x, y] = point.split(',').map(Number);
      messageGrid[y][x] = '#';
    }
  
    console.log('Your infrared thermal imaging camera system code is below!\n');
    console.log(messageGrid.map(row => row.join('')).join('\n'));
  
    return uniquePoints.size;
  };

  return p2(points, folds);
}
