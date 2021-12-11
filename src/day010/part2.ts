// Advent of Code - Day 10 - Part Two

const getIncompleteBrackets = (input: string): string[] => {
  const matchedStack = [];
  for(let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === '{' || char === '[' || char === '(' || char === '<') {
        matchedStack.push(char);
    } else {
      const lastChar = matchedStack[matchedStack.length-1];
      if (char === '}' && lastChar === '{') {
          matchedStack.pop();
      } else if (char === ')' && lastChar === '(') {
          matchedStack.pop();
      } else if (char === ']' && lastChar === '[') {
          matchedStack.pop();
      } else if (char === '>' && lastChar === '<') {
        matchedStack.pop();
      } else {
        return [];
      }
    }  
  }

  return matchedStack.reverse();
}

export function part2(input: string): number {
    const lines: string[] = input.split('\n');
    const values: number[] = [];
    const VALUES_MAP = {
      '(': 1,
      '[': 2,
      '{': 3,
      '<': 4,
    };

    lines.forEach((l) => {
      let lineValue = 0;
      const char = getIncompleteBrackets(l);
      char.forEach((c) => {
        lineValue *= 5;
        if (c === '(' || c === '[' || c === '{' || c === '<') {
          lineValue += VALUES_MAP[c];
        }
      });

      if (lineValue > 0) {
        values.push(lineValue);
      }
    });

    const midIndex = Math.floor(values.length / 2);
    values.sort((a, b) => a - b);
    return values.splice(midIndex)[0];
}
