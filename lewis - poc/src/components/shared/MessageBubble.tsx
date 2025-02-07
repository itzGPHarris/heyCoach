// Updated on - 2025-02-05, Time: Pacific Time (PT), 15:05

// Updated MessageBubble.tsx - Removes Unnecessary Boxes for Clean Feed UI
import React from "react";
import { Paper, Box } from "@mui/material";

interface MessageProps {
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
}

const MessageBubble: React.FC<MessageProps> = ({ sender, text, component }) => {
  // ✅ Only wrap user/coach messages in Paper but keep other components unboxed
  const isStandardMessage = !!text;

  return isStandardMessage ? (
    <Paper
      sx={{
        p: 2,
        backgroundColor: sender === "coach" ? "#f5f5f5" : "#0090F2",
        color: sender === "coach" ? "black" : "white",
        borderRadius: 2,
        alignSelf: sender === "coach" ? "flex-start" : "flex-end",
        maxWidth: "800px",
        width: "fit-content",
      }}
    >
      {text}
    </Paper>
  ) : (
    <Box sx={{ width: "100%", maxWidth: "800px" }}>{component}</Box> // ✅ No extra boxes around embedded components
  );
};

export default MessageBubble;
