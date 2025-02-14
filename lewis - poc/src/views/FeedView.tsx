import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Button, Typography, Collapse, List, ListItem, IconButton } from "@mui/material";
import { ThumbUp, Reply } from "@mui/icons-material";
import { motion } from "framer-motion";
import MessageComponent from "./MessageComponent";
import TeamFeedbackDialog from "../components/shared/TeamFeedbackDialog";
import MessageBubble from "../components/shared/MessageBubble";

interface Feedback {
  user: string;
  comment: string;
}

interface TeamFeedbackFeedCardProps {
  feedbackData: Feedback[];
  onQuickReply: (reply: string) => void;
}

const TeamFeedbackFeedCard: React.FC<TeamFeedbackFeedCardProps> = ({ feedbackData, onQuickReply }) => {
  const [expanded, setExpanded] = useState(false);
  const timestamp = new Date().toLocaleTimeString();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Card sx={{ mb: 2, p: 2, borderLeft: "4px solid #4CAF50" }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            🗣️ AI Coach: "You received feedback on your latest video!"
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {timestamp}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleExpandClick}>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

import { Dispatch, SetStateAction } from "react";
import { Message } from "../types/types";

const FeedView: React.FC<{ messages: Message[], setMessages: Dispatch<SetStateAction<Message[]>> }> = ({ messages, setMessages }) => {
  const [teamFeedbackDialogOpen, setTeamFeedbackDialogOpen] = useState(false);
  const feedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuickReply = (reply: string) => {
    setMessages((prev) => [...prev, { pitchId: "defaultPitchId", id: crypto.randomUUID(), sender: "user", text: reply, timestamp: new Date().toLocaleTimeString() }]);
  };

  const sampleFeedback = [
    { user: "John", comment: "Your ending is strong, but the middle felt rushed." },
    { user: "Maria", comment: "Try making the call-to-action more direct." },
    { user: "Alex", comment: "Great energy! Maybe slow down just a bit." },
  ];

  return (
    <div ref={feedRef} style={{ overflowY: "auto", maxHeight: "80vh" }}>
      <TeamFeedbackFeedCard feedbackData={sampleFeedback} onQuickReply={handleQuickReply} />
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} onQuickReply={handleQuickReply} />
      ))}
      <TeamFeedbackDialog open={teamFeedbackDialogOpen} onClose={() => setTeamFeedbackDialogOpen(false)} />
    </div>
  );
};

export default FeedView;
