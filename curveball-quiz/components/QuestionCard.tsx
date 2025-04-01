import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Stack,
  useTheme,
  Divider,
  Badge
} from '@mui/material';
import { Question } from '../types';
import { useTimer } from '../hooks/useTimer';
import Timer from './Timer';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, updatedQuestion: Question) => void;
  onPass: () => void;
  timerDuration: number;
  remainingPasses: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer, 
  onPass, 
  timerDuration,
  remainingPasses
}) => {
  const theme = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  
  // Setup timer
  const { 
    timeRemaining, 
    percentageRemaining,
    isActive,
    startTimer
  } = useTimer({
    duration: timerDuration,
    onTimeout: () => onAnswer(false),
    isActive: true
  });
  
  // Start timer on component mount
  useEffect(() => {
    startTimer();
  }, [startTimer]);
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    // Update the question with selected answer
    const updatedQuestion = { 
      ...question, 
      selectedAnswer: answer 
    };
    
    // Check if the answer is correct
    const isCorrect = answer === question.correctAnswer;
    
    // Delay the feedback to let user see their selection
    setTimeout(() => {
      onAnswer(isCorrect, updatedQuestion);
    }, 1000);
  };
  
  // Handle pass button click
  const handlePass = () => {
    if (answered) return;
    setAnswered(true);
    onPass();
  };
  
  // Get color based on answer status
  const getAnswerColor = (answer: string) => {
    if (!answered || selectedAnswer !== answer) return 'default';
    
    return answer === question.correctAnswer ? 'success' : 'error';
  };
  
  // Get progress color based on time remaining
  const getProgressColor = () => {
    if (percentageRemaining > 60) return theme.palette.success.main;
    if (percentageRemaining > 30) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  // Calculate years ago
  const yearsAgo = new Date().getFullYear() - question.year;
  const yearText = yearsAgo === 0 ? "This year" : 
                  yearsAgo === 1 ? "Last year" : 
                  `${yearsAgo} years ago`;
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Timer component */}
      <Box sx={{ position: 'absolute', top: 10, left: 0, right: 0, px: 3 }}>
        <Timer 
          timeRemaining={timeRemaining} 
          duration={timerDuration} 
        />
      </Box>
      
      <Box mt={1} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="overline" color="text.secondary">
          {question.league} • {yearText}
        </Typography>
        <Typography variant="overline" color="text.secondary">
          {question.difficulty}
        </Typography>
      </Box>
      
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        {question.question}
      </Typography>
      
      <Stack spacing={2}>
        {[
          question.possibleAnswerA,
          question.possibleAnswerB,
          question.possibleAnswerC,
          question.possibleAnswerD
        ].map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === answer ? "contained" : "outlined"}
            color={getAnswerColor(answer)}
            fullWidth
            size="large"
            onClick={() => handleAnswerSelect(answer)}
            disabled={answered}
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              py: 1.5,
              borderWidth: 2
            }}
          >
            {answer}
          </Button>
        ))}
      </Stack>
      
      <Divider sx={{ my: 3 }} />
      
      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          color="inherit"
          onClick={handlePass}
          disabled={answered || remainingPasses <= 0}
          startIcon={<span role="img" aria-label="Baseball">⚾</span>}
        >
          Pass ({remainingPasses} left)
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionCard;