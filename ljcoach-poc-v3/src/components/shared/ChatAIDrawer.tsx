import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, InputAdornment, CircularProgress, Typography, styled } from '@mui/material';
import { Mic, ArrowUp, X } from 'lucide-react';

const ChatContainer = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 10, // Ensures input stays above the chat feed
});

const ChatInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  width: '100%',
  position: 'fixed', // Ensures input stays fixed at the bottom
  bottom: 0,
  zIndex: 12, // Ensures it remains above chat feed
}));

const ChatFeed = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 60, // Adjusted so it appears above input
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: '12px 12px 0 0',
  boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
  maxHeight: '50vh',
  overflowY: 'auto',
  zIndex: 11, // Below input but above main content
}));

function ChatAIFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ question: string; response?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Keep the input field active even when chat opens
    }
  }, [isOpen]);

  const handleSend = () => {
    if (message.trim()) {
      setConversation([...conversation, { question: message }]);
      setMessage('');
      setLoading(true);

      setTimeout(() => {
        setConversation((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1 ? { ...entry, response: 'Here is the AI Coach response.' } : entry
          )
        );
        setLoading(false);
        setIsOpen(true);
      }, 2000);
    }
  };

  return (
    <ChatContainer>
      {isOpen && (
        <ChatFeed>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Coach Chat</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <X size={24} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {conversation.map((entry, index) => (
              <Box key={index} sx={{ p: 1, backgroundColor: index % 2 === 0 ? 'lightgray' : 'white', borderRadius: 1 }}>
                <Typography variant="body1" fontWeight="bold">{entry.question}</Typography>
                {entry.response ? (
                  <Typography variant="body2">{entry.response}</Typography>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">Waiting for coach to respond...</Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </ChatFeed>
      )}

      <ChatInputContainer>
        <TextField
          fullWidth
          placeholder={loading ? 'Waiting for response...' : 'Hi Harper! What can I help you with?'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          inputRef={inputRef} // Keep input active
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton disabled={loading}>
                  <Mic size={20} />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSend} color="primary" disabled={loading}>
                  <ArrowUp size={20} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ChatInputContainer>
    </ChatContainer>
  );
}

export default ChatAIFeed;
