// Updated on - 2025-02-05, Time: Pacific Time (PT), 14:45

// Fixed FeedView.tsx - Ensures NewIdeaForm Modal Opens and Closes Properly
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import NewIdeaForm from "./shared/NewIdeaForm";
import PitchContainer from "./shared/PitchContainer";
import ChatInput from "./shared/ChatInput";
import MessageBubble from "./shared/MessageBubble";
import getAIResponse from "./shared/AIResponseHandler"; // ✅ Fix import



interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
}

const FeedView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "coach", text: "Welcome! Ready to refine your pitch?" },
  ]);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false); // ✅ Fix: Control modal state
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (input: string) => {
    const userMessage: Message = { id: messages.length + 1, sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const aiResponse = getAIResponse(input, setMessages, setIsNewIdeaOpen); // ✅ Fix: Pass state control
      setMessages((prev) => [...prev, { id: prev.length + 2, sender: "coach", ...aiResponse }]);
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", maxWidth: "100%", p: 3, boxSizing: "border-box" }}>
      <Box sx={{ width: "100%", maxWidth: 800, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", flexGrow: 1, minHeight: "0px", paddingBottom: "120px" }}>
        <Typography variant="h4" sx={{ mb: 2, position: "sticky", top: 0, backgroundColor: "white", zIndex: 10, padding: 2 }}>🚀 Your Pitch Feed</Typography>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} component={msg.component} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput onSendMessage={handleSendMessage} />

      {/* ✅ Fix: Render NewIdeaForm properly in FeedView.tsx */}
      {isNewIdeaOpen && (
        <NewIdeaForm
          open={isNewIdeaOpen}
          onClose={() => setIsNewIdeaOpen(false)} // ✅ Fix: Close modal properly
          onSubmit={(data) => {
            setIsNewIdeaOpen(false);
            setMessages((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                sender: "coach",
                component: (
                  <PitchContainer
                    pitchId={prev.length + 1}
                    title={data.title}
                    description={data.description}
                    videoUrl={data.videoUrl || ""}
                    score={0}
                    likes={0}
                    lastModified="Just now"
                    comments={[]}
                    isPortrait={data.isPortrait}
                  />
                ),
              },
            ]);
          }}
        />
      )}
    </Box>
  );
};

export default FeedView;