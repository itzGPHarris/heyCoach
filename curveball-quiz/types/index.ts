// Question Types
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
    selectedAnswer?: string; // The answer selected by the user
  }
  
  export type QuestionDifficulty = 'Single' | 'Double' | 'Triple' | 'Homerun';
  
  // Game State Types
  export interface GameState {
    score: number;
    outs: number;
    strikes: number;
    bases: BaseState;
    currentQuestion: Question | null;
    selectedDifficulty: QuestionDifficulty | null;
    gameOver: boolean;
    inningNumber: number;
    maxStrikes: number;
    remainingPasses: number;
    questionHistory: Question[];
    gameStarted: boolean;
    timerActive: boolean;
    timerDuration: number;
  }
  
  export interface BaseState {
    first: boolean;
    second: boolean;
    third: boolean;
  }
  
  // Action Types for Reducer
  export type GameAction =
    | { type: 'START_GAME' }
    | { type: 'SELECT_DIFFICULTY'; payload: QuestionDifficulty }
    | { type: 'SET_QUESTION'; payload: Question }
    | { type: 'ANSWER_CORRECTLY' }
    | { type: 'ANSWER_INCORRECTLY' }
    | { type: 'PASS_QUESTION' }
    | { type: 'TIMEOUT' }
    | { type: 'RESET_GAME' };
  
  // Timer States
  export interface TimerState {
    isActive: boolean;
    timeRemaining: number;
    duration: number;
  }
  
  // Timer Constraints
  export const TIMER_DURATION = {
    NO_RUNNERS: 15, // 15 seconds if no runners on base
    WITH_RUNNERS: 18, // 18 seconds if runners on base
  };