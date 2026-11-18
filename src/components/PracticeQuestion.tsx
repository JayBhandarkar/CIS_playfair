import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Rows,
  Columns,
  BoxSelect,
  Award,
} from 'lucide-react';
import { KeySquareResult } from '../types/playfair';
import { identifyRule, transformDigraph } from '../crypto/transformationRules';

interface PracticeQuestionProps {
  keySquare: KeySquareResult;
}

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const STATIC_QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    question: 'Why are the letters I and J combined in the standard Playfair 5×5 matrix?',
    options: [
      'Because I and J sound similar in ancient Greek',
      'The English alphabet has 26 letters, but a 5×5 matrix only holds 25 cells',
      'To prevent frequency analysis on vowel pairs',
      'Because the inventor Sir Charles Wheatstone disliked the letter J',
    ],
    correctIndex: 1,
    explanation:
      'A 5×5 matrix has 25 cells. Since the English alphabet has 26 letters, one letter must be merged. Conventionally, I and J share one cell.',
  },
  {
    id: 2,
    question: 'What is inserted if a message has duplicate adjacent letters in the same digraph (e.g. LL in "BALLOON")?',
    options: [
      'A space character',
      'A filler character (conventionally X, or fallback Q)',
      'The duplicate letter is simply deleted',
      'A random number 0-9',
    ],
    correctIndex: 1,
    explanation:
      'Playfair encrypts digraph pairs. If both letters are identical (which cannot form a rectangle, row, or column pair properly), a filler character like X is inserted between them.',
  },
  {
    id: 3,
    question: 'In Playfair encryption, how does the Same Row Rule transform letters?',
    options: [
      'Replaces both with the letters directly below them',
      'Replaces each letter with the letter immediately to its right (wrapping around)',
      'Swaps their column coordinates',
      'Replaces each letter with the letter to its left',
    ],
    correctIndex: 1,
    explanation:
      'When both letters lie in the same matrix row, each is replaced by the letter to its immediate right, wrapping to the start of the row if at the end.',
  },
  {
    id: 4,
    question: 'In Playfair decryption, how does the Same Column Rule transform letters?',
    options: [
      'Shifts 1 position downward with wrap-around',
      'Shifts 1 position upward with wrap-around',
      'Exchanges row positions with column positions',
      'Inverts the order of the two letters',
    ],
    correctIndex: 1,
    explanation:
      'Decryption reverses encryption: encryption shifts downward, so decryption shifts upward, wrapping from the top row to the bottom row.',
  },
  {
    id: 5,
    question: 'Why can filler character removal after decryption sometimes be ambiguous?',
    options: [
      'Because the decryption algorithm deletes letters randomly',
      'Because a legitimate word might naturally contain X or Q (e.g. TAX, FOX, QUICK)',
      'Because matrix coordinates change between encryption and decryption',
      'Because modern computers cannot differentiate vowels from consonants',
    ],
    correctIndex: 1,
    explanation:
      'The cipher cannot algorithmically distinguish whether an X was inserted as a filler or was part of the original intended message (like in "TAX" or "FOX"). Therefore, exact decrypted output always retains fillers.',
  },
];

export const PracticeQuestion: React.FC<PracticeQuestionProps> = ({ keySquare }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'quiz'>('rules');

  // Rule Identification exercise state
  const [testPair, setTestPair] = useState<[string, string]>(['S', 'T']);
  const [selectedRuleAnswer, setSelectedRuleAnswer] = useState<string | null>(null);
  const [ruleScore, setRuleScore] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  // Dynamic Rule check for test pair
  const currentPairAnalysis = useMemo(() => {
    if (!keySquare.isValid) return null;
    const [c1, c2] = testPair;
    const pos1 = keySquare.letterPositions.get(c1);
    const pos2 = keySquare.letterPositions.get(c2);
    if (!pos1 || !pos2) return null;

    const actualRule = identifyRule(pos1, pos2);
    const trace = transformDigraph([c1, c2], keySquare.matrix, keySquare.letterPositions, 'encrypt');
    return { pos1, pos2, actualRule, trace };
  }, [keySquare, testPair]);

  const handleSelectRule = (ruleChoice: string) => {
    if (!currentPairAnalysis) return;
    setSelectedRuleAnswer(ruleChoice);
    const isCorrect = ruleChoice === currentPairAnalysis.actualRule;
    setRuleScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleGenerateRandomPair = () => {
    if (!keySquare.isValid) return;
    const letters = keySquare.matrix.flat();
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    let l2 = letters[Math.floor(Math.random() * letters.length)];
    while (l2 === l1) {
      l2 = letters[Math.floor(Math.random() * letters.length)];
    }
    setTestPair([l1, l2]);
    setSelectedRuleAnswer(null);
  };

  const quizScore = useMemo(() => {
    let count = 0;
    STATIC_QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) count++;
    });
    return count;
  }, [userAnswers]);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-border">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'rules'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-muted hover:text-navy-900'
          }`}
        >
          1. Interactive Rule Identification
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'quiz'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-muted hover:text-navy-900'
          }`}
        >
          2. Cryptography Knowledge Quiz
        </button>
      </div>

      {activeTab === 'rules' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-border">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Rule Identification Exercise
              </h3>
              <p className="text-xs text-slate-muted">
                Analyze the positions of the two letters in the current 5×5 matrix and determine which rule applies.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 bg-primary-light text-primary rounded-full">
                Score: {ruleScore.correct} / {ruleScore.total}
              </span>
              <button
                onClick={handleGenerateRandomPair}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-card transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Random Pair</span>
              </button>
            </div>
          </div>

          {/* Pair Presentation Card */}
          <div className="p-6 rounded-2xl bg-slate-light border border-slate-border flex flex-col items-center justify-center space-y-3">
            <span className="text-xs font-semibold text-slate-muted uppercase tracking-wider">
              Given Digraph Pair:
            </span>
            <div className="flex items-center gap-4 font-mono text-4xl font-black text-navy-900 tracking-widest">
              <span className="w-16 h-16 rounded-2xl bg-white border border-slate-border shadow-subtle flex items-center justify-center text-primary">
                {testPair[0]}
              </span>
              <span className="text-slate-300">&</span>
              <span className="w-16 h-16 rounded-2xl bg-white border border-slate-border shadow-subtle flex items-center justify-center text-primary">
                {testPair[1]}
              </span>
            </div>

            {currentPairAnalysis && (
              <p className="text-xs font-mono text-slate-muted">
                Coordinates in Matrix: '{testPair[0]}' at ({currentPairAnalysis.pos1.row + 1},{currentPairAnalysis.pos1.col + 1}) & '{testPair[1]}' at ({currentPairAnalysis.pos2.row + 1},{currentPairAnalysis.pos2.col + 1})
              </p>
            )}
          </div>

          {/* Three Choice Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'same_row', label: 'Same Row Rule', icon: Rows, desc: 'Both letters on the same row' },
              { id: 'same_column', label: 'Same Column Rule', icon: Columns, desc: 'Both letters in the same column' },
              { id: 'rectangle', label: 'Rectangle Rule', icon: BoxSelect, desc: 'Form opposing rectangle corners' },
            ].map((choice) => {
              const Icon = choice.icon;
              const isSelected = selectedRuleAnswer === choice.id;
              const isActual = currentPairAnalysis?.actualRule === choice.id;

              let btnStyle = 'bg-white hover:bg-slate-50 border-slate-border text-navy-900';
              if (selectedRuleAnswer) {
                if (isActual) {
                  btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-300';
                } else if (isSelected && !isActual) {
                  btnStyle = 'bg-red-50 border-red-300 text-red-800 ring-2 ring-red-200';
                }
              }

              return (
                <button
                  key={choice.id}
                  disabled={selectedRuleAnswer !== null}
                  onClick={() => handleSelectRule(choice.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${btnStyle} ${
                    selectedRuleAnswer === null ? 'cursor-pointer hover:shadow-subtle' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{choice.label}</span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-muted">{choice.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Trace explanation after selecting */}
          {selectedRuleAnswer && currentPairAnalysis && (
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                selectedRuleAnswer === currentPairAnalysis.actualRule
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-red-50/70 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedRuleAnswer === currentPairAnalysis.actualRule ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct! Excellent analysis.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>
                      Not quite. The correct rule is:{' '}
                      <strong className="uppercase">{currentPairAnalysis.actualRule.replace('_', ' ')}</strong>
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed">{currentPairAnalysis.trace.explanation}</p>
              <p className="text-xs font-mono font-semibold pt-1">
                Encrypted Output:{' '}
                <span className="underline">{currentPairAnalysis.trace.outputPair.join('')}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-border shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-border">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Playfair Cryptography Knowledge Check
              </h3>
              <p className="text-xs text-slate-muted">
                Test your conceptual understanding of classical digraph cryptography.
              </p>
            </div>
            {submittedQuiz && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>
                  Result: {quizScore} / {STATIC_QUIZ_QUESTIONS.length} (
                  {Math.round((quizScore / STATIC_QUIZ_QUESTIONS.length) * 100)}%)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {STATIC_QUIZ_QUESTIONS.map((q, qIdx) => {
              const selectedOpt = userAnswers[q.id];
              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-light/60 border border-slate-border space-y-3">
                  <p className="text-sm font-semibold text-navy-900">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let optClass = 'bg-white hover:bg-slate-50 border-slate-border text-navy-800';
                      if (submittedQuiz) {
                        if (isCorrect) {
                          optClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          optClass = 'bg-red-50 border-red-300 text-red-900 line-through';
                        }
                      } else if (isChosen) {
                        optClass = 'bg-primary-light border-primary text-primary font-semibold ring-1 ring-primary';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={submittedQuiz}
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-start gap-2 ${optClass}`}
                        >
                          <span className="font-mono font-bold text-slate-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className="p-3 rounded-lg bg-white border border-slate-border text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-primary">Explanation:</p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            {!submittedQuiz ? (
              <button
                type="button"
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(userAnswers).length < STATIC_QUIZ_QUESTIONS.length}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-card transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setUserAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-light border border-slate-border text-slate-600 hover:text-navy-900 text-xs font-semibold shadow-subtle transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
