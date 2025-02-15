import { useState } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const ChatContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  margin: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  maxWidth: "80%",
  alignSelf: "flex-start",
}));

const AIMessage = styled(MessageBubble)({
  backgroundColor: "#e3f2fd",
  alignSelf: "flex-start",
});

const UserMessage = styled(MessageBubble)({
  backgroundColor: "#c8e6c9",
  alignSelf: "flex-end",
});

const QuickReplyContainer = styled(Box)({
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "8px",
});

const staticResponses: Record<string, string[]> = {
  "confidence": [
    "Confidence comes with practice. Try recording yourself multiple times and reviewing your progress.",
    "A strong stance and clear voice projection can help you appear more confident.",
    "Would you like some specific techniques to build confidence in your delivery?"
  ],
  "filler words": [
    "Minimizing 'uh' and 'you know' makes your pitch sound more polished. Try pausing instead of using fillers.",
    "Recording and reviewing your speech can help you identify and reduce filler words.",
    "Would you like exercises to help eliminate filler words from your speech?"
  ],
  "engagement": [
    "Engage your audience by asking a question early on to create a connection.",
    "Using storytelling techniques can make your pitch more relatable and engaging.",
    "Would you like examples of strong engagement techniques?"
  ],
  "pacing": [
    "Your pacing should be natural—aim for about 150 words per minute to stay clear and engaging.",
    "Practice with a metronome or timed speech exercises to improve pacing consistency.",
    "Would you like to try an exercise to improve your pacing?"
  ],
  "eye contact": [
    "Try looking directly at the camera to establish a stronger connection with your audience.",
    "Avoid darting your eyes around—focus on keeping your gaze steady and intentional.",
    "Would you like tips on how to maintain natural eye contact?"
  ],
  "tone": [
    "A varied tone helps keep your audience interested. Avoid monotone delivery by emphasizing key words.",
    "Practice shifting your tone to highlight important points and create emphasis.",
    "Would you like exercises to improve your vocal tone variety?"
  ]
};

export default function AICoachChat() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = (message: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      const matchedKeyword = Object.keys(staticResponses).find((keyword) => lowerMessage.includes(keyword));
      
      let aiMessage = "That's an interesting point! Could you clarify what you need help with?";
      if (matchedKeyword) {
        const responses = staticResponses[matchedKeyword];
        aiMessage = responses[Math.floor(Math.random() * responses.length)]; // Randomize response
      }
      
      setMessages((prev) => [...prev, { sender: "ai", text: aiMessage }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <ChatContainer>
      <Typography variant="h6">AI Pitch Coach</Typography>
      <Box>
        {messages.map((msg, index) => (
          msg.sender === "user" ? (
            <UserMessage key={index}>{msg.text}</UserMessage>
          ) : (
            <AIMessage key={index}>{msg.text}</AIMessage>
          )
        ))}
      </Box>
      {loading && <CircularProgress size={24} sx={{ alignSelf: "center", margin: "10px 0" }} />}
      <QuickReplyContainer>
        {["How can I improve my confidence?", "Analyze my pitch script", "Give me engagement tips"].map((text) => (
          <Button key={text} variant="outlined" onClick={() => sendMessage(text)}>{text}</Button>
        ))}
      </QuickReplyContainer>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && input.trim()) sendMessage(input);
        }}
        sx={{ marginTop: "10px" }}
      />
      <Button variant="contained" onClick={() => sendMessage(input)} disabled={!input.trim() || loading} sx={{ marginTop: "10px" }}>
        Send
      </Button>
    </ChatContainer>
  );
}
