// Updated on - 2025-02-05, Time: Pacific Time (PT), 13:10

// ChatAIQuickAccess.tsx - Floating AI Coach Button for Quick Access
import React from "react";
import { Box, IconButton } from "@mui/material";
import { MessageCircle } from "lucide-react";

const ChatAIQuickAccess: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
      <IconButton onClick={onOpenChat} sx={{ backgroundColor: "#0090F2", color: "white", p: 2, borderRadius: "50%" }}>
        <MessageCircle size={24} />
      </IconButton>
    </Box>
  );
};

export default ChatAIQuickAccess;
