// src/components/shared/MetricBar.tsx
import React from 'react';
import { Box, Typography, LinearProgress, SxProps, Theme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricBarProps {
  label: string;
  value: number;
  change?: number;
  sx?: SxProps<Theme>;
}

export const MetricBar: React.FC<MetricBarProps> = ({ label, value, change, sx }) => {
  const displayValue = Math.min(100, Math.max(0, value));
  
  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2">{label}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" fontWeight="medium">
            {displayValue}%
          </Typography>
          
          {change && change !== 0 && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              ml: 1,
              color: change > 0 ? 'success.main' : 'error.main' 
            }}>
              {change > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {change > 0 ? '+' : ''}{change}%
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={displayValue} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.05)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: displayValue > 70 ? 'success.main' : displayValue > 40 ? 'warning.main' : 'error.main',
          }
        }} 
      />
    </Box>
  );
};