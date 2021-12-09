// Advent of Code - Day 8 - Part Two
// : 8
// : 5
// gcdfa: 2
// fbcad: 3
// : 7
// cefabd: 9
// cdfgeb: 6
// eafb: 4
// cagedb: 0
// ab: 1
const ZERO = 'abcdeg';
const ONE = 'ab';
const TWO = 'acdfg';
const THREE = 'abcdf';
const FOUR = 'abef';
const FIVE = 'bcdef';
const SIX = 'bcdefg';
const SEVEN = 'abd';
const EIGHT = 'abcdefg';
const NINE = 'abcdef';

const decodeDigit = (digit: string, hints: string[]): string => {
  let value = '0';
  switch(digit.length) {
    case 2:
      value = '1';
      break;
    case 3:
      value = '7';
      break;
    case 4:
      value = '4';
      break;
    case 7:
      value = '8';
      break;
    case 5: {
      const sortedDigit = digit.split('').sort().join('');

      if (sortedDigit === FIVE) {
        value = '5';
      } else if (sortedDigit === TWO) {
        value = '2';
      } else if (sortedDigit === THREE) {
        value = '3';
      } else {

        console.log(`didn't find any matches`)

        hints.forEach((hint) => {
          hint = hint.split('').sort().join('');
          let overlap = 0;
          if (hint.length === 2) {
            for(const h in hints) {
              if (sortedDigit.indexOf(h) > 0) {
                overlap += 1;
              }
            }
            if (overlap === 2) {
              value = '3';
            }
          } else if (hint.length === 4) {
            for(const h in hints) {
              if (sortedDigit.indexOf(h) > 0) {
                overlap += 1;
              }
            }
            if (overlap === 3) {
              value = '5';
            }
          }
        });
      }
      
      break;
    }
    case 6: {
      const sortedDigit = digit.split('').sort().join('');
      if (sortedDigit === SIX) {
        value = '6';
      } else if (sortedDigit === NINE) {
        value = '9';
      } else if (sortedDigit === ZERO) {
        value = '0;'
      } else {
        console.log(`didn't find any matches`)
        hints.forEach((hint) => {
          hint = hint.split('').sort().join('');
          if (hint.length === 4) {
            if (sortedDigit.indexOf(hint) > 0) {
              console.log(`hint ${hint} sortedDigit ${sortedDigit}`)
              value = '9';
            } else {
              if (sortedDigit.indexOf(hint[3]) > 0) {
                value = '6';
              } else {
                value = '0';
              }
            }
          } else if (hint.length === 2) {
            if (sortedDigit.indexOf(hint) > 0) {
              console.log(`hint ${hint} sortedDigit ${sortedDigit}`)
              value = '6';
            }
          }
        });
      }
    }
  }
  return value;
}

const getCodeValue = (codes: string[]): number => {
  console.log(`----------------- ${codes}`)
  const decodeKeys = codes.filter((code) => {
    return (code.length === 2 || code.length === 3 || code.length === 4 || code.length === 7);
  })
  console.log(`decodeKeys = ${decodeKeys}`)
  const value = codes.map((code) => decodeDigit(code, decodeKeys)).join('');
  console.log(`----------------- ${value}`)
  //console.log(`codeValue: ${value}`);
  return parseInt(value);
}

export function part2(input: string): number {
  const outputs = input.split('\n').map(v => v.split(' | ')[1].split(' '));
  let total = 0;
  outputs.filter((output) => {
    total += getCodeValue(output);
  });
  return total;
}