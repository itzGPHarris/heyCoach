import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { QuestionDifficulty } from '../types';

interface QuestionSelectorProps {
  onSelectDifficulty: (difficulty: QuestionDifficulty) => void;
  isFinalAtBat: boolean;
  disabled: boolean;
  compact?: boolean;
  selectedDifficulty?: QuestionDifficulty;
}

const difficultyOptions: QuestionDifficulty[] = ['Single', 'Double', 'Triple', 'Homerun'];

// Color map for styling buttons
const getDifficultyColor = (difficulty: QuestionDifficulty): string => {
  switch (difficulty) {
    case 'Single': return '#81C784'; // green
    case 'Double': return '#64B5F6'; // blue
    case 'Triple': return '#FFB74D'; // orange
    case 'Homerun': return '#E57373'; // red
    default: return '#E0E0E0'; // grey fallback
  }
};

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  onSelectDifficulty,
  isFinalAtBat,
  disabled,
  compact,
  selectedDifficulty
}) => {
  return (
    <Box textAlign="center" mb={4}>
      {!compact && (
        <>
          <Typography variant="h5" gutterBottom>
            Choose your pitch
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select the difficulty of your next question
          </Typography>
        </>
      )}

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${difficultyOptions.length}, minmax(100px, 1fr))`}
        gap={compact ? 1 : 2}
        justifyContent="center"
        mx="auto"
        maxWidth="500px"
      >
        {difficultyOptions
          .filter(d => !isFinalAtBat || d === 'Homerun')
          .map(difficulty => {
            const isSelected = selectedDifficulty === difficulty;

            return (
              <Button
                key={difficulty}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => onSelectDifficulty(difficulty)}
               disabled={disabled}
                sx={{
                  backgroundColor: isSelected ? getDifficultyColor(difficulty) : undefined,
                  color: isSelected ? '#fff' : undefined,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: compact ? 1 : 1.5,
                  fontSize: compact ? '0.9rem' : '1rem',
                  '&:hover': {
                    backgroundColor: isSelected
                      ? getDifficultyColor(difficulty)
                      : `${getDifficultyColor(difficulty)}22`
                  }
                }}
              >
                {difficulty}
              </Button>
            );
          })}
      </Box>
    </Box>
  );
};

export default QuestionSelector;
