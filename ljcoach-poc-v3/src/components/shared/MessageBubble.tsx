import React from "react";
import { Paper } from "@mui/material";

interface MessageProps {
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
}

const MessageBubble: React.FC<MessageProps> = ({ sender, text, component }) => {
  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: sender === "coach" ? "#f5f5f5" : "#0090F2",
        color: sender === "coach" ? "black" : "white",
        borderRadius: 2,
        alignSelf: sender === "coach" ? "flex-start" : "flex-end",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {text || component}
    </Paper>
  );
};

export default MessageBubble;
