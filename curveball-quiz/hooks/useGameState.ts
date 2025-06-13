/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useReducer, useEffect } from 'react';
import { 
  GameState, 
  GameAction, 
  TIMER_DURATION,
  BaseState
} from '../types';

// Initial state of the game
const initialState: GameState = {
  // Core game mechanics
  score: 0,
  outs: 0,
  strikes: 0,
  bases: { first: false, second: false, third: false },
  
  // Question handling
  currentQuestion: null,
  selectedDifficulty: null,
  questionHistory: [],
  
  // Game state
  gameStarted: false,
  gameOver: false,
  inningNumber: 1,
  maxStrikes: 3,
  remainingPasses: 3,
  
  // Timer
  timerActive: false,
  timerDuration: TIMER_DURATION.NO_RUNNERS,
};

// Helper to check if there are any runners on base
const hasRunnersOnBase = (bases: BaseState): boolean => {
  return bases.first || bases.second || bases.third;
};

// Simple helper to calculate runs scored based on hit type and current bases
{/*const calculateRunsScored = (
  bases: BaseState,
  hitType: QuestionDifficulty
): number => {
  let runsScored = 0;
  
  // Home run always scores the batter
  if (hitType === 'Homerun') {
    runsScored += 1;
  }
  
  // Runner on third scores on any hit
  if (bases.third) {
    runsScored += 1;
  }
  
  // Runner on second scores on doubles, triples, home runs
  if (bases.second && (hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun')) {
    runsScored += 1;
  }
  
  // Runner on first scores on triples and home runs
  if (bases.first && (hitType === 'Triple' || hitType === 'Homerun')) {
    runsScored += 1;
  }
  
  return runsScored;
};
*/}
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
        questionHistory: []
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
        
        // Calculate runs scored - but we don't need to add them here
        // The animation will trigger UPDATE_SCORE action later
        // We can remove or comment out this unused variable
        // const runsScored = calculateRunsScored(state.bases, state.selectedDifficulty);
        
        return {
          ...state,
          currentQuestion: null,
          selectedDifficulty: null,
          timerActive: false,
          questionHistory: [
            ...state.questionHistory,
            action.payload
          ],
          // Don't update bases or score here - will be done during animation
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
        ]
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
          : state.bases
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
          : state.bases
      };
    }
    
    case 'UPDATE_BASES': {
      return {
        ...state,
        bases: action.payload
      };
    }
    
    case 'UPDATE_SCORE': {
      return {
        ...state,
        score: state.score + action.payload
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
    dispatch
  };
};