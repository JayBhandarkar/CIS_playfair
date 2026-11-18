import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Lock,
  Key,
  Database,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
} from 'lucide-react';

export const Security: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-navy-900">
              Cryptanalysis & Security Evaluation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Historical vulnerability assessment, cryptanalytic weaknesses, and comparative analysis with modern cryptography.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200">
          Historical Cipher (Insecure for Modern Use)
        </span>
      </div>

      {/* Primary Security Alert Banner */}
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
        <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>CRITICAL SECURITY NOTICE FOR STUDENTS AND PRACTITIONERS</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          The Playfair Cipher is exclusively an <strong>educational tool</strong>. It was designed in 1854 for battlefield tacticians communicating with paper and pencil. Modern computers can break Playfair ciphertext within seconds using automated simulated annealing, hill climbing, and digraph frequency tables. <strong>Never use Playfair to encrypt passwords, confidential records, or network traffic.</strong>
        </p>
      </div>

      {/* Comparative Analysis Table: Caesar vs Playfair vs AES vs RSA */}
      <div className="bg-white rounded-2xl border border-slate-border shadow-subtle overflow-hidden">
        <div className="p-6 pb-4 border-b border-slate-border">
          <h3 className="font-bold text-navy-900 text-base">
            Cryptographic Algorithm Comparison Matrix
          </h3>
          <p className="text-xs text-slate-muted mt-0.5">
            How Playfair compares across centuries of cryptologic advancement.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-navy-900 border-collapse">
            <thead>
              <tr className="bg-slate-light border-b border-slate-border text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-4">Cipher</th>
                <th className="p-4">Era / Paradigm</th>
                <th className="p-4">Key Space Size</th>
                <th className="p-4">Primary Vulnerability</th>
                <th className="p-4">Modern Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-border font-sans">
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-bold text-navy-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Caesar Cipher</span>
                </td>
                <td className="p-4 text-slate-600">Ancient (~100 BC), Monoalphabetic</td>
                <td className="p-4 font-mono">25 keys (trivial)</td>
                <td className="p-4 text-slate-600">Single-letter frequency analysis & exhaustive search</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold">Trivially Broken</span>
                </td>
              </tr>

              <tr className="bg-indigo-50/30 hover:bg-indigo-50/60 transition-colors">
                <td className="p-4 font-bold text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Playfair Cipher</span>
                </td>
                <td className="p-4 text-slate-600">1854, Classical Digraph Substitution</td>
                <td className="p-4 font-mono">25! ≈ 1.55 × 10²⁵ matrix permutations</td>
                <td className="p-4 text-slate-600">Digraph frequency analysis, known plaintext, matrix structure</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Educational Only</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-bold text-navy-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>AES-256</span>
                </td>
                <td className="p-4 text-slate-600">Modern (2001), Symmetric Block Cipher</td>
                <td className="p-4 font-mono">2²⁵⁶ ≈ 1.15 × 10⁷⁷ states</td>
                <td className="p-4 text-slate-600">Side-channel attacks, implementation flaws (algorithm unbroken)</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Global Gold Standard</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 font-bold text-navy-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  <span>RSA (2048-4096)</span>
                </td>
                <td className="p-4 text-slate-600">Modern (1977), Asymmetric Public Key</td>
                <td className="p-4 font-mono">2048 to 4096-bit primes</td>
                <td className="p-4 text-slate-600">Large integer factorization (threatened by future quantum Shor's)</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal font-semibold">Production Standard</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cryptanalysis Weaknesses Detailed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-2">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-navy-900 text-sm">Digraph Frequency Attacks</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            While Playfair obscures single-letter frequencies, language pairs still exhibit strong statistical bias. In English, digraphs like <strong>TH, HE, IN, ER, AN, RE</strong> occur vastly more often than others. Cryptanalysts use these frequencies to recover matrix cell adjacencies.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-navy-900 text-sm">Matrix Reversibility Artifacts</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            If pair <code className="font-mono">AB</code> encrypts to <code className="font-mono">XY</code>, then in the rectangle rule, pair <code className="font-mono">BA</code> will encrypt to <code className="font-mono">YX</code>. This symmetrical property drastically reduces the effective search space for an attacker.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-border shadow-subtle space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-navy-900 text-sm">Key Distribution Bottleneck</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            As a symmetric cipher, the secret keyword must be communicated across a secure channel beforehand. If an interceptor gains access to the keyword or matrix, all past and future communications are instantly compromised.
          </p>
        </div>
      </div>
    </div>
  );
};
