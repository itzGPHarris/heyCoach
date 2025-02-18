// components/AICoach/AICoach.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Drawer,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import useStore from '../../store';
import ContextPanel from './ContextPanel';
import { generateUUID } from '../../utils/uuid';

interface ChatMessage {
  id: string;
  content: string;
  fromAI: boolean;
  timestamp: Date;
}

const AICoach: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [input, setInput] = useState('');
  const { showAICoach, toggleAICoach, coachMessages, setCoachMessages } = useStore(); // ✅ setCoachMessages is now included

  const handleSend = () => {
    if (!input.trim()) return;

    // ✅ Ensure new message conforms to ChatMessage type
    const newMessage: ChatMessage = {
      id: generateUUID(),
      content: input, // ✅ Use 'content' instead of 'text'
      fromAI: false, // ✅ User messages should not be AI
      timestamp: new Date(),
    };

    setCoachMessages([...coachMessages, newMessage]);

    // ✅ Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: generateUUID(),
        content: "Interesting! Can you elaborate on that?", // ✅ Ensure 'content' is used
        fromAI: true, // ✅ AI response should be fromAI: true
        timestamp: new Date(),
      };
      setCoachMessages([...coachMessages, newMessage, aiResponse]);
    }, 1500);

    setInput('');
  };

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={showAICoach}
      onClose={toggleAICoach}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : '400px',
          height: isMobile ? '80vh' : '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">AI Coach</Typography>
          <IconButton onClick={toggleAICoach}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Context Panel */}
        <Box sx={{ height: '30%', borderBottom: 1, borderColor: 'divider' }}>
          <ContextPanel />
        </Box>

        {/* Chat Area */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {coachMessages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Ask your coach..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <Box
    sx={{
      alignSelf: message.fromAI ? 'flex-start' : 'flex-end',
      maxWidth: '80%',
    }}
  >
    <Paper
      elevation={1}
      sx={{
        p: 2,
        bgcolor: message.fromAI ? 'grey.100' : 'primary.light',
        color: message.fromAI ? 'text.primary' : 'primary.contrastText',
      }}
    >
      <Typography variant="body1">{message.content}</Typography> {/* ✅ Ensure 'content' is used */}
      <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
        {message.timestamp.toLocaleTimeString()} {/* ✅ Ensure timestamp is displayed properly */}
      </Typography>
    </Paper>
  </Box>
);

export default AICoach;
