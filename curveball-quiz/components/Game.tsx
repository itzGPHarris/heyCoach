import React, { useState } from 'react';
import {
  Box,
} from '@mui/material';
import Confetti from './Confetti';

//import BaseballDiamond from './BaseballDiamond';
//import QuestionSelector from './QuestionSelector';
import QuestionCard from './QuestionCard';
import GameOverScreen from './GameOverScreen';
//import ScoreBoard from './ScoreBoard';
import WelcomeScreen from './WelcomeScreen';
import { useGameState } from '../hooks/useGameState';
import { useQuestionDeck } from '../hooks/useQuestionDeck';
import { Question, QuestionDifficulty } from '../types';
import { 
  playCorrectSound, 
  playIncorrectSound, 
  playScoreSound, 
  playGameOverSound,
  initAudio 
} from '../utils/soundUtils';
import { BaseState } from '../types';
import GamePlayArea from './GamePlayArea';

// Import SVG assets
import diamondUrl from '../assets/baseballDiamond.svg';
import runnerFirstUrl from '../assets/runnerFirst.svg';
import runnerSecondUrl from '../assets/runnerSecond.svg';
import runnerThirdUrl from '../assets/runnerThird.svg';
import runnerFirstSecondUrl from '../assets/runnerFirstSecond.svg';
import runnerFirstThirdUrl from '../assets/runnerFirstThird.svg';
import runnerSecondThirdUrl from '../assets/runnerSecondThird.svg';
import runnerAllUrl from '../assets/runnerAll.svg';

const Game: React.FC = () => {
  const { state, dispatch, isFinalAtBat } = useGameState();
  const { getQuestion, resetDeck, questionCounts, totalQuestions } = useQuestionDeck();
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Determine which runner overlay to use based on base state
  const getRunnerImageUrl = (bases: BaseState) => {
    if (bases.first && bases.second && bases.third) return runnerAllUrl;
    if (bases.first && bases.second) return runnerFirstSecondUrl;
    if (bases.first && bases.third) return runnerFirstThirdUrl;
    if (bases.second && bases.third) return runnerSecondThirdUrl;
    if (bases.first) return runnerFirstUrl;
    if (bases.second) return runnerSecondUrl;
    if (bases.third) return runnerThirdUrl;
    return null;
  };

  // Get a question based on selected difficulty
  const fetchQuestion = (difficulty: QuestionDifficulty) => {
    const question = getQuestion(difficulty);
    if (question) {
      setCurrentQuestionData(question);
      dispatch({ type: 'SET_QUESTION', payload: question });
    }
  };

  // Handle selecting question difficulty
  const handleSelectDifficulty = (difficulty: QuestionDifficulty) => {
    dispatch({ type: 'SELECT_DIFFICULTY', payload: difficulty });
    fetchQuestion(difficulty);
  };

  // Handle answering a question
  const handleAnswer = (isCorrect: boolean, updatedQuestion: Question) => {
    // Play sound based on result
    if (isCorrect) {
      playCorrectSound();
      
      // Calculate if we scored a run
      const hasRunnerOnThird = state.bases.third;
      const willScore = 
        (hasRunnerOnThird && state.selectedDifficulty === 'Single') ||
        (state.bases.second && (state.selectedDifficulty === 'Double' || state.selectedDifficulty === 'Triple')) ||
        (state.bases.first && state.selectedDifficulty === 'Triple') ||
        state.selectedDifficulty === 'Homerun';
        
      // Play scoring sound and show confetti if we scored a run
      if (willScore) {
        setTimeout(() => playScoreSound(), 300);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      
      dispatch({ 
        type: 'ANSWER_CORRECTLY',
        payload: updatedQuestion 
      });
    } else {
      playIncorrectSound();
      
      // Check if this is the third out
      if (state.outs === 2) {
        setTimeout(() => playGameOverSound(), 500);
      }
      
      dispatch({ 
        type: 'ANSWER_INCORRECTLY',
        payload: updatedQuestion
      });
    }
    
    // Clear the current question
    setCurrentQuestionData(null);
  };

  // Handle passing on a question
  const handlePass = () => {
    dispatch({ type: 'PASS_QUESTION' });
    setCurrentQuestionData(null);
  };

  // Start a new game
  const startGame = () => {
    // Initialize audio (must be done after user interaction)
    initAudio();
    
    resetDeck();
    dispatch({ type: 'START_GAME' });
  };

  // Reset the game
  const resetGame = () => {
    resetDeck();
    dispatch({ type: 'RESET_GAME' });
    setCurrentQuestionData(null);
  };

  // Render functions for different game states
  const renderGameContent = () => (
    <>
      <GamePlayArea
        bases={state.bases}
        outs={state.outs}
        strikes={state.strikes}
        score={state.score}
        inning={state.inningNumber}
        questionCount={totalQuestions}
        onSelectDifficulty={handleSelectDifficulty}
        isFinalAtBat={isFinalAtBat()}
        disabled={!!currentQuestionData || state.gameOver}
        diamondUrl={diamondUrl}
        runnerImageUrl={getRunnerImageUrl(state.bases)}
      />
      
      {currentQuestionData && (
        <QuestionCard
          question={currentQuestionData}
          onAnswer={handleAnswer}
          onPass={handlePass}
          timerDuration={state.timerDuration}
          remainingPasses={state.remainingPasses}
        />
      )}
    </>
  );
  
  return (
    <Box>
      {/* Confetti effect when scoring */}
      <Confetti active={showConfetti} />
      
      {/*<Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Curveball Quiz
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          The Baseball Trivia Game
        </Typography>
      </Box>*/}

      {!state.gameStarted && <WelcomeScreen onStartGame={startGame} />}
      
      {state.gameStarted && !state.gameOver && renderGameContent()}
      
      {state.gameOver && (
        <GameOverScreen
          score={state.score}
          questionsAnswered={state.questionHistory}
          questionCounts={questionCounts}
          onPlayAgain={resetGame}
        />
      )}
    </Box>
  );
};

export default Game;