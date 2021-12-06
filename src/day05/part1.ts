// Advent of Code - Day 5 - Part One

import { splitInputByNewLine } from "../utils";
import { LineSegment } from "./lineSegment";

export function part1(input: string): number {
  const linesData = splitInputByNewLine(input);
  const pointsMap: Map<string, number> = new Map()
  let totalOverlap = 0;
  const lineSegments: LineSegment[] = [];
  linesData.forEach((line) => {
    const lineSegment = new LineSegment(line);
    lineSegments.push(lineSegment);
  });

  lineSegments.forEach((lineSegment) => {
    if(lineSegment.isHorizontal() || lineSegment.isVertical()) {
      const points = lineSegment.getPointsOnTheLine();
      points.forEach((point) => {
        const hash = `${point[0]},${point[1]}`;
        const value = pointsMap.get(hash);
        if (!value) {
          pointsMap.set(hash, 1)
        } else {
          pointsMap.set(hash, value + 1);
          if (value + 1 === 2) {
            totalOverlap += 1;
          }
        }
      });
    }
  })
  return totalOverlap;
}
