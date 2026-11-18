import { DigraphTransformationTrace, KeySquareGrid, MatrixCoordinate } from '../types/playfair';

export interface VisualizerCellHighlight {
  letter: string;
  row: number;
  col: number;
  role: 'input-1' | 'input-2' | 'output-1' | 'output-2' | 'rectangle-corner' | 'normal';
}

export function computeVisualizerGridHighlights(
  trace: DigraphTransformationTrace | null,
  matrix: KeySquareGrid
): VisualizerCellHighlight[][] {
  const grid: VisualizerCellHighlight[][] = [];

  for (let r = 0; r < 5; r++) {
    const rowList: VisualizerCellHighlight[] = [];
    for (let c = 0; c < 5; c++) {
      const letter = matrix[r]?.[c] || '';
      rowList.push({
        letter,
        row: r,
        col: c,
        role: 'normal',
      });
    }
    grid.push(rowList);
  }

  if (!trace) return grid;

  const { pos1, pos2, outputPair } = trace;
  const outChar1 = outputPair[0];
  const outChar2 = outputPair[1];

  // Mark input-1 and input-2
  if (grid[pos1.row]?.[pos1.col]) {
    grid[pos1.row][pos1.col].role = 'input-1';
  }
  if (grid[pos2.row]?.[pos2.col]) {
    grid[pos2.row][pos2.col].role = 'input-2';
  }

  // Find output positions
  let outPos1: MatrixCoordinate | null = null;
  let outPos2: MatrixCoordinate | null = null;

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (matrix[r][c] === outChar1 && !outPos1) {
        outPos1 = { row: r, col: c };
      }
      if (matrix[r][c] === outChar2 && (!outPos2 || outPos1?.row !== r || outPos1?.col !== c)) {
        outPos2 = { row: r, col: c };
      }
    }
  }

  if (outPos1 && grid[outPos1.row]?.[outPos1.col]) {
    grid[outPos1.row][outPos1.col].role = 'output-1';
  }
  if (outPos2 && grid[outPos2.row]?.[outPos2.col]) {
    grid[outPos2.row][outPos2.col].role = 'output-2';
  }

  return grid;
}
