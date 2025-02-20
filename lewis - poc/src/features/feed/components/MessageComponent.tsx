// src/features/feed/components/MessageComponent.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Message } from '../../../store/types';

interface MessageComponentProps {
  message: Message;
  onQuickReply?: (reply: string) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message, onQuickReply }) => {
  const isCoach = message.sender === 'coach';
  
  // Helper to check if the content is a video URL
  const isVideoUrl = (content: string) => content.startsWith('blob:');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isCoach ? 'row' : 'row-reverse',
        alignItems: 'flex-start',
        gap: 2,
        mb: 2,
        maxWidth: '100%'
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isCoach ? 'primary.light' : 'grey.100',
          borderRadius: 2,
          p: 2,
          position: 'relative'
        }}
      >
        {isVideoUrl(message.content) ? (
          // Video container
          <Box sx={{ width: '100%', maxWidth: '560px', marginBottom: 2 }}>
            <video
              controls
              style={{
                width: '100%',
                borderRadius: '8px',
              }}
            >
              <source src={message.content} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </Box>
        ) : (
          // Text content
          <Typography
            variant="body1"
            sx={{
              color: isCoach ? 'primary.contrastText' : 'text.primary',
              whiteSpace: 'pre-wrap'
            }}
          >
            {message.content}
          </Typography>
        )}

        {/* Quick Replies */}
        {isCoach && message.quickReplies && message.quickReplies.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {message.quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                onClick={() => onQuickReply?.(reply)}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                {reply}
              </Button>
            ))}
          </Box>
        )}

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: -20,
            [isCoach ? 'left' : 'right']: 8,
            color: 'text.secondary'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageComponent;