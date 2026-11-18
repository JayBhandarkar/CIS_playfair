import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Eye,
  Lock,
  Unlock,
  Sliders,
  Sparkles,
  ArrowRight,
  Rows,
  Columns,
  BoxSelect,
  Layers,
} from 'lucide-react';
import { EncryptionResult, DecryptionResult, KeySquareResult, DigraphTransformationTrace } from '../types/playfair';
import { useCipherVisualizer } from '../hooks/useCipherVisualizer';
import { KeySquare } from '../components/KeySquare';
import { TransformationViewer } from '../components/TransformationViewer';

interface CipherVisualizerProps {
  encryptionResult: EncryptionResult | null;
  decryptionResult: DecryptionResult | null;
  keySquare: KeySquareResult;
  keyword: string;
}

export const CipherVisualizer: React.FC<CipherVisualizerProps> = ({
  encryptionResult,
  decryptionResult,
  keySquare,
  keyword,
}) => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const traces: DigraphTransformationTrace[] =
    mode === 'encrypt'
      ? encryptionResult?.traces || []
      : decryptionResult?.traces || [];

  const {
    currentStep,
    setCurrentStep,
    totalSteps,
    activeTrace,
    isPlaying,
    speedMs,
    setSpeedMs,
    handleNext,
    handlePrev,
    handleReset,
    togglePlay,
  } = useCipherVisualizer(traces, keySquare.matrix);

  // Compute cell coordinates to highlight in KeySquare
  const highlightedCoords = React.useMemo(() => {
    if (!activeTrace) return [];
    const outChar1 = activeTrace.outputPair[0];
    const outChar2 = activeTrace.outputPair[1];

    const outPos1 = keySquare.letterPositions.get(outChar1);
    const outPos2 = keySquare.letterPositions.get(outChar2);

    const list: { row: number; col: number; role: string }[] = [
      { row: activeTrace.pos1.row, col: activeTrace.pos1.col, role: 'input-1' },
      { row: activeTrace.pos2.row, col: activeTrace.pos2.col, role: 'input-2' },
    ];

    if (outPos1) list.push({ row: outPos1.row, col: outPos1.col, role: 'output-1' });
    if (outPos2) list.push({ row: outPos2.row, col: outPos2.col, role: 'output-2' });

    return list;
  }, [activeTrace, keySquare]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy-900">Interactive Cipher Visualizer</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Step-by-step mathematical demonstration of Playfair matrix transformations.
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center bg-slate-light p-1 rounded-xl border border-slate-border">
          <button
            onClick={() => {
              setMode('encrypt');
              handleReset();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'encrypt'
                ? 'bg-white text-primary shadow-subtle'
                : 'text-slate-muted hover:text-navy-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Encryption Steps</span>
          </button>
          <button
            onClick={() => {
              setMode('decrypt');
              handleReset();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'decrypt'
                ? 'bg-white text-teal shadow-subtle'
                : 'text-slate-muted hover:text-navy-900'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Decryption Steps</span>
          </button>
        </div>
      </div>

      {traces.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-border text-center text-slate-muted">
          <p className="font-semibold text-navy-900 mb-1">No Trace Available</p>
          <p className="text-xs">
            Please run an encryption or decryption first to generate a full visual trace.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Visual Key Square with Animated Coordinate Highlighting */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 border-b border-slate-border mb-3">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Active 5×5 Matrix Lookup
                </span>
                <span className="text-[11px] font-mono font-semibold text-primary">
                  Key: {keyword}
                </span>
              </div>

              <KeySquare
                keySquare={keySquare}
                size="md"
                highlightedCoords={highlightedCoords}
              />

              {/* Visual Legend */}
              <div className="w-full mt-4 pt-3 border-t border-slate-border grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-primary border border-primary/40 shadow-sm" />
                  <span className="text-slate-600 font-medium">Input Letters ({mode === 'encrypt' ? 'Plain' : 'Cipher'})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-teal border border-teal/40 shadow-sm" />
                  <span className="text-slate-600 font-medium">Output Letters ({mode === 'encrypt' ? 'Cipher' : 'Plain'})</span>
                </div>
              </div>
            </div>

            {/* Plaintext Preparation Trace (When viewing encryption) */}
            {mode === 'encrypt' && encryptionResult && (
              <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-border">
                  <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Plaintext Preparation Steps
                  </span>
                  <span className="text-[11px] text-slate-muted font-mono">
                    {encryptionResult.prepared.fillerCount} Fillers Inserted
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-light">
                    <span className="text-slate-500 font-medium">1. Raw Input:</span>
                    <span className="font-mono font-semibold text-navy-900">
                      {encryptionResult.originalPlaintext}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-light">
                    <span className="text-slate-500 font-medium">2. Uppercase & Filtered:</span>
                    <span className="font-mono font-semibold text-navy-900">
                      {encryptionResult.prepared.normalizedText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-light">
                    <span className="text-slate-500 font-medium">3. Digraphs (with fillers):</span>
                    <span className="font-mono font-bold text-primary">
                      {encryptionResult.prepared.digraphs.join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Step Controls, Digraph Timeline & Detailed Math Explanation */}
          <div className="lg:col-span-7 space-y-4">
            {/* Interactive Player Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-navy-900">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-light font-mono text-slate-600">
                    {activeTrace ? activeTrace.inputPair.join('') : ''} → {activeTrace ? activeTrace.outputPair.join('') : ''}
                  </span>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1.5 text-xs text-slate-muted">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Speed:</span>
                  {[
                    { label: 'Slow', ms: 2500 },
                    { label: 'Normal', ms: 1800 },
                    { label: 'Fast', ms: 1000 },
                  ].map((s) => (
                    <button
                      key={s.ms}
                      onClick={() => setSpeedMs(s.ms)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        speedMs === s.ms
                          ? 'bg-primary text-white font-semibold'
                          : 'bg-slate-light hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-light h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>

              {/* Playback Button Bar */}
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl border border-slate-border hover:bg-slate-light text-navy-800 transition-colors"
                    title="Previous pair step"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-card ${
                      isPlaying
                        ? 'bg-amber text-white hover:bg-amber-600'
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause Playback' : 'Play Animation'}</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl border border-slate-border hover:bg-slate-light text-navy-800 transition-colors"
                    title="Next pair step"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-light border border-slate-border rounded-xl transition-colors shadow-subtle"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Step 1</span>
                </button>
              </div>

              {/* Horizontal Digraph Steps Timeline */}
              <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                {traces.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all ${
                      currentStep === idx
                        ? 'bg-primary text-white shadow-sm ring-2 ring-primary/40'
                        : 'bg-slate-light hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {t.inputPair.join('')}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Transformation Details */}
            {activeTrace && (
              <TransformationViewer
                trace={activeTrace}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
