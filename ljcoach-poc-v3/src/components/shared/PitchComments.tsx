import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Collapse, CardContent, IconButton, Badge, TextField } from "@mui/material";
import { ExpandMore, Comment, ContentCopy } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchCommentsProps {
  pitchId: number;
  comments: CommentData[];
  onUpdateComments?: (newComments: CommentData[]) => void;
}

const SmallBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    fontSize: "0.6rem",
    fontWeight: "bold",
    height: "14px",
    minWidth: "14px",
    padding: "10px 8px",
    transform: "scale(0.9) translate(120%, -90%)",
    backgroundColor: "#ee6600",
    color: "#ffffff",
  },
});

const PitchComments: React.FC<PitchCommentsProps> = ({ pitchId, comments, onUpdateComments }) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [newCommentsCount, setNewCommentsCount] = useState(comments.length);
  const [localComments, setLocalComments] = useState(comments);
  const [copied, setCopied] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});
  const [reactions, setReactions] = useState<{ [key: number]: { emoji: string; count: number }[] }>({});
  const sharableLink = `${window.location.origin}/feedback/${pitchId}`;

  useEffect(() => {
    if (commentsExpanded) {
      setNewCommentsCount(0);
    }
  }, [commentsExpanded]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddReaction = (commentId: number, emoji: string) => {
    const updatedComments = localComments.map((comment) =>
      comment.id === commentId
        ? { ...comment, text: `${comment.text} ${emoji}` }
        : comment
    );

    setLocalComments(updatedComments);

    if (onUpdateComments) {
      onUpdateComments(updatedComments);
    }

    setReactions((prev) => ({
      ...prev,
      [commentId]: prev[commentId]
        ? [...prev[commentId], { emoji, count: 1 }]
        : [{ emoji, count: 1 }],
    }));
  };

  const handleReplyChange = (commentId: number, text: string) => {
    setReplies((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replies[commentId]) return;

    const updatedComments = localComments.map((comment) =>
      comment.id === commentId
        ? { ...comment, text: `${comment.text}\n\nReply: ${replies[commentId]}` }
        : comment
    );

    setLocalComments(updatedComments);

    if (onUpdateComments) {
      onUpdateComments(updatedComments);
    }

    setReplies((prev) => ({ ...prev, [commentId]: "" }));
    setReplyingTo(null);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderTop: "1px solid #ddd" }}>
      {/* Expandable Header with Notification Badge */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setCommentsExpanded(!commentsExpanded)}>
        <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <Comment fontSize="small" />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Feedback & Comments
          </Typography>
          {newCommentsCount > 0 && (
            <SmallBadge badgeContent={newCommentsCount} color="primary" />
          )}
        </Box>
        <IconButton sx={{ transform: commentsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ExpandMore />
        </IconButton>
      </Box>

      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Copy Feedback Link */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <IconButton onClick={copyToClipboard} size="small">
              <ContentCopy fontSize="small" />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: copied ? "green" : "primary.main", textDecoration: "underline" }}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy link"}
            </Typography>
          </Box>

          {/* Display Comments */}
          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <Box key={comment.id} sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.author} ({comment.role})
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>

                {/* Reactions & Reply Button */}
                <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                  {["👍", "🔥", "😂"].map((emoji) => (
                    <Button
                      key={emoji}
                      size="small"
                      variant="text"
                      onClick={() => handleAddReaction(comment.id, emoji)}
                    >
                      {emoji} {reactions[comment.id]?.find((r) => r.emoji === emoji)?.count || 0}
                    </Button>
                  ))}
                  <Button size="small" variant="text" onClick={() => setReplyingTo(comment.id)}>
                    Reply
                  </Button>
                </Box>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      label="Reply..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={replies[comment.id] || ""}
                      onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    />
                    <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={() => handleReplySubmit(comment.id)}>
                      Submit Reply
                    </Button>
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              ❌ No comments yet.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Box>
  );
};

export default PitchComments;
