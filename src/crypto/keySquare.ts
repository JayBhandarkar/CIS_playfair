import { KeySquareCell, KeySquareGrid, KeySquareResult, MatrixCoordinate } from '../types/playfair';
import { extractUniqueKeyLetters, PLAYFAIR_ALPHABET } from '../utils/textNormalization';
import { validateKeyword } from '../utils/validation';

export function generateKeySquare(rawKey: string): KeySquareResult {
  const validation = validateKeyword(rawKey);

  if (!validation.isValid) {
    // Return empty fallback matrix if invalid
    return {
      matrix: Array(5).fill(null).map(() => Array(5).fill('')),
      cells: [],
      normalizedKeyword: '',
      uniqueKeywordLetters: [],
      remainingAlphabetLetters: [],
      letterPositions: new Map(),
      isValid: false,
      errorMessage: validation.message,
    };
  }

  const { normalizedKey, uniqueLetters } = extractUniqueKeyLetters(rawKey);
  const uniqueKeySet = new Set(uniqueLetters);

  // Alphabet letters not present in keyword
  const remainingLetters = PLAYFAIR_ALPHABET.filter((char) => !uniqueKeySet.has(char));

  // Full 25 letters sequence
  const combinedSequence = [...uniqueLetters, ...remainingLetters];

  const matrix: KeySquareGrid = [];
  const cells: KeySquareCell[] = [];
  const letterPositions = new Map<string, MatrixCoordinate>();

  for (let r = 0; r < 5; r++) {
    const row: string[] = [];
    for (let c = 0; c < 5; c++) {
      const index = r * 5 + c;
      const letter = combinedSequence[index];
      row.push(letter);

      const isKeywordLetter = uniqueKeySet.has(letter);
      cells.push({
        letter,
        row: r,
        col: c,
        isKeywordLetter,
      });

      letterPositions.set(letter, { row: r, col: c });
      // Map 'J' to the same position as 'I'
      if (letter === 'I') {
        letterPositions.set('J', { row: r, col: c });
      }
    }
    matrix.push(row);
  }

  return {
    matrix,
    cells,
    normalizedKeyword: normalizedKey,
    uniqueKeywordLetters: uniqueLetters,
    remainingAlphabetLetters: remainingLetters,
    letterPositions,
    isValid: true,
  };
}
