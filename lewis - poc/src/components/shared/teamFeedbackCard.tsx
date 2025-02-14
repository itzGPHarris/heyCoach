import React, { useState } from "react";
import { Box, Button, Typography, Collapse, List, ListItem, IconButton } from "@mui/material";
import { ThumbUp, Reply } from "@mui/icons-material";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";

interface Feedback {
  user: string;
  comment: string;
}

interface TeamFeedbackCardProps {
  feedbackData: Feedback[];
  onQuickReply: (reply: string) => void;
}

const TeamFeedbackCard: React.FC<TeamFeedbackCardProps> = ({ feedbackData, onQuickReply }) => {
  const [expanded, setExpanded] = useState(false);
  const timestamp = new Date().toLocaleTimeString();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box sx={{ mb: 2, p: 3,display: "flex", flexDirection: "column", width: "100%", borderRadius: 4, alignItems:"center"  }}>
          <Typography variant="caption" color="textSecondary">
            {timestamp}
          </Typography>
          <Typography variant="body1" gutterBottom>
            🤠 You received feedback on your latest video!
          </Typography>
          
          <Button  sx={{color:"#009FC0"}} size="small" onClick={handleExpandClick}>
            {expanded ? "Hide Feedback" : "View Feedback"}
          </Button>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List>
              {feedbackData.map((feedback, index) => (
                <ListItem key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <MessageBubble sender="team" text={`${feedback.user}: ${feedback.comment}`} backgroundColor="#4CAF50" />
                  <div>
                    <IconButton size="small" onClick={() => onQuickReply(`👍 Liked ${feedback.user}'s comment`)}>
                      <ThumbUp fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onQuickReply(`↩️ Replied to ${feedback.user}`)}>
                      <Reply fontSize="small" />
                    </IconButton>
                  </div>
                </ListItem>
              ))}
            </List>
          </Collapse>
      </Box>
    </motion.div>
  );
};

export default TeamFeedbackCard;
