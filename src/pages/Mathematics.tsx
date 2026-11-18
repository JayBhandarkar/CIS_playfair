import React from 'react';
import {
  Calculator,
  Binary,
  Rows,
  Columns,
  BoxSelect,
  Layers,
  HelpCircle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const Mathematics: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy-900">
              Algorithm & Mathematical Foundations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Formal definitions, modular arithmetic, coordinate formulas, and digraph substitution mechanics.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-primary border border-indigo-200">
          Undergraduate Computer Science Curriculum
        </span>
      </div>

      {/* Coordinate Arithmetic Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-border">
          <Binary className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-navy-900">
            Coordinate-Based Transformation Formulas
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          In a 5×5 Playfair matrix, each cell is represented as a zero-indexed tuple <code className="bg-slate-light px-1.5 py-0.5 rounded font-mono text-primary font-bold">(r, c)</code> where row index <code className="bg-slate-light px-1.5 py-0.5 rounded font-mono">r ∈ {'{0, 1, 2, 3, 4}'}</code> and column index <code className="bg-slate-light px-1.5 py-0.5 rounded font-mono">c ∈ {'{0, 1, 2, 3, 4}'}</code>. Let two input letters have coordinates <code className="bg-slate-light px-1.5 py-0.5 rounded font-mono">(r₁, c₁)</code> and <code className="bg-slate-light px-1.5 py-0.5 rounded font-mono">(r₂, c₂)</code>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rule 1: Same Row */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Rows className="w-4 h-4" />
              <span>Rule 1: Same Row</span>
            </div>
            <p className="text-xs text-slate-600">
              Condition: <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-100 font-mono font-bold">r₁ == r₂ = r</code>
            </p>

            <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-2 text-xs font-mono">
              <p className="text-slate-500 font-sans font-semibold text-[11px]">Encryption (Right Shift):</p>
              <p className="text-primary font-bold">c₁' = (c₁ + 1) mod 5</p>
              <p className="text-primary font-bold">c₂' = (c₂ + 1) mod 5</p>

              <div className="border-t border-slate-100 pt-2 mt-2">
                <p className="text-slate-500 font-sans font-semibold text-[11px]">Decryption (Left Shift):</p>
                <p className="text-teal font-bold">c₁' = (c₁ - 1 + 5) mod 5</p>
                <p className="text-teal font-bold">c₂' = (c₂ - 1 + 5) mod 5</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Adding 5 prior to modulo prevents negative operands in zero-indexed array indexing.
            </p>
          </div>

          {/* Rule 2: Same Column */}
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal/20 space-y-3">
            <div className="flex items-center gap-2 text-teal font-bold text-sm">
              <Columns className="w-4 h-4" />
              <span>Rule 2: Same Column</span>
            </div>
            <p className="text-xs text-slate-600">
              Condition: <code className="bg-white px-1.5 py-0.5 rounded border border-teal/20 font-mono font-bold">c₁ == c₂ = c</code>
            </p>

            <div className="p-3 bg-white rounded-xl border border-teal/20 space-y-2 text-xs font-mono">
              <p className="text-slate-500 font-sans font-semibold text-[11px]">Encryption (Down Shift):</p>
              <p className="text-teal font-bold">r₁' = (r₁ + 1) mod 5</p>
              <p className="text-teal font-bold">r₂' = (r₂ + 1) mod 5</p>

              <div className="border-t border-slate-100 pt-2 mt-2">
                <p className="text-slate-500 font-sans font-semibold text-[11px]">Decryption (Up Shift):</p>
                <p className="text-primary font-bold">r₁' = (r₁ - 1 + 5) mod 5</p>
                <p className="text-primary font-bold">r₂' = (r₂ - 1 + 5) mod 5</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Wrap-around handles transitions from bottom row (index 4) to top row (index 0).
            </p>
          </div>

          {/* Rule 3: Rectangle Rule */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <BoxSelect className="w-4 h-4" />
              <span>Rule 3: Rectangle Rule</span>
            </div>
            <p className="text-xs text-slate-600">
              Condition: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono font-bold">r₁ ≠ r₂ and c₁ ≠ c₂</code>
            </p>

            <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2 text-xs font-mono">
              <p className="text-slate-500 font-sans font-semibold text-[11px]">Encryption & Decryption (Symmetric):</p>
              <p className="text-amber-900 font-bold">out₁ = (r₁, c₂)</p>
              <p className="text-amber-900 font-bold">out₂ = (r₂, c₁)</p>
              <div className="border-t border-slate-100 pt-2 mt-2 text-[11px] font-sans text-slate-500">
                Notice each letter preserves its row while inheriting the other letter's column.
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              The rectangle rule is self-inverting: applying it twice returns the original pair!
            </p>
          </div>
        </div>
      </div>

      {/* Core Concepts FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-3">
          <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Monoalphabetic vs. Polygraphic (Digraph) Substitution</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Standard monoalphabetic ciphers (e.g. Caesar or simple keyword substitution) substitute single letters, leaving individual letter frequencies intact (e.g. 'E' remains the most frequent ciphertext letter). Playfair is a <strong>digraph substitution cipher</strong>: it substitutes pairs of letters. Because there are 25 × 25 = 625 (or 26 × 26 = 676) possible pairs, the frequency distribution is flattened significantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-3">
          <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Why Digraph Fillers (X / Q) Are Required</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In Playfair, identical letters cannot form a rectangle, nor can they wrap cleanly without collision. If a plaintext contains repeated adjacent letters (such as 'LL' in 'BALLOON'), a non-colliding filler letter like 'X' (or fallback 'Q' if the letter itself is 'X') is inserted between them. Likewise, odd-length messages receive a trailing filler character.
          </p>
        </div>
      </div>
    </div>
  );
};
