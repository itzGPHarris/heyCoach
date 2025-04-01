import { useState, useEffect, useCallback } from 'react';
import { TimerState } from '../types';

interface UseTimerProps {
  duration: number;
  onTimeout: () => void;
  isActive: boolean;
}

export const useTimer = ({ duration, onTimeout, isActive }: UseTimerProps) => {
  const [state, setState] = useState<TimerState>({
    isActive: false,
    timeRemaining: duration,
    duration,
  });

  // Reset timer with new duration
  const resetTimer = useCallback((newDuration?: number) => {
    setState({
      isActive: false,
      timeRemaining: newDuration || duration,
      duration: newDuration || duration,
    });
  }, [duration]);

  // Start the timer
  const startTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: true,
    }));
  }, []);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  // Effect to handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && state.isActive && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 0.1,
        }));
      }, 100);
    } else if (state.timeRemaining <= 0 && state.isActive) {
      // Timer has reached zero
      if (interval) clearInterval(interval);
      setState(prev => ({ ...prev, isActive: false }));
      onTimeout();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, state.isActive, state.timeRemaining, onTimeout]);

  // Effect to reset timer when duration changes
  useEffect(() => {
    resetTimer(duration);
  }, [duration, resetTimer]);

  // Effect to sync timer active state with prop
  useEffect(() => {
    if (isActive && !state.isActive) {
      startTimer();
    } else if (!isActive && state.isActive) {
      pauseTimer();
    }
  }, [isActive, state.isActive, startTimer, pauseTimer]);

  return {
    timeRemaining: state.timeRemaining,
    isActive: state.isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    percentageRemaining: (state.timeRemaining / state.duration) * 100,
  };
};