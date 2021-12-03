// Advent of Code - Day 2 - Part Two

export function part2(input: string): number {
  const instructions = input.split('\n');

  let aim = 0;
  let horizontalMovement = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const instructionPair = instruction.split(' ');
    const movement = parseInt(instructionPair[1]);
    if (instructionPair[0] === 'down' || instructionPair[0] === 'up') {
      if (instructionPair[0] === 'down') {
        aim += movement;
      } else {
        aim -= movement;
      }
    } else if (instructionPair[0] === 'forward') {
      horizontalMovement += movement;
      depth += (movement * aim);
    }
  });
    
  return horizontalMovement * depth;
}
