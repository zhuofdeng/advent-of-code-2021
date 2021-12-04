export const parseInput = (input: string): string[] => {
    return input.split('\n');
}

export const convertBinaryToDecimal = (binary: number[]): number => {
  let number = 0;
  binary.forEach((value, index) => {
    number += value === 1 ? Math.pow(2, index+1) : 0;
  });

  return number;
}
