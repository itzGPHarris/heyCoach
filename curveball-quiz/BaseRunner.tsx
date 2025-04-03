// components/BaseRunner.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

interface BaseRunnerProps {
  previousBase: 'none' | 'first' | 'second' | 'third' | 'home';
  currentBase: 'first' | 'second' | 'third' | 'home';
  onAnimationComplete?: () => void;
}

const BaseRunner: React.FC<BaseRunnerProps> = ({ 
  previousBase, 
  currentBase,
  onAnimationComplete
}) => {
  const [position, setPosition] = useState(previousBase);
  const [animating, setAnimating] = useState(false);
  const runnerRef = useRef<HTMLDivElement>(null);
  
  // Base positions calibrated to match your diamond SVG
  const basePositions = {
    none: { left: '50%', top: '90%' },    // Starting from home plate
    first: { left: '85%', top: '65%' },   // First base
    second: { left: '50%', top: '15%' },  // Second base
    third: { left: '15%', top: '65%' },   // Third base
    home: { left: '50%', top: '90%' }     // Home plate
  };
  
  useEffect(() => {
    // Log initial setup
    console.log(`Runner setup: previousBase=${previousBase}, currentBase=${currentBase}`);
    console.log(`Start position: ${JSON.stringify(basePositions[previousBase])}`);
    console.log(`Target position: ${JSON.stringify(basePositions[currentBase])}`);
    
    if (previousBase !== currentBase) {
      // Start animation
      setAnimating(true);
      console.log('Starting animation');
      
      // Slight delay before starting movement
      const timer = setTimeout(() => {
        console.log(`Setting position to ${currentBase}`);
        setPosition(currentBase);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [previousBase, currentBase]);
  
  // Log when position changes
  useEffect(() => {
    console.log(`Position updated to: ${position} at ${JSON.stringify(basePositions[position])}`);
  }, [position]);
  
  // Handle animation end
  const handleTransitionEnd = () => {
    console.log('Animation completed');
    setAnimating(false);
    if (onAnimationComplete) {
      console.log('Calling onAnimationComplete');
      onAnimationComplete();
    }
  };
  
  // Effect to check actual element position
  useEffect(() => {
    if (runnerRef.current) {
      const rect = runnerRef.current.getBoundingClientRect();
      console.log(`Runner actual position: left=${rect.left}, top=${rect.top}`);
    }
  }, [position]);
  
  return (
    <Box
      ref={runnerRef}
      sx={{
        position: 'absolute',
        left: basePositions[position].left,
        top: basePositions[position].top,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#4285F4', // Blue color
        transform: 'translate(-50%, -50%)',
        transition: animating ? 'left 0.8s ease-in-out, top 0.8s ease-in-out' : 'none',
        zIndex: 10,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '5px',
          backgroundColor: '#000080', // Navy cap bill
          borderRadius: '5px 5px 0 0',
        }
      }}
      onTransitionEnd={handleTransitionEnd}
    />
  );
};

export default BaseRunner;