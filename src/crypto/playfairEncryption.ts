import { DigraphTransformationTrace, EncryptionResult, KeySquareResult } from '../types/playfair';
import { generateKeySquare } from './keySquare';
import { preparePlaintext } from './plaintextPreparation';
import { transformDigraph } from './transformationRules';
import { groupIntoPairs } from '../utils/formatters';
import { validatePlaintext } from '../utils/validation';

export function encryptPlayfair(
  plaintext: string,
  keyOrSquare: string | KeySquareResult,
  options?: { primaryFiller?: string; fallbackFiller?: string }
): EncryptionResult {
  const keySquare = typeof keyOrSquare === 'string' ? generateKeySquare(keyOrSquare) : keyOrSquare;

  if (!keySquare.isValid) {
    throw new Error(keySquare.errorMessage || 'Invalid key square');
  }

  const textVal = validatePlaintext(plaintext);
  if (!textVal.isValid) {
    throw new Error(textVal.message || 'Invalid plaintext');
  }

  const prepared = preparePlaintext(plaintext, options);
  const traces: DigraphTransformationTrace[] = [];
  const outputChars: string[] = [];

  for (let idx = 0; idx < prepared.digraphs.length; idx++) {
    const pair = prepared.digraphs[idx];
    const char1 = pair[0];
    const char2 = pair[1];

    const trace = transformDigraph(
      [char1, char2],
      keySquare.matrix,
      keySquare.letterPositions,
      'encrypt',
      idx
    );

    traces.push(trace);
    outputChars.push(trace.outputPair[0], trace.outputPair[1]);
  }

  const ciphertextCompact = outputChars.join('');
  const ciphertextGrouped = groupIntoPairs(ciphertextCompact);

  return {
    originalPlaintext: plaintext,
    prepared,
    keySquare,
    ciphertextCompact,
    ciphertextGrouped,
    traces,
    timestamp: Date.now(),
  };
}
