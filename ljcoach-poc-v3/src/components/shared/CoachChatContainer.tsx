import { useState, useEffect } from 'react';
import { Box, Paper, styled } from '@mui/material';
import CoachToolbar from './CoachToolbar';
import CoachChat from './coachChat';

const ChatWrapper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 80,
  left: 0,
  right: 0,
  maxHeight: '400px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  transition: 'max-height 0.3s ease-in-out',
  display: 'block !important',
  zIndex: 9999,
}));

interface CoachChatContainerProps {
  onSendMessage: (message: string) => void;
}

const CoachChatContainer = ({ onSendMessage }: CoachChatContainerProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    console.log('CoachChatContainer mounted');
    return () => console.log('CoachChatContainer unmounted');
  }, []);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
    setIsChatVisible(true);
    onSendMessage(message);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', background: 'rgba(255,255,255,0.9)' }}>
      <CoachToolbar onSendMessage={handleSendMessage} />
      {isChatVisible && (
        <ChatWrapper>
          <CoachChat messages={messages} />
        </ChatWrapper>
      )}
    </Box>
  );
};

export default CoachChatContainer;
