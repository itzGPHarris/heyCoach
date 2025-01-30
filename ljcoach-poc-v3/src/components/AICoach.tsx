import React, { useState } from 'react';
import { Box, Typography, List, ListItem, TextField, IconButton } from '@mui/material';
import Send from '@mui/icons-material/Send';
import useStore from '../store';
import { ChatMessage } from '../store/types';

const AICoach: React.FC = () => {
  const [input, setInput] = useState('');
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      fromAI: false,
      sender: 'user',
      content: input,
      text: input, // Added missing text property
      pitchId: 'demo-pitch-1', // Example pitchId, adjust as needed
    };

    addMessage(newMessage);
    setInput('');
  };

  return (
    <Box sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">AI Coach</Typography>
      
      {/* Chat Messages */}
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.300', borderRadius: 2 }}>
              <Typography variant="body2">{msg.content}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      
      {/* Input Field */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Ask the coach a question..."
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton onClick={handleSend} color="primary">
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AICoach;