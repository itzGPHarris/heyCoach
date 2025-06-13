/* eslint-disable @typescript-eslint/no-unused-vars */
// components/BaseballField.tsx
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import RunnerManager from './RunnerManager';
import { BaseState, BaseType, QuestionDifficulty } from '../types';

interface BaseballFieldProps {
  bases: BaseState;
  outs: number;
  strikes: number;
  score: number;
  diamondUrl: string;
  runnerImageUrl: string | null;
  onAnimationStart: () => void;
  onAnimationComplete: (runsScored: number) => void;
  onBaseUpdate: (newBases: BaseState) => void;
}

export interface BaseballFieldHandle {
  startPlayAnimation: (hitType: QuestionDifficulty) => void;
}

const BaseballField = forwardRef<BaseballFieldHandle, BaseballFieldProps>(
  ({
    outs,
    strikes,
    score,
    diamondUrl,
    runnerImageUrl,
    onAnimationStart,
    onAnimationComplete,
    onBaseUpdate
  }, ref) => {
    const theme = useTheme();
    const diamondContainerRef = useRef<HTMLDivElement>(null);

    const [runnersOnBases, setRunnersOnBases] = useState<{ [key in BaseType]?: string }>({});
    const [pendingPlay, setPendingPlay] = useState<QuestionDifficulty | null>(null);
    const [currentScore, setCurrentScore] = useState(score);

    const updateBaseStateFrom = (state: { [key in BaseType]?: string }) => {
      const newBases: BaseState = {
        first: !!state.first,
        second: !!state.second,
        third: !!state.third
      };
      setRunnersOnBases(state);
      onBaseUpdate(newBases);
    };

    const startPlayAnimation = (hitType: QuestionDifficulty) => {
      onAnimationStart();
      setPendingPlay(hitType);
    };

    useImperativeHandle(ref, () => ({
      startPlayAnimation
    }));

    return (
      <Box sx={{ position: 'relative', mx: 'auto', maxWidth: '90%', mb: 4 }}>
        <Box 
          ref={diamondContainerRef}
          sx={{ position: 'relative', width: '100%' }}
        >
          <img 
            src={diamondUrl} 
            alt="Baseball Diamond" 
            style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 0 }}
          />

        {diamondContainerRef.current && diamondContainerRef.current instanceof HTMLDivElement && (
          <RunnerManager
            containerRef={diamondContainerRef as React.RefObject<HTMLDivElement>}
            runnerImageUrl={runnerImageUrl || undefined}
            triggerPlay={pendingPlay}
            onRunnerAdvance={updateBaseStateFrom}
            onRunScored={(count) => {
              const newScore = currentScore + count;
              setCurrentScore(newScore);
              onAnimationComplete(count);
            }}
            onPlayComplete={() => setPendingPlay(null)}
          />
        )}
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <Typography 
              variant="h1" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '4rem', sm: '5rem' }
              }}
            >
              {currentScore}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white', 
                textTransform: 'uppercase',
                mt: -2
              }}
            >
              Runs
            </Typography>
          </Box>

          <Box sx={{ 
            position: 'absolute', 
            top: '5%', 
            left: '5%', 
            textAlign: 'center'
          }}>
            <Typography variant="body1" component="div" sx={{ color: 'black', fontWeight: 'bold', mb: 1 }}>
              PASSES
            </Typography>
            <Box display="flex" justifyContent="center">
              {[0, 1, 2].map((_, index) => (
                <Box 
                  key={`strike-${index}`}
                  sx={{ 
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    mx: 0.5,
                    backgroundColor: index < strikes 
                      ? theme.palette.warning.main 
                      : '#dddddd'
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ 
            position: 'absolute', 
            top: '5%', 
            right: '5%', 
            textAlign: 'center'
          }}>
            <Typography variant="body1" component="div" sx={{ color: 'black', fontWeight: 'bold', mb: 1}}>
              OUTS
            </Typography>
            <Box display="flex" justifyContent="center">
              {[0, 1, 2].map((_, index) => (
                <Box 
                  key={`out-${index}`}
                  sx={{ 
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    mx: 0.5,
                    backgroundColor: index < outs 
                      ? theme.palette.error.main 
                      : '#dddddd'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default BaseballField;
