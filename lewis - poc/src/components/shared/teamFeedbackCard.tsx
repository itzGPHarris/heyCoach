/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Avatar, Box, Button, Typography, Collapse, IconButton } from '@mui/material';
import { Heart, MessageCircle, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import CoachSpinner from "../../views/CoachSpinner";




interface Feedback {
  user: string;
  comment: string;
  avatarUrl?: string;
  timestamp: string;
  videoThumbnail?: string;
}

interface TeamFeedbackCardProps {
  feedbackData: Feedback[];
  onQuickReply: (reply: string) => void;
  onReaction: (type: string) => void;
}

const TeamFeedbackCard = ({ feedbackData, onQuickReply, onReaction }: TeamFeedbackCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Calculate remaining feedback count
  const displayedAvatars = 6;
  const remainingCount = Math.max(0, feedbackData.length - displayedAvatars);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%' }}
    >
      <Box sx={{ mb: 2, mt:2, p: 3, borderRadius: 2, bgcolor: 'background.paper',  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
 }}>
        {/* Default View */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: .75, mt: -6 }}>
          {/* 1. Coach Avatar */}
          <div style={{ width: '48px', height: '48px' }}>
            <CoachSpinner />
          </div>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
              You have new feedback from your team!
            </Typography>
          {/* 2. Avatar Stack and Message */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: .75 }}>
            {/* Avatar Stack */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {feedbackData.slice(0, displayedAvatars).map((feedback, index) => (
                <Avatar
                  key={index}
                  src={feedback.avatarUrl || `/api/placeholder/32/32`}
                  alt={feedback.user}
                  sx={{
                    width: 32,
                    height: 32,
                    border: 2,
                    borderColor: 'background.paper',
                    ml: index === 0 ? 0 : -1,
                  }}
                />
              ))}
              {remainingCount > 0 && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'grey.100',
                    border: 2,
                    borderColor: 'background.paper',
                    ml: -1,
                    fontSize: '0.85rem',
                    color: 'text.secondary'
                  }}
                >
                  +{remainingCount}
                </Avatar>
              )}
            </Box>
            
           
          </Box>

          {/* 3. Time */}
         {/* } <Typography variant="caption" color="text.secondary">
            {new Date().toLocaleTimeString()}
          </Typography> */}

          {/* 4. View Feedback Button */}
          <Button
            onClick={() => setExpanded(!expanded)}
            sx={{ color: '#0090f2' }}
          >
            {expanded ? 'Hide Feedback' : 'View Feedback'}
          </Button>
        </Box>

        {/* Expanded View */}
        <Collapse in={expanded}>
          <Box sx={{ mt: 3 }}>
            {feedbackData.map((feedback, index) => (
              <Box key={index} sx={{ 
                borderTop: index === 0 ? 0 : 1, 
                borderColor: 'divider',
                pt: 2,
                mt: 2
              }}>
                {/* Row 1: Timestamp */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: .25, textAlign: 'center' }}>
                  {feedback.timestamp}
                </Typography>

                {/* Row 2: Avatar + Message + Thumbnail */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: .75,
                  mb: 1
                }}>
                  <Avatar
                    src={feedback.avatarUrl || `/api/placeholder/32/32`}
                    alt={feedback.user}
                    sx={{ width: 32, height: 32 }}
                  />
                  
                  <Box sx={{ 
                    flex: 1,
                    p: .25,
                    bgcolor: 'white',
                    borderRadius: 2,
                    color: 'text.primary'
                  }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {feedback.comment}
                    </Typography>

                  </Box>

                  {feedback.videoThumbnail && (
                    <Box sx={{ 
                      width: 96,
                      height: 64,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img
                        src={feedback.videoThumbnail}
                        alt="Video thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Row 3: Actions */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  pl: 6 // Aligns with the content after avatar
                }}>
                  <IconButton
                    onClick={() => onReaction('like')}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                    size="small"
                  >
                    <ThumbsUp size={16} />
                  </IconButton>
                  <IconButton
                    onClick={() => onReaction('heart')}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                    size="small"
                  >
                    <Heart size={16} />
                  </IconButton>
                  <IconButton
                    onClick={() => onReaction('comment')}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'success.main' } }}
                    size="small"
                  >
                    <MessageCircle size={16} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </motion.div>
  );
};

export default TeamFeedbackCard;
