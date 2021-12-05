// Advent of Code - Day 3 - Part One
import { parseInput} from "./utils";
import { convertBinaryToDecimal } from "../utils";

const getGammaBit = (input: string[], index: number): number => {
  let onBit = 0;
  let offBit = 0;
  input.forEach((value) => {
    if(value[index] === '1') {
      onBit ++;
    } else {
      offBit ++;
    }
  });

  return onBit > offBit ? 1 : 0;
}

const getEpsilonBit = (input: string[], index: number): number => {
  let onBit = 0;
  let offBit = 0;
  input.forEach((value) => {
    if(value[index] === '1') {
      onBit ++;
    } else {
      offBit ++;
    }
  });

  return onBit < offBit ? 1 : 0;
}

export function part1(input: string): number {
  const values = parseInput(input);
  const gamma: number[] = [];
  const epsilon: number[] = [];
  values.forEach((value, index) => {
    for(let i = 0; i < values[0].length; i++) {
      gamma[i] = getGammaBit(values, i);
      epsilon[i] = getEpsilonBit(values, i);
    }
  });

  return convertBinaryToDecimal(gamma) * convertBinaryToDecimal(epsilon);
}
