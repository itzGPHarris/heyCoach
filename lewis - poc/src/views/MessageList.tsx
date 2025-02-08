// MessageList.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MessageBubble from "../components/shared/MessageBubble";
import { Message } from "../types/types";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 800, display: "flex", flexDirection: "column", gap: 2, flexGrow: 1, minHeight: "0px", paddingBottom: "120px" }}>
      {messages.map((msg) => (
        <Box key={msg.id} id={`message-${msg.id}`} sx={{ width: "100%" }}>
          <Typography variant="caption" sx={{ textAlign: "center", display: "block", mb: 1, color: "gray" }}>
            {msg.timestamp}
          </Typography>
          <MessageBubble sender={msg.sender} text={msg.text} component={msg.component} />
          {msg.expandedComponent && <Button onClick={() => console.warn('setDialogContent is not defined')}>View More</Button>}
        </Box>
      ))}
    </Box>
  );
};

export default MessageList;
