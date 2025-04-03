// types.ts
export type QuestionDifficulty = 'Single' | 'Double' | 'Triple' | 'Homerun';

export type BaseType = 'none' | 'first' | 'second' | 'third' | 'home';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  difficulty: QuestionDifficulty;
  answered?: boolean;
  correct?: boolean;
  category?: string;
}

export interface BaseState {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface RunnerState {
  id: string;
  previousBase: BaseType;
  currentBase: BaseType;
  isAnimating: boolean;
  path?: BaseType[]; // Path to take for animation
}

export const TIMER_DURATION = {
  NO_RUNNERS: 20, // seconds
  WITH_RUNNERS: 15, // seconds
};

export interface GameState {
  score: number;
  outs: number;
  strikes: number;
  bases: BaseState;
  runners: RunnerState[];
  
  currentQuestion: Question | null;
  selectedDifficulty: QuestionDifficulty | null;
  questionHistory: Question[];
  
  gameStarted: boolean;
  gameOver: boolean;
  inningNumber: number;
  maxStrikes: number;
  remainingPasses: number;
  
  timerActive: boolean;
  timerDuration: number;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_DIFFICULTY'; payload: QuestionDifficulty }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ANSWER_CORRECTLY'; payload: Question }
  | { type: 'ANSWER_INCORRECTLY'; payload: Question }
  | { type: 'PASS_QUESTION' }
  | { type: 'RESET_GAME' }
  | { type: 'TIMEOUT' }
  | { type: 'RUNNER_ANIMATION_COMPLETE'; payload: string };