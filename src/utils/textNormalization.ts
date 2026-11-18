/**
 * Normalizes input text for Playfair operations:
 * - Converts to uppercase
 * - Removes whitespace and all non-alphabetic characters
 * - Replaces 'J' with 'I'
 */
export function normalizeText(text: string): { normalized: string; replacedJCount: number } {
  if (!text) return { normalized: '', replacedJCount: 0 };

  const upper = text.toUpperCase();
  let replacedJCount = 0;
  let normalized = '';

  for (let i = 0; i < upper.length; i++) {
    const code = upper.charCodeAt(i);
    // A-Z is 65-90
    if (code >= 65 && code <= 90) {
      const char = upper[i];
      if (char === 'J') {
        normalized += 'I';
        replacedJCount++;
      } else {
        normalized += char;
      }
    }
  }

  return { normalized, replacedJCount };
}

/**
 * Normalizes keyword: removes duplicates while preserving first occurrence
 */
export function extractUniqueKeyLetters(rawKey: string): {
  normalizedKey: string;
  uniqueLetters: string[];
  replacedJCount: number;
} {
  const { normalized, replacedJCount } = normalizeText(rawKey);
  const seen = new Set<string>();
  const uniqueLetters: string[] = [];

  for (const char of normalized) {
    if (!seen.has(char)) {
      seen.add(char);
      uniqueLetters.push(char);
    }
  }

  return {
    normalizedKey: normalized,
    uniqueLetters,
    replacedJCount,
  };
}

/**
 * Standard 25-letter Playfair alphabet (excluding 'J')
 */
export const PLAYFAIR_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('');
