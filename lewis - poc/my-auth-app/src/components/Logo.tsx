/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Logo.tsx
import React from 'react';
import { Box } from '@mui/material';
import logoUrl from '../assets/logo.svg';

interface LogoProps {
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ 
  height = 40
}) => {
  
  return (
    <Box 
      component="img"
      src={logoUrl}
      alt="Logo"
      height={height}
      sx={{ mr: 1 }}
    />
  );
};

export default Logo;