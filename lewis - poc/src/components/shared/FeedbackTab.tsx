import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,

  Avatar,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Smile, Heart, Flame, ThumbsUp, Send } from "lucide-react";

interface FeedbackItem {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    author: "Sarah Chen",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    content: "Great improvement on the value proposition!",
  },
  {
    id: "2",
    author: "Michael Patel",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    content: "The market size section needs more detail.",
  },
];

const FeedbackTab: React.FC = () => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <Box sx={{ maxHeight: "900px", overflowY: "auto",  margin: "0", padding: "0" }}>
      <List>
        {mockFeedback.map((item) => (
          <ListItem key={item.id} sx={{ display: "block", mb: 2 }}>
            <Paper elevation={0} sx={{ p: 0, mt: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1}}>
                <Avatar sx={{ mr: 1 }}>{item.author.split(" ").map((n) => n[0]).join("")}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{item.author}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTimestamp(item.timestamp)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>{item.content}</Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <button onClick={() => setReplyingTo(item.id === replyingTo ? null : item.id)} style={{ color:'#009fc0', background: 'none', border: 'none', padding: 0, fontSize: '14px', cursor: 'pointer' }}>REPLY</button>
                <IconButton><Smile size={20} /></IconButton>
                <IconButton><Heart size={20} /></IconButton>
                <IconButton><Flame size={20} /></IconButton>
                <IconButton><ThumbsUp size={20} /></IconButton>
              </Box>
              {replyingTo === item.id && (
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <input
                    type="text"
                    placeholder="Reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{ flexGrow: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                  <IconButton>
                    <Send size={20} />
                  </IconButton>
                </Box>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeedbackTab;
