// Advent of Code - Day 12 - Part Two

import { findPaths } from "./utils";

export function part2(input: string): number {
  const paths: string[][] = input.split('\n').map(path => path.split('-'));
  const connectionsMap: Map<string, string[]> = new Map();
  const totalPaths: string[][] = [];

  paths.forEach(([from, to]) => {
    const connectionFrom = connectionsMap.get(from) || [];
    const connectionTo = connectionsMap.get(to) || [];

    connectionFrom.push(to);
    connectionTo.push(from);

    connectionsMap.set(from, connectionFrom);
    connectionsMap.set(to, connectionTo);
  });

  findPaths(connectionsMap, 'start', [], totalPaths, true);

  return totalPaths.length;
}
