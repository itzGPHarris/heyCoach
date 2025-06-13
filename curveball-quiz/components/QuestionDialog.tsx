import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  LinearProgress
} from '@mui/material';
import { Question } from '../types';

interface QuestionDialogProps {
  open: boolean;
  question: Question | null;
  onAnswer: (answer: string) => void;
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
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  // Reset timer when dialog opens
  useEffect(() => {
    if (!open || !question) return;

    setTimeLeft(timerDuration);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, timerDuration, question]);

  // Trigger pass if time runs out
  useEffect(() => {
    if (timeLeft === 0 && open) {
      onPass();
    }
  }, [timeLeft, open, onPass]);

  if (!open || !question) return null;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Question</DialogTitle>
      <DialogContent>
        <Typography variant="h6" mb={2}>
          {question.text || 'No question text provided.'}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          {question.choices && question.choices.length > 0 ? (
            question.choices.map((choice, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => onAnswer(choice)}
              >
                {choice}
              </Button>
            ))
          ) : (
            <Typography color="error">
              No choices available for this question.
            </Typography>
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2">
            Passes left: {remainingPasses}
          </Typography>
          <Button
            variant="text"
            onClick={onPass}
            disabled={remainingPasses <= 0}
          >
            Pass
          </Button>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(timeLeft / timerDuration) * 100}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
