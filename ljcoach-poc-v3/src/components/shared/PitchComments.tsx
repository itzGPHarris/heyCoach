import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Collapse, CardContent, TextField, IconButton, Badge } from "@mui/material";
import { ExpandMore, Comment, ContentCopy } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { fontWeight, padding } from "@mui/system";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchCommentsProps {
  pitchId: number;
  comments: CommentData[];
  onUpdateComments: (newComments: CommentData[]) => void;
}

const ExpandMoreIcon = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform", { duration: theme.transitions.duration.shortest }),
}));

const SmallBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontSize: "0.6rem", // ✅ Reduce badge size by 80%
    fontWeight: "bold",
    height: "14px",
    minWidth: "14px",
    padding: "10px 8px",
    transform: "scale(0.9) translate(120%, -90%)", // ✅ Position near the upper-right of the title
    backgroundColor: "#ee6600", // ✅ Use primary color for badge background
  },
}));

const PitchComments: React.FC<PitchCommentsProps> = ({ pitchId, comments, onUpdateComments }) => {
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [newCommentsCount, setNewCommentsCount] = useState(comments.length);
  const [copied, setCopied] = useState(false);
  const sharableLink = `${window.location.origin}/feedback/${pitchId}`;

  useEffect(() => {
    if (commentsExpanded) {
      setNewCommentsCount(0); // ✅ Reset badge count when comments are viewed
    }
  }, [commentsExpanded]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ mt: 2, p: 2, borderTop: "1px solid #ddd" }}>
      {/* Expandable Header with Small Notification Badge */}
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
        <ExpandMoreIcon sx={{ transform: commentsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ExpandMore />
        </ExpandMoreIcon>
      </Box>

      {/* Collapsible Comments Section */}
      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* ✅ Simplified "Copy Link" UI */}
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

          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment.id} sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.author} ({comment.role})
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>

                {/* ✅ Reactions & Reply Button */}
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
                  <Button size="small" variant="text">
                    Reply
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
