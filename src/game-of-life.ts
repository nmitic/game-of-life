export type Cell = 0 | 1;

export type CellState = 0 | 1;

export function hashLife(cells: CellState[][]): CellState[][] {
  const numRows = cells.length;
  const numCols = cells[0].length;

  // Create a new array to store the next state of the universe
  const nextState = Array.from({ length: numRows }, () => new Array<CellState>(numCols));

  // Helper function to count the number of live neighbors for a given cell
  function countLiveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i < numRows && j >= 0 && j < numCols && !(i === row && j === col)) {
          count += cells[i][j];
        }
      }
    }
    return count;
  }

  // Iterate over each cell in the current state
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const liveNeighbors = countLiveNeighbors(row, col);
      const currentState = cells[row][col];

      // Apply the rules of the Game of Life
      if (currentState === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        nextState[row][col] = 0; // Cell dies due to underpopulation or overpopulation
      } else if (currentState === 0 && liveNeighbors === 3) {
        nextState[row][col] = 1; // Cell becomes alive due to reproduction
      } else {
        nextState[row][col] = currentState; // Cell remains in its current state
      }
    }
  }

  return nextState;
}


export function generateRandomArray(rows: number, cols: number): Cell[][] {
  const array: Cell[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < cols; j++) {
      const value = Math.random() < 0.5 ? 0 : 1;
      row.push(value);
    }

    array.push(row);
  }

  return array;
}

export function generateEmptyArray(rows: number, cols: number): Cell[][] {
  const array: Cell[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < cols; j++) {
      row.push(0);
    }

    array.push(row);
  }

  return array;
}
