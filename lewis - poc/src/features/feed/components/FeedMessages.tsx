import React from 'react';
import { Box } from '@mui/material';
import MessageComponent from './MessageComponent';
import { Message } from '../../../store/types';

interface FeedMessagesProps {
  messages: Message[];
  onQuickReply: (reply: string) => void;
}

export const FeedMessages: React.FC<FeedMessagesProps> = ({ 
  messages, 
  onQuickReply 
}) => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflowY: "auto", 
      display: "flex", 
      flexDirection: "column", 
      width: "100%", 
      px: 2 
    }}>
      {messages.map((message) => (
        <MessageComponent
          key={message.id}
          message={message}
          onQuickReply={onQuickReply}
        />
      ))}
    </Box>
  );
};