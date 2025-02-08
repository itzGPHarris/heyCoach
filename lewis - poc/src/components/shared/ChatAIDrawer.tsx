import { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField, CircularProgress, Typography, styled, InputAdornment } from "@mui/material";
import { Mic, Video, Paperclip, ArrowUp } from "lucide-react";

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
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  width: "100%",
  position: "fixed",
  bottom: 0,
  zIndex: 12,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

function ChatAIFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ question: string; response?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio"); // ✅ Toggle between audio & video
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (message.trim()) {
      setConversation([...conversation, { question: message }]);
      setMessage("");
      setLoading(true);

      setTimeout(() => {
        setConversation((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1 ? { ...entry, response: "Here is the AI Coach response." } : entry
          )
        );
        setLoading(false);
        setIsOpen(true);
      }, 2000);
    }
  };

  return (
    <ChatContainer>
      {isOpen && (
        <Box sx={{ position: "fixed", bottom: 60, left: 0, right: 0, backgroundColor: "#1a1a1a", color: "white", padding: 2, borderRadius: "12px 12px 0 0", boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", maxHeight: "50vh", overflowY: "auto", zIndex: 11 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Coach Chat</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {conversation.map((entry, index) => (
              <Box key={index} sx={{ p: 1, backgroundColor: index % 2 === 0 ? "lightgray" : "white", borderRadius: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  {entry.question}
                </Typography>
                {entry.response ? (
                  <Typography variant="body2">{entry.response}</Typography>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">Waiting for coach to respond...</Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <ChatInputContainer>
        {/* Attachment Icon */}
        <IconButton disabled={loading} component="label">
          <Paperclip size={20} />
          <input type="file" hidden onChange={() => alert("📎 Document uploaded!")} />
        </IconButton>

        {/* Chat Input */}
        <TextField
          fullWidth
          placeholder={loading ? "Waiting for response..." : "Hi Harper! What can I help you with?"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          inputRef={inputRef}
          sx={{
            transition: "width 0.3s ease-in-out",
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* ✅ If text is entered, show "Send" button */}
                {message.trim() ? (
                  <IconButton onClick={handleSend} color="primary" disabled={loading}>
                    <ArrowUp size={20} />
                  </IconButton>
                ) : (
                  /* ✅ Otherwise, show media toggle button */
                  <IconButton disabled={loading} onClick={() => setMediaMode(mediaMode === "audio" ? "video" : "audio")}>
                    {mediaMode === "audio" ? <Mic size={20} /> : <Video size={20} />}
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </ChatInputContainer>
    </ChatContainer>
  );
}

export default ChatAIFeed;
