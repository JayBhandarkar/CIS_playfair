import { DecryptionResult, DigraphTransformationTrace, KeySquareResult } from '../types/playfair';
import { generateKeySquare } from './keySquare';
import { transformDigraph } from './transformationRules';
import { normalizeText } from '../utils/textNormalization';
import { validateCiphertext } from '../utils/validation';
import { groupIntoPairs } from '../utils/formatters';

export interface DecryptOptions {
  primaryFiller?: string; // Default 'X'
  fallbackFiller?: string; // Default 'Q'
}

/**
 * Heuristic estimation of original plaintext from prepared plaintext:
 * - Checks if trailing letter is padding filler ('X' or 'Q')
 * - Checks if an 'X' or 'Q' appears between two identical letters (e.g. L X L -> L L)
 * Always labeled as estimated, never destructive.
 */
export function estimateOriginalFromPrepared(
  prepared: string,
  primaryFiller: string = 'X',
  fallbackFiller: string = 'Q'
): { estimatedText: string; removedFillersCount: number; hasTrailingRemoved: boolean } {
  if (!prepared) {
    return { estimatedText: '', removedFillersCount: 0, hasTrailingRemoved: false };
  }

  let text = prepared;
  let removedFillersCount = 0;
  let hasTrailingRemoved = false;

  // 1. Check for single trailing filler if it was padding at the end of odd-length message
  // In Playfair, if odd length, a filler X (or Q) was added at the very end
  // We only suggest removing it as an option if it's the last character
  if (text.length > 1) {
    const last = text[text.length - 1];
    if (last === primaryFiller || last === fallbackFiller) {
      // Look at context: if we remove last, is it reasonable?
      // For heuristic display:
      hasTrailingRemoved = true;
    }
  }

  // 2. Remove filler between identical letters: e.g. L X L -> L L
  const chars: string[] = [];
  let i = 0;
  while (i < text.length) {
    // If pattern: char + filler + char where char == next char
    if (
      i + 2 < text.length &&
      (text[i + 1] === primaryFiller || text[i + 1] === fallbackFiller) &&
      text[i] === text[i + 2]
    ) {
      chars.push(text[i]);
      chars.push(text[i + 2]);
      removedFillersCount++;
      i += 3;
    } else {
      chars.push(text[i]);
      i++;
    }
  }

  let candidate = chars.join('');
  if (hasTrailingRemoved && candidate.length > 0) {
    const lastChar = candidate[candidate.length - 1];
    if (lastChar === primaryFiller || lastChar === fallbackFiller) {
      candidate = candidate.slice(0, -1);
      removedFillersCount++;
    }
  }

  return {
    estimatedText: candidate,
    removedFillersCount,
    hasTrailingRemoved,
  };
}

export function decryptPlayfair(
  ciphertext: string,
  keyOrSquare: string | KeySquareResult,
  options: DecryptOptions = {}
): DecryptionResult {
  const keySquare = typeof keyOrSquare === 'string' ? generateKeySquare(keyOrSquare) : keyOrSquare;

  if (!keySquare.isValid) {
    throw new Error(keySquare.errorMessage || 'Invalid key square');
  }

  const validation = validateCiphertext(ciphertext);
  if (!validation.isValid) {
    throw new Error(validation.message || 'Invalid ciphertext format');
  }

  const { normalized } = normalizeText(ciphertext);
  const digraphs: string[] = [];
  for (let i = 0; i < normalized.length; i += 2) {
    digraphs.push(normalized.slice(i, i + 2));
  }

  const traces: DigraphTransformationTrace[] = [];
  const outputChars: string[] = [];

  for (let idx = 0; idx < digraphs.length; idx++) {
    const pair = digraphs[idx];
    const char1 = pair[0];
    const char2 = pair[1];

    const trace = transformDigraph(
      [char1, char2],
      keySquare.matrix,
      keySquare.letterPositions,
      'decrypt',
      idx
    );

    traces.push(trace);
    outputChars.push(trace.outputPair[0], trace.outputPair[1]);
  }

  const decryptedPreparedText = outputChars.join('');
  const decryptedPreparedGrouped = groupIntoPairs(decryptedPreparedText);

  const primaryFiller = options.primaryFiller || 'X';
  const fallbackFiller = options.fallbackFiller || 'Q';

  const heuristic = estimateOriginalFromPrepared(
    decryptedPreparedText,
    primaryFiller,
    fallbackFiller
  );

  return {
    originalCiphertext: ciphertext,
    normalizedCiphertext: normalized,
    digraphs,
    keySquare,
    decryptedPreparedText,
    decryptedPreparedGrouped,
    estimatedOriginalText: heuristic.estimatedText,
    traces,
    hasTrailingPaddingRemoved: heuristic.hasTrailingRemoved,
    heuristicFillersRemovedCount: heuristic.removedFillersCount,
    timestamp: Date.now(),
  };
}
