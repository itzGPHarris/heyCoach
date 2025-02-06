import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";
//import { aiService, aiNavigationService } from "../../api";

interface ChatAIFeedProps {
  messages: { id: number; sender: "user" | "coach"; text?: string; component?: JSX.Element }[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatAIFeed: React.FC<ChatAIFeedProps> = ({ messages, setMessages }) => {
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.sender === "user") {
      aiService.sendMessageToAI(lastMessage.text || "").then((response) => {
        setMessages((prev) => [...prev, { id: prev.length + 1, sender: "coach", text: response.response }]);
      });
    }
  }, [messages, setMessages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: "800px" }}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} component={msg.component} />
      ))}
    </Box>
  );
};

export default ChatAIFeed;
