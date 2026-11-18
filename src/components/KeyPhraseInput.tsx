import React from 'react';
import { KeyRound, Sparkles, Trash2, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { KeySquareResult } from '../types/playfair';
import { ValidationResult } from '../utils/validation';

interface KeyPhraseInputProps {
  keyword: string;
  onChangeKeyword: (key: string) => void;
  keySquare: KeySquareResult;
  validation: ValidationResult;
  onReset?: () => void;
  onSetExample?: (key: string) => void;
}

const EXAMPLE_KEYS = [
  { label: 'MONARCHY (Standard)', key: 'MONARCHY' },
  { label: 'PLAYFAIR CIPHER', key: 'PLAYFAIR CIPHER' },
  { label: 'CRYPTOGRAPHY', key: 'CRYPTOGRAPHY' },
  { label: 'GUIDANCE', key: 'GUIDANCE' },
];

export const KeyPhraseInput: React.FC<KeyPhraseInputProps> = ({
  keyword,
  onChangeKeyword,
  keySquare,
  validation,
  onReset,
  onSetExample,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <KeyRound className="w-4 h-4 text-primary" />
          <span>Shared Key Phrase (Keyword)</span>
        </label>
        <span className="text-xs text-slate-muted">Used to construct 5×5 Matrix</span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value.toUpperCase())}
          placeholder="e.g. MONARCHY"
          className={`w-full px-4 py-3 rounded-xl border font-mono tracking-wider text-base sm:text-lg uppercase transition-all duration-200 outline-none ${
            !validation.isValid
              ? 'border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50/20'
              : 'border-slate-border focus:border-primary focus:ring-2 focus:ring-primary-light bg-slate-50/50'
          }`}
        />
        {keyword && (
          <button
            onClick={() => onChangeKeyword('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-light transition-colors"
            title="Clear key phrase"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Validation or Info Messages */}
      {!validation.isValid && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{validation.message}</span>
        </div>
      )}

      {validation.warning && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 text-amber-700 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{validation.warning}</span>
        </div>
      )}

      {/* Normalized Key Details */}
      {keySquare.isValid && (
        <div className="bg-slate-light p-3.5 rounded-xl border border-slate-border text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-slate-muted font-medium">Normalized Keyword:</span>
            <span className="font-mono font-semibold text-navy-900">
              {keySquare.normalizedKeyword || '—'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-slate-muted font-medium">Unique Letters (First row fill):</span>
            <span className="font-mono font-bold text-primary">
              {keySquare.uniqueKeywordLetters.join(' ') || '—'} ({keySquare.uniqueKeywordLetters.length} letters)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="text-slate-muted font-medium">Alphabet Fill Remaining:</span>
            <span className="font-mono text-slate-600">
              {keySquare.remainingAlphabetLetters.join(' ')} ({keySquare.remainingAlphabetLetters.length} letters)
            </span>
          </div>
        </div>
      )}

      {/* Action Controls & Preset Examples */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-muted mr-1">Presets:</span>
          {EXAMPLE_KEYS.map((ex) => (
            <button
              key={ex.key}
              type="button"
              onClick={() => {
                onChangeKeyword(ex.key);
                onSetExample?.(ex.key);
              }}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-light hover:bg-slate-200/80 text-navy-800 font-medium transition-colors"
            >
              {ex.key}
            </button>
          ))}
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        )}
      </div>
    </div>
  );
};
