// components/QuestionDialog.tsx
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent, 
  Box,
  Button,
  Typography,
  LinearProgress,
  useTheme,
  Stack,
} from '@mui/material';
import { Question } from '../types';

interface QuestionDialogProps {
  open: boolean;
  question: Question | null;
  onAnswer: (isCorrect: boolean, updatedQuestion: Question) => void;
  onPass: () => void;
  timerDuration: number;
  remainingPasses: number;
}

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  open,
  question,
  onAnswer,
  onPass,
  timerDuration,
  remainingPasses
}) => {
  const theme = useTheme();
  const [timeRemaining, setTimeRemaining] = useState(timerDuration);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  
  // Reset state when new question is presented
  useEffect(() => {
    if (open && question) {
      setTimeRemaining(timerDuration);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }, [open, question, timerDuration]);
  
  // Timer effect
  useEffect(() => {
    let timer: number | null = null;
    
    if (open && !answered && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 0.1;
          if (newTime <= 0) {
            clearInterval(timer!);
            // Time's up - trigger incorrect answer
            if (!answered && question) {
              const updatedQuestion = { ...question, selectedAnswer: '' };
              onAnswer(false, updatedQuestion);
            }
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, answered, timeRemaining, question, onAnswer]);
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (answered || !question) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    // Update the question with selected answer
    const updatedQuestion = { 
      ...question, 
      selectedAnswer: answer 
    };
    
    // Delay the feedback to let user see selection
    setTimeout(() => {
      onAnswer(answer === question.correctAnswer, updatedQuestion);
    }, 1000);
  };
  
  if (!question) return null;
  
  // Calculate percentage for progress bar
  const percentRemaining = (timeRemaining / timerDuration) * 100;
  
  // Get progress color based on time remaining
  const getProgressColor = () => {
    if (percentRemaining > 60) return theme.palette.success.main;
    if (percentRemaining > 30) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          mx: { xs: 2, sm: 'auto' }
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Timer bar */}
        <LinearProgress 
          variant="determinate" 
          value={percentRemaining} 
          sx={{ 
            height: 6,
            '& .MuiLinearProgress-bar': {
              backgroundColor: getProgressColor(),
            }
          }}
        />
        
        <Box sx={{ p: 3 }}>
          {/* Question metadata */}
          <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" color="text.secondary">
              {question.league} • {question.year}
            </Typography>
            <Typography variant="overline" color="text.secondary">
              {question.difficulty}
            </Typography>
          </Box>
          
          {/* Question text */}
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            {question.question}
          </Typography>
          
          {/* Answer options */}
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
                color={
                  answered && selectedAnswer === answer
                    ? answer === question.correctAnswer ? "success" : "error"
                    : "primary"
                }
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
          
          {/* Pass button */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="text"
              color="inherit"
              onClick={onPass}
              disabled={answered || remainingPasses <= 0}
              startIcon={<span role="img" aria-label="Baseball">⚾</span>}
            >
              Pass ({remainingPasses} left)
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;