import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  InputAdornment,
  Fab,
  styled,
} from '@mui/material';
import {
  Mic as MicIcon,
  ArrowUpward as SendIcon,
  Add as AddIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const ToolbarContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  borderRadius: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.paper,
}));

const CoachInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 24,
    backgroundColor: theme.palette.background.default,
  },
}));

interface CoachToolbarProps {
  onSendMessage?: (message: string) => void;
  onNewPitch?: () => void;
  onTeamClick?: () => void;
  className?: string; // Add className prop
}

const CoachToolbar = ({
  onSendMessage,
  onNewPitch,
  onTeamClick,
  className, // Add className prop
}: CoachToolbarProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
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

  return (
    <ToolbarContainer elevation={3} className={className}> {/* Apply className here */}
      <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <IconButton color="primary" sx={{ p: 1.5 }}>
            <MicIcon />
          </IconButton>

          <CoachInput
            fullWidth
            placeholder="Hi Harper! Ask Coach a question"
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

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Fab color="primary" size="medium" onClick={onNewPitch}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" size="medium" onClick={onTeamClick}>
            <GroupIcon />
          </Fab>
        </Box>
      </Box>
    </ToolbarContainer>
  );
};

export default CoachToolbar;
