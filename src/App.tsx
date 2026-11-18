import React, { useState } from 'react';
import { NavigationPage } from './types/playfair';
import { usePlayfair } from './hooks/usePlayfair';
import { Sidebar } from './components/Sidebar';
import { PageHeader } from './components/PageHeader';

// Pages
import { Dashboard } from './pages/Dashboard';
import { KeySquareGenerator } from './pages/KeySquareGenerator';
import { EncryptionPage } from './pages/Encryption';
import { DecryptionPage } from './pages/Decryption';
import { CipherVisualizer } from './pages/CipherVisualizer';
import { Mathematics } from './pages/Mathematics';
import { Examples } from './pages/Examples';
import { Security } from './pages/Security';
import { About } from './pages/About';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const {
    keyword,
    setKeyword,
    plaintext,
    setPlaintext,
    ciphertextInput,
    setCiphertextInput,
    keySquare,
    keyValidation,
    encryptionResult,
    decryptionResult,
    encError,
    decError,
    handleEncrypt,
    handleDecrypt,
    loadExample,
    resetAll,
  } = usePlayfair();

  // Page titles and descriptions
  const pageMetadata: Record<NavigationPage, { title: string; subtitle: string }> = {
    overview: {
      title: 'Lab Overview & Dashboard',
      subtitle: 'Classical Playfair Cryptography Laboratory',
    },
    keysquare: {
      title: '5×5 Key Square Generator',
      subtitle: 'Interactive Matrix Construction and Cell Inspector',
    },
    encryption: {
      title: 'Playfair Encryption Simulator',
      subtitle: 'Digraph Plaintext Preprocessing and Geometric Substitution',
    },
    decryption: {
      title: 'Playfair Decryption Simulator',
      subtitle: 'Reverse Matrix Transformation & Exact Prepared Text Recovery',
    },
    visualizer: {
      title: 'Interactive Cipher Visualizer',
      subtitle: 'Animated Step-by-Step Algorithm Traces & Coordinate Highlighting',
    },
    mathematics: {
      title: 'Algorithm & Mathematical Foundations',
      subtitle: 'Modular Arithmetic, Coordinate Formulas & Classical Cryptanalysis',
    },
    examples: {
      title: 'Historical Examples & Practice',
      subtitle: 'Verified Test Vectors, Rule Identification & Interactive Quiz',
    },
    security: {
      title: 'Cryptanalysis & Security Evaluation',
      subtitle: 'Digraph Frequency Vulnerabilities & Algorithm Comparison',
    },
    about: {
      title: 'About PLAYFAIR CIPHER LAB',
      subtitle: 'Academic Educational Simulator Specifications',
    },
  };

  const currentMeta = pageMetadata[currentPage];

  return (
    <div className="min-h-screen bg-background text-navy-800 flex">
      {/* Primary Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={(page) => setCurrentPage(page)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Compact Page Header */}
        <PageHeader
          currentPage={currentPage}
          onOpenMobile={() => setIsMobileSidebarOpen(true)}
          onResetAll={resetAll}
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
        />

        {/* Dynamic Page Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentPage === 'overview' && (
            <Dashboard
              onNavigate={(page) => setCurrentPage(page)}
              keySquare={keySquare}
              encryptionResult={encryptionResult}
              decryptionResult={decryptionResult}
              keyword={keyword}
            />
          )}

          {currentPage === 'keysquare' && (
            <KeySquareGenerator
              keyword={keyword}
              onChangeKeyword={setKeyword}
              keySquare={keySquare}
              validation={keyValidation}
              onReset={() => setKeyword('MONARCHY')}
              onSetExample={(k) => setKeyword(k)}
            />
          )}

          {currentPage === 'encryption' && (
            <EncryptionPage
              plaintext={plaintext}
              onChangePlaintext={setPlaintext}
              onEncrypt={() => handleEncrypt()}
              encryptionResult={encryptionResult}
              keySquare={keySquare}
              error={encError}
              keyword={keyword}
            />
          )}

          {currentPage === 'decryption' && (
            <DecryptionPage
              ciphertext={ciphertextInput}
              onChangeCiphertext={setCiphertextInput}
              onDecrypt={() => handleDecrypt()}
              decryptionResult={decryptionResult}
              keySquare={keySquare}
              error={decError}
              keyword={keyword}
            />
          )}

          {currentPage === 'visualizer' && (
            <CipherVisualizer
              encryptionResult={encryptionResult}
              decryptionResult={decryptionResult}
              keySquare={keySquare}
              keyword={keyword}
            />
          )}

          {currentPage === 'mathematics' && <Mathematics />}

          {currentPage === 'examples' && (
            <Examples
              onLoadExample={(k, p) => {
                loadExample(k, p);
                setCurrentPage('encryption');
              }}
              keySquare={keySquare}
            />
          )}

          {currentPage === 'security' && <Security />}

          {currentPage === 'about' && <About />}
        </main>
      </div>
    </div>
  );
}

export default App;
