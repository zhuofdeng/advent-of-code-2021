// Advent of Code - Day 10 - Part One

const findCorrupted = (input: string): string => {
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
        return char;
      }
    }  
  }
  return '';
}

export function part1(input: string): number {
  const lines: string[] = input.split('\n');
  let values = 0;
  const VALUES_MAP = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  lines.forEach((l) => {
    const char = findCorrupted(l);
    if (char === ')' || char === ']' || char === '}' || char === '>') {
      values += VALUES_MAP[char];
    }
  })

  return values;
}
