import { normalizeText } from './textNormalization';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  warning?: string;
}

export function validateKeyword(keyword: string): ValidationResult {
  if (!keyword || keyword.trim().length === 0) {
    return {
      isValid: false,
      message: 'Key phrase cannot be empty. Please enter at least one alphabetic letter.',
    };
  }

  const { normalized, replacedJCount } = normalizeText(keyword);

  if (normalized.length === 0) {
    return {
      isValid: false,
      message: 'Key phrase must contain at least one valid English alphabet letter (A-Z).',
    };
  }

  let warning: string | undefined;
  if (replacedJCount > 0) {
    warning = `Note: The letter 'J' was converted to 'I' (${replacedJCount} occurrence${replacedJCount > 1 ? 's' : ''}) in accordance with Playfair 5×5 rules.`;
  } else if (/[^A-Za-z\s]/.test(keyword)) {
    warning = 'Non-alphabetic characters (numbers, punctuation) were automatically ignored.';
  }

  return { isValid: true, warning };
}

export function validatePlaintext(plaintext: string): ValidationResult {
  if (!plaintext || plaintext.trim().length === 0) {
    return {
      isValid: false,
      message: 'Plaintext input is empty. Please enter text to encrypt.',
    };
  }

  const { normalized, replacedJCount } = normalizeText(plaintext);

  if (normalized.length === 0) {
    return {
      isValid: false,
      message: 'Plaintext contains no alphabetic characters. Please enter valid text.',
    };
  }

  let warning: string | undefined;
  if (replacedJCount > 0) {
    warning = `'J' was automatically converted to 'I' in ${replacedJCount} position${replacedJCount > 1 ? 's' : ''}.`;
  }

  return { isValid: true, warning };
}

export function validateCiphertext(ciphertext: string): ValidationResult {
  if (!ciphertext || ciphertext.trim().length === 0) {
    return {
      isValid: false,
      message: 'Ciphertext input is empty. Please enter ciphertext to decrypt.',
    };
  }

  const { normalized, replacedJCount } = normalizeText(ciphertext);

  if (normalized.length === 0) {
    return {
      isValid: false,
      message: 'Ciphertext contains no alphabetic characters.',
    };
  }

  if (normalized.length % 2 !== 0) {
    return {
      isValid: false,
      message: `Invalid ciphertext length: Playfair ciphertext must contain an even number of letters (currently ${normalized.length} letters). Each digraph must consist of 2 letters.`,
    };
  }

  let warning: string | undefined;
  if (replacedJCount > 0) {
    warning = `'J' was found and replaced with 'I'. Standard Playfair ciphertext only uses 25 alphabet letters.`;
  }

  return { isValid: true, warning };
}
