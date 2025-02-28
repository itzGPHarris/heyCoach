/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Logo.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import logoUrl from '../assets/logo.svg';

interface LogoProps {
  height?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  height = 40, 
  color
}) => {
  const theme = useTheme();
  const logoColor = color || theme.palette.primary.contrastText;
  
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