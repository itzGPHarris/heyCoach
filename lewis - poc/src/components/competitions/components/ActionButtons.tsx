// ActionButtons.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import type { ActionButtonsProps } from '../types';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveDraft,
  onSubmit,
  isSubmitting,
  disabled
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button
        variant="outlined"
        onClick={onSaveDraft}
        disabled={isSubmitting || disabled}
      >
        Save Draft
      </Button>
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={isSubmitting || disabled}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ActionButtons;