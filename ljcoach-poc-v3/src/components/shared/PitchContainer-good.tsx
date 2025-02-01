import React, { useState } from "react";
import { Box, Card, CardHeader, CardContent, Typography, IconButton, Collapse, Button, TextField } from "@mui/material";
import { ExpandMore, Comment, ThumbUp, CalendarToday, Star, BarChart } from "@mui/icons-material";
import MuxPlayer from "@mux/mux-player-react";
import { styled } from "@mui/material/styles";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
  replies?: { id: number; text: string }[];
  reactions?: { emoji: string; count: number }[];
}

interface PitchContainerProps {
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
}

interface TranscriptSegment {
  timecode: string;
  text: string;
  highlights?: { type: "filler" | "improvement"; word: string }[];
}

const transcriptData: TranscriptSegment[] = [
  { timecode: "00:01", text: "Hi, I'm Harper Lewis, founder of Radiant Hue." },
  { timecode: "00:05", text: "Uh, the beauty industry has made great strides, but many products still fall short in terms of inclusivity and environmental impact.", highlights: [{ type: "filler", word: "Uh" }] },
];

const ExpandMoreIcon = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform", { duration: theme.transitions.duration.shortest }),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  overflow: "hidden",
  paddingBottom: theme.spacing(2),
}));

const ExpandableContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f8f9fa",
  margin: theme.spacing(1, 2),
  padding: theme.spacing(2),
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const InteractiveTranscript = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  maxHeight: "200px",
  overflowY: "auto",
}));

const PitchContainer: React.FC<PitchContainerProps> = ({ title, description, videoUrl, score, likes, lastModified, comments }) => {
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});
  const [commentReplies, setCommentReplies] = useState<{ [key: number]: { id: number; text: string }[] }>({});
  const [reactions, setReactions] = useState<{ [key: number]: { emoji: string; count: number }[] }>({});

  const handleSummaryExpand = () => setSummaryExpanded(!summaryExpanded);
  const handleCommentsExpand = () => setCommentsExpanded(!commentsExpanded);

  const handleReplyChange = (commentId: number, text: string) => {
    setReplies((prev) => ({ ...prev, [commentId]: text }));
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replies[commentId]) return;
    const newReply = { id: Date.now(), text: replies[commentId] };
    setCommentReplies((prev) => ({ ...prev, [commentId]: [...(prev[commentId] || []), newReply] }));
    setReplies((prev) => ({ ...prev, [commentId]: "" })); // Clear input after submission
  };

  const handleAddReaction = (commentId: number, emoji: string) => {
    setReactions((prev) => {
      const existingReactions = prev[commentId] || [];
      const reactionIndex = existingReactions.findIndex((r) => r.emoji === emoji);

      if (reactionIndex !== -1) {
        // If reaction exists, update count
        const updatedReactions = [...existingReactions];
        updatedReactions[reactionIndex].count += 1;
        return { ...prev, [commentId]: updatedReactions };
      } else {
        // Add new reaction
        return { ...prev, [commentId]: [...existingReactions, { emoji, count: 1 }] };
      }
    });
  };

  return (
    <StyledCard>
      <CardHeader title={<Typography variant="h6" fontWeight="bold">{title}</Typography>} subheader={<Typography variant="body2" color="textSecondary">{description}</Typography>} sx={{ paddingBottom: 0 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, mb: 1 }}>
        <Typography variant="body2"><Star fontSize="small" sx={{ color: "#f4b400" }} /> {score}% Score</Typography>
        <Typography variant="body2"><ThumbUp fontSize="small" sx={{ color: "#2962ff" }} /> {likes} Likes</Typography>
        <Typography variant="body2"><CalendarToday fontSize="small" /> {lastModified}</Typography>
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <MuxPlayer streamType="on-demand" playbackId={videoUrl} style={{ width: "100%", borderRadius: "12px" }} />
      </Box>

      <Box sx={{ p: 2, backgroundColor: "#fff" }}>
        <Typography variant="h6">AI Coach Summary</Typography>
        <Typography variant="body2" color="textSecondary">
          The AI suggests improving engagement by reducing filler words and adding a stronger opening statement.
        </Typography>

        {/* Key Pitch Metrics (Always Visible) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", textAlign: "center", mt: 2 }}>
          <Box>
            <Typography variant="h5" color="primary">60%</Typography>
            <Typography variant="body2" color="textSecondary">Clarity</Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="primary">55%</Typography>
            <Typography variant="body2" color="textSecondary">Engagement</Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="primary">58%</Typography>
            <Typography variant="body2" color="textSecondary">Pacing</Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="primary">65%</Typography>
            <Typography variant="body2" color="textSecondary">Structure</Typography>
          </Box>
        </Box>
      </Box>


      <ExpandableContainer onClick={handleSummaryExpand}>
        <Typography variant="subtitle1"><BarChart fontSize="small" /> Detailed Analysis & Transcript</Typography>
        <ExpandMoreIcon sx={{ transform: summaryExpanded ? "rotate(180deg)" : "rotate(0deg)" }}><ExpandMore /></ExpandMoreIcon>
      </ExpandableContainer>

      <Collapse in={summaryExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">AI Coach Detailed Analysis</Typography>
          <Typography variant="body2">The AI suggests refining your tone, increasing eye contact, and adding a more structured conclusion.</Typography>

          <Typography variant="h6">Interactive Transcript</Typography>
          <InteractiveTranscript>
            {transcriptData.map((segment, index) => (
              <Box key={index}>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "primary.main" }}>{segment.timecode}</Typography>
                <Typography variant="body2">{segment.text}</Typography>
              </Box>
            ))}
          </InteractiveTranscript>
        </CardContent>
      </Collapse>

      <ExpandableContainer onClick={handleCommentsExpand}>
        <Typography variant="subtitle1"><Comment fontSize="small" /> Feedback & Comments</Typography>
        <ExpandMoreIcon sx={{ transform: commentsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}><ExpandMore /></ExpandMoreIcon>
      </ExpandableContainer>

      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment.id} sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.author} ({comment.role})
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>

                {/* Reactions */}
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
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
                </Box>

                {/* Replies */}
                {commentReplies[comment.id]?.map((reply) => (
                  <Box key={reply.id} sx={{ ml: 3, mt: 1, p: 1, border: "1px solid #ccc", borderRadius: 1 }}>
                    <Typography variant="body2">{reply.text}</Typography>
                  </Box>
                ))}

                {/* Reply Input */}
                <TextField
                  label="Reply..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  value={replies[comment.id] || ""}
                  onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                />
                <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={() => handleReplySubmit(comment.id)}>
                  Reply
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments yet.
            </Typography>
          )}
        </CardContent>
      </Collapse>

    </StyledCard>
  );
};

export default PitchContainer;
