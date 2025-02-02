// src/components/AICoach.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  TextField,

} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import useStore from '../store';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome! I'm your AI Coach. I can help you improve your pitch.",
      sender: 'ai'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toggleAICoach } = useStore();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "Great point! Let me help you refine that.",
        sender: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };
console.log('toggleAICoach')
  return (
    <Paper 
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 80,
        right: 16,
        width: 350,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider' 
        }}
      >
        <Typography variant="h6">AI Coach</Typography>
        <IconButton onClick={toggleAICoach}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2 
        }}
      >
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ListItem 
              sx={{ 
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Paper 
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '80%',
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                  color: message.sender === 'user' ? 'white' : 'text.primary'
                }}
              >
                <Typography variant="body2">
                  {message.text}
                </Typography>
              </Paper>
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <Box 
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask your AI Coach"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          size="small"
        />
        <IconButton 
          color="primary" 
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ''}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AICoach;