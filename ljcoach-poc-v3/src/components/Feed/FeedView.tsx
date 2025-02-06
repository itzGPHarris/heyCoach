import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatAIFeed from "./ChatAIFeed";
import ChatInput from "./ChatInput";
import { aiNavigationService } from "../../api";

const FeedView: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: "user" | "coach"; text?: string; component?: JSX.Element }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (input: string) => {
    setMessages([...messages, { id: messages.length + 1, sender: "user", text: input }]);

    if (input.toLowerCase().startsWith("find my ")) {
      const query = input.replace("find my ", "").trim();
      const targetId = aiNavigationService.findMessageByKeyword(messages, query);
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "800px" }}>
      <ChatAIFeed messages={messages} setMessages={setMessages} />
      <ChatInput onSendMessage={handleSendMessage} />
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default FeedView;
