import { describe, it, expect } from 'vitest';
import { decryptPlayfair } from '../crypto/playfairDecryption';
import { encryptPlayfair } from '../crypto/playfairEncryption';

describe('Playfair Decryption Engine', () => {
  it('correctly decrypts the standard ciphertext GATLMZCLRQXA back to INSTRUMENTSX', () => {
    const result = decryptPlayfair('GATLMZCLRQXA', 'MONARCHY');

    expect(result.decryptedPreparedText).toBe('INSTRUMENTSX');
    expect(result.decryptedPreparedGrouped).toBe('IN ST RU ME NT SX');
    expect(result.estimatedOriginalText).toBe('INSTRUMENTS');
  });

  it('rejects odd-length ciphertext with a clear validation error', () => {
    expect(() => {
      decryptPlayfair('GATLMZCLRQ', 'MONARCHY'); // 10 chars is even
    }).not.toThrow();

    expect(() => {
      decryptPlayfair('GATLMZCLR', 'MONARCHY'); // 9 chars (odd)
    }).toThrow(/Invalid ciphertext length/);
  });

  it('handles spaces and lowercase in ciphertext', () => {
    const result = decryptPlayfair('ga tl mz cl rq xa', 'MONARCHY');
    expect(result.decryptedPreparedText).toBe('INSTRUMENTSX');
  });

  it('performs full roundtrip encryption and decryption', () => {
    const original = 'DEFENDTHEEASTWALL';
    const key = 'ROYALCOUNCIL';

    const enc = encryptPlayfair(original, key);
    const dec = decryptPlayfair(enc.ciphertextCompact, key);

    // Decryption must exactly recover the prepared plaintext (with any padding)
    expect(dec.decryptedPreparedText).toBe(enc.prepared.preparedText);
  });

  it('correctly handles ciphertext with J by treating it as I', () => {
    // If user inputs J in ciphertext, it is mapped to I
    const res = decryptPlayfair('GAJLMZCLRQXA', 'MONARCHY');
    expect(res.decryptedPreparedText.length).toBe(12);
  });
});
