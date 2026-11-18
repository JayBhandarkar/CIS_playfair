import { describe, it, expect } from 'vitest';
import { generateKeySquare } from '../crypto/keySquare';
import { transformDigraph } from '../crypto/transformationRules';

describe('Transformation Rules', () => {
  const keySquare = generateKeySquare('MONARCHY');
  // Row 0: M O N A R
  // Row 1: C H Y B D
  // Row 2: E F G I K
  // Row 3: L P Q S T
  // Row 4: U V W X Z

  it('correctly applies Same Row rule for encryption with wrap-around', () => {
    // S and T are both in Row 3 (cols 3 and 4)
    // S -> T (col 3 -> 4), T -> L (col 4 -> 0 wrap)
    const trace = transformDigraph(
      ['S', 'T'],
      keySquare.matrix,
      keySquare.letterPositions,
      'encrypt'
    );
    expect(trace.rule).toBe('same_row');
    expect(trace.outputPair).toEqual(['T', 'L']);
  });

  it('correctly applies Same Row rule for decryption with wrap-around', () => {
    // Decrypting T and L in Row 3 should give S and T
    const trace = transformDigraph(
      ['T', 'L'],
      keySquare.matrix,
      keySquare.letterPositions,
      'decrypt'
    );
    expect(trace.rule).toBe('same_row');
    expect(trace.outputPair).toEqual(['S', 'T']);
  });

  it('correctly applies Same Column rule for encryption with wrap-around', () => {
    // S=(3,3) and X=(4,3) are both in Col 3
    // S -> X (row 3 -> 4), X -> A (row 4 -> 0 wrap)
    const trace = transformDigraph(
      ['S', 'X'],
      keySquare.matrix,
      keySquare.letterPositions,
      'encrypt'
    );
    expect(trace.rule).toBe('same_column');
    expect(trace.outputPair).toEqual(['X', 'A']);
  });

  it('correctly applies Same Column rule for decryption with wrap-around', () => {
    // Decrypting X and A in Col 3 should give S and X
    const trace = transformDigraph(
      ['X', 'A'],
      keySquare.matrix,
      keySquare.letterPositions,
      'decrypt'
    );
    expect(trace.rule).toBe('same_column');
    expect(trace.outputPair).toEqual(['S', 'X']);
  });

  it('correctly applies Rectangle rule for encryption', () => {
    // I=(2,3) and N=(0,2).
    // I at (2,3) takes col 2 -> (2,2)='G'
    // N at (0,2) takes col 3 -> (0,3)='A'
    const trace = transformDigraph(
      ['I', 'N'],
      keySquare.matrix,
      keySquare.letterPositions,
      'encrypt'
    );
    expect(trace.rule).toBe('rectangle');
    expect(trace.outputPair).toEqual(['G', 'A']);
  });

  it('correctly applies Rectangle rule for decryption', () => {
    // Decrypting G and A should recover I and N
    const trace = transformDigraph(
      ['G', 'A'],
      keySquare.matrix,
      keySquare.letterPositions,
      'decrypt'
    );
    expect(trace.rule).toBe('rectangle');
    expect(trace.outputPair).toEqual(['I', 'N']);
  });
});
