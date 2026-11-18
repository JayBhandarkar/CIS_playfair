import React from 'react';
import { ArrowRight, Rows, Columns, BoxSelect, CheckCircle2 } from 'lucide-react';
import { DigraphTransformationTrace } from '../types/playfair';

interface TransformationViewerProps {
  trace: DigraphTransformationTrace;
  currentStep?: number;
  totalSteps?: number;
}

export const TransformationViewer: React.FC<TransformationViewerProps> = ({
  trace,
  currentStep,
  totalSteps,
}) => {
  const isEncrypt = trace.operation === 'encrypt';

  const ruleConfig = {
    same_row: {
      label: 'Same Row Rule',
      icon: Rows,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description: isEncrypt
        ? 'Letters occupy the same row. Shift 1 step right (wrap at edge).'
        : 'Letters occupy the same row. Shift 1 step left (wrap at edge).',
    },
    same_column: {
      label: 'Same Column Rule',
      icon: Columns,
      color: 'text-teal bg-teal-light border-teal/30',
      description: isEncrypt
        ? 'Letters occupy the same column. Shift 1 step down (wrap at edge).'
        : 'Letters occupy the same column. Shift 1 step up (wrap at edge).',
    },
    rectangle: {
      label: 'Rectangle Rule',
      icon: BoxSelect,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      description: 'Letters form opposing corners of a rectangle. Exchange column coordinates.',
    },
  }[trace.rule];

  const RuleIcon = ruleConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-border p-5 shadow-subtle space-y-4">
      {/* Header with step number & rule badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-border">
        <div className="flex items-center gap-2">
          {currentStep !== undefined && totalSteps !== undefined && (
            <span className="px-2.5 py-1 bg-slate-light text-navy-800 text-xs font-bold rounded-lg font-mono">
              Pair #{currentStep + 1} of {totalSteps}
            </span>
          )}
          <span className="text-xs font-semibold text-slate-muted uppercase tracking-wider">
            {isEncrypt ? 'Encryption Transformation' : 'Decryption Transformation'}
          </span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${ruleConfig.color}`}>
          <RuleIcon className="w-3.5 h-3.5" />
          <span>{ruleConfig.label}</span>
        </div>
      </div>

      {/* Main Pair Transformation Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-light p-4 rounded-xl border border-slate-border">
        {/* Input Pair */}
        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-border shadow-subtle">
          <span className="text-[11px] font-medium text-slate-muted mb-1">
            {isEncrypt ? 'Plaintext Digraph' : 'Ciphertext Digraph'}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-navy-900 tracking-wider">
            <span className="px-2 py-0.5 rounded bg-primary-light text-primary">
              {trace.inputPair[0]}
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-light text-primary">
              {trace.inputPair[1]}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1">
            ({trace.pos1.row + 1},{trace.pos1.col + 1}) & ({trace.pos2.row + 1},{trace.pos2.col + 1})
          </span>
        </div>

        {/* Transformation Flow Arrow & Rule */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-border flex items-center justify-center text-primary shadow-subtle mb-1">
            <ArrowRight className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-navy-800 font-mono">
            {trace.mathFormula}
          </span>
          <span className="text-[11px] text-slate-muted mt-0.5">{ruleConfig.description}</span>
        </div>

        {/* Output Pair */}
        <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-slate-border shadow-subtle">
          <span className="text-[11px] font-medium text-slate-muted mb-1">
            {isEncrypt ? 'Encrypted Pair' : 'Decrypted Pair'}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-2xl font-bold text-teal tracking-wider">
            <span className="px-2 py-0.5 rounded bg-teal-light text-teal">
              {trace.outputPair[0]}
            </span>
            <span className="px-2 py-0.5 rounded bg-teal-light text-teal">
              {trace.outputPair[1]}
            </span>
          </div>
          <span className="text-[11px] text-teal/80 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Transformed
          </span>
        </div>
      </div>

      {/* Step Explanation Text */}
      <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs sm:text-sm text-navy-800 leading-relaxed">
        <p className="font-semibold text-primary mb-0.5">Algorithm Execution Trace:</p>
        <p>{trace.explanation}</p>
      </div>
    </div>
  );
};
