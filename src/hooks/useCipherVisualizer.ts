import { useState, useEffect, useCallback, useMemo } from 'react';
import { DigraphTransformationTrace, KeySquareGrid } from '../types/playfair';
import { computeVisualizerGridHighlights, VisualizerCellHighlight } from '../crypto/visualizationTrace';

export function useCipherVisualizer(
  traces: DigraphTransformationTrace[],
  matrix: KeySquareGrid
) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1800);

  const totalSteps = traces.length;

  // Ensure currentStep stays within bounds if traces change
  useEffect(() => {
    if (currentStep >= totalSteps && totalSteps > 0) {
      setCurrentStep(0);
    }
  }, [totalSteps, currentStep]);

  const activeTrace = useMemo<DigraphTransformationTrace | null>(() => {
    if (!traces || traces.length === 0 || currentStep >= traces.length) {
      return null;
    }
    return traces[currentStep];
  }, [traces, currentStep]);

  const highlightedGrid = useMemo<VisualizerCellHighlight[][]>(() => {
    return computeVisualizerGridHighlights(activeTrace, matrix);
  }, [activeTrace, matrix]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => (prev + 1 < totalSteps ? prev + 1 : 0));
  }, [totalSteps]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 >= 0 ? prev - 1 : totalSteps - 1));
  }, [totalSteps]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Animation timer effect
  useEffect(() => {
    if (!isPlaying || totalSteps <= 1) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev + 1 >= totalSteps) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, speedMs]);

  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    activeTrace,
    highlightedGrid,
    isPlaying,
    speedMs,
    setSpeedMs,
    handleNext,
    handlePrev,
    handleReset,
    togglePlay,
  };
}
