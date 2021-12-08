// Advent of Code - Day 7 - Part Two

export function part2(input: string): number {
  const valuesMap: Map<number, number> = new Map();
  let fuelCount = 0;
  const values = input.split(',').map((value) => parseInt(value));
  const mean = Math.floor(values.reduce((a,b) => a + b, 0) / values.length);
  values.forEach((value) => {
    const mappedValue = valuesMap.get(value) || -1;
    if (mappedValue > -1) {
      valuesMap.set(value, mappedValue+1);
    } else {
      valuesMap.set(value, 1);
    }
  });
  
  valuesMap.forEach((value, key) => {
    const range = Math.abs(key - mean);
    let fuel = range * (range+1) * 0.5;
    fuel = fuel * value;
    fuelCount += fuel;
  });

  return fuelCount;
}
