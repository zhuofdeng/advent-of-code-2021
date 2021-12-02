// Advent of Code - Day 1 - Part One

export function part1(input: string): number {
  const depths = input.split('\n');
  let count = 0;
  let previousDepth = 0;
  depths.forEach((depth) => {
    const currentDepth = parseInt(depth);
    if (currentDepth > previousDepth && previousDepth > 0) {
      count ++;
    }
    previousDepth = parseInt(depth)
  });
  return count;
}
