import { DigraphTransformationTrace, KeySquareGrid, MatrixCoordinate, TransformationRuleType } from '../types/playfair';

export function identifyRule(pos1: MatrixCoordinate, pos2: MatrixCoordinate): TransformationRuleType {
  if (pos1.row === pos2.row) {
    return 'same_row';
  }
  if (pos1.col === pos2.col) {
    return 'same_column';
  }
  return 'rectangle';
}

export function transformDigraph(
  pair: [string, string],
  matrix: KeySquareGrid,
  posMap: Map<string, MatrixCoordinate>,
  operation: 'encrypt' | 'decrypt',
  pairIndex: number = 0
): DigraphTransformationTrace {
  const [char1, char2] = pair;
  const pos1 = posMap.get(char1);
  const pos2 = posMap.get(char2);

  if (!pos1 || !pos2) {
    throw new Error(`Letter coordinates not found in matrix for pair "${char1}${char2}"`);
  }

  const rule = identifyRule(pos1, pos2);
  let outChar1 = '';
  let outChar2 = '';
  let explanation = '';
  let mathFormula = '';

  if (rule === 'same_row') {
    const r = pos1.row;
    if (operation === 'encrypt') {
      const newC1 = (pos1.col + 1) % 5;
      const newC2 = (pos2.col + 1) % 5;
      outChar1 = matrix[r][newC1];
      outChar2 = matrix[r][newC2];
      mathFormula = `(r, (c + 1) mod 5)`;
      explanation = `Both '${char1}' and '${char2}' share row ${r + 1}. Each letter shifts 1 position to the right (wrapping from column 5 to 1 if needed): '${char1}' [row ${r + 1}, col ${pos1.col + 1}] → '${outChar1}', '${char2}' [row ${r + 1}, col ${pos2.col + 1}] → '${outChar2}'.`;
    } else {
      const newC1 = (pos1.col - 1 + 5) % 5;
      const newC2 = (pos2.col - 1 + 5) % 5;
      outChar1 = matrix[r][newC1];
      outChar2 = matrix[r][newC2];
      mathFormula = `(r, (c - 1 + 5) mod 5)`;
      explanation = `Both '${char1}' and '${char2}' share row ${r + 1}. Each letter shifts 1 position to the left (wrapping around to the rightmost column if needed): '${char1}' → '${outChar1}', '${char2}' → '${outChar2}'.`;
    }
  } else if (rule === 'same_column') {
    const c = pos1.col;
    if (operation === 'encrypt') {
      const newR1 = (pos1.row + 1) % 5;
      const newR2 = (pos2.row + 1) % 5;
      outChar1 = matrix[newR1][c];
      outChar2 = matrix[newR2][c];
      mathFormula = `((r + 1) mod 5, c)`;
      explanation = `Both '${char1}' and '${char2}' share column ${c + 1}. Each letter shifts 1 position downward (wrapping from row 5 to 1 if needed): '${char1}' [row ${pos1.row + 1}, col ${c + 1}] → '${outChar1}', '${char2}' [row ${pos2.row + 1}, col ${c + 1}] → '${outChar2}'.`;
    } else {
      const newR1 = (pos1.row - 1 + 5) % 5;
      const newR2 = (pos2.row - 1 + 5) % 5;
      outChar1 = matrix[newR1][c];
      outChar2 = matrix[newR2][c];
      mathFormula = `((r - 1 + 5) mod 5, c)`;
      explanation = `Both '${char1}' and '${char2}' share column ${c + 1}. Each letter shifts 1 position upward (wrapping to bottom row if needed): '${char1}' → '${outChar1}', '${char2}' → '${outChar2}'.`;
    }
  } else {
    // Rectangle rule
    // Each letter is replaced by the letter in its own row and the other letter's column
    outChar1 = matrix[pos1.row][pos2.col];
    outChar2 = matrix[pos2.row][pos1.col];
    mathFormula = `(r₁, c₂) and (r₂, c₁)`;
    explanation = `'${char1}' at (${pos1.row + 1}, ${pos1.col + 1}) and '${char2}' at (${pos2.row + 1}, ${pos2.col + 1}) form opposing corners of a rectangle. Replacing each with the letter in its same row and the opposing column yields: '${char1}' → '${outChar1}' at (${pos1.row + 1}, ${pos2.col + 1}), and '${char2}' → '${outChar2}' at (${pos2.row + 1}, ${pos1.col + 1}).`;
  }

  return {
    pairIndex,
    inputPair: pair,
    pos1,
    pos2,
    rule,
    outputPair: [outChar1, outChar2],
    explanation,
    mathFormula,
    operation,
  };
}
