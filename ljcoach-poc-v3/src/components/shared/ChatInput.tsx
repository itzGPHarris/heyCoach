import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { Mic, ArrowUpward } from '@mui/icons-material';
import { useState } from 'react';

interface ChatInputProps {
  onSubmit?: (text: string) => void;
  placeholder?: string;
}

function ChatInput({ onSubmit, placeholder = "Ask Coach a question" }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && onSubmit) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.default' }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: 600,
          mx: 'auto'
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <Mic />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSubmit}>
          <ArrowUpward />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default ChatInput;