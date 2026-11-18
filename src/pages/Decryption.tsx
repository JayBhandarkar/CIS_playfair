import React from 'react';
import { DecryptionResult, KeySquareResult } from '../types/playfair';
import { DecryptionPanel } from '../components/DecryptionPanel';
import { KeyRound, Unlock } from 'lucide-react';

interface DecryptionPageProps {
  ciphertext: string;
  onChangeCiphertext: (text: string) => void;
  onDecrypt: () => void;
  decryptionResult: DecryptionResult | null;
  keySquare: KeySquareResult;
  error: string | null;
  keyword: string;
}

export const DecryptionPage: React.FC<DecryptionPageProps> = ({
  ciphertext,
  onChangeCiphertext,
  onDecrypt,
  decryptionResult,
  keySquare,
  error,
  keyword,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Playfair Decryption Simulator</h2>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Reverse ciphertext transformations using the identical shared 5×5 matrix.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-light text-teal border border-teal/20 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Active Key: {keyword}</span>
        </div>
      </div>

      {/* Main Two-Panel Decryption Workspace */}
      <DecryptionPanel
        ciphertext={ciphertext}
        onChangeCiphertext={onChangeCiphertext}
        onDecrypt={onDecrypt}
        decryptionResult={decryptionResult}
        keySquare={keySquare}
        error={error}
      />
    </div>
  );
};
