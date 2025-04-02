import React from 'react';
import { 
  Box, 
  Button, 
  Stack, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { QuestionDifficulty } from '../types';

interface QuestionSelectorProps {
  onSelectDifficulty: (difficulty: QuestionDifficulty) => void;
  isFinalAtBat: boolean;
  disabled: boolean;
  compact?: boolean; // New prop
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({ 
  onSelectDifficulty, 
  isFinalAtBat,
  disabled,
  compact = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Define the difficulty options
  const difficultyOptions: QuestionDifficulty[] = ['Single', 'Double', 'Triple', 'Homerun'];
  
  // Get button color based on difficulty
  const getDifficultyColor = (difficulty: QuestionDifficulty): string => {
    switch (difficulty) {
      case 'Single':
        return theme.palette.success.light;
      case 'Double':
        return theme.palette.info.light;
      case 'Triple':
        return theme.palette.warning.light;
      case 'Homerun':
        return theme.palette.error.light;
      default:
        return theme.palette.primary.light;
    }
  };

  return (
    <Box sx={{ width: '100%', mt: compact ? 0 : 2 }}>
      {!compact && (
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            {isFinalAtBat 
              ? "Last batter. Time to swing for the fences!" 
              : "Choose your pitch"}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {isFinalAtBat 
              ? "Only a home run can score now" 
              : "Select the difficulty of your next question"}
          </Typography>
        </Box>
      )}

      <Stack 
        direction={compact || !isMobile ? "row" : "column"} 
        spacing={compact ? 1 : 2} 
        justifyContent="center"
      >
        {difficultyOptions
          // If final at bat, only show Homerun option
          .filter(difficulty => !isFinalAtBat || difficulty === 'Homerun')
          .map((difficulty) => (
            <Button
              key={difficulty}
              variant="contained"
              size={compact ? "medium" : "large"}
              fullWidth
              disabled={disabled}
              onClick={() => onSelectDifficulty(difficulty)}
              sx={{
                backgroundColor: getDifficultyColor(difficulty),
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light' 
                    ? `${getDifficultyColor(difficulty)}CC` // Add transparency
                    : `${getDifficultyColor(difficulty)}EE`,
                },
                py: compact ? 1 : 1.5,
                fontWeight: 'bold'
              }}
            >
              {difficulty}
            </Button>
          ))}
      </Stack>
    </Box>
  );
};

export default QuestionSelector;