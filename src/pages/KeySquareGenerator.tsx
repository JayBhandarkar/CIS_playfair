import React, { useState } from 'react';
import {
  Grid3x3,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Info,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { KeySquareResult } from '../types/playfair';
import { KeySquare } from '../components/KeySquare';
import { KeyPhraseInput } from '../components/KeyPhraseInput';
import { ValidationResult } from '../utils/validation';
import { formatMatrixAsText, copyToClipboard } from '../utils/formatters';

interface KeySquareGeneratorProps {
  keyword: string;
  onChangeKeyword: (key: string) => void;
  keySquare: KeySquareResult;
  validation: ValidationResult;
  onReset: () => void;
  onSetExample: (key: string) => void;
}

export const KeySquareGenerator: React.FC<KeySquareGeneratorProps> = ({
  keyword,
  onChangeKeyword,
  keySquare,
  validation,
  onReset,
  onSetExample,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<{
    letter: string;
    row: number;
    col: number;
  } | null>(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header Intro */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900">5×5 Key Square Construction</h2>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Build and inspect the 25-letter shared matrix used for encryption and decryption.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-primary border border-indigo-200">
          <Grid3x3 className="w-4 h-4" />
          <span>Matrix Dimension: 5 Rows × 5 Columns = 25 Cells</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Keyword Input & Validation */}
        <div className="lg:col-span-6 space-y-6">
          <KeyPhraseInput
            keyword={keyword}
            onChangeKeyword={onChangeKeyword}
            keySquare={keySquare}
            validation={validation}
            onReset={onReset}
            onSetExample={onSetExample}
          />

          {/* Detailed Step-by-Step Construction Trace */}
          {keySquare.isValid && (
            <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-border">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-navy-900 text-sm">
                  Algorithmic Construction Breakdown
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Step 1 */}
                <div className="p-3 bg-slate-light rounded-xl border border-slate-border space-y-1">
                  <div className="flex items-center justify-between font-semibold text-navy-900">
                    <span>Step 1: Input Normalization</span>
                    <span className="text-[10px] text-slate-muted uppercase">Uppercase & Filter</span>
                  </div>
                  <p className="text-slate-600">
                    Non-alphabetic characters are removed, and all letters converted to uppercase.
                  </p>
                  <p className="font-mono text-primary font-bold">{keySquare.normalizedKeyword || 'EMPTY'}</p>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-slate-light rounded-xl border border-slate-border space-y-1">
                  <div className="flex items-center justify-between font-semibold text-navy-900">
                    <span>Step 2: J → I Replacement</span>
                    <span className="text-[10px] text-slate-muted uppercase">25-Cell Adaptation</span>
                  </div>
                  <p className="text-slate-600">
                    Any occurrence of 'J' is merged into 'I' so the alphabet fits in 25 cells.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-slate-light rounded-xl border border-slate-border space-y-1">
                  <div className="flex items-center justify-between font-semibold text-navy-900">
                    <span>Step 3: Duplicate Letter Elimination</span>
                    <span className="text-[10px] text-slate-muted uppercase">Uniqueness Guarantee</span>
                  </div>
                  <p className="text-slate-600">
                    Repeated letters in the keyword are removed, preserving only the first occurrence.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1 font-mono">
                    {keySquare.uniqueKeywordLetters.map((l, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-indigo-100 text-primary font-bold">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3 bg-slate-light rounded-xl border border-slate-border space-y-1">
                  <div className="flex items-center justify-between font-semibold text-navy-900">
                    <span>Step 4: Alphabet Completion</span>
                    <span className="text-[10px] text-slate-muted uppercase">Remaining Fill</span>
                  </div>
                  <p className="text-slate-600">
                    Remaining letters of the alphabet (A-Z excluding J) are appended in alphabetical order.
                  </p>
                  <p className="font-mono text-slate-700">
                    {keySquare.remainingAlphabetLetters.join(' ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive 5x5 Key Square Display */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-border mb-4">
              <div>
                <h3 className="font-bold text-navy-900 text-base">Interactive Key Square</h3>
                <p className="text-xs text-slate-muted">Click any cell to inspect its matrix coordinates.</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-light text-teal font-semibold">
                Active 5×5 Matrix
              </span>
            </div>

            <KeySquare
              keySquare={keySquare}
              size="lg"
              interactiveSelection={true}
              selectedLetters={selectedLetter ? [selectedLetter.letter] : []}
              onCellClick={(letter, r, c) => setSelectedLetter({ letter, row: r, col: c })}
            />

            {/* Selected Cell Inspector */}
            {selectedLetter && (
              <div className="w-full mt-6 p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-navy-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary">
                    Selected Cell: '{selectedLetter.letter}'
                  </span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 text-primary font-bold">
                    Coordinate: Row {selectedLetter.row + 1}, Col {selectedLetter.col + 1}
                  </span>
                </div>
                <p className="text-slate-600 pt-1">
                  Zero-indexed: <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-100 font-mono">(r={selectedLetter.row}, c={selectedLetter.col})</code>. In Playfair rule calculations, coordinates are computed modulo 5.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
