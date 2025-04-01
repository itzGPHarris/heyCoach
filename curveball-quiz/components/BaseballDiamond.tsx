import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { BaseState } from '../types';

interface BaseballDiamondProps {
  bases: BaseState;
  outs: number;
  strikes: number;
  score: number;
}

const BaseballDiamond: React.FC<BaseballDiamondProps> = ({ 
  bases, 
  outs, 
  strikes, 
  score 
}) => {
  const theme = useTheme();

  // Base dimensions
  const baseSize = 24;
  const diamondSize = 200;
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mb: 4
      }}
    >
      {/* Score */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      >
        <Typography variant="h4" align="center">
          {score}
        </Typography>
        <Typography variant="caption" align="center" display="block">
          RUNS
        </Typography>
      </Box>
      
      {/* Diamond Container */}
      <Box 
        sx={{ 
          position: 'relative',
          width: diamondSize,
          height: diamondSize,
          mx: 'auto',
          transform: 'rotate(45deg)',
          backgroundColor: theme.palette.success.light,
          borderRadius: 2,
        }}
      >
        {/* Home Plate */}
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -baseSize/2,
            left: '50%',
            transform: 'translateX(-50%) rotate(-45deg)',
            width: baseSize * 1.5,
            height: baseSize * 1.5,
            backgroundColor: 'white',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 2
          }}
        />
        
        {/* First Base */}
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -baseSize/2,
            right: -baseSize/2,
            width: baseSize,
            height: baseSize,
            backgroundColor: bases.first ? theme.palette.primary.main : 'white',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 1,
            transform: 'rotate(-45deg)'
          }}
        />
        
        {/* Second Base */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: -baseSize/2,
            right: -baseSize/2,
            width: baseSize,
            height: baseSize,
            backgroundColor: bases.second ? theme.palette.primary.main : 'white',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 1,
            transform: 'rotate(-45deg)'
          }}
        />
        
        {/* Third Base */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: -baseSize/2,
            left: -baseSize/2,
            width: baseSize,
            height: baseSize,
            backgroundColor: bases.third ? theme.palette.primary.main : 'white',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 1,
            transform: 'rotate(-45deg)'
          }}
        />
      </Box>
      
      {/* Outs and Strikes indicators */}
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3
        }}
      >
        {/* Outs */}
        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            OUTS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2].map((_, index) => (
              <Box 
                key={`out-${index}`}
                sx={{ 
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: index < outs ? theme.palette.error.main : theme.palette.grey[300]
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Strikes (Passes) */}
        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            STRIKES
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2].map((_, index) => (
              <Box 
                key={`strike-${index}`}
                sx={{ 
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: index < strikes ? theme.palette.warning.main : theme.palette.grey[300]
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BaseballDiamond;