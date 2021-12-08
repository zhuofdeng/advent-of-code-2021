// Advent of Code - Day 7 - Part One

const calculateMedian = (array: Array<number>) => {
  // Check If Data Exists
  if (array.length >= 1) {
    // Sort Array
    array = array.sort((a: number, b: number) => {
      return a - b;
    });

    // Array Length: Even
    if (array.length % 2 === 0) {
      // Average Of Two Middle Numbers
      return (array[(array.length / 2) - 1] + array[array.length / 2]) / 2;
    }
    // Array Length: Odd
    else {
      // Middle Number
      return array[(array.length - 1) / 2];
    }
  }
  else {
    // Error
    console.error('Error: Empty Array (calculateMedian)');
  }
};

export function part1(input: string): number {
  const valuesMap: Map<number, number> = new Map();
  let fuelCount = 0;
  const values = input.split(',').map((value) => parseInt(value));
  const median = calculateMedian(values) || 0;
  values.forEach((value) => {
    const mappedValue = valuesMap.get(value) || -1;
    if (mappedValue > -1) {
      valuesMap.set(value, mappedValue+1);
    } else {
      valuesMap.set(value, 1);
    }
  });
  console.log(`median = ${median}`)
  
  valuesMap.forEach((value, key) => {
    const fuel = (Math.abs(key - median) * value);
    fuelCount += fuel;
  });

  return Math.round(fuelCount);
}
