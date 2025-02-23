// src/features/feed/components/MessageComponent.tsx
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { Message } from '../../../store/types';
import { Sparkles } from 'lucide-react';

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
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 1,
        mb: 4,
        maxWidth: '100%'
      }}
    >
      {/* Avatar Section */}
      <Avatar
        sx={{
          bgcolor: isCoach ? 'primary.main' : '#0090f2',
          width: 40,
          height: 40,
          fontSize: isCoach ? 'inherit' : '1rem',
          fontWeight: isCoach ? 'inherit' : 900
        }}
      >
        {isCoach ? (
          <Sparkles size={18} />
        ) : (
          "HL"
        )}
      </Avatar>

      {/* Message Content Section */}
      <Box
        sx={{
          maxWidth: '85%',
          bgcolor: isCoach ? '#F9FAFB' : '#002b49',
          borderRadius: 24,
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
              color: isCoach ? '#333' : '#fff',
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
                  color: '#0090f2',
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
            left: 8,
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