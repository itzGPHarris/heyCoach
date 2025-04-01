import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import { ReplayRounded } from '@mui/icons-material';
import { Question } from '../types';

interface GameOverScreenProps {
  score: number;
  questionsAnswered: Question[];
  questionCounts: Record<QuestionDifficulty, number>;
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  questionsAnswered,
  questionCounts,
  onPlayAgain,
}) => {
  const theme = useTheme();

  // Calculate game stats
  const totalQuestions = questionsAnswered.length;
  const correctAnswers = questionsAnswered.filter(
    (q) => q.correctAnswer === q.selectedAnswer
  ).length;
  
  // Get accuracy percentage
  const accuracy = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Game Over!
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 4,
          p: 3,
          backgroundColor: theme.palette.primary.main,
          borderRadius: '50%',
          width: 120,
          height: 120,
          mx: 'auto',
        }}
      >
        <Typography variant="h3" sx={{ color: 'white' }}>
          {score}
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Final Score: {score} Runs
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4, textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
          Game Stats
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Questions Answered:</Typography>
          <Typography fontWeight="bold">{totalQuestions}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Correct Answers:</Typography>
          <Typography fontWeight="bold">{correctAnswers}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Accuracy:</Typography>
          <Typography fontWeight="bold">{accuracy}%</Typography>
        </Box>
        
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Questions by Difficulty:
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Singles:</Typography>
          <Typography>{questionCounts.Single}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Doubles:</Typography>
          <Typography>{questionCounts.Double}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Triples:</Typography>
          <Typography>{questionCounts.Triple}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Home Runs:</Typography>
          <Typography>{questionCounts.Homerun}</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<ReplayRounded />}
        onClick={onPlayAgain}
        sx={{ mt: 2 }}
      >
        Play Again
      </Button>
    </Paper>
  );
};

export default GameOverScreen;