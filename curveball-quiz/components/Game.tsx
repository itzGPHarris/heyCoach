import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

import BaseballDiamond from './BaseballDiamond';
import QuestionSelector from './QuestionSelector';
import QuestionCard from './QuestionCard';
import GameOverScreen from './GameOverScreen';
import ScoreBoard from './ScoreBoard';
import WelcomeScreen from './WelcomeScreen';
import { useGameState } from '../hooks/useGameState';
import { useQuestionDeck } from '../hooks/useQuestionDeck';
import { Question, QuestionDifficulty } from '../types';

const Game: React.FC = () => {
  const theme = useTheme();
  const { state, dispatch, isFinalAtBat } = useGameState();
  const { getQuestion, resetDeck, questionCounts, totalQuestions } = useQuestionDeck();
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

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

  // Handle game timeout
  const handleTimeout = () => {
    dispatch({ type: 'TIMEOUT' });
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
  const renderStartScreen = () => (
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Curveball!
      </Typography>
      
      <Typography variant="body1" paragraph>
        Test your baseball knowledge in this quiz game that combines 
        trivia with baseball mechanics. Answer questions correctly to 
        advance runners and score points!
      </Typography>
      
      <Typography variant="body2" paragraph>
        • Choose question difficulty (Single, Double, Triple, Home Run)
        <br />
        • Correct answers advance runners based on hit type
        <br />
        • Three incorrect answers = three outs = game over
        <br />
        • Use passes wisely - three passes equals one out
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrow />}
        onClick={startGame}
        sx={{ mt: 2 }}
      >
        Play Ball!
      </Button>
    </Paper>
  );

  const renderGameContent = () => (
    <>
      <ScoreBoard
        score={state.score}
        outs={state.outs}
        strikes={state.strikes}
        inning={state.inningNumber}
        questionCount={totalQuestions}
      />
      
      <BaseballDiamond
        bases={state.bases}
        outs={state.outs}
        strikes={state.strikes}
        score={state.score}
      />
      
      {currentQuestionData ? (
        <QuestionCard
          question={currentQuestionData}
          onAnswer={handleAnswer}
          onPass={handlePass}
          timerDuration={state.timerDuration}
          remainingPasses={state.remainingPasses}
        />
      ) : (
        <QuestionSelector
          onSelectDifficulty={handleSelectDifficulty}
          isFinalAtBat={isFinalAtBat()}
          disabled={state.gameOver}
        />
      )}
    </>
  );

  return (
    <Box>
      {/* Confetti effect when scoring */}
      <Confetti active={showConfetti} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Curveball Quiz
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          The Baseball Trivia Game
        </Typography>
      </Box>

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