import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Collapse, CardContent, IconButton, Badge } from "@mui/material";
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
  onUpdateComments?: (newComments: CommentData[]) => void; // ✅ Added to ensure updates
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

  const handleAddComment = () => {
    const newComment = {
      id: Date.now(),
      author: "New User",
      role: "User",
      text: "This is a test comment."
    };

    const updatedComments = [...localComments, newComment];
    setLocalComments(updatedComments);

    if (onUpdateComments) {
      onUpdateComments(updatedComments); // ✅ Updates the parent component
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderTop: "1px solid #ddd" }}>
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

          {localComments.length > 0 ? (
            localComments.map((comment) => (
              <Box key={comment.id} sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.author} ({comment.role})
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                  {["👍", "🔥", "😂"].map((emoji) => (
                    <Button
                      key={emoji}
                      size="small"
                      variant="text"
                      onClick={() => console.log(`Reacted with ${emoji} on comment ${comment.id}`)}
                    >
                      {emoji}
                    </Button>
                  ))}
                  <Button size="small" variant="text" onClick={handleAddComment}>
                    Add Test Comment
                  </Button>
                </Box>
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
