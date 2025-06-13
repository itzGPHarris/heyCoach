// This file is part of the Curveball Quiz project.
// It is licensed under the MIT License.  

//types/index.ts

// This file contains the type definitions for the game state and actions.
// It includes the Question interface, which defines the structure of a question,
// including its properties and types. The GameState interface defines the overall
// state of the game, including the score, outs, strikes, and current question.
// It also includes the GameAction type, which defines the possible actions that can
// be dispatched to update the game state.
// This file is crucial for maintaining type safety and ensuring that the game logic
// adheres to the defined structure.
// // components/QuestionDialog.tsx
// // This component displays a dialog with a question and multiple choice answers.
// // It includes a timer, answer selection, and a pass option.
// // It handles the logic for answering the question and passing if needed.
// // It uses Material-UI for styling and layout.
// // It also includes a progress bar to indicate the time remaining for answering the question.
// Add the missing selectedAnswer property to the Question interface
// and ensure it is optional. Also, add the missing text and choices properties.

export interface Question {
  id: string;
  question: string;
  year: number;
  league: string;
  category: string;
  possibleAnswerA: string;
  possibleAnswerB: string;
  possibleAnswerC: string;
  possibleAnswerD: string;
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  options: string[];
  correctOption: number;
  selectedAnswer?: string; // Add this line - make it optional with ?
  isAnswered?: boolean; // Added property
  isCorrect?: boolean; // Added property
  isIncorrect?: boolean; // Added property
  isPassed?: boolean; // Added property
  isAnsweredCorrectly?: boolean; // Added property
  isAnsweredIncorrectly?: boolean; // Added property
  isPassedAnswer?: boolean; // Added property
  isAnsweredSkipped?: boolean; // Added property
  text: string; // Add this if `text` is a valid property
  choices: string[]; // Add this if `choices` is a valid property

  
}

// Base types
export type BaseType = 'none' | 'home' | 'first' | 'second' | 'third';
export interface BaseState {
  first: boolean;
  second: boolean;
  third: boolean;
}

// Question difficulty levels - corresponds to hit types
export type QuestionDifficulty = 'Single' | 'Double' | 'Triple' | 'Homerun';

// Timer durations based on runner presence
export const TIMER_DURATION = {
  NO_RUNNERS: 30, // 30 seconds when no runners on base
  WITH_RUNNERS: 20 // 20 seconds when runners on base (time pressure)
};

// Game state definition
export interface GameState {
  // Core game mechanics
  score: number;
  outs: number;
  strikes: number;
  bases: BaseState;
  
  // Question handling
  currentQuestion: Question | null;
  selectedDifficulty: QuestionDifficulty | null;
  questionHistory: Question[];
  
  // Game state
  gameStarted: boolean;
  gameOver: boolean;
  inningNumber: number;
  maxStrikes: number;
  remainingPasses: number;
  
  // Timer
  timerActive: boolean;
  timerDuration: number;
}

// Game actions
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_DIFFICULTY'; payload: QuestionDifficulty }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ANSWER_CORRECTLY'; payload: Question }
  | { type: 'ANSWER_INCORRECTLY'; payload: Question }
  | { type: 'PASS_QUESTION' }
  | { type: 'TIMEOUT' }
  | { type: 'UPDATE_BASES'; payload: BaseState }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'RESET_GAME' };

