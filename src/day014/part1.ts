// Advent of Code - Day 14 - Part One

import { PolymerSequence } from "./PolymerSequencer";

export function part1(input: string): number {
  const polymerSequence = new PolymerSequence(input);
  polymerSequence.sequence(10);
  return polymerSequence.count();
}
