import React from 'react';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';

interface TimerProps {
  timeRemaining: number;
  duration: number;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, duration }) => {
  const theme = useTheme();
  
  // Calculate percentage of time remaining
  const percentRemaining = Math.max(0, (timeRemaining / duration) * 100);
  
  // Format time remaining as seconds
  const secondsRemaining = Math.ceil(timeRemaining);
  
  // Determine color based on time remaining
  const getColor = () => {
    if (percentRemaining > 60) return theme.palette.success.main;
    if (percentRemaining > 30) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Time Remaining
        </Typography>
        <Typography variant="caption" fontWeight="bold">
          {secondsRemaining}s
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={percentRemaining} 
        sx={{ 
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(),
            borderRadius: 4,
          }
        }}
      />
    </Box>
  );
};

export default Timer;