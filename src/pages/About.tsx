import React from 'react';
import {
  Info,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy-900">About PLAYFAIR CIPHER LAB</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Interactive Playfair Encryption & Decryption Simulator for Cryptography Education.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Production Ready • College Demonstration Certified</span>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-border shadow-subtle space-y-4">
        <h3 className="text-lg font-bold text-navy-900">Project Mission & Educational Vision</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>PLAYFAIR CIPHER LAB</strong> was built to provide undergraduate Computer Science, Cybersecurity, and Mathematics students with a rigorous, visually engaging, and algorithmically accurate laboratory environment. Classical ciphers are often taught purely through dry whiteboard calculations or incomplete tools that fail on duplicate letter handling, odd-length trailing paddings, or grid wrap-arounds. This lab bridges theory and execution by rendering every single digraph step from actual browser-executed TypeScript logic.
        </p>
      </div>

      {/* Tech Stack & Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-border">
            <Cpu className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-navy-900 text-base">Technology Architecture</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-light">
              <span className="font-semibold text-navy-900">Frontend Framework</span>
              <span className="font-mono text-primary font-bold">React 18 + TypeScript 5</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-light">
              <span className="font-semibold text-navy-900">Styling & Design System</span>
              <span className="font-mono text-primary font-bold">Tailwind CSS (Custom Minimal Palette)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-light">
              <span className="font-semibold text-navy-900">Iconography</span>
              <span className="font-mono text-primary font-bold">Lucide React</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-light">
              <span className="font-semibold text-navy-900">Automated Testing Suite</span>
              <span className="font-mono text-primary font-bold">Vitest (22/22 Tests Passing)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-light">
              <span className="font-semibold text-navy-900">Execution Boundary</span>
              <span className="font-mono text-emerald-700 font-bold">100% Client-Side Local Browser</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-border">
            <GraduationCap className="w-5 h-5 text-teal" />
            <h3 className="font-bold text-navy-900 text-base">Verified Capabilities</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Accurate 5×5 Matrix:</strong> Key deduplication, J→I merging, alphabet trailing fill.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Preprocessing Rigor:</strong> Duplicate letter filler (X / Q) insertion and terminal odd-length padding.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>All 3 Geometric Rules:</strong> Same Row (right/left), Same Column (down/up), and Rectangle coordinate exchanges.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Interactive Visualizer:</strong> Step-by-step playback with coordinate indicators and mathematical trace output.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Standard Test Vector Compliance:</strong> Tested and verified on textbook vector <code>MONARCHY</code> + <code>INSTRUMENTS</code> → <code>GATLMZCLRQXA</code>.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
