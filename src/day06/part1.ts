// Advent of Code - Day 6 - Part One

export function part1(input: string): number {
  const fishAges = input.split(',').map(value => parseInt(value));
  const fishBuckets: number[] = [0,0,0,0,0,0,0,0,0]
  fishAges.forEach((age) => {
    fishBuckets[age] +=1;
  });

  for(let i = 0; i < 80; i++) {
    const grow = fishBuckets.shift() || 0;
    fishBuckets.push(grow);
    fishBuckets[6] += grow;
  }
  let totalCount = 0;
  fishBuckets.forEach((count) => {
    totalCount += count;
  });

  return totalCount;
}
