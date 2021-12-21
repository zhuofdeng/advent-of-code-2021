// Advent of Code - Day 16 - Part Two

import { PacketParser } from "./PacketParser";

export function part2(input: string): number {

  const packetParse = new PacketParser(input)
  
  return packetParse.outterPacketValue;
}
