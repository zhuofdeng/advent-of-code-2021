export const increaseEnergy = (grid: number[][], row: number, column: number, maxRow: number, maxColumn: number, flashedSet: Map<string, boolean>) => {
    if (grid[row][column] === 9) {
      grid[row][column] = 0;
      flashedSet.set(`${row}_${column}`, true);
      findNeighbors(grid, row, column, maxRow, maxColumn, flashedSet);
    } else {
      if (!flashedSet.has(`${row}_${column}`)) {
        grid[row][column] += 1;
      }
    }
  }
  
  export const findNeighbors = (grid: number[][], row: number, column: number, maxRow: number, maxColumn: number, flashedSet: Map<string, boolean>) => {
    const topLeft = [row - 1, column - 1];
    const top = [row - 1, column];
    const topRight = [row - 1, column + 1];
    const left = [row, column - 1];
    const right = [row, column + 1];
    const bottomLeft = [row + 1, column - 1];
    const bottom = [row + 1, column];
    const bottomRight = [row + 1, column + 1];
  
    if (topLeft[0] >= 0 && topLeft[1] >= 0) {
      increaseEnergy(grid, topLeft[0], topLeft[1], maxRow, maxColumn, flashedSet);
    }
    if (top[0] >= 0 && top[1] >= 0) {
      increaseEnergy(grid, top[0], top[1], maxRow, maxColumn, flashedSet);
    }
    if (topRight[0] >= 0 && topRight[1] < maxColumn) {
      increaseEnergy(grid, topRight[0], topRight[1], maxRow, maxColumn, flashedSet);
    }
    if (left[0] >= 0 && left[1] >= 0) {
      increaseEnergy(grid, left[0], left[1], maxRow, maxColumn, flashedSet);
    }
    if (right[0] >= 0 && right[1] < maxColumn) {
      increaseEnergy(grid, right[0], right[1], maxRow, maxColumn, flashedSet);
    }
    if (bottomLeft[0] < maxRow && bottomLeft[1] >= 0) {
      increaseEnergy(grid, bottomLeft[0], bottomLeft[1], maxRow, maxColumn, flashedSet);
    }
    if (bottom[0] < maxRow && bottom[1] < maxColumn) {
      increaseEnergy(grid, bottom[0], bottom[1], maxRow, maxColumn, flashedSet);
    }
    if (bottomRight[0] < maxRow && bottomRight[1] < maxColumn) {
      increaseEnergy(grid, bottomRight[0], bottomRight[1], maxRow, maxColumn, flashedSet);
    }
  }