// Updated on - 2025-02-05, Time: Pacific Time (PT), 15:05
// Updated MessageBubble.tsx - Removes Unnecessary Boxes for Clean Feed UI


import React from "react";
import { Paper, Box } from "@mui/material";

interface MessageProps {
  sender: "user" | "coach" | "team"; // 🔹 Add "team" as a valid sender
  text?: string;
  component?: JSX.Element;
  backgroundColor?: string; // 🔹 Add background color prop
}

const MessageBubble: React.FC<MessageProps> = ({ sender, text, component }) => {
  // ✅ Only wrap user/coach messages in Paper but keep other components unboxed
 const isStandardMessage = !!text || !!component; // 🔹 Ensure both text and components are considered valid messages

  return isStandardMessage ? (
    <Paper
      sx={{
        p: 2,
        backgroundColor: sender === "coach" ? "#2E2E2E" : "#1976D2", // Dark gray for AI, blue for user
        color: sender === "coach" ? "black" : "white",
        borderRadius: 32,
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
