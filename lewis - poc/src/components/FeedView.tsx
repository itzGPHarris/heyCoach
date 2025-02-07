// Updated on - 2025-02-05, Time: Pacific Time (PT), 15:40

// Updated FeedView.tsx - Fixed Closing Tag Issue and Restored Background/Welcome Elements
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import MessageBubble from "./shared/MessageBubble";
import getAIResponse from "./shared/AIResponseHandler";
import ChatInput from "./shared/ChatInput";
import NewIdeaForm from "./shared/NewIdeaForm";
import PitchContainer from "./shared/PitchContainer";

interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
  timestamp?: string;
}

const graphicUrl = "/img/ljbg.png"; // ✅ Reference the public URL
const jumperUrl = "/img/jumper.svg"; // ✅ Reference the public URL

const FeedView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  {/*const jumpToMessage = (query: string) => {
    const targetMessage = messages.find((msg) => msg.text?.toLowerCase().includes(query.toLowerCase()));
    if (targetMessage) {
      const element = document.getElementById(`message-${targetMessage.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };*/}

  const jumpToMessage = (query: string): string | null => {
    const targetMessage = messages.find(
      (msg) =>
        (msg.component && msg.component.props?.title?.toLowerCase().includes(query.toLowerCase())) || // ✅ Match pitch title in component
        (msg.text?.toLowerCase().includes(query.toLowerCase()) && msg.component) // ✅ Ensure it has a component attached
    );
  
    return targetMessage ? `message-${targetMessage.id}` : null;
  };

  const handleSendMessage = (input: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const userMessage: Message = { id: messages.length + 1, sender: "user", text: input, timestamp };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const aiResponse = getAIResponse(input, setMessages, setIsNewIdeaOpen, jumpToMessage); // ✅ Fix: Pass all required arguments
      setMessages((prev) => [...prev, { id: prev.length + 2, sender: "coach", ...aiResponse, timestamp }]);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        maxWidth: "100%",
        p: 3,
        boxSizing: "border-box",
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${graphicUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      {messages.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome! Ask AI Coach to get started.
          </Typography>
          <Box component="img" src={jumperUrl} alt="Welcome Graphic" sx={{ width: "100%", maxWidth: "400px", mx: "auto", mt: 4 }} />
          <Typography variant="body1" sx={{ mb: 4 }}>
            Try asking: "Help me with my first pitch..."
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 800, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", flexGrow: 1, minHeight: "0px", paddingBottom: "120px" }}>
          {messages.map((msg) => (
            <Box key={msg.id} id={`message-${msg.id}`}>
              <Typography variant="caption" sx={{ textAlign: "center", display: "block", mb: 1, color: "gray" }}>{msg.timestamp}</Typography>
              <MessageBubble sender={msg.sender} text={msg.text} component={msg.component} />
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      )}
      <ChatInput onSendMessage={handleSendMessage} />

      {isNewIdeaOpen && (
        <NewIdeaForm
          open={isNewIdeaOpen}
          onClose={() => setIsNewIdeaOpen(false)}
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
