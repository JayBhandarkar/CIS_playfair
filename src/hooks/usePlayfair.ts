import { useState, useMemo, useCallback } from 'react';
import { DecryptionResult, EncryptionResult, KeySquareResult } from '../types/playfair';
import { generateKeySquare } from '../crypto/keySquare';
import { encryptPlayfair } from '../crypto/playfairEncryption';
import { decryptPlayfair } from '../crypto/playfairDecryption';
import { validateKeyword, validatePlaintext, validateCiphertext } from '../utils/validation';

export function usePlayfair() {
  const [keyword, setKeyword] = useState<string>('MONARCHY');
  const [plaintext, setPlaintext] = useState<string>('INSTRUMENTS');
  const [ciphertextInput, setCiphertextInput] = useState<string>('GATLMZCLRQXA');

  const [encryptionResult, setEncryptionResult] = useState<EncryptionResult | null>(() => {
    try {
      return encryptPlayfair('INSTRUMENTS', 'MONARCHY');
    } catch {
      return null;
    }
  });

  const [decryptionResult, setDecryptionResult] = useState<DecryptionResult | null>(() => {
    try {
      return decryptPlayfair('GATLMZCLRQXA', 'MONARCHY');
    } catch {
      return null;
    }
  });

  const [encError, setEncError] = useState<string | null>(null);
  const [decError, setDecError] = useState<string | null>(null);

  // Generate Key Square whenever keyword changes
  const keySquare: KeySquareResult = useMemo(() => {
    return generateKeySquare(keyword);
  }, [keyword]);

  const keyValidation = useMemo(() => {
    return validateKeyword(keyword);
  }, [keyword]);

  const handleSetKeyword = useCallback((newKey: string) => {
    setKeyword(newKey);
    setEncError(null);
    setDecError(null);
  }, []);

  const handleEncrypt = useCallback((customPlaintext?: string, customKey?: string) => {
    const textToUse = customPlaintext !== undefined ? customPlaintext : plaintext;
    const keyToUse = customKey !== undefined ? customKey : keyword;

    const keyVal = validateKeyword(keyToUse);
    if (!keyVal.isValid) {
      setEncError(keyVal.message || 'Invalid key phrase');
      return null;
    }

    const textVal = validatePlaintext(textToUse);
    if (!textVal.isValid) {
      setEncError(textVal.message || 'Invalid plaintext');
      return null;
    }

    try {
      const result = encryptPlayfair(textToUse, keyToUse);
      setEncryptionResult(result);
      setCiphertextInput(result.ciphertextCompact);
      setEncError(null);
      return result;
    } catch (err: any) {
      setEncError(err.message || 'Encryption failed');
      return null;
    }
  }, [plaintext, keyword]);

  const handleDecrypt = useCallback((customCiphertext?: string, customKey?: string) => {
    const textToUse = customCiphertext !== undefined ? customCiphertext : ciphertextInput;
    const keyToUse = customKey !== undefined ? customKey : keyword;

    const keyVal = validateKeyword(keyToUse);
    if (!keyVal.isValid) {
      setDecError(keyVal.message || 'Invalid key phrase');
      return null;
    }

    const textVal = validateCiphertext(textToUse);
    if (!textVal.isValid) {
      setDecError(textVal.message || 'Invalid ciphertext');
      return null;
    }

    try {
      const result = decryptPlayfair(textToUse, keyToUse);
      setDecryptionResult(result);
      setDecError(null);
      return result;
    } catch (err: any) {
      setDecError(err.message || 'Decryption failed');
      return null;
    }
  }, [ciphertextInput, keyword]);

  const loadExample = useCallback((exampleKey: string, examplePlain: string) => {
    setKeyword(exampleKey);
    setPlaintext(examplePlain);
    setEncError(null);
    setDecError(null);
    try {
      const enc = encryptPlayfair(examplePlain, exampleKey);
      setEncryptionResult(enc);
      setCiphertextInput(enc.ciphertextCompact);
      const dec = decryptPlayfair(enc.ciphertextCompact, exampleKey);
      setDecryptionResult(dec);
    } catch (err: any) {
      setEncError(err.message);
    }
  }, []);

  const resetAll = useCallback(() => {
    setKeyword('MONARCHY');
    setPlaintext('INSTRUMENTS');
    setCiphertextInput('GATLMZCLRQXA');
    setEncError(null);
    setDecError(null);
    const enc = encryptPlayfair('INSTRUMENTS', 'MONARCHY');
    setEncryptionResult(enc);
    const dec = decryptPlayfair('GATLMZCLRQXA', 'MONARCHY');
    setDecryptionResult(dec);
  }, []);

  return {
    keyword,
    setKeyword: handleSetKeyword,
    plaintext,
    setPlaintext,
    ciphertextInput,
    setCiphertextInput,
    keySquare,
    keyValidation,
    encryptionResult,
    decryptionResult,
    encError,
    decError,
    handleEncrypt,
    handleDecrypt,
    loadExample,
    resetAll,
  };
}
