/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BaseType } from '../types';

interface AnimatedRunnerProps {
  id: string;
  from: BaseType | 'home';
  to: BaseType | 'home';
  containerElement: HTMLDivElement | null;
  onComplete: (id: string, newBase: BaseType | 'home') => void;
  runnerImageUrl?: string;
}

const getBasePosition = (base: BaseType | 'home', width: number, height: number) => {
  switch (base) {
    case 'home':
      return { left: `${width * 0.495}px`, top: `${height * 0.88}px` };
    case 'first':
      return { left: `${width * 0.900}px`, top: `${height * 0.500}px` };
    case 'second':
      return { left: `${width * 0.495}px`, top: `${height * 0.075}px` };
    case 'third':
      return { left: `${width * 0.07}px`, top: `${height * 0.500}px` };
    default:
      return { left: '0px', top: '0px' };
  }
};

const basePath: (BaseType | 'home')[] = ['home', 'first', 'second', 'third', 'home'];

const AnimatedRunner: React.FC<AnimatedRunnerProps> = ({ id, from, to, containerElement, onComplete, runnerImageUrl }) => {
  const [positionIndex, setPositionIndex] = useState(basePath.indexOf(from));
  const [coords, setCoords] = useState(() => getBasePosition(from, containerElement?.clientWidth || 800, containerElement?.clientWidth || 800));
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fromIndex = basePath.indexOf(from);
    const toIndex = basePath.indexOf(to);

    if (from === to || fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      onComplete(id, to);
      return;
    }

    setAnimating(true);
    let current = fromIndex;

    const advance = () => {
      current++;
      if (current > toIndex) {
        setAnimating(false);
        onComplete(id, to);
      } else {
        setCoords(getBasePosition(basePath[current], containerElement?.clientWidth || 800, containerElement?.clientWidth || 800));
        setTimeout(advance, 450);
      }
    };

    setTimeout(advance, 10); // small delay to start

    return () => setAnimating(false);
  }, [from, to]);

  const style = {
    position: 'absolute' as const,
    left: coords.left,
    top: coords.top,
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.4s ease-in-out, top 0.4s ease-in-out',
    zIndex: 1000,
    pointerEvents: 'none'
  };

  return runnerImageUrl ? (
    <img
      src={runnerImageUrl}
      alt="Runner"
      style={{ ...style, width: 32, height: 20 } as React.CSSProperties}
    />
  ) : (
    <div
      style={{ ...style, width: 24, height: 20, borderRadius: '50%', backgroundColor: '#1976d2', pointerEvents: 'none' as React.CSSProperties['pointerEvents'] }}
    />
  );
};

export default AnimatedRunner;
