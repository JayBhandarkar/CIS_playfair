import React from 'react';
import { EncryptionResult, KeySquareResult } from '../types/playfair';
import { EncryptionPanel } from '../components/EncryptionPanel';
import { KeySquare } from '../components/KeySquare';
import { KeyRound, Lock, Info } from 'lucide-react';

interface EncryptionPageProps {
  plaintext: string;
  onChangePlaintext: (text: string) => void;
  onEncrypt: () => void;
  encryptionResult: EncryptionResult | null;
  keySquare: KeySquareResult;
  error: string | null;
  keyword: string;
}

export const EncryptionPage: React.FC<EncryptionPageProps> = ({
  plaintext,
  onChangePlaintext,
  onEncrypt,
  encryptionResult,
  keySquare,
  error,
  keyword,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900">Playfair Encryption Simulator</h2>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Transform plaintext messages into ciphertext using the 5×5 shared matrix and digraph geometric rules.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary border border-primary/20 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Active Key: {keyword}</span>
        </div>
      </div>

      {/* Main Two-Panel Encryption Workspace */}
      <EncryptionPanel
        plaintext={plaintext}
        onChangePlaintext={onChangePlaintext}
        onEncrypt={onEncrypt}
        encryptionResult={encryptionResult}
        keySquare={keySquare}
        error={error}
      />
    </div>
  );
};
