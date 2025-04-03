import React from 'react';
import { Box, Typography, useTheme, Stack, Button } from '@mui/material';
import { BaseState, QuestionDifficulty, RunnerState } from '../types';
import BaseRunner from './BaseRunner';
import { useEffect, useRef } from 'react';

interface GamePlayAreaProps {
  bases: BaseState;
  outs: number;
  strikes: number;
  score: number;
  inning: number;
  questionCount: number;
  onSelectDifficulty: (difficulty: QuestionDifficulty) => void;
  isFinalAtBat: boolean;
  disabled: boolean;
  diamondUrl: string;
  runnerImageUrl: string | null;
  runners: RunnerState[];
  onRunnerAnimationComplete?: (runnerId: string) => void;
}

const GamePlayArea: React.FC<GamePlayAreaProps> = ({
  outs,
  strikes,
  score,
  onSelectDifficulty,
  isFinalAtBat,
  disabled,
  diamondUrl,
  runnerImageUrl,
  runners,
  onRunnerAnimationComplete
}) => {
  const theme = useTheme();
  const diamondContainerRef = useRef<HTMLDivElement>(null);
  
  // Effect to log container dimensions for debugging
  useEffect(() => {
    if (diamondContainerRef.current) {
      console.log('Diamond container size:', {
        width: diamondContainerRef.current.clientWidth,
        height: diamondContainerRef.current.clientHeight,
        rect: diamondContainerRef.current.getBoundingClientRect()
      });
    }
  }, []);

  // Are any runners currently animating?
  const isAnyRunnerAnimating = runners && runners.some(r => r.isAnimating);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {/* Diamond container with overlay indicators */}
      <Box sx={{ position: 'relative', mx: 'auto', maxWidth: '90%', mb: 4 }}>
        {/* Base diamond image with container reference */}
        <Box 
          ref={diamondContainerRef}
          sx={{ position: 'relative', width: '100%' }}
        >
          <img 
            src={diamondUrl} 
            alt="Baseball Diamond" 
            style={{ width: '100%', height: 'auto' }}
          />
          
          {/* Runner overlay (for static display when not animating) */}
          {runnerImageUrl && !isAnyRunnerAnimating && (
            <img 
              src={runnerImageUrl} 
              alt="Base Runners" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            />
          )}
          
          {/* Display initial batter at home plate when not animating */}
          {runners && runners.map(runner => {
            // Initial batter - show at home plate
            if (runner.currentBase === 'none' && !runner.isAnimating) {
              return (
                <BaseRunner
                  key={runner.id}
                  previousBase="home"
                  currentBase="home"
                  containerElement={diamondContainerRef.current}
                  onAnimationComplete={() => {}}
                />
              );
            } 
            // Animating runners
            else if (runner.isAnimating) {
              return (
                <BaseRunner
                  key={runner.id}
                  previousBase={runner.previousBase}
                  currentBase={runner.currentBase !== 'none' ? runner.currentBase : 'home'}
                  containerElement={diamondContainerRef.current}
                  pathToTake={runner.path}
                  onAnimationComplete={() => {
                    if (onRunnerAnimationComplete) {
                      onRunnerAnimationComplete(runner.id);
                    }
                  }}
                />
              );
            }
            // Runners on bases (not animating)
            else if (runner.currentBase !== 'home' && runner.currentBase !== 'none') {
              return (
                <BaseRunner
                  key={runner.id}
                  previousBase={runner.currentBase}
                  currentBase={runner.currentBase}
                  containerElement={diamondContainerRef.current}
                  onAnimationComplete={() => {}}
                />
              );
            }
            return null;
          })}
          
          {/* Score in the middle of diamond */}
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
              {score}
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
          
          {/* Strikes indicator - upper left */}
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
          
          {/* Outs indicator - upper right */}
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
      
      {/* Question selector below diamond */}
      <Box sx={{ px: 2 }}>
        <Typography 
          variant="h6" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 'medium' }}
        >
          {isFinalAtBat 
            ? "Last batter. Time to swing for the fences!" 
            : "Choose your pitch"}
        </Typography>
        
        <Stack spacing={1} sx={{ mt: 2 }}>
          {['Single', 'Double', 'Triple', 'Homerun']
            .filter(difficulty => !isFinalAtBat || difficulty === 'Homerun')
            .map((difficulty) => (
              <Button
                key={difficulty}
                variant="contained"
                fullWidth
                disabled={disabled || isAnyRunnerAnimating}
                onClick={() => onSelectDifficulty(difficulty as QuestionDifficulty)}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                  color: 'black',
                  '&:hover': {
                    backgroundColor: theme.palette.grey[300],
                  },
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                {difficulty}
              </Button>
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default GamePlayArea;