import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { KeySquareResult } from '../types/playfair';
import { formatMatrixAsText, copyToClipboard } from '../utils/formatters';

interface KeySquareProps {
  keySquare: KeySquareResult;
  highlightedCoords?: { row: number; col: number; role?: string }[];
  interactiveSelection?: boolean;
  onCellClick?: (letter: string, row: number, col: number) => void;
  selectedLetters?: string[];
  size?: 'sm' | 'md' | 'lg';
}

export const KeySquare: React.FC<KeySquareProps> = ({
  keySquare,
  highlightedCoords = [],
  interactiveSelection = false,
  onCellClick,
  selectedLetters = [],
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!keySquare.isValid) return;
    const text = formatMatrixAsText(keySquare.matrix);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCellHighlight = (r: number, c: number, letter: string) => {
    const isSelected = selectedLetters.includes(letter);
    if (isSelected) {
      return 'bg-amber text-white font-bold ring-2 ring-amber/50 shadow-md';
    }

    const hl = highlightedCoords.find((h) => h.row === r && h.col === c);
    if (hl) {
      if (hl.role === 'input-1' || hl.role === 'input-2') {
        return 'bg-primary text-white font-bold shadow-md ring-2 ring-primary/40 scale-105';
      }
      if (hl.role === 'output-1' || hl.role === 'output-2') {
        return 'bg-teal text-white font-bold shadow-md ring-2 ring-teal/40 scale-105';
      }
      return 'bg-indigo-100 text-primary font-semibold ring-1 ring-primary';
    }

    // Default styles: keyword letters vs remaining alphabet
    const cellData = keySquare.cells.find((cell) => cell.row === r && cell.col === c);
    if (cellData?.isKeywordLetter) {
      return 'bg-indigo-50/80 text-primary font-semibold border-indigo-200 hover:bg-indigo-100/80';
    }

    return 'bg-slate-50 text-navy-800 hover:bg-slate-100/90 border-slate-200';
  };

  const cellSizeClasses = {
    sm: 'w-10 h-10 text-xs sm:w-11 sm:h-11 sm:text-sm',
    md: 'w-12 h-12 text-sm sm:w-14 sm:h-14 sm:text-base',
    lg: 'w-14 h-14 text-base sm:w-16 sm:h-16 sm:text-lg',
  }[size];

  if (!keySquare.isValid) {
    return (
      <div className="p-6 bg-slate-light border border-dashed border-slate-border rounded-xl text-center text-slate-muted text-sm">
        <p className="font-medium text-navy-800 mb-1">Matrix Not Available</p>
        <p className="text-xs">{keySquare.errorMessage || 'Please enter a valid key phrase.'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* 5x5 Matrix Grid */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-border shadow-subtle">
        {/* Column Index Headers */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-1.5 text-center text-[11px] font-semibold text-slate-400 select-none">
          <div className="w-6 h-6 flex items-center justify-center text-[10px] text-slate-300">R\C</div>
          {[1, 2, 3, 4, 5].map((colNum) => (
            <div key={colNum} className="flex items-center justify-center font-mono">
              c{colNum}
            </div>
          ))}
        </div>

        {/* Matrix Rows with Row index */}
        <div className="space-y-1.5 sm:space-y-2">
          {keySquare.matrix.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-6 gap-1.5 sm:gap-2 items-center">
              {/* Row Header */}
              <div className="w-6 h-full flex items-center justify-center text-[11px] font-semibold text-slate-400 font-mono select-none">
                r{rIdx + 1}
              </div>

              {/* 5 Cells */}
              {row.map((letter, cIdx) => {
                const highlightClass = getCellHighlight(rIdx, cIdx, letter);
                const isI = letter === 'I';

                return (
                  <button
                    key={cIdx}
                    type="button"
                    disabled={!interactiveSelection}
                    onClick={() => onCellClick && onCellClick(letter, rIdx, cIdx)}
                    className={`${cellSizeClasses} relative flex flex-col items-center justify-center rounded-xl border transition-all duration-200 select-none ${highlightClass} ${
                      interactiveSelection ? 'cursor-pointer active:scale-95' : 'cursor-default'
                    }`}
                    title={`Letter: ${isI ? 'I / J' : letter} (Row ${rIdx + 1}, Col ${cIdx + 1})`}
                  >
                    <span className="font-mono tracking-wide leading-none">
                      {isI ? 'I/J' : letter}
                    </span>
                    <span className="absolute bottom-1 right-1 text-[9px] text-slate-400/80 font-mono leading-none hidden sm:block">
                      {rIdx + 1},{cIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Matrix Utilities & Legend */}
      <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-muted px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-50 border border-indigo-200" />
            <span className="text-[11px]">Keyword Letter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200" />
            <span className="text-[11px]">Alphabet Fill</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg text-xs font-medium shadow-subtle transition-colors"
          title="Copy 5x5 matrix to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Matrix' : 'Copy Matrix'}</span>
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
        <Info className="w-3 h-3 text-slate-400 flex-shrink-0" />
        <span>Convention: 'I' and 'J' share cell (row 3, col 4 or wherever I is positioned).</span>
      </div>
    </div>
  );
};
