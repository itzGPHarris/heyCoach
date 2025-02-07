import { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, InputAdornment, styled } from '@mui/material';
import { Mic as MicIcon, ArrowUpward as SendIcon } from '@mui/icons-material';

const ToolbarContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  borderRadius: 0,
  zIndex: 9999,
  backgroundColor: theme.palette.background.paper,
  transition: 'max-height 0.3s ease-in-out',
}));

const CoachInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 24,
    backgroundColor: theme.palette.background.default,
  },
}));

interface CoachToolbarProps {
  onSendMessage: (message: string) => void;
}

const CoachToolbar = ({ onSendMessage }: CoachToolbarProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('CoachToolbar mounted');
    return () => console.log('CoachToolbar unmounted');
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
console.log('CoachToolbar') 
  return (
    <ToolbarContainer elevation={3} sx={{ display: 'block !important' }}>
      <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <IconButton color="primary" sx={{ p: 1.5 }}>
            <MicIcon />
          </IconButton>

          <CoachInput
            fullWidth
            placeholder="Ask the Coach a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend} color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </ToolbarContainer>
  );
};

export default CoachToolbar;
