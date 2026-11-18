# PLAYFAIR CIPHER LAB – Interactive Playfair Encryption & Decryption Simulator

A complete, professional-grade educational cryptography web application designed for interactive learning, classroom demonstrations, and laboratory presentation of the classical **Playfair Cipher**.

Built with **React 18**, **TypeScript 5**, **Tailwind CSS**, **Lucide Icons**, and **Vitest**. All cryptographic logic executes 100% locally in the browser with zero external API or backend dependencies.

---

## 🌟 Key Features

1. **Persistent Left Sidebar Navigation**:
   - Collapsible desktop rail and responsive mobile drawer.
   - 9 dedicated modules: Overview, Key Square Generator, Encryption, Decryption, Cipher Visualizer, Algorithm & Mathematics, Examples & Practice, Security Analysis, and About Project.

2. **Interactive 5×5 Key Square Generator**:
   - Full key phrase normalization, case folding, non-alpha stripping, duplicate letter deduplication, and conventional `J → I` merging.
   - Dynamic 5×5 matrix construction with coordinate inspection `(r, c)`, keyword letter highlighting, and clipboard copy.

3. **Playfair Encryption Simulator**:
   - Preprocessing with consecutive duplicate filler insertion (`X`, fallback `Q`) and terminal odd-length padding.
   - Digraph generation and transformation across all three Playfair geometric rules (Same Row, Same Column, Rectangle).
   - Formats: Grouped digraphs (`GA TL MZ...`) and Compact (`GATLMZ...`) with full step traces and export options.

4. **Playfair Decryption Simulator**:
   - Validates even-length ciphertext pairs and performs reverse matrix transformations.
   - Prominently preserves the exact algorithmic decrypted prepared text (`INSTRUMENTSX`).
   - Provides optional heuristic estimation for cleaned original text with clear educational warnings regarding the inherent ambiguity of filler removal.

5. **Animated Cipher Visualizer**:
   - Step-by-step interactive playback with play/pause, step backward/forward, and speed controls.
   - Highlights active matrix coordinates (`pos1`, `pos2`) and resulting letters (`outPos1`, `outPos2`) in real-time.
   - Displays coordinate-based modular arithmetic formulas for every digraph.

6. **Historical Examples & Interactive Practice**:
   - Pre-loaded textbook vectors (including the standard `MONARCHY` + `INSTRUMENTS` → `GATLMZCLRQXA`).
   - Interactive rule identification exercises (random letter pair challenges).
   - Conceptual cryptography multiple-choice quiz with scoring and explanations.

7. **Cryptanalysis & Security Evaluation**:
   - Detailed comparison matrix: Caesar vs. Playfair vs. AES-256 vs. RSA.
   - Digraph frequency analysis breakdown and why classical ciphers are insecure for modern digital data.

---

## 🧪 Verified Standard Test Vector

- **Keyword**: `MONARCHY`
- **Matrix**:
  ```
  M  O  N  A  R
  C  H  Y  B  D
  E  F  G  I  K
  L  P  Q  S  T
  U  V  W  X  Z
  ```
- **Plaintext**: `INSTRUMENTS`
- **Prepared Digraphs**: `IN  ST  RU  ME  NT  SX`
- **Encrypted Ciphertext**: `GATLMZCLRQXA`
- **Decrypted Prepared Text**: `INSTRUMENTSX`

All 30 unit tests pass with 100% coverage across key square generation, preprocessing, geometric rules, encryption, and decryption.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Automated Unit Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
