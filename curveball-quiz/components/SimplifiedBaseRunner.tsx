// components/SimplifiedBaseRunner.tsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { BaseType } from '../types';

interface SimplifiedBaseRunnerProps {
  fromBase: BaseType;
  toBase: BaseType;
  containerElement: HTMLDivElement | null;
  onAnimationComplete?: () => void;
  isScoring?: boolean;
  runnerImageUrl?: string; // new prop for custom PNG
}

const SimplifiedBaseRunner: React.FC<SimplifiedBaseRunnerProps> = ({ 
  fromBase, 
  toBase,
  containerElement,
  onAnimationComplete,
  isScoring = false,
  runnerImageUrl
}) => {
  const [position, setPosition] = useState<BaseType>(fromBase);
  const [animating, setAnimating] = useState(false);

  const getBasePosition = (base: BaseType) => {
    if (!containerElement) {
      console.error('Container element is null');
      return { left: '0px', top: '0px' };
    }

    const width = containerElement.clientWidth;
    const height = width;

    switch (base) {
      case 'home': return { left: `${width * 0.5}px`, top: `${height * 0.9}px` };
      case 'first': return { left: `${width * 0.8}px`, top: `${height * 0.65}px` };
      case 'second': return { left: `${width * 0.5}px`, top: `${height * 0.15}px` };
      case 'third': return { left: `${width * 0.2}px`, top: `${height * 0.65}px` };
      default: return { left: '0px', top: '0px' };
    }
  };

  const currentPos = getBasePosition(position);

  useEffect(() => {
    if (fromBase === toBase) {
      onAnimationComplete?.();
      return;
    }

    setAnimating(true);
    const timer = setTimeout(() => setPosition(toBase), 100);
    return () => clearTimeout(timer);
  }, [fromBase, toBase]);

  const handleTransitionEnd = () => {
    setAnimating(false);
    onAnimationComplete?.();
  };

  return runnerImageUrl ? (
    <img
      src={runnerImageUrl}
      alt="Runner"
      style={{
        position: 'absolute',
        left: currentPos.left,
        top: currentPos.top,
        width: 32,
        height: 32,
        transform: 'translate(-50%, -50%)',
        transition: animating ? 'left 0.8s ease-in-out, top 0.8s ease-in-out' : 'none',
        zIndex: 1000
      }}
      onTransitionEnd={handleTransitionEnd}
    />
  ) : (
    <Box
      sx={{
        position: 'absolute',
        left: currentPos.left,
        top: currentPos.top,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: isScoring ? '#FF5252' : '#4285F4',
        transform: 'translate(-50%, -50%)',
        transition: animating ? 'left 0.8s ease-in-out, top 0.8s ease-in-out' : 'none',
        zIndex: 1000,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '5px',
          backgroundColor: isScoring ? '#B71C1C' : '#000080',
          borderRadius: '5px 5px 0 0',
        }
      }}
      onTransitionEnd={handleTransitionEnd}
    />
  );
};

export default SimplifiedBaseRunner;
