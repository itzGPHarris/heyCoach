// components/BaseRunner.tsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface BaseRunnerProps {
  previousBase: 'none' | 'first' | 'second' | 'third' | 'home';
  currentBase: 'first' | 'second' | 'third' | 'home';
  containerElement: HTMLDivElement | null;
  onAnimationComplete?: () => void;
  pathToTake?: ('none' | 'first' | 'second' | 'third' | 'home')[];
}

const BaseRunner: React.FC<BaseRunnerProps> = ({ 
  previousBase, 
  currentBase,
  containerElement,
  onAnimationComplete,
  pathToTake
}) => {
  const [position, setPosition] = useState(previousBase);
  const [animating, setAnimating] = useState(false);
  const [animationPath, setAnimationPath] = useState<('none' | 'first' | 'second' | 'third' | 'home')[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  
  // Calculate the pixel position based on the container dimensions
  const getBasePosition = (base: string) => {
    if (!containerElement) {
      console.error('Container element is null');
      return { left: '0px', top: '0px' };
    }
    
    const width = containerElement.clientWidth;
    const height = width; // Assuming the diamond is square
    
    // These positions should be calibrated to match your SVG
    switch (base) {
      case 'none':
        return { left: `${width * 0.5}px`, top: `${height * 0.9}px` }; // Home
      case 'first':
        return { left: `${width * 0.8}px`, top: `${height * 0.65}px` }; // First
      case 'second':
        return { left: `${width * 0.5}px`, top: `${height * 0.15}px` }; // Second
      case 'third':
        return { left: `${width * 0.2}px`, top: `${height * 0.65}px` }; // Third
      case 'home':
        return { left: `${width * 0.5}px`, top: `${height * 0.9}px` }; // Home
      default:
        return { left: '0px', top: '0px' };
    }
  };
  
  // Get current position coordinates
  const currentPos = getBasePosition(position);
  
  // Setup the animation path
  useEffect(() => {
    if (previousBase !== currentBase) {
      // If we have a specific path to take, use it
      if (pathToTake && pathToTake.length > 0) {
        setAnimationPath(pathToTake as ('none' | 'first' | 'second' | 'third' | 'home')[]);
        setCurrentPathIndex(0);
        setAnimating(true);
        
        // Start with the first position in the path
        setTimeout(() => {
          setPosition(pathToTake[0]);
        }, 100);
      } else {
        // Default behavior - direct animation
        console.log(`Starting animation from ${previousBase} to ${currentBase}`);
        setAnimating(true);
        
        // Slight delay before starting movement
        setTimeout(() => {
          setPosition(currentBase);
        }, 100);
      }
    }
  }, [previousBase, currentBase, pathToTake]);
  
  // Handle animation end
  const handleTransitionEnd = () => {
    // If we're using a path and haven't reached the end
    if (animationPath.length > 0 && currentPathIndex < animationPath.length - 1) {
      // Move to the next position in the path
      const nextIndex = currentPathIndex + 1;
      setCurrentPathIndex(nextIndex);
      
      // Short delay before starting the next segment
      setTimeout(() => {
        setPosition(animationPath[nextIndex]);
      }, 50);
    } else {
      // Animation is complete
      console.log('Animation completed');
      setAnimating(false);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  };
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: currentPos.left,
        top: currentPos.top,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#4285F4', // Blue color for runner
        transform: 'translate(-50%, -50%)',
        transition: animating ? 'left 0.8s ease-in-out, top 0.8s ease-in-out' : 'none',
        zIndex: 1000, // Very high z-index to ensure visibility
        // Baseball cap styling
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '5px',
          backgroundColor: '#000080', // Navy for cap
          borderRadius: '5px 5px 0 0',
        }
      }}
      onTransitionEnd={handleTransitionEnd}
    />
  );
};

export default BaseRunner;