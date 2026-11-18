import { describe, it, expect } from 'vitest';
import { encryptPlayfair } from '../crypto/playfairEncryption';

describe('Playfair Encryption Engine', () => {
  it('passes the Standard Playfair Test Vector (MONARCHY + INSTRUMENTS => GATLMZCLRQXA)', () => {
    const result = encryptPlayfair('INSTRUMENTS', 'MONARCHY');

    expect(result.keySquare.isValid).toBe(true);
    expect(result.prepared.digraphs).toEqual(['IN', 'ST', 'RU', 'ME', 'NT', 'SX']);
    expect(result.ciphertextCompact).toBe('GATLMZCLRQXA');
    expect(result.ciphertextGrouped).toBe('GA TL MZ CL RQ XA');

    // Verify individual trace steps
    expect(result.traces[0].outputPair).toEqual(['G', 'A']); // IN -> GA (rectangle)
    expect(result.traces[1].outputPair).toEqual(['T', 'L']); // ST -> TL (same row)
    expect(result.traces[2].outputPair).toEqual(['M', 'Z']); // RU -> MZ (rectangle)
    expect(result.traces[3].outputPair).toEqual(['C', 'L']); // ME -> CL (same col)
    expect(result.traces[4].outputPair).toEqual(['R', 'Q']); // NT -> RQ (rectangle)
    expect(result.traces[5].outputPair).toEqual(['X', 'A']); // SX -> XA (same col)
  });

  it('correctly encrypts with filler handling for BALLOON', () => {
    const result = encryptPlayfair('BALLOON', 'MONARCHY');
    // Prepared: BA LX LO ON
    // BA -> IB, LX -> SU, LO -> PM, ON -> NA
    expect(result.ciphertextCompact).toBe('IBSUPMNA');
  });

  it('handles repeated identical letters where letter is X (using fallback Q)', () => {
    const result = encryptPlayfair('FOXXES', 'MONARCHY');
    // FO, XQ, XE, SX...
    expect(result.prepared.digraphs[1]).toBe('XQ');
    expect(result.ciphertextCompact.length % 2).toBe(0);
  });

  it('handles plaintext with punctuation, numbers and lowercase', () => {
    const result = encryptPlayfair('Secret 007: Attack at dawn!', 'MONARCHY');
    expect(result.prepared.normalizedText).toBe('SECRETATTACKATDAWN');
    expect(result.ciphertextCompact.length).toBeGreaterThan(0);
  });

  it('handles large plaintext blocks efficiently', () => {
    const longText = 'CLASSICAL CRYPTOGRAPHY HAS A RICH HISTORY DATING BACK MILLENNIA. PLAYFAIR IS A HISTORIC STEP TOWARDS DIGRAPH SUBSTITUTION.';
    const result = encryptPlayfair(longText, 'MONARCHY');
    expect(result.ciphertextCompact.length).toBeGreaterThan(50);
    expect(result.ciphertextCompact.length % 2).toBe(0);
  });

  it('throws helpful error on empty plaintext or invalid keyword', () => {
    expect(() => encryptPlayfair('', 'MONARCHY')).toThrow();
    expect(() => encryptPlayfair('HELLO', '12345')).toThrow();
  });
});
