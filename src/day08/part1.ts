// Advent of Code - Day 8 - Part One

export function part1(input: string): number {
  const outputs = input.split('\n').flatMap(v => v.split(' | ')[1].split(' '));
  const values = outputs.filter((output) => {
    return (output.length === 2 || output.length === 4 || output.length === 3 || output.length === 7);
  });
  return values.length;
}
