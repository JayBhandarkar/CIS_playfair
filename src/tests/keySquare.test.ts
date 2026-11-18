import { describe, it, expect } from 'vitest';
import { generateKeySquare } from '../crypto/keySquare';

describe('KeySquare Generator', () => {
  it('generates the exact standard 5x5 matrix for keyword MONARCHY', () => {
    const result = generateKeySquare('MONARCHY');
    expect(result.isValid).toBe(true);
    expect(result.matrix).toEqual([
      ['M', 'O', 'N', 'A', 'R'],
      ['C', 'H', 'Y', 'B', 'D'],
      ['E', 'F', 'G', 'I', 'K'],
      ['L', 'P', 'Q', 'S', 'T'],
      ['U', 'V', 'W', 'X', 'Z'],
    ]);
  });

  it('contains exactly 25 distinct letters, excludes J and includes I', () => {
    const result = generateKeySquare('CRYPTOGRAPHY');
    expect(result.isValid).toBe(true);

    const allLetters = result.matrix.flat();
    expect(allLetters.length).toBe(25);

    const uniqueSet = new Set(allLetters);
    expect(uniqueSet.size).toBe(25);
    expect(uniqueSet.has('J')).toBe(false);
    expect(uniqueSet.has('I')).toBe(true);
  });

  it('handles lowercase, spaces, punctuation and duplicate letters', () => {
    const result = generateKeySquare('Playfair Cipher! 123');
    expect(result.isValid).toBe(true);
    // PLAYFAIR CIPHER -> P L A Y F I R C H E
    expect(result.uniqueKeywordLetters).toEqual(['P', 'L', 'A', 'Y', 'F', 'I', 'R', 'C', 'H', 'E']);
  });

  it('replaces J with I in the keyword', () => {
    const result = generateKeySquare('JUNGLE');
    expect(result.isValid).toBe(true);
    expect(result.uniqueKeywordLetters[0]).toBe('I');
    expect(result.matrix.flat().includes('J')).toBe(false);
  });

  it('handles empty or whitespace-only keyword gracefully', () => {
    const result = generateKeySquare('   ');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBeDefined();
  });

  it('handles keyword containing only numbers and symbols', () => {
    const result = generateKeySquare('12345!@#$%^&*()');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBeDefined();
  });

  it('handles long key phrase with full alphabet coverage', () => {
    const result = generateKeySquare('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
    expect(result.isValid).toBe(true);
    expect(result.cells.length).toBe(25);
    expect(new Set(result.matrix.flat()).size).toBe(25);
  });
});
