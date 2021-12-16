// Advent of Code - Day 14 - Part Two

import { PolymerSequence } from "./PolymerSequencer";

export function part2(input: string): number {
  const polymerSequence = new PolymerSequence(input);
  polymerSequence.sequence(40);
  return polymerSequence.count();
}
