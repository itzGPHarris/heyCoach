import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';
// Use the lower level imports for Grid
//import Grid from '@mui/material/Grid';

interface ScoreBoardProps {
  score: number;
  outs: number;
  strikes: number;
  inning: number;
  questionCount: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  outs,
  strikes,
  //inning,
  questionCount
}) => {
  const theme = useTheme();

  // Let's avoid Grid entirely and use Box with flexbox instead
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3, 
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap'
      }}>
        {/* RUNS */}
        <Box sx={{ 
          width: { xs: '50%', md: '25%' },
          textAlign: 'center'
        }}>
          <Typography variant="overline" color="text.secondary">
            RUNS
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {score}
          </Typography>
        </Box>
        
        {/* OUTS */}
        <Box sx={{ 
          width: { xs: '50%', md: '25%' },
          textAlign: 'center'
        }}>
          <Typography variant="overline" color="text.secondary">
            OUTS
          </Typography>
          <Box display="flex" justifyContent="center" mt={1}>
            {[0, 1, 2].map((_, index) => (
              <Box 
                key={`out-${index}`}
                sx={{ 
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  mx: 0.5,
                  backgroundColor: index < outs 
                    ? theme.palette.error.main 
                    : theme.palette.grey[300]
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* STRIKES */}
        <Box sx={{ 
          width: { xs: '50%', md: '25%' },
          textAlign: 'center'
        }}>
          <Typography variant="overline" color="text.secondary">
            STRIKES
          </Typography>
          <Box display="flex" justifyContent="center" mt={1}>
            {[0, 1, 2].map((_, index) => (
              <Box 
                key={`strike-${index}`}
                sx={{ 
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  mx: 0.5,
                  backgroundColor: index < strikes 
                    ? theme.palette.warning.main 
                    : theme.palette.grey[300]
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* QUESTIONS */}
        <Box sx={{ 
          width: { xs: '50%', md: '25%' },
          textAlign: 'center'
        }}>
          <Typography variant="overline" color="text.secondary">
            QUESTIONS
          </Typography>
          <Typography variant="h6">
            {questionCount}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;