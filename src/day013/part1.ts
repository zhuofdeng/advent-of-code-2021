// Advent of Code - Day 13 - Part One
import {MapFold} from './MapFold'

export function part1(input: string): number {
  const mapFold = new MapFold(input);
  mapFold.fold();
  return mapFold.count();
}
