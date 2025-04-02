/* eslint-disable prefer-const */
import { useReducer, useCallback, useEffect } from 'react';
import { 
  GameState, 
  GameAction, 
  QuestionDifficulty,
  //Question,
  TIMER_DURATION,
  BaseState
} from '../types';

// Initial state of the game
const initialState: GameState = {
  score: 0,
  outs: 0,
  strikes: 0,
  bases: { first: false, second: false, third: false },
  currentQuestion: null,
  selectedDifficulty: null,
  gameOver: false,
  inningNumber: 1,
  maxStrikes: 3,
  remainingPasses: 3,
  questionHistory: [],
  gameStarted: false,
  timerActive: false,
  timerDuration: TIMER_DURATION.NO_RUNNERS,
};

// Helper to check if there are any runners on base
const hasRunnersOnBase = (bases: BaseState): boolean => {
  return bases.first || bases.second || bases.third;
};

// Helper to advance runners based on hit type
const advanceRunners = (bases: BaseState, hitType: QuestionDifficulty | string): { newBases: BaseState, runsScored: number } => {
  let runsScored = 0;
  // Create a new bases object to avoid mutation
  let newBases = { first: false, second: false, third: false };
  
  // For a homerun, clear bases and score all runners plus batter
  if (hitType === 'Homerun') {
    runsScored = (bases.first ? 1 : 0) + (bases.second ? 1 : 0) + (bases.third ? 1 : 0) + 1; // +1 for batter
    return { newBases, runsScored };
  }
  
  // Score runner from third
  if (bases.third) {
    runsScored++;
  }
  
  // Advance runner from second to home or third
  if (bases.second) {
    if (hitType === 'Triple' || hitType === 'Homerun') {
      runsScored++;
    } else {
      newBases.third = true;
    }
  }
  
  // Advance runner from first
  if (bases.first) {
    if (hitType === 'Single') {
      newBases.second = true;
    } else if (hitType === 'Double') {
      newBases.third = true;
    } else { // Triple or Homerun
      runsScored++;
    }
  }
  
  // Place new batter on base based on hit type
  if (hitType === 'Single') {
    newBases.first = true;
  } else if (hitType === 'Double') {
    newBases.second = true;
  } else if (hitType === 'Triple') {
    newBases.third = true;
  }
  
  return { newBases, runsScored };
};

// Game state reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        outs: 0,
        strikes: 0,
        score: 0,
        bases: { first: false, second: false, third: false },
        gameOver: false,
        remainingPasses: 3,
        inningNumber: 1,
        questionHistory: [],
      };
      
    case 'SELECT_DIFFICULTY':
      return {
        ...state,
        selectedDifficulty: action.payload,
        timerActive: true,
        timerDuration: hasRunnersOnBase(state.bases)
          ? TIMER_DURATION.WITH_RUNNERS
          : TIMER_DURATION.NO_RUNNERS,
      };
      
    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
      };
      
    case 'ANSWER_CORRECTLY': {
      if (!state.selectedDifficulty) return state;
      
      const { newBases, runsScored } = advanceRunners(state.bases, state.selectedDifficulty);
      
      return {
        ...state,
        bases: newBases,
        score: state.score + runsScored,
        currentQuestion: null,
        selectedDifficulty: null,
        timerActive: false,
        questionHistory: [
          ...state.questionHistory,
          action.payload
        ],
      };
    }
      
    case 'ANSWER_INCORRECTLY': {
      const newOuts = state.outs + 1;
      const gameOver = newOuts >= 3;
      
      return {
        ...state,
        outs: newOuts,
        currentQuestion: null,
        selectedDifficulty: null,
        gameOver,
        timerActive: false,
        bases: gameOver 
          ? { first: false, second: false, third: false } 
          : state.bases,
        questionHistory: [
          ...state.questionHistory,
          action.payload
        ],
      };
    }
      
    case 'PASS_QUESTION': {
      const newStrikes = state.strikes + 1;
      let newOuts = state.outs;
      let newStrikes2 = newStrikes;
      let newRemainingPasses = state.remainingPasses - 1;
      let gameOver = false;
      
      // If we reach max strikes, convert to an out
      if (newStrikes >= state.maxStrikes) {
        newOuts += 1;
        newStrikes2 = 0;
        gameOver = newOuts >= 3;
      }
      
      return {
        ...state,
        strikes: newStrikes2,
        outs: newOuts,
        gameOver,
        currentQuestion: null,
        remainingPasses: newRemainingPasses,
        timerActive: false,
        selectedDifficulty: null,
        bases: gameOver 
          ? { first: false, second: false, third: false } 
          : state.bases,
      };
    }
      
    case 'TIMEOUT': {
      const newOuts = state.outs + 1;
      const gameOver = newOuts >= 3;
      
      return {
        ...state,
        outs: newOuts,
        currentQuestion: null,
        selectedDifficulty: null,
        gameOver,
        timerActive: false,
        bases: gameOver 
          ? { first: false, second: false, third: false } 
          : state.bases,
      };
    }
      
    case 'RESET_GAME':
      return initialState;
      
    default:
      return state;
  }
};

// Hook for managing game state
export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Determine if we're on the final at-bat (2 outs, runner on 3rd)
  const isFinalAtBat = useCallback(() => {
    return state.outs === 2 && state.bases.third;
  }, [state.outs, state.bases.third]);
  
  // Update timer duration when runner state changes
  useEffect(() => {
    if (state.timerActive) {
      const newDuration = hasRunnersOnBase(state.bases)
        ? TIMER_DURATION.WITH_RUNNERS
        : TIMER_DURATION.NO_RUNNERS;
        
      if (newDuration !== state.timerDuration) {
        // You could dispatch an action to update timer duration here
        // dispatch({ type: 'SET_TIMER_DURATION', payload: newDuration });
      }
    }
  }, [state.bases, state.timerActive, state.timerDuration]);
  
  return {
    state,
    dispatch,
    isFinalAtBat,
  };
};