// src/features/feed/components/MessageComponent.tsx
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { Message } from '../../../store/types';
import coachAvatar from '../../../assets/coachAvatar-simple.svg';
interface MessageComponentProps {
  message: Message;
  onQuickReply?: (reply: string) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message, onQuickReply }) => {
  const isCoach = message.sender === 'coach';
  
  const isVideoUrl = (content: string) => content.startsWith('blob:');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 1.5,
        mb: 6,
        maxWidth: '100%'
      }}
    >
      {/* Avatar Section */}
      <Avatar
        sx={{
          bgcolor: isCoach ? 'transparent' : '#0090f2',
          width: 40,
          height: 40,
          fontSize: isCoach ? 'inherit' : '1rem',
          fontWeight: isCoach ? 'inherit' : 900,
          p: isCoach ? 0 : undefined, // Remove padding for coach avatar
          '& svg': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        {isCoach ? (
          <img src={coachAvatar} alt="Coach Avatar" />
        ) : (
          "HL"
        )}
      </Avatar>

      {/* Message Content Section */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: '85%',
          bgcolor: isCoach ? '#efefef' : '#002b49',
          borderRadius: 48,
          p: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: -10,
            bottom: 8,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '6px 14px 6px 0',
            borderColor: `transparent ${isCoach ? '#efefef' : '#002b49'} transparent transparent`,
          }
        }}
      >
        {isVideoUrl(message.content) ? (
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
                  borderRadius: 12,
                  bgcolor: '#0090f2',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#002b49',
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