// Advent of Code - Day 16 - Part One

import { PacketParser } from "./PacketParser";

export function part1(input: string): number {
  const packetParse = new PacketParser(input)
  
  return packetParse.versionSum;
}
