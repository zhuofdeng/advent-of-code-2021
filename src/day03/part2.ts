// Advent of Code - Day 3 - Part Two
import { parseInput} from "./utils";
import { convertBinaryToDecimal } from "../utils";

const getMostCommonBit = (values: string[], index: number, wildCard: number) => {
  let onBit = 0;
  let offBit = 0;
  values.forEach((value) => {
    if(value[index] === '1') {
      onBit ++;
    } else {
      offBit ++;
    }
  });

  if (onBit === offBit) {
    return wildCard;
  }
  if (onBit > offBit) {
    return 1;
  }

  return 0;
}

const getLeastCommonBit = (values: string[], index: number, wildCard: number) => {
  let onBit = 0;
  let offBit = 0;
  values.forEach((value) => {
    if(value[index] === '1') {
      onBit ++;
    } else {
      offBit ++;
    }
  });

  if (onBit === offBit) {
    return wildCard;
  }
  if (onBit < offBit) {
    return 1;
  }

  return 0;
}

const getOxygenScrubberValue = (values: string[], index: number): string[] => {
  if (values.length === 1) {
    return values;
  }
  const oxygen = getMostCommonBit(values, index, 1);  
  const filtered = values.filter((value) => {
    return parseInt(value[index]) === oxygen;
  });

  if (filtered[0].length - 1 > index) {
    return getOxygenScrubberValue(filtered, index+1)
  }

  return filtered;
}

const getCO2GeneratorValue = (values: string[], index: number): string[] => {
  if (values.length === 1) {
    return values;
  }
  const co2 = getLeastCommonBit(values, index, 0);
  const filtered = values.filter((value) => {
    return parseInt(value[index]) === co2;
  });


  if (filtered[0].length-1 > index) {
    return getCO2GeneratorValue(filtered, index+1)
  }

  return filtered;
}

export function part2(input: string): number {
  const values = parseInput(input);
  const oxygenScrubber = getOxygenScrubberValue(values, 0)[0].split('');
  const co2Generator = getCO2GeneratorValue(values, 0)[0].split('');
  const oxygenScrubberValues = oxygenScrubber.map((val) => parseInt(val));
  const co2GeneratorValues = co2Generator.map((val) => parseInt(val));
  return convertBinaryToDecimal(oxygenScrubberValues) * convertBinaryToDecimal(co2GeneratorValues);
}
