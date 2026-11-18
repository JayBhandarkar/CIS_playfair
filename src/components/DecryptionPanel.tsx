import React, { useState } from 'react';
import {
  Unlock,
  Copy,
  Download,
  Trash2,
  Check,
  AlertCircle,
  HelpCircle,
  FileText,
  Sparkles,
} from 'lucide-react';
import { DecryptionResult, KeySquareResult } from '../types/playfair';
import { TransformationViewer } from './TransformationViewer';
import { copyToClipboard, downloadTextFile } from '../utils/formatters';

interface DecryptionPanelProps {
  ciphertext: string;
  onChangeCiphertext: (text: string) => void;
  onDecrypt: () => void;
  decryptionResult: DecryptionResult | null;
  keySquare: KeySquareResult;
  error: string | null;
}

export const DecryptionPanel: React.FC<DecryptionPanelProps> = ({
  ciphertext,
  onChangeCiphertext,
  onDecrypt,
  decryptionResult,
  keySquare,
  error,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedTraceIdx, setSelectedTraceIdx] = useState<number>(0);
  const [showEstimated, setShowEstimated] = useState<boolean>(true);

  const handleCopyText = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleDownload = () => {
    if (!decryptionResult) return;
    const content = `PLAYFAIR CIPHER DECRYPTION REPORT
Generated at: ${new Date(decryptionResult.timestamp).toLocaleString()}
Key Phrase: ${keySquare.normalizedKeyword}

--- ORIGINAL CIPHERTEXT ---
${decryptionResult.originalCiphertext}

--- DECRYPTED PREPARED PLAINTEXT (EXACT) ---
Grouped: ${decryptionResult.decryptedPreparedGrouped}
Prepared: ${decryptionResult.decryptedPreparedText}

--- ESTIMATED CLEANED ORIGINAL ---
${decryptionResult.estimatedOriginalText}
(Note: Cleaned via heuristic. In Playfair, filler removal is mathematically ambiguous if the original text legitimately contained X or Q.)

--- STEP TRACE ---
${decryptionResult.traces
  .map(
    (t, i) =>
      `Pair #${i + 1} [${t.inputPair.join('')}] -> [${t.outputPair.join('')}] (${t.rule}): ${t.explanation}`
  )
  .join('\n')}
`;
    downloadTextFile(`playfair_decrypted_${Date.now()}.txt`, content);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Panel: Ciphertext Input */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-border">
            <label className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <Unlock className="w-4 h-4 text-primary" />
              <span>Ciphertext Input</span>
            </label>
            <span className="text-xs font-mono text-slate-muted">
              {ciphertext.length} char{ciphertext.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={5}
              value={ciphertext}
              onChange={(e) => onChangeCiphertext(e.target.value.toUpperCase())}
              placeholder="Enter Playfair ciphertext (e.g. GATLMZCLRQXA or GA TL MZ CL RQ XA)..."
              className="w-full p-3.5 rounded-xl border border-slate-border focus:border-primary focus:ring-2 focus:ring-primary-light bg-slate-50/50 font-mono text-sm leading-relaxed outline-none transition-all resize-y uppercase tracking-wider"
            />
            {ciphertext && (
              <button
                type="button"
                onClick={() => onChangeCiphertext('')}
                className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-light transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Validation note */}
          <div className="p-3 rounded-xl bg-slate-light border border-slate-border text-xs text-slate-muted space-y-1.5">
            <div className="flex items-center gap-1.5 font-medium text-navy-800">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Decryption Integrity Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              <li>Ciphertext MUST have an even letter count (digraph pairs)</li>
              <li>Same Row: Shifts 1 position left (with row wrap-around)</li>
              <li>Same Column: Shifts 1 position up (with col wrap-around)</li>
              <li>Rectangle: Exchanging columns restores original letter pairs</li>
            </ul>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onDecrypt}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-card transition-all active:scale-[0.98]"
            >
              <Unlock className="w-4 h-4" />
              <span>Decrypt Ciphertext</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeCiphertext('GATLMZCLRQXA')}
              className="px-3.5 py-3 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-xl shadow-subtle transition-colors"
              title="Load standard test vector ciphertext"
            >
              Standard
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Decryption Output */}
      <div className="lg:col-span-7 space-y-4">
        {decryptionResult ? (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-navy-900 text-sm sm:text-base">
                    Decrypted Plaintext
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleCopyText(decryptionResult.decryptedPreparedText, 'prepared')
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors"
                  >
                    {copied === 'prepared' ? (
                      <Check className="w-3.5 h-3.5 text-teal" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied === 'prepared' ? 'Copied' : 'Copy Prepared'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors"
                    title="Download decryption report"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>

              {/* Exact Decrypted Prepared Text */}
              <div className="p-4 rounded-xl bg-slate-light border border-slate-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-muted uppercase tracking-wider">
                    Exact Recovered Prepared Text (Algorithmic Truth)
                  </span>
                  <span className="text-[11px] font-mono text-primary font-semibold">
                    {decryptionResult.digraphs.length} Digraph Pairs
                  </span>
                </div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-navy-900 tracking-wider break-all select-all">
                  {decryptionResult.decryptedPreparedText}
                </p>
                <p className="font-mono text-xs text-slate-muted">
                  Grouped: {decryptionResult.decryptedPreparedGrouped}
                </p>
              </div>

              {/* Optional Heuristic Cleaned Text */}
              <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-navy-900">
                      Estimated Cleaned Original:
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-muted italic">
                    (Heuristic: Filtered probable fillers)
                  </span>
                </div>

                <p className="font-mono text-lg font-bold text-primary tracking-wide">
                  {decryptionResult.estimatedOriginalText || decryptionResult.decryptedPreparedText}
                </p>

                <div className="flex items-start gap-1.5 text-[11px] text-slate-500 pt-1">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Educational Notice: Standard Playfair decryption produces the prepared text. Removing 'X' or 'Q' is ambiguous because an original message might naturally contain those letters (e.g. "FOX", "TAX", "QUESTION").
                  </span>
                </div>
              </div>

              {/* Digraph selection selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-navy-800">
                  Decrypted Digraph Pairs (Click pair to inspect):
                </span>
                <div className="flex flex-wrap gap-2">
                  {decryptionResult.digraphs.map((pair, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTraceIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl border font-mono text-sm tracking-wider transition-all ${
                        selectedTraceIdx === idx
                          ? 'bg-primary text-white font-bold ring-2 ring-primary/40 shadow-sm border-primary scale-105'
                          : 'bg-white hover:bg-slate-light text-navy-800 border-slate-border shadow-subtle'
                      }`}
                    >
                      <span>{pair}</span>
                      <span className="ml-1.5 text-[10px] opacity-75">#{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Pair Reverse Transformation Detail */}
            {decryptionResult.traces[selectedTraceIdx] && (
              <TransformationViewer
                trace={decryptionResult.traces[selectedTraceIdx]}
                currentStep={selectedTraceIdx}
                totalSteps={decryptionResult.traces.length}
              />
            )}
          </>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-border text-center text-slate-muted flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-light flex items-center justify-center text-slate-400">
              <Unlock className="w-6 h-6" />
            </div>
            <p className="font-medium text-navy-800 text-sm">No Plaintext Recovered</p>
            <p className="text-xs max-w-sm">
              Enter valid even-length Playfair ciphertext in the left panel and click <strong>Decrypt Ciphertext</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
