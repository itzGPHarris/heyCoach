import React from "react";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import { Message } from "./../types/types";

interface MessageProps {
  message: Message;
  onQuickReply: (reply: string) => void;
}

const MessageComponent: React.FC<MessageProps> = ({ message, onQuickReply }) => {
  const isVideoMessage = message.text ? (message.text.startsWith("blob:") || message.text.match(/\.(mp4|mov)$/)) : false;

  // ✅ Align coach messages (left) and user messages (right)
  const isCoach = message.sender === "coach";
  const messageAlignment = isCoach ? "flex-start" : "flex-end"; // Left-align AI, right-align user
  const messageBgColor = isCoach ? "#F5F5F5" : "#0090FC"; // Background colors
  const messageTextColor = isCoach ? "#000000" : "#FFFFFF"; // ✅ Coach text = black, User text = white
  const timestampColor = isCoach ? "#666666" : "#E0E0E0"; // ✅ Custom timestamp colors

  // ✅ Function to render formatted message content
  const renderFormattedText = (text: string) => {
    const elements: JSX.Element[] = [];
    const lines = text.split("\n");

    let listItems: JSX.Element[] = []; // Track list items to be wrapped in <List>

    for (const [index, line] of lines.entries()) {
      console.log("Processing message line:", line); // ✅ Debugging output

      // ✅ Detect list items (- item)
      if (line.startsWith("- ")) {
        listItems.push(
          <ListItem key={index} sx={{ color: messageTextColor, fontSize: "0.9rem" }}>
            {line.replace("- ", "• ")}
          </ListItem>
        );
        continue;
      } else if (listItems.length > 0) {
        // ✅ If we're leaving a list, wrap previous list items inside a <List>
        elements.push(
          <List key={`list-${index}`} sx={{ pl: 2 }}>
            {listItems}
          </List>
        );
        listItems = []; // Reset list tracking
      }

      // ✅ Detect bold text (**Bold:** Text) and ensure both parts show
      const boldMatch = line.match(/\*\*(.*?)\*\*\s*:\s*(.*)/);
      if (boldMatch) {
        console.log("Detected bold line:", boldMatch); // ✅ Debugging line

        elements.push(
          <Typography key={index} variant="body2" sx={{ color: messageTextColor }}>
            <strong>{boldMatch[1]}:</strong> {boldMatch[2]}
          </Typography>
        );
        continue;
      }

      // ✅ Default text handling
      elements.push(
        <Typography key={index} variant="body2" sx={{ color: messageTextColor }}>
          {line}
        </Typography>
      );
    }

    // ✅ If the last lines were list items, wrap them in <List>
    if (listItems.length > 0) {
      elements.push(
        <List key="final-list" sx={{ pl: 2 }}>
          {listItems}
        </List>
      );
    }

    return elements;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: messageAlignment, // Align messages
        width: "100%",
        my: 0.25, // Space between messages
        pl: 1.25, // Padding left
        pr: 1.25, // Padding right
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 24,
          bgcolor: messageBgColor,
          maxWidth: "80%",
        }}
      >
        {/* ✅ Sender name & timestamp in the same row */}
        <Box sx={{ display: "inline-flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: messageTextColor }}>
            {isCoach ? "Coach" : "Harper"}
          </Typography>
          <Typography variant="caption" sx={{ color: timestampColor, ml: 1 }}>
            {message.timestamp}
          </Typography>
        </Box>

        {isVideoMessage ? (
          <Box sx={{ mt: 1, width: "100%" }}>
            <video controls width="100%" style={{ borderRadius: 8 }}>
              <source src={message.text} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            {message.text && renderFormattedText(message.text)}
          </Box>
        )}

{message.quickReplies && (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
    {message.quickReplies.map((reply, index) => (
      <Button
        key={`${reply}-${index}`} // ✅ Ensures unique keys
        variant="contained"
        size="small"
        onClick={(event) => {
          event.stopPropagation(); // ✅ Prevents event bubbling issues
          console.log("Quick Reply Clicked:", reply); // ✅ Debugging log
          onQuickReply(reply.trim().toLowerCase()); // ✅ Ensures consistent input
        }}
      >
        {reply}
      </Button>
    ))}
  </Box>
)}

      </Box>
    </Box>
  );
};

export default MessageComponent;
