import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Rows,
  Columns,
  BoxSelect,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { KeySquareResult } from '../types/playfair';
import { PracticeQuestion } from '../components/PracticeQuestion';

interface ExamplesProps {
  onLoadExample: (keyword: string, plaintext: string) => void;
  keySquare: KeySquareResult;
}

interface ExampleCard {
  id: string;
  title: string;
  keyword: string;
  plaintext: string;
  expectedPrepared: string;
  expectedCiphertext: string;
  focusRule: string;
  description: string;
}

const PRESET_EXAMPLES: ExampleCard[] = [
  {
    id: 'standard',
    title: 'Example 1: Standard Playfair Vector',
    keyword: 'MONARCHY',
    plaintext: 'INSTRUMENTS',
    expectedPrepared: 'IN ST RU ME NT SX',
    expectedCiphertext: 'GATLMZCLRQXA',
    focusRule: 'Composite test vector covering all three transformation rules',
    description:
      'The classic textbook vector: demonstrates I/J positioning, odd-length trailing padding (SX), same row (ST), same column (ME, SX), and rectangle rules (IN, RU, NT).',
  },
  {
    id: 'balloon',
    title: 'Example 2: Duplicate Letter Handling',
    keyword: 'MONARCHY',
    plaintext: 'BALLOON',
    expectedPrepared: 'BA LX LO ON',
    expectedCiphertext: 'IBSUPMNA',
    focusRule: 'Duplicate Adjacent Letter Filler Insertion',
    description:
      'Notice that the consecutive "LL" cannot be encrypted as a pair. A filler character "X" is inserted between them to produce "LX", leaving the second "L" to pair with "O".',
  },
  {
    id: 'hello',
    title: 'Example 3: Odd-Length Word with Double Letter',
    keyword: 'MONARCHY',
    plaintext: 'HELLO',
    expectedPrepared: 'HE LX LO',
    expectedCiphertext: 'CFSUPM',
    focusRule: 'Duplicate L Split & Terminal Odd-Length Padding',
    description:
      'Demonstrates both consecutive letter handling and odd-length padding. "LL" is split into "LX" and the trailing "O" pairs with padding.',
  },
  {
    id: 'jungle',
    title: 'Example 4: I / J Normalization',
    keyword: 'JUNGLE',
    plaintext: 'JUSTICE',
    expectedPrepared: 'IU ST IC EX',
    expectedCiphertext: 'KVTVDABW',
    focusRule: 'I/J Conversion in Keyword and Plaintext',
    description:
      'In both the key "JUNGLE" and plaintext "JUSTICE", "J" is converted to "I" because standard 5×5 matrices have only 25 distinct letter cells.',
  },
  {
    id: 'same-row',
    title: 'Example 5: Same Row Rule & Wrap-Around',
    keyword: 'MONARCHY',
    plaintext: 'STAR',
    expectedPrepared: 'ST AR',
    expectedCiphertext: 'TL RM',
    focusRule: 'Same Row (Shift Right with Wrap)',
    description:
      '"S" and "T" are on row 4 (cols 3 & 4). S shifts right to T, and T wraps around to column 0 ("L"). "A" and "R" in row 1 also shift right.',
  },
  {
    id: 'same-col',
    title: 'Example 6: Same Column Rule & Wrap-Around',
    keyword: 'MONARCHY',
    plaintext: 'MUSK',
    expectedPrepared: 'MU SK',
    expectedCiphertext: 'CM TI',
    focusRule: 'Same Column (Shift Down with Wrap)',
    description:
      '"M" and "U" share column 0. "M" shifts down to "C", and "U" wraps around from bottom row 4 to top row 0 ("M").',
  },
  {
    id: 'rectangle',
    title: 'Example 7: Rectangle Corner Exchange',
    keyword: 'MONARCHY',
    plaintext: 'KING',
    expectedPrepared: 'KI NG',
    expectedCiphertext: 'IF AN',
    focusRule: 'Rectangle Rule (Column Swapping)',
    description:
      'Letters form opposite corners of a rectangle. Each letter is replaced by the letter on its same row in the opposing letter\'s column.',
  },
];

export const Examples: React.FC<ExamplesProps> = ({ onLoadExample, keySquare }) => {
  const [activeSection, setActiveSection] = useState<'examples' | 'practice'>('examples');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy-900">
              Interactive Examples & Practice Lab
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Load verified historical test vectors or test your skills with interactive exercises.
          </p>
        </div>

        {/* Section switcher */}
        <div className="flex items-center bg-slate-light p-1 rounded-xl border border-slate-border">
          <button
            onClick={() => setActiveSection('examples')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'examples'
                ? 'bg-white text-primary shadow-subtle'
                : 'text-slate-muted hover:text-navy-900'
            }`}
          >
            Verified Examples
          </button>
          <button
            onClick={() => setActiveSection('practice')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'practice'
                ? 'bg-white text-primary shadow-subtle'
                : 'text-slate-muted hover:text-navy-900'
            }`}
          >
            Practice Quiz & Exercises
          </button>
        </div>
      </div>

      {activeSection === 'examples' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRESET_EXAMPLES.map((ex) => (
            <div
              key={ex.id}
              className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col justify-between space-y-4 hover:shadow-card transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary-light">
                    {ex.focusRule}
                  </span>
                  <span className="text-xs font-mono text-slate-muted">Key: {ex.keyword}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-base">{ex.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ex.description}</p>
              </div>

              {/* Data Table Preview */}
              <div className="p-3.5 bg-slate-light rounded-xl border border-slate-border text-xs space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Plaintext:</span>
                  <span className="font-bold text-navy-900">{ex.plaintext}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Prepared Digraphs:</span>
                  <span className="text-primary font-bold">{ex.expectedPrepared}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1">
                  <span className="text-slate-500 font-sans">Expected Ciphertext:</span>
                  <span className="text-teal font-bold">{ex.expectedCiphertext}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onLoadExample(ex.keyword, ex.plaintext)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-light text-navy-900 border border-slate-border text-xs font-bold shadow-subtle transition-colors group"
              >
                <span>Load Into Cipher Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <PracticeQuestion keySquare={keySquare} />
      )}
    </div>
  );
};
