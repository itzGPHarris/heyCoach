/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/feed/SimplifiedFeedView.tsx
import React, { useState } from "react";
import { Box, Container, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PitchCard from "../../components/shared/PitchCard";
import { CommandAction } from '../../utils/constants'; // Import from the same file

// Sample pitch data
const samplePitches = [
    {
      id: "pitch1",
      title: "Radiant Hue Investor Pitch",
      thumbnailUrl: "https://via.placeholder.com/640x360",
      user: {
        name: "Harper Lewis",
        avatar: "/assets/placeholder-avatar.svg",
      },
      createdAt: "March 10, 2025",
      version: 2,
      versionLabel: "Current Version",
      duration: 42, // Make sure this is present in all objects
      overallScore: 78,
      improvement: 12,
      transcript: "Hi, I'm Harper Lewis, founder of Radiant Hue...",
      summary: "Radiant Hue is a makeup brand focused on inclusivity...",
      coachFeedback: "Your pitch has improved significantly...",
      metrics: {
        clarity: 82,
        engagement: 75,
        pacing: 70,
        contentQuality: 85,
        wpm: 153,
        fillerWords: 3
      }
    },
    // Make sure your second object and any others have all required fields
    {
      id: "pitch2",
      title: "Product Demo - Version 1",
      thumbnailUrl: "https://via.placeholder.com/640x360",
      user: {
        name: "Harper Lewis",
        avatar: "/assets/placeholder-avatar.svg",
      },
      createdAt: "March 5, 2025",
      version: 1,
      duration: 55, // Make sure this is present
      overallScore: 66,
      improvement: -5,
      transcript: "Today I want to show you our first product lineup...",
      metrics: {
        clarity: 65,
        engagement: 70,
        pacing: 60,
        contentQuality: 70,
        wpm: 165,
        fillerWords: 8
      }
    }
  ];
  
interface FeedViewProps {
  onCommand?: (action: CommandAction) => void;
}

const SimplifiedFeedView: React.FC<FeedViewProps> = ({ onCommand }) => {
  const [inputValue, setInputValue] = useState("");
  
  const handlePitchAction = (action: 'play' | 'metrics' | 'transcript' | 'feedback', pitchId: string) => {
    console.log(`Action ${action} requested for pitch ${pitchId}`);
    // Handle the action - this would typically:
    // - For 'play': Open video player
    // - For 'metrics': Show detailed metrics view
    // - For 'transcript': Show interactive transcript
    // - For 'feedback': Generate a shareable link
  };
  
  const handleRatingChange = (pitchId: string, rating: number) => {
    console.log(`Pitch ${pitchId} rated ${rating} stars`);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log(`Sending message: ${inputValue}`);
      // Here you would process the message and potentially add an AI response
      setInputValue("");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 10 }}>

      
      {samplePitches.map(pitch => (
        <PitchCard 
          key={pitch.id} 
          pitch={pitch}
          onActionClick={handlePitchAction}
          onRatingChange={handleRatingChange}
        />
      ))}
      
      {/* Chat Input at Bottom */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 2, 
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          zIndex: 10
        }}
      >
        <Container maxWidth="md">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask the coach about your pitch..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'white' }}
          />
        </Container>
      </Box>
    </Container>
  );
};

export default SimplifiedFeedView;