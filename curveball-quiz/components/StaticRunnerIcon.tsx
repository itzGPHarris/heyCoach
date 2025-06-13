import React from 'react';
import { Box } from '@mui/material';
import { BaseType } from '../types';

interface StaticRunnerIconProps {
  base: BaseType;
  containerElement: HTMLDivElement | null;
  runnerImageUrl?: string;
}

const StaticRunnerIcon: React.FC<StaticRunnerIconProps> = ({ base, containerElement, runnerImageUrl }) => {
  if (!containerElement) return null;

  const width = containerElement.clientWidth;
  const height = width;

  const getBasePosition = (base: BaseType) => {
    switch (base) {
      case 'home': return { left: `${width * 0.5}px`, top: `${height * 0.9}px` };
      case 'first': return { left: `${width * 0.8}px`, top: `${height * 0.65}px` };
      case 'second': return { left: `${width * 0.5}px`, top: `${height * 0.15}px` };
      case 'third': return { left: `${width * 0.2}px`, top: `${height * 0.65}px` };
      default: return { left: '0px', top: '0px' };
    }
  };

  const { left, top } = getBasePosition(base);

  return runnerImageUrl ? (
    <img
      src={runnerImageUrl}
      alt="Runner on base"
      style={{
        position: 'absolute',
        left,
        top,
        width: 32,
        height: 32,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 500
      }}
    />
  ) : (
    <Box
      sx={{
        position: 'absolute',
        left,
        top,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        transform: 'translate(-50%, -50%)',
        zIndex: 500
      }}
    />
  );
};

export default StaticRunnerIcon;
