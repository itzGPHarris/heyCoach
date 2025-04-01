import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Divider,
  useTheme
} from '@mui/material';

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
  inning,
  questionCount
}) => {
  const theme = useTheme();

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
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="overline" color="text.secondary">
              RUNS
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {score}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
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
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
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
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Box textAlign="center">
            <Typography variant="overline" color="text.secondary">
              QUESTIONS
            </Typography>
            <Typography variant="h6">
              {questionCount}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ScoreBoard;