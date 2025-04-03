/* eslint-disable prefer-const */
import { useReducer, useCallback, useEffect } from 'react';
import { 
  GameState, 
  GameAction, 
  QuestionDifficulty,
  TIMER_DURATION,
  BaseState,
  RunnerState
} from '../types';

// Initial state of the game
const initialState: GameState = {
  // Core game mechanics
  score: 0,
  outs: 0,
  strikes: 0,
  bases: { first: false, second: false, third: false },
  runners: [
    // Initial runner - the batter
    {
      id: 'initial-batter',
      previousBase: 'none',
      currentBase: 'none',
      isAnimating: false,
      path: []
    }
  ],
  
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

// Helper to get the next base(s) based on hit type
const getPathForHitType = (
  startBase: 'none' | 'first' | 'second' | 'third' | 'home',
  hitType: QuestionDifficulty
): ('none' | 'first' | 'second' | 'third' | 'home')[] => {
  const path: ('none' | 'first' | 'second' | 'third' | 'home')[] = [];
  
  // Always start from the current base
  if (startBase === 'none') {
    // Special case for batter - they start at home plate
    startBase = 'home';
  }
  
  // First add all the intermediate bases
  switch (startBase) {
    case 'home':
      if (hitType === 'Single' || hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('first');
      }
      if (hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('second');
      }
      if (hitType === 'Triple' || hitType === 'Homerun') {
        path.push('third');
      }
      if (hitType === 'Homerun') {
        path.push('home');
      }
      break;

    case 'first':
      if (hitType === 'Single' || hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('second');
      }
      if (hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('third');
      }
      if (hitType === 'Triple' || hitType === 'Homerun') {
        path.push('home');
      }
      break;

    case 'second':
      if (hitType === 'Single' || hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('third');
      }
      if (hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('home');
      }
      break;

    case 'third':
      if (hitType === 'Single' || hitType === 'Double' || hitType === 'Triple' || hitType === 'Homerun') {
        path.push('home');
      }
      break;
  }
  
  return path;
};

// Helper to determine the final base a runner will reach
const getFinalBase = (
  startBase: 'none' | 'first' | 'second' | 'third' | 'home',
  hitType: QuestionDifficulty
): 'first' | 'second' | 'third' | 'home' => {
  // If the batter is starting, treat as starting from home
  if (startBase === 'none') {
    startBase = 'home';
  }

  switch (startBase) {
    case 'home':
      if (hitType === 'Single') return 'first';
      if (hitType === 'Double') return 'second';
      if (hitType === 'Triple') return 'third';
      return 'home'; // Homerun
      
    case 'first':
      if (hitType === 'Single') return 'second';
      if (hitType === 'Double') return 'third';
      return 'home'; // Triple or Homerun
      
    case 'second':
      if (hitType === 'Single') return 'third';
      return 'home'; // Double, Triple, or Homerun
      
    case 'third':
      return 'home'; // Any hit scores from third
      
    default:
      return 'first'; // Fallback
  }
};

// Helper to advance runners based on hit type
const advanceRunners = (
  _bases: BaseState, 
  hitType: QuestionDifficulty,
  currentRunners: RunnerState[]
): { 
  newBases: BaseState, 
  runsScored: number,
  newRunners: RunnerState[] 
} => {
  let runsScored = 0;
  let newBases = { first: false, second: false, third: false };
  let newRunners = [...currentRunners];
  
  // Assign a unique ID for the new batter
  const batterId = `runner-${Date.now()}`;
  console.log('Creating new runners:', newRunners);

  // Advance existing runners
  newRunners.forEach(runner => {
    // Skip runners that are already at home (already scored)
    if (runner.currentBase === 'home') return;
    
    const path = getPathForHitType(runner.currentBase, hitType);
    const finalBase = getFinalBase(runner.currentBase, hitType);
    
    // Update runner state
    runner.previousBase = runner.currentBase;
    runner.currentBase = finalBase;
    runner.path = path;
    runner.isAnimating = true;
    
    // If runner will score, increment runs
    if (finalBase === 'home') {
      runsScored++;
    } else {
      // Update bases map for final positions
      if (finalBase === 'first') newBases.first = true;
      if (finalBase === 'second') newBases.second = true;
      if (finalBase === 'third') newBases.third = true;
    }
  });
  
  // Add the new batter
  const batterPath = getPathForHitType('none', hitType);
  const batterFinalBase = getFinalBase('none', hitType);
  
  // Only add a new batter if they haven't scored
  if (batterFinalBase === 'home') {
    runsScored++;
  } else {
    newRunners.push({
      id: batterId,
      previousBase: 'none',
      currentBase: batterFinalBase,
      isAnimating: true,
      path: batterPath
    });
    
    // Update bases for the batter's final position
    if (batterFinalBase === 'first') newBases.first = true;
    if (batterFinalBase === 'second') newBases.second = true;
    if (batterFinalBase === 'third') newBases.third = true;
  }
  
  // Filter out runners who have scored (reached home)
  // We'll keep them for now to animate, but remove them in the RUNNER_ANIMATION_COMPLETE handler
  
  return { newBases, runsScored, newRunners };
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
        runners: [
          // Reset with initial batter
          {
            id: 'initial-batter',
            previousBase: 'none',
            currentBase: 'none',
            isAnimating: false,
            path: []
          }
        ],
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
      
      const { newBases, runsScored, newRunners } = advanceRunners(
        state.bases, 
        state.selectedDifficulty,
        state.runners
      );
      
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
        runners: newRunners,
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
        runners: gameOver 
          ? [
            // Reset with initial batter if game over
            {
              id: 'initial-batter',
              previousBase: 'none',
              currentBase: 'none',
              isAnimating: false,
              path: []
            }
          ] 
          : state.runners,
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
        runners: gameOver 
          ? [
            // Reset with initial batter if game over
            {
              id: 'initial-batter',
              previousBase: 'none',
              currentBase: 'none',
              isAnimating: false,
              path: []
            }
          ] 
          : state.runners,
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
        runners: gameOver 
          ? [
            // Reset with initial batter if game over
            {
              id: 'initial-batter',
              previousBase: 'none',
              currentBase: 'none',
              isAnimating: false,
              path: []
            }
          ] 
          : state.runners,
      };
    }
    
    case 'RUNNER_ANIMATION_COMPLETE': {
      // Mark a specific runner's animation as complete
      const runnerId = action.payload;
      
      // Update this runner
      let updatedRunners = state.runners.map(runner => 
        runner.id === runnerId 
          ? { ...runner, isAnimating: false }
          : runner
      );
      
      // Remove runners that have reached home (scored)
      updatedRunners = updatedRunners.filter(runner => 
        runner.currentBase !== 'home'
      );
      
      // If no runners, add new batter
      if (updatedRunners.length === 0) {
        updatedRunners.push({
          id: `batter-${Date.now()}`,
          previousBase: 'none',
          currentBase: 'none',
          isAnimating: false,
          path: []
        });
      }
      
      return {
        ...state,
        runners: updatedRunners
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