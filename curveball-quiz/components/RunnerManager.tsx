// components/RunnerManager.tsx
import React, { useEffect, useState } from 'react';
import { BaseType, QuestionDifficulty } from '../types';
import AnimatedRunner from './AnimatedRunner';

export interface Runner {
  id: string;
  currentBase: BaseType | 'home';
  destinationBase: BaseType | 'home';
  isScoring: boolean;
  isAnimating: boolean;
}

interface RunnerManagerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  runnerImageUrl?: string;
  onRunnerAdvance: (newBases: { [key in BaseType]?: string }) => void;
  onRunScored: (count: number) => void;
  triggerPlay: QuestionDifficulty | null;
  onPlayComplete: () => void;
}

const baseOrder: BaseType[] = ['first', 'second', 'third'];

const RunnerManager: React.FC<RunnerManagerProps> = ({
  containerRef,
  runnerImageUrl,
  onRunnerAdvance,
  onRunScored,
  triggerPlay,
  onPlayComplete
}) => {
  const [runners, setRunners] = useState<Runner[]>([]);

  useEffect(() => {
    if (!triggerPlay) return;

    const advanceBy = triggerPlay === 'Single' ? 1
                    : triggerPlay === 'Double' ? 2
                    : triggerPlay === 'Triple' ? 3
                    : 4;

    const updatedRunners: Runner[] = runners.map(runner => {
      const idx = baseOrder.indexOf(runner.currentBase as BaseType);
      const nextIdx = idx + advanceBy;
      const destination = nextIdx >= baseOrder.length ? 'home' : baseOrder[nextIdx];
      return {
        ...runner,
        destinationBase: destination,
        isScoring: destination === 'home',
        isAnimating: true
      };
    });

    const batterId = `batter-${Date.now()}`;
    const batterDestination = advanceBy >= 4 ? 'home' : baseOrder[advanceBy - 1];
    updatedRunners.push({
      id: batterId,
      currentBase: 'home',
      destinationBase: batterDestination,
      isScoring: batterDestination === 'home',
      isAnimating: true
    });

    setRunners(updatedRunners);
  }, [triggerPlay]);

  const handleRunnerComplete = (id: string, newBase: BaseType | 'home') => {
    setRunners(prev => {
      const updated = prev.map(r => r.id === id
        ? { ...r, currentBase: newBase, destinationBase: newBase, isAnimating: false }
        : r
      ).filter(r => r.destinationBase !== 'home');

      const bases: { [key in BaseType]?: string } = {};
      updated.forEach(r => {
        if (r.currentBase !== 'home') {
          bases[r.currentBase as BaseType] = r.id;
        }
      });

      const runsScored = prev.length - updated.length;
      if (runsScored > 0) onRunScored(runsScored);
      onRunnerAdvance(bases);
      if (updated.every(r => !r.isAnimating)) onPlayComplete();

      return updated;
    });
  };

  return (
    <>
      {runners.map(runner => (
        <AnimatedRunner
          key={runner.id}
          id={runner.id}
          from={runner.currentBase}
          to={runner.destinationBase}
          containerElement={containerRef.current}
          onComplete={handleRunnerComplete}
          runnerImageUrl={runnerImageUrl}
        />
      ))}
    </>
  );
};

export default RunnerManager;
