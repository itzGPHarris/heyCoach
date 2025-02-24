// MessageBubble.tsx
import React from "react";
import { Box, Button, Avatar } from "@mui/material";
import { Bot } from 'lucide-react';

interface MessageProps {
  sender: "user" | "coach" | "team";
  text?: string;
  component?: JSX.Element;
  backgroundColor?: string;
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
}

const MessageBubble: React.FC<MessageProps> = ({ 
  sender, 
  text, 
  component, 
  quickReplies,
  onQuickReply 
}) => {
  const isCoach = sender === "coach";
  const isStandardMessage = !!text || !!component;

  // Function to get user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      width: "100%",
      maxWidth: "800px",
      mb: 2,
      gap: 2,
    }}>
      {/* Avatar */}
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: isCoach ? 'primary.main' : 'secondary.main',
          mt: 1
        }}
      >
        {isCoach ? (
          <Bot size={24} />
        ) : (
          getInitials("User Name")
        )}
      </Avatar>

      {/* Message Content */}
      <Box sx={{ flex: 1 }}>
        {isStandardMessage && (
          <Box
            sx={{
              p: 2.5,
              backgroundColor: isCoach ? "grey.100" : "#030303",
              color: isCoach ? "text.primary" : "common.white",
              borderRadius: "16px",
              maxWidth: "90%",
            }}
          >
            {text}
            {component}
          </Box>
        )}

        {!isStandardMessage && component && (
          <Box sx={{ width: "100%" }}>{component}</Box>
        )}

        {/* Quick Replies */}
        {quickReplies && quickReplies.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mt: 1,
            maxWidth: "90%"
          }}>
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => {
                  console.log('Quick reply clicked:', reply);
                  onQuickReply?.(reply);
                }}
                sx={{
                  borderRadius: 12,
                  textTransform: 'none',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                  },
                }}
              >
                {reply}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageBubble;
