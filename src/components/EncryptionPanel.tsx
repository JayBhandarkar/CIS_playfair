import React, { useState } from 'react';
import {
  Lock,
  Copy,
  Download,
  Trash2,
  Sparkles,
  Check,
  AlertCircle,
  HelpCircle,
  FileText,
  Sliders,
} from 'lucide-react';
import { EncryptionResult, KeySquareResult } from '../types/playfair';
import { LetterPairDisplay } from './LetterPairDisplay';
import { TransformationViewer } from './TransformationViewer';
import { copyToClipboard, downloadTextFile } from '../utils/formatters';

interface EncryptionPanelProps {
  plaintext: string;
  onChangePlaintext: (text: string) => void;
  onEncrypt: () => void;
  encryptionResult: EncryptionResult | null;
  keySquare: KeySquareResult;
  error: string | null;
}

export const EncryptionPanel: React.FC<EncryptionPanelProps> = ({
  plaintext,
  onChangePlaintext,
  onEncrypt,
  encryptionResult,
  keySquare,
  error,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedTraceIdx, setSelectedTraceIdx] = useState<number>(0);

  const handleCopyText = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleDownload = () => {
    if (!encryptionResult) return;
    const content = `PLAYFAIR CIPHER ENCRYPTION REPORT
Generated at: ${new Date(encryptionResult.timestamp).toLocaleString()}
Key Phrase: ${keySquare.normalizedKeyword}

--- ORIGINAL PLAINTEXT ---
${encryptionResult.originalPlaintext}

--- PREPARED PLAINTEXT ---
Normalized: ${encryptionResult.prepared.normalizedText}
Digraphs: ${encryptionResult.prepared.digraphs.join(' ')}
Prepared Text: ${encryptionResult.prepared.preparedText}
Fillers Inserted: ${encryptionResult.prepared.fillerCount}

--- CIPHERTEXT ---
Grouped (Digraphs): ${encryptionResult.ciphertextGrouped}
Compact: ${encryptionResult.ciphertextCompact}

--- STEP TRACE ---
${encryptionResult.traces
  .map(
    (t, i) =>
      `Pair #${i + 1} [${t.inputPair.join('')}] -> [${t.outputPair.join('')}] (${t.rule}): ${t.explanation}`
  )
  .join('\n')}
`;
    downloadTextFile(`playfair_encrypted_${Date.now()}.txt`, content);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Panel: Plaintext Input */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-border">
            <label className="flex items-center gap-2 text-sm font-bold text-navy-900">
              <FileText className="w-4 h-4 text-primary" />
              <span>Plaintext Input</span>
            </label>
            <span className="text-xs font-mono text-slate-muted">
              {plaintext.length} char{plaintext.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={5}
              value={plaintext}
              onChange={(e) => onChangePlaintext(e.target.value)}
              placeholder="Enter message to encrypt (e.g. INSTRUMENTS, BALLOON, DEFEND THE EAST WALL)..."
              className="w-full p-3.5 rounded-xl border border-slate-border focus:border-primary focus:ring-2 focus:ring-primary-light bg-slate-50/50 font-mono text-sm leading-relaxed outline-none transition-all resize-y"
            />
            {plaintext && (
              <button
                type="button"
                onClick={() => onChangePlaintext('')}
                className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-navy-900 rounded-lg hover:bg-slate-light transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Educational rules notice */}
          <div className="p-3 rounded-xl bg-slate-light border border-slate-border text-xs text-slate-muted space-y-1.5">
            <div className="flex items-center gap-1.5 font-medium text-navy-800">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Playfair Preprocessing Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              <li>Converts to uppercase & strips spaces and punctuation</li>
              <li>Replaces 'J' with 'I' (standard 25-cell convention)</li>
              <li>Inserts filler 'X' (or fallback 'Q') between identical pairs</li>
              <li>Appends filler 'X' if final pair has only one letter</li>
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
              onClick={onEncrypt}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-card transition-all active:scale-[0.98]"
            >
              <Lock className="w-4 h-4" />
              <span>Encrypt Plaintext</span>
            </button>
            <button
              type="button"
              onClick={() => onChangePlaintext('INSTRUMENTS')}
              className="px-3.5 py-3 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-xl shadow-subtle transition-colors"
              title="Load standard test vector plaintext"
            >
              Standard
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Encryption Output */}
      <div className="lg:col-span-7 space-y-4">
        {encryptionResult ? (
          <>
            {/* Output Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-navy-900 text-sm sm:text-base">
                    Ciphertext Output
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText(encryptionResult.ciphertextCompact, 'compact')}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors"
                  >
                    {copied === 'compact' ? (
                      <Check className="w-3.5 h-3.5 text-teal" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied === 'compact' ? 'Copied' : 'Copy Compact'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-lg shadow-subtle transition-colors"
                    title="Download encryption report"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>

              {/* Grouped Ciphertext Display */}
              <div className="p-4 rounded-xl bg-slate-light border border-slate-border space-y-2">
                <span className="text-[11px] font-semibold text-slate-muted uppercase tracking-wider">
                  Grouped Digraphs (Pairs)
                </span>
                <p className="font-mono text-xl sm:text-2xl font-bold text-navy-900 tracking-widest break-all select-all">
                  {encryptionResult.ciphertextGrouped}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-muted pt-1">
                  <span>Compact: <strong className="font-mono text-primary font-bold">{encryptionResult.ciphertextCompact}</strong></span>
                  <span>{encryptionResult.prepared.digraphs.length} digraph pair{encryptionResult.prepared.digraphs.length !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Prepared Plaintext & Digraphs Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy-800">
                    Prepared Plaintext Digraphs (Click pair to inspect):
                  </span>
                  {encryptionResult.prepared.fillerCount > 0 && (
                    <span className="text-[11px] font-medium text-amber-600">
                      Inserted {encryptionResult.prepared.fillerCount} filler letter(s)
                    </span>
                  )}
                </div>
                <LetterPairDisplay
                  prepared={encryptionResult.prepared}
                  selectedPairIndex={selectedTraceIdx}
                  onSelectPair={(idx) => setSelectedTraceIdx(idx)}
                />
              </div>
            </div>

            {/* Individual Pair Transformation Detail */}
            {encryptionResult.traces[selectedTraceIdx] && (
              <TransformationViewer
                trace={encryptionResult.traces[selectedTraceIdx]}
                currentStep={selectedTraceIdx}
                totalSteps={encryptionResult.traces.length}
              />
            )}
          </>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-border text-center text-slate-muted flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-light flex items-center justify-center text-slate-400">
              <Lock className="w-6 h-6" />
            </div>
            <p className="font-medium text-navy-800 text-sm">No Ciphertext Generated</p>
            <p className="text-xs max-w-sm">
              Enter your plaintext message in the left panel and click <strong>Encrypt Plaintext</strong> to see the step-by-step digraph encryption.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
