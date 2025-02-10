import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import MessageList from "./MessageList";
import { Message } from "../types/types";
import getAIResponse from "../components/shared/getAIResponse";
import DetailedAnalysisDialog from "../components/shared/DetailedAnalysisDialog";


interface FeedViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const FeedView: React.FC<FeedViewProps> = ({ messages, setMessages }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // ✅ Track dialog state

  /** Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  /** ✅ Handle Quick-Reply Button Clicks */
  const handleQuickReply = async (reply: string) => {
    if (reply === "See Detailed Breakdown") {
      setDialogOpen(true); // ✅ Open the detailed breakdown dialog
      return; // ✅ Prevents adding "See Detailed Breakdown" as a user message
    }
  
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: reply, timestamp }]);
  
    setTimeout(async () => {
      const response: string = await getAIResponse(reply);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "coach", text: response, timestamp: new Date().toLocaleTimeString() }]);
    }, 1500);
  };
  
  return (
    <Box ref={feedRef} sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800, height: "calc(100vh - 56px - 72px)", paddingBottom: "16px" }}>
      <MessageList messages={messages} onQuickReply={handleQuickReply} />
      <DetailedAnalysisDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Box>
  );
};

export default FeedView;
