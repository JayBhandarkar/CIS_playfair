import { DigraphPreparationStep, PreparedPlaintextResult } from '../types/playfair';
import { normalizeText } from '../utils/textNormalization';

export interface PrepareOptions {
  primaryFiller?: string; // Default 'X'
  fallbackFiller?: string; // Default 'Q'
}

export function preparePlaintext(
  rawPlaintext: string,
  options: PrepareOptions = {}
): PreparedPlaintextResult {
  const primaryFiller = (options.primaryFiller || 'X').toUpperCase();
  const fallbackFiller = (options.fallbackFiller || 'Q').toUpperCase();

  const { normalized, replacedJCount } = normalizeText(rawPlaintext);

  if (!normalized) {
    return {
      originalText: rawPlaintext,
      normalizedText: '',
      preparedText: '',
      digraphs: [],
      steps: [],
      fillerCount: 0,
      replacedJCount: 0,
    };
  }

  const steps: DigraphPreparationStep[] = [];
  const digraphs: string[] = [];
  let fillerCount = 0;
  let i = 0;

  while (i < normalized.length) {
    const char1 = normalized[i];

    // If this is the last remaining single letter
    if (i === normalized.length - 1) {
      const filler = char1 === primaryFiller ? fallbackFiller : primaryFiller;
      const pair = char1 + filler;
      digraphs.push(pair);
      steps.push({
        originalIndex: i,
        char1,
        char2: filler,
        fillerInserted: true,
        fillerChar: filler,
        reason: 'odd_length_padding',
      });
      fillerCount++;
      i++;
    } else {
      const char2 = normalized[i + 1];

      // If adjacent letters are identical in this pair
      if (char1 === char2) {
        const filler = char1 === primaryFiller ? fallbackFiller : primaryFiller;
        const pair = char1 + filler;
        digraphs.push(pair);
        steps.push({
          originalIndex: i,
          char1,
          char2: filler,
          fillerInserted: true,
          fillerChar: filler,
          reason: 'duplicate_filler',
        });
        fillerCount++;
        // Advance by 1, so the repeated letter char2 begins the next pair
        i++;
      } else {
        const pair = char1 + char2;
        digraphs.push(pair);
        steps.push({
          originalIndex: i,
          char1,
          char2,
          fillerInserted: false,
          reason: 'normal',
        });
        i += 2;
      }
    }
  }

  const preparedText = digraphs.join('');

  return {
    originalText: rawPlaintext,
    normalizedText: normalized,
    preparedText,
    digraphs,
    steps,
    fillerCount,
    replacedJCount,
  };
}
