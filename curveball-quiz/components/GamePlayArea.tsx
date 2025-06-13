import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Stack } from '@mui/material';
import BaseballField, { BaseballFieldHandle } from './BaseballField';
import { BaseState, QuestionDifficulty } from '../types';

export interface GamePlayAreaHandle {
  startPlayAnimation: (difficulty: QuestionDifficulty) => void;
}

interface GamePlayAreaProps {
  onRunAnimationComplete: (runsScored: number) => void;
  onBaseUpdate: (bases: BaseState) => void;
  runnerImageUrl: string | null;
  diamondUrl: string;
  bases: BaseState;
  outs: number;
  strikes: number;
  score: number;
  inning: number;
  questionCount: number;
  onSelectDifficulty: (difficulty: QuestionDifficulty) => void;
  isFinalAtBat: boolean;
  disabled: boolean;
}


const GamePlayArea = forwardRef<GamePlayAreaHandle, GamePlayAreaProps>(({
  onRunAnimationComplete,
  onBaseUpdate,
  runnerImageUrl,
  diamondUrl
}, ref) => {
  const fieldRef = useRef<BaseballFieldHandle>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startPlayAnimation = (difficulty: QuestionDifficulty) => {
    if (fieldRef.current && !isAnimating) {
      setIsAnimating(true);
      fieldRef.current.startPlayAnimation(difficulty);
    }
  };

  useImperativeHandle(ref, () => ({
    startPlayAnimation
  }));

  const handleAnimationComplete = (runsScored: number) => {
    setIsAnimating(false);
    onRunAnimationComplete(runsScored); // 🎉 Put confetti trigger back here
  };

  return (
    <Stack spacing={2} alignItems="center">
      <BaseballField
        ref={fieldRef}
        bases={{ first: false, second: false, third: false }}
        outs={0}
        strikes={0}
        score={0}
        diamondUrl={diamondUrl}
        runnerImageUrl={runnerImageUrl}
        onAnimationStart={() => {}}
        onAnimationComplete={handleAnimationComplete}
        onBaseUpdate={onBaseUpdate}
      />
    </Stack>
  );
});

export default GamePlayArea;
