import { useState } from 'react';
import { Drawer, Box, TextField, IconButton, Typography, List, ListItem } from '@mui/material';
import { Send, MessageCircle } from 'lucide-react';
import useStore from '../../store';
import { ChatMessage } from '../../store/types'; // ✅ Adjust path if necessary


// Alternative UUID generator to avoid external dependencies
const generateUUID = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

function AICoach() {
  const { showAICoach, toggleAICoach, messages, addMessage } = useStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: generateUUID(),
      timestamp: new Date().toISOString(),
      sender: "user", // ✅ Explicitly set as "user"
      text: input,
      pitchId: null,
      fromAI: false,
      content: input
    };
    
    addMessage(userMessage);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: generateUUID(),
        timestamp: new Date().toISOString(),
        sender: "ai", // ✅ Explicitly set as "ai"
        text: "Analyzing your pitch...",
        pitchId: null,
        fromAI: true,
        content: "Analyzing your pitch..."
      };
    
      addMessage(aiMessage);
    }, 1000);
      };

  return (
    <>
      {/* Floating Button to Open Chat */}
      <IconButton 
        sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'primary.main', color: 'white' }}
        onClick={toggleAICoach}
      >
        <MessageCircle size={24} />
      </IconButton>
      
      {/* AI Coach Chat Drawer */}
      <Drawer anchor="bottom" open={showAICoach} onClose={toggleAICoach}>
        <Box sx={{ p: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">AI Coach</Typography>
          
          {/* Chat Messages */}
          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {messages.map((msg) => (
              <ListItem key={msg.id} sx={{ justifyContent: msg.sender === 'ai' ? 'flex-start' : 'flex-end' }}>
                <Box sx={{ p: 1.5, bgcolor: msg.sender === 'ai' ? 'grey.300' : 'primary.light', borderRadius: 2 }}>
                  <Typography variant="body2">{msg.text}</Typography>
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
      </Drawer>
    </>
  );
}

export default AICoach;
