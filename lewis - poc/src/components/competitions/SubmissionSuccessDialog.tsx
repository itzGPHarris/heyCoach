// SubmissionSuccessDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface SubmissionSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  competitionName: string;
}

const SubmissionSuccessDialog: React.FC<SubmissionSuccessDialogProps> = ({
  open,
  onClose,
  competitionName
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          maxWidth: '500px',
          borderRadius: 2,
          p: 2
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ textAlign: 'center', pt: 0 }}>
        <CheckCircleIcon 
          color="success" 
          sx={{ 
            fontSize: 80,
            mb: 2
          }} 
        />

        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Great job!
        </Typography>
        
        <Typography 
          variant="body1" 
          paragraph
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Your pitch has been successfully submitted to <strong>{competitionName}</strong>. The competition organizers will review your submission and provide feedback soon.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onClose}
          sx={{ mb: 2 }}
        >
          View My Submissions
        </Button>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={onClose}
        >
          Return to Competition
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionSuccessDialog;