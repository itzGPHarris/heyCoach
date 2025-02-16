import React from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { Message } from "./../types/types";
import CoachAvatar from './CoachAvatar';

interface MessageProps {
  message: Message;
  onQuickReply: (reply: string) => void;
}

const MessageComponent: React.FC<MessageProps> = ({ message, onQuickReply }) => {
  const isVideoMessage = message.text ? (message.text.startsWith("blob:") || message.text.match(/\.(mp4|mov)$/)) : false;
  const isCoach = message.sender === "coach";

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
    sx={{
      display: "flex",
      width: "100%",
      my: 1.5,
      pl: 3,
      pr: 1,
      gap: 2,
      alignItems: "flex-end", // Align items to bottom
    }}
    >
      {/* Avatar Section - Now using animated CoachAvatar for AI */}
      <Box sx={{ width: 32, height: 32, mt: 1 }}>
        {isCoach ? (
          <CoachAvatar />
        ) : (
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#0090f2',
              fontSize: `14px`, // Adjust initial size relative to avatar size
              fontWeight: 900 // Make initials bolder

            }}
          >
            {getInitials("Harper Lewis")}
          </Avatar>
        )}
      </Box>

      {/* Rest of the message component remains the same */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {isCoach ? "" : ""} {/* Updated AI Coach text */}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {message.timestamp.toLocaleString()}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: "16px",
            bgcolor: isCoach ? "fff" : "#333",
            color: isCoach ? "text.primary" : "common.white",
            maxWidth: "90%",
          }}
        >
          {isVideoMessage ? (
            <Box sx={{ width: "100%" }}>
              <video controls style={{ borderRadius: 8, maxWidth: "100%" }}>
                <source src={message.text} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          ) : (
            <Typography variant="body1">
              {message.text}
            </Typography>
          )}
        </Box>

        {message.quickReplies && message.quickReplies.length > 0 && (
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 1, 
            mt: 1,
            maxWidth: "90%"
          }}>
            {message.quickReplies.map((reply, index) => (
              <Button
                key={`${reply}-${index}`}
                variant="outlined"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  onQuickReply(reply.trim().toLowerCase());
                }}
                sx={{
                  borderRadius: 12,
                  textTransform: 'none',
                  borderColor: '#0090f2',
                  color: '#0090f2',
                  '&:hover': {
                    backgroundColor: '#0090f2',
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

export default MessageComponent;