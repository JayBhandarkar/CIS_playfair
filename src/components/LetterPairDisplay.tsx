import React from 'react';
import { PreparedPlaintextResult } from '../types/playfair';

interface LetterPairDisplayProps {
  prepared: PreparedPlaintextResult;
  selectedPairIndex?: number;
  onSelectPair?: (index: number) => void;
}

export const LetterPairDisplay: React.FC<LetterPairDisplayProps> = ({
  prepared,
  selectedPairIndex,
  onSelectPair,
}) => {
  if (!prepared.digraphs || prepared.digraphs.length === 0) {
    return <span className="text-slate-muted italic text-xs">No digraphs generated yet</span>;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {prepared.digraphs.map((pair, idx) => {
        const step = prepared.steps[idx];
        const isSelected = selectedPairIndex === idx;
        const hasFiller = step?.fillerInserted;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPair && onSelectPair(idx)}
            className={`group relative flex items-center px-3 py-1.5 rounded-xl border font-mono text-sm tracking-wider transition-all duration-150 ${
              isSelected
                ? 'bg-primary text-white font-bold ring-2 ring-primary/40 shadow-sm border-primary scale-105'
                : 'bg-white hover:bg-slate-light text-navy-800 border-slate-border shadow-subtle'
            } ${onSelectPair ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span>{pair[0]}</span>
            <span
              className={`${
                hasFiller
                  ? isSelected
                    ? 'text-amber-200 underline font-black'
                    : 'text-amber-600 font-bold underline'
                  : ''
              }`}
              title={
                hasFiller
                  ? `Filler character '${pair[1]}' was inserted (${step.reason === 'duplicate_filler' ? 'repeated letter' : 'odd-length padding'})`
                  : undefined
              }
            >
              {pair[1]}
            </span>

            {/* Subscript pair index */}
            <span
              className={`ml-1.5 text-[10px] leading-none ${
                isSelected ? 'text-primary-light' : 'text-slate-400'
              }`}
            >
              #{idx + 1}
            </span>

            {/* Little indicator dot if filler character is present */}
            {hasFiller && (
              <span
                className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 ${
                  isSelected ? 'border-primary bg-amber' : 'border-white bg-amber'
                }`}
                title="Contains filler character"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
