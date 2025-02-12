import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Message } from "./../types/types";

interface MessageProps {
  message: Message;
  onQuickReply: (reply: string) => void;
}

const MessageComponent: React.FC<MessageProps> = ({ message, onQuickReply }) => {
  const isVideoMessage = message.text ? (message.text.startsWith("blob:") || message.text.match(/\.(mp4|mov)$/)) : false;

  const isCoach = message.sender === "coach";
  const messageAlignment = isCoach ? "flex-start" : "flex-end";
  const messageBgColor = isCoach ? "#F9FAFB" : "#252c32";
  const messageTextColor = isCoach ? "#000000" : "#FFFFFF";
  const timestampColor = isCoach ? "#666666" : "#E0E0E0";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: messageAlignment,
        width: "100%",
        my: 0.75,
        pl: 1.25,
        pr: 1.25,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 24,
          bgcolor: messageBgColor,
          maxWidth: "80%",
        }}
      >
        <Box sx={{ display: "inline-flex", alignItems: "center" }}>
          <Typography variant="caption" sx={{ fontWeight: "bold", color: messageTextColor }}>
            {isCoach ? "Coach" : "Harper"}
          </Typography>
          <Typography variant="caption" sx={{ color: timestampColor, ml: 1 }}>
            {message.timestamp}
          </Typography>
        </Box>

        {isVideoMessage ? (
          <Box sx={{ mt: 1, width: "100%" }}>
            <video controls width="100%" style={{ borderRadius: 8 }}>
              <source src={message.text} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" sx={{ color: messageTextColor }}>
              {message.text}
            </Typography>
          </Box>
        )}

        {message.quickReplies && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {message.quickReplies.map((reply, index) => (
              <Button
                sx={{ color: "#fff", backgroundColor: "#0090f2", borderRadius: 12 }}
                key={`${reply}-${index}`}
                variant="contained"
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  console.log("Quick Reply Clicked:", reply);
                  onQuickReply(reply.trim().toLowerCase());
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
