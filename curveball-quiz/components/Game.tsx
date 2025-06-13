/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { Box } from '@mui/material';
import GamePlayArea, { GamePlayAreaHandle } from './GamePlayArea';
import QuestionDialog from './QuestionDialog';
import QuestionSelector from './QuestionSelector';
import {
  BaseState,
  GameState,
  Question,
  QuestionDifficulty,
  TIMER_DURATION
} from '../types';
import React from 'react';

interface GameProps {
  questions: Question[];
}

const initialState: GameState = {
  score: 0,
  outs: 0,
  strikes: 0,
  bases: { first: false, second: false, third: false },
  currentQuestion: null,
  selectedDifficulty: null,
  questionHistory: [],
  gameStarted: true,
  gameOver: false,
  inningNumber: 1,
  maxStrikes: 3,
  remainingPasses: 3,
  timerActive: false,
  timerDuration: TIMER_DURATION.NO_RUNNERS
};

const Game: React.FC<GameProps> = ({ questions }) => {
  const gamePlayAreaRef = useRef<GamePlayAreaHandle>(null);
  const [state, setState] = useState<GameState>(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const diamondUrl = '../assets/baseballDiamond.svg';
  const getRunnerImageUrl = () => '../assets/single_runner.png';

  const handleSelectDifficulty = (difficulty: QuestionDifficulty) => {
    const available = questions.filter(
      q => q.difficulty === difficulty &&
        !state.questionHistory.some(h => h.id === q.id)
    );
  
    if (available.length === 0) {
      alert('No more questions at this difficulty!');
      return;
    }
  
    const raw = available[Math.floor(Math.random() * available.length)];
  
    // ✅ Map legacy question fields to standard format
    const mapped: Question = {
      ...raw,
      text: raw.text || raw.question || 'Untitled question',
      choices: raw.choices?.length ? raw.choices : [
        raw.possibleAnswerA,
        raw.possibleAnswerB,
        raw.possibleAnswerC,
        raw.possibleAnswerD
      ].filter(Boolean),
    };
  
    setState(prev => ({
      ...prev,
      selectedDifficulty: difficulty,
      currentQuestion: mapped,
      timerDuration: prev.bases.first || prev.bases.second || prev.bases.third
        ? TIMER_DURATION.WITH_RUNNERS
        : TIMER_DURATION.NO_RUNNERS
    }));
  };
  
  const handleAnswer = (answer: string) => {
    if (!state.currentQuestion || !state.selectedDifficulty) return;
  
    const isCorrect = answer === state.currentQuestion.correctAnswer;
  
    const selectedDiff = state.selectedDifficulty; // ✅ Save it before we reset
  
    const updatedQuestion: Question = {
      ...state.currentQuestion,
      selectedAnswer: answer,
      isAnswered: true,
      isCorrect,
      isIncorrect: !isCorrect,
      isAnsweredCorrectly: isCorrect,
      isAnsweredIncorrectly: !isCorrect
    };
  
    if (isCorrect) {
      gamePlayAreaRef.current?.startPlayAnimation(selectedDiff); // ✅ use local copy
    }
  
    const newOuts = isCorrect ? state.outs : state.outs + 1;
    const gameOver = !isCorrect && newOuts >= 3;
  
    setState(prev => ({
      ...prev,
      currentQuestion: null,
      selectedDifficulty: null,
      questionHistory: [...prev.questionHistory, updatedQuestion],
      outs: newOuts,
      strikes: 0,
      gameOver
    }));
  };
    
  const handlePass = () => {
    if (!state.currentQuestion) return;

    const passedQuestion: Question = {
      ...state.currentQuestion,
      isPassed: true,
      isAnswered: true,
      isPassedAnswer: true,
      isAnsweredSkipped: true
    };

    const newStrikes = state.strikes + 1;
    const strikeLimitReached = newStrikes >= state.maxStrikes;
    const newOuts = strikeLimitReached ? state.outs + 1 : state.outs;
    const gameOver = newOuts >= 3;

    setState(prev => ({
      ...prev,
      currentQuestion: null,
      questionHistory: [...prev.questionHistory, passedQuestion],
      remainingPasses: Math.max(prev.remainingPasses - 1, 0),
      strikes: strikeLimitReached ? 0 : newStrikes,
      outs: newOuts,
      gameOver
    }));
  };

  const handleRunAnimationComplete = (runsScored: number) => {
    setIsAnimating(false); // ✅ This lets buttons unlock again
    setState(prev => ({
      ...prev,
      score: prev.score + runsScored,
      selectedDifficulty: null
    }));
  };
  
  const handleBaseUpdate = (bases: BaseState) => {
    setState(prev => ({
      ...prev,
      bases
    }));
  };

  return (
    <Box>
      {/* Pitch selector: always shown, but changes state */}
      <QuestionSelector
  onSelectDifficulty={handleSelectDifficulty}
  isFinalAtBat={state.outs === 2 && state.bases.third}
  disabled={!!state.currentQuestion || state.gameOver}
  selectedDifficulty={state.selectedDifficulty ?? undefined}
/>

      <QuestionDialog
        open={!!state.currentQuestion}
        question={state.currentQuestion}
        onAnswer={(answer: string) => {
          handleAnswer(answer);
        }}
        onPass={handlePass}
        timerDuration={state.timerDuration}
        remainingPasses={state.remainingPasses}
      />

      <GamePlayArea
        bases={state.bases}
        outs={state.outs}
        strikes={state.strikes}
        score={state.score}
        inning={state.inningNumber}
        questionCount={state.questionHistory.length}
        onSelectDifficulty={handleSelectDifficulty}
        isFinalAtBat={state.outs === 2 && state.bases.third}
        disabled={!!state.currentQuestion || state.gameOver || isAnimating}
        diamondUrl={diamondUrl}
        runnerImageUrl={getRunnerImageUrl()}
        onRunAnimationComplete={handleRunAnimationComplete}
        onBaseUpdate={handleBaseUpdate}
        ref={gamePlayAreaRef}
      />
    </Box>
  );
};

export default Game;
