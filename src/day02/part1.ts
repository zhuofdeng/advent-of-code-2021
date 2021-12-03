// Advent of Code - Day 2 - Part One

export function part1(input: string): number {
  const instructions = input.split('\n');

  let depth = 0;
  let direction = 0;
  instructions.forEach((instruction) => {
    const instructionPair = instruction.split(' ');
    const movement = parseInt(instructionPair[1]);
  
    if (instructionPair[0] === 'up' || instructionPair[0] === 'down') {
      if (instructionPair[0] === 'up') {
        depth -= movement;
      } else {
        depth += movement;
      }
    } else if (instructionPair[0] === 'forward') {
      direction += movement;
    }
  });

  return depth * direction;
}
