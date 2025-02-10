import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import MessageList from "./MessageList";
import { Message } from "../types/types";
import getAIResponse from "../components/shared/getAIResponse";

interface FeedViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const FeedView: React.FC<FeedViewProps> = ({ messages, setMessages }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);

  /** Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  /** ✅ Handle Quick-Reply Button Clicks */
  const handleQuickReply = async (reply: string) => {
    const timestamp = new Date().toLocaleTimeString();

    // ✅ Add user’s selection to the feed
    setMessages((prev) => [...prev, {
      id: Date.now(),
      sender: "user",
      text: reply,
      timestamp,
    }]);

    // ✅ Process AI response based on reply
    setTimeout(async () => {
      const response: string = await getAIResponse(reply);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: "coach",
        text: response,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }, 1500);
  };

  return (
    <Box
      ref={feedRef}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 800,
        height: "calc(100vh - 56px - 72px)",
        paddingBottom: "16px",
      }}
    >
      {/* ✅ Pass onQuickReply to MessageList */}
      <MessageList messages={messages} onQuickReply={handleQuickReply} />
    </Box>
  );
};

export default FeedView;
