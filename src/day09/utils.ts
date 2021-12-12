export const getNeighbors = (grid: number[][], rowIndex: number, columnIndex: number): number[] => {
  const north = Math.max(0, rowIndex - 1);
  const east = Math.max(0, columnIndex - 1);
  const west = Math.min(grid[rowIndex].length - 1, columnIndex + 1);
  const south = Math.min(grid.length - 1, rowIndex + 1);

  const neighbors = [];
  if (rowIndex > 0) {
    neighbors.push(grid[north][columnIndex]);
  }
  if (columnIndex > 0) {
    neighbors.push(grid[rowIndex][east]);
  }
  if (columnIndex < grid[rowIndex].length - 1) {
    neighbors.push(grid[rowIndex][west]);
  }
  if (rowIndex < grid.length - 1) {
    neighbors.push(grid[south][columnIndex]);
  }
  return neighbors;
}

export const flood = (grid: number[][], rowIndex: number, columnIndex: number): number => {
  if (grid[rowIndex][columnIndex] === 1) {
    return 0;
  }
  grid[rowIndex][columnIndex] = 1;
  const north = Math.max(0, rowIndex - 1);
  const east = Math.max(0, columnIndex - 1);
  const west = Math.min(grid[rowIndex].length - 1, columnIndex + 1);
  const south = Math.min(grid.length - 1, rowIndex + 1);
  let totalNeighbors = 1;
  if (rowIndex > 0) {
    totalNeighbors += flood(grid, north, columnIndex);
  }
  if (columnIndex > 0) {
    totalNeighbors += flood(grid, rowIndex,east);
  }
  if (columnIndex < grid[rowIndex].length - 1) {
    totalNeighbors += flood(grid, rowIndex,west);
  }
  if (rowIndex < grid.length - 1) {
    totalNeighbors += flood(grid, south,columnIndex);
  }

  return totalNeighbors;
}

export const isLocalMinium = (grid: number[][], rowIndex: number, columnIndex: number): boolean => {
  const neighbors = getNeighbors(grid, rowIndex, columnIndex);
  const value = grid[rowIndex][columnIndex];
  let isMininum = true;
  for(let n = 0; n < neighbors.length; n++) {
    if (neighbors[n] <= value) {
      isMininum = false;
      break;
    }
  }
  return isMininum;
}