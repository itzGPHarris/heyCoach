import { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField, Typography, styled, InputAdornment } from "@mui/material";
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

function ChatAIFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ question: string; response?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");
  const [recording, setRecording] = useState(false); // ✅ Track recording state
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recordTimeout = useRef<ReturnType<typeof setTimeout> | null>(null); // ✅ Fix TypeScript issue

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

  /** ✅ Press & Hold Recording */
  const handleMediaPress = () => {
    recordTimeout.current = setTimeout(() => {
      setRecording(true);
      alert(`🎙️ Recording ${mediaMode} started...`);
    }, 500); // ✅ Hold for 0.5s to start recording
  };

  const handleMediaRelease = () => {
    if (recordTimeout.current) {
      clearTimeout(recordTimeout.current);
    }
    if (recording) {
      setRecording(false);
      alert(`⏹️ ${mediaMode === "audio" ? "Audio" : "Video"} recording stopped.`);
    }
  };

  return (
    <ChatContainer>
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 60,
            left: 0,
            right: 0,
            backgroundColor: "#575757",
            color: "white",
            padding: 2,
            borderRadius: "12px 12px 0 0",
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
            maxHeight: "50vh",
            overflowY: "auto",
            zIndex: 11,
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Coach Chat</Typography>
          </Box>

          {/* Conversation Feed */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {conversation.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 12,
                  color: "white",
                  maxWidth: "95%",
                  alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                  backgroundColor: index % 2 === 0 ? "#0090F2" : "#EDEDED",
                }}
              >
                <Typography variant="body1" sx={{ color: index % 2 === 0 ? "white" : "black" }}>
                  {entry.question}
                </Typography>
                {entry.response && <Typography variant="body2">{entry.response}</Typography>}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Chat Input */}
      <ChatInputContainer>
        {/* Attachment Icon */}
        <IconButton disabled={loading} component="label">
          <Paperclip size={20} color="#fff" />
          <input type="file" hidden onChange={() => alert("📎 Document uploaded!")} />
        </IconButton>

        {/* Chat Input */}
        <TextField
          fullWidth
          placeholder={loading ? "Waiting for response..." : "Hello!  What can I help you with?"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          inputRef={inputRef}
          sx={{
            borderRadius: 2,
            backgroundColor: "#efefef",
            transition: "width 0.3s ease-in-out",
            width: "100%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {message.trim() ? (
                  <IconButton onClick={handleSend} color="primary" disabled={loading}>
                    <ArrowUp size={20} />
                  </IconButton>
                ) : (
                  <IconButton
                    disabled={loading}
                    onClick={() => setMediaMode(mediaMode === "audio" ? "video" : "audio")}
                    onMouseDown={handleMediaPress} // ✅ Start recording on press
                    onMouseUp={handleMediaRelease} // ✅ Stop recording on release
                    onTouchStart={handleMediaPress} // ✅ Mobile support
                    onTouchEnd={handleMediaRelease} // ✅ Mobile support
                  >
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
