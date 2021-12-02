// Advent of Code - Day 1 - Part Two

const sumThreeDepths = (depths: Array<number>, index: number): number => {
  let sum = 0;
  for(let i = index; i < index + 3; i++) {
    sum += depths[i];
  }
  return sum;
}

export function part2(input: string): number {
  const depths = input.split('\n').map((value) => parseInt(value));
  let count = 0;
  let previousSum = sumThreeDepths(depths, 0);
  for(let i = 1; i < depths.length - 2; i++) {
    const currentSum = sumThreeDepths(depths, i);
    if (currentSum > previousSum) {
      count++
    }
    previousSum = currentSum;
  }
  return count;
}
