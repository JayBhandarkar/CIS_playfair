import React from 'react';
import {
  Shield,
  ArrowRight,
  Lock,
  Unlock,
  Eye,
  Grid3x3,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  KeyRound,
  FileText,
} from 'lucide-react';
import { NavigationPage, EncryptionResult, DecryptionResult, KeySquareResult } from '../types/playfair';
import { KeySquare } from '../components/KeySquare';

interface DashboardProps {
  onNavigate: (page: NavigationPage) => void;
  keySquare: KeySquareResult;
  encryptionResult: EncryptionResult | null;
  decryptionResult: DecryptionResult | null;
  keyword: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  keySquare,
  encryptionResult,
  decryptionResult,
  keyword,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-teal-50/20 rounded-3xl border border-slate-border p-6 sm:p-10 shadow-subtle relative overflow-hidden">
        {/* Subtle decorative background cryptography grid */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.03] pointer-events-none select-none flex items-center justify-center font-mono text-7xl font-bold">
          P L A Y F A I R
        </div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Classical Cryptography Simulator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 tracking-tight leading-tight">
            PLAYFAIR CIPHER LAB
          </h1>

          <p className="text-sm sm:text-base text-slate-muted leading-relaxed">
            Experience the world's first practical digraph substitution cipher. Invented in 1854 by <strong>Charles Wheatstone</strong> and popularized by <strong>Lord Playfair</strong>, this algorithm encrypts pairs of letters across a dynamic 5×5 matrix.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('encryption')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-card transition-all active:scale-[0.98]"
            >
              <Lock className="w-4 h-4" />
              <span>Explore Encryption</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('visualizer')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-light text-navy-800 border border-slate-border text-sm font-semibold shadow-subtle transition-colors"
            >
              <Eye className="w-4 h-4 text-teal" />
              <span>Launch Step Visualizer</span>
            </button>

            <button
              onClick={() => onNavigate('keysquare')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-light text-slate-600 hover:text-navy-900 border border-slate-border text-sm font-medium transition-colors"
            >
              <Grid3x3 className="w-4 h-4" />
              <span>Generate Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Workflow: Encryption & Decryption Pipeline */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-border">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
              Cryptographic Pipeline Architecture
            </h2>
          </div>
          <span className="text-xs text-slate-muted font-mono">Symmetric Shared Matrix</span>
        </div>

        {/* Forward Workflow */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500">Encryption Workflow:</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">1. Key Phrase</span>
              <span className="text-[11px] text-slate-muted font-mono mt-0.5 block truncate">
                "{keyword}"
              </span>
            </div>
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <span className="font-bold text-primary block">2. 5×5 Matrix</span>
              <span className="text-[11px] text-primary/80 block">25 cells (I/J merge)</span>
            </div>
            <div className="p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">3. Preprocessing</span>
              <span className="text-[11px] text-slate-muted block">Split & insert fillers</span>
            </div>
            <div className="p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">4. Digraph Rules</span>
              <span className="text-[11px] text-slate-muted block">Row, Col, Rectangle</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 bg-teal-light rounded-xl border border-teal/30">
              <span className="font-bold text-teal block">5. Ciphertext</span>
              <span className="text-[11px] text-teal/80 font-mono block truncate">
                {encryptionResult?.ciphertextCompact || 'GATLMZ...'}
              </span>
            </div>
          </div>
        </div>

        {/* Reverse Workflow */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-slate-500">Decryption Workflow (Reverse):</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 bg-teal-light rounded-xl border border-teal/30">
              <span className="font-bold text-teal block">1. Ciphertext</span>
              <span className="text-[11px] text-teal/80 block">Even length verification</span>
            </div>
            <div className="p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">2. Digraph Split</span>
              <span className="text-[11px] text-slate-muted block">2-letter ciphertext pairs</span>
            </div>
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <span className="font-bold text-primary block">3. Same Key Square</span>
              <span className="text-[11px] text-primary/80 block">Identical shared secret</span>
            </div>
            <div className="p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">4. Reverse Rules</span>
              <span className="text-[11px] text-slate-muted block">Left, Up, Rectangle</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 bg-slate-light rounded-xl border border-slate-border">
              <span className="font-bold text-navy-900 block">5. Prepared Text</span>
              <span className="text-[11px] text-slate-muted font-mono block truncate">
                {decryptionResult?.decryptedPreparedText || 'INSTRUMENTSX'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Key Cards & Matrix Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Key Square Preview */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-border shadow-subtle flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-border mb-3">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-navy-900 text-sm">Active 5×5 Key Square</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-primary px-2 py-0.5 rounded bg-primary-light">
              Key: {keyword}
            </span>
          </div>

          <KeySquare keySquare={keySquare} size="sm" />

          <button
            onClick={() => onNavigate('keysquare')}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-slate-border hover:bg-slate-light text-navy-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Modify Key Square & View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cipher Status & Core Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-border shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-muted uppercase">Plaintext Status</span>
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <p className="font-mono text-lg font-bold text-navy-900 truncate">
                {encryptionResult?.originalPlaintext || 'INSTRUMENTS'}
              </p>
              <div className="text-[11px] text-slate-muted">
                Digraphs: <span className="font-mono font-semibold text-primary">{encryptionResult?.prepared.digraphs.join(' ')}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-border shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-muted uppercase">Ciphertext Status</span>
                <Lock className="w-4 h-4 text-teal" />
              </div>
              <p className="font-mono text-lg font-bold text-teal truncate">
                {encryptionResult?.ciphertextCompact || 'GATLMZCLRQXA'}
              </p>
              <div className="text-[11px] text-slate-muted">
                Grouped: <span className="font-mono font-semibold text-teal">{encryptionResult?.ciphertextGrouped}</span>
              </div>
            </div>
          </div>

          {/* Key Architectural Characteristics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-3">
            <h3 className="font-bold text-navy-900 text-sm">Key Playfair Characteristics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-light flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Digraph Substitution:</strong> Encrypts letter pairs (26×26 = 676 possibilities) rather than single letters (26).
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-light flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>I/J Shared Cell:</strong> 25-cell limitation requires combining I and J into a single coordinate.
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-light flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Three Geometric Rules:</strong> Same row (shift right/left), same column (shift down/up), or rectangle (swap cols).
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-light flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Symmetric Key:</strong> The sender and recipient share the exact same 5×5 matrix.
                </span>
              </div>
            </div>
          </div>

          {/* Educational Security Warning Notice */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Educational Classical Cipher Warning</p>
              <p className="mt-0.5 leading-relaxed text-amber-800">
                Playfair is a 19th-century pen-and-paper cipher. While historically revolutionary, it is vulnerable to modern digraph frequency analysis and must <strong>never</strong> be used for confidential or modern digital security (use AES-256 or RSA instead).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
