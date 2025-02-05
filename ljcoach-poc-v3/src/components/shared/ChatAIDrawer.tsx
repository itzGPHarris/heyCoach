// Updated on - 2025-02-04, Time: Pacific Time (PT), 14:30
// Updated ChatAIDrawer.tsx with Debugging for Scroll Event to AI Analysis
import { useState, useEffect, useRef } from "react";
import { Box, IconButton, TextField, Typography, styled, InputAdornment, Slide, Button } from "@mui/material";
import { ArrowUp, XCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const ChatContainer = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 10,
});

const ChatInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#0090f2",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  width: "100%",
  position: "relative",
  bottom: 0,
  zIndex: 12,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

function ChatAIDrawer({ onOpenAnalysis }: { onOpenAnalysis: () => void }) {
  const location = useLocation();
  const isFirstRun = location.state?.firstRun || false;
  const [isOpen, setIsOpen] = useState(isFirstRun);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ question: string; response?: string; cta?: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isFirstRun) {
      setConversation([
        {
          question: "Welcome! I'm your AI Coach. Your first analysis is ready. You can find it and the interactive transcript in your new pitch card!",
          response: "",
          cta: true,
        },
      ]);
    }
  }, [isFirstRun]);

  const handleSend = () => {
    if (message.trim()) {
      setConversation([...conversation, { question: message }]);
      setMessage("");
      setLoading(true);

      setTimeout(() => {
        setConversation((prev) => [...prev, { question: "", response: "AI Coach is processing..." }]);
      }, 500);

      setTimeout(() => {
        setConversation((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1 ? { ...entry, response: "Here's my advice!" } : entry
          )
        );
        setLoading(false);
        setIsOpen(true);
      }, 2000);
    }
  };

  return (
    <ChatContainer>
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit timeout={300}>
        <Box
          sx={{
            position: "fixed",
            bottom: 88,
            left: 0,
            right: 0,
            backgroundColor: "#575757",
            color: "white",
            padding: 3,
            borderRadius: "12px 12px 0 0",
            boxShadow: "0px -2px 15px rgba(0, 0, 0, 0.2)",
            maxHeight: "50vh",
            overflowY: "auto",
            zIndex: 11,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Coach Chat</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <XCircle size={20} color="white" />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {conversation.map((entry, index) => (
              <Box key={index} sx={{ p: 2, borderRadius: 12, color: "white", maxWidth: "95%", alignSelf: index % 2 === 0 ? "flex-start" : "flex-end", backgroundColor: index % 2 === 0 ? "#0090F2" : "#EDEDED" }}>
                <Typography variant="body1" sx={{ color: index % 2 === 0 ? "white" : "black" }}>{entry.question}</Typography>
                {entry.response && <Typography variant="body2">{entry.response}</Typography>}
                {entry.cta && (
                  <Button
  variant="contained"
  size="small"
  sx={{ mt: 1 }}
  onClick={() => {
    console.log("📜 Opening AI Analysis...");
    onOpenAnalysis();

    setTimeout(() => {
      console.log("🚀 Dispatching event globally after ensuring components are loaded...");
      window.dispatchEvent(new CustomEvent("scrollToAnalysis"));
    }, 1500); // Increase delay to ensure UI renders
    setIsOpen(false)
  }}
>
  Let's check it out
</Button>
                
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Slide>
      <ChatInputContainer>
        <TextField fullWidth placeholder={loading ? "AI Coach is thinking..." : "Hello! What can I help you with?"} value={message} onChange={(e) => setMessage(e.target.value)} disabled={loading} inputRef={inputRef} sx={{ borderRadius: 2, backgroundColor: "#efefef", transition: "width 0.3s ease-in-out", width: "100%" }} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={handleSend} color="primary" disabled={loading}><ArrowUp size={20} /></IconButton></InputAdornment>) }} />
      </ChatInputContainer>
    </ChatContainer>
    
    
  );
}

export default ChatAIDrawer;
