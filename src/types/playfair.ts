export type TransformationRuleType = 'same_row' | 'same_column' | 'rectangle';

export interface MatrixCoordinate {
  row: number; // 0 to 4
  col: number; // 0 to 4
}

export interface KeySquareCell {
  letter: string;
  row: number;
  col: number;
  isKeywordLetter: boolean;
}

export type KeySquareGrid = string[][]; // 5x5 string array

export interface KeySquareResult {
  matrix: KeySquareGrid;
  cells: KeySquareCell[];
  normalizedKeyword: string;
  uniqueKeywordLetters: string[];
  remainingAlphabetLetters: string[];
  letterPositions: Map<string, MatrixCoordinate>;
  isValid: boolean;
  errorMessage?: string;
}

export interface DigraphPreparationStep {
  originalIndex: number;
  char1: string;
  char2: string;
  fillerInserted: boolean;
  fillerChar?: string;
  reason: 'normal' | 'duplicate_filler' | 'odd_length_padding';
}

export interface PreparedPlaintextResult {
  originalText: string;
  normalizedText: string;
  preparedText: string;
  digraphs: string[];
  steps: DigraphPreparationStep[];
  fillerCount: number;
  replacedJCount: number;
}

export interface DigraphTransformationTrace {
  pairIndex: number;
  inputPair: [string, string];
  pos1: MatrixCoordinate;
  pos2: MatrixCoordinate;
  rule: TransformationRuleType;
  outputPair: [string, string];
  explanation: string;
  mathFormula: string;
  operation: 'encrypt' | 'decrypt';
}

export interface EncryptionResult {
  originalPlaintext: string;
  prepared: PreparedPlaintextResult;
  keySquare: KeySquareResult;
  ciphertextCompact: string;
  ciphertextGrouped: string;
  traces: DigraphTransformationTrace[];
  timestamp: number;
}

export interface DecryptionResult {
  originalCiphertext: string;
  normalizedCiphertext: string;
  digraphs: string[];
  keySquare: KeySquareResult;
  decryptedPreparedText: string;
  decryptedPreparedGrouped: string;
  estimatedOriginalText: string;
  traces: DigraphTransformationTrace[];
  hasTrailingPaddingRemoved: boolean;
  heuristicFillersRemovedCount: number;
  timestamp: number;
}

export type NavigationPage =
  | 'overview'
  | 'keysquare'
  | 'encryption'
  | 'decryption'
  | 'visualizer'
  | 'mathematics'
  | 'examples'
  | 'security'
  | 'about';
