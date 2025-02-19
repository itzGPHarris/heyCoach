/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  Box, 
  Typography,
  Paper
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  StarBorder 
} from '@mui/icons-material';
import MuxPlayer from '@mux/mux-player-react';  // Add this import
import { X } from "lucide-react";

import { SAMPLE_PITCH_DATA } from '../../../utils/constants';
// Dot Indicator Component
interface DotIndicatorProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

const DotIndicator = ({ total, current, onChange }: DotIndicatorProps) => {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 1,
        mt: 2 
      }}>
        {Array.from({ length: total }).map((_, index) => (
          <Box
            key={index}
            onClick={() => onChange(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === current ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: index === current ? 'primary.dark' : 'grey.400',
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>
    );
  };
// MUX Video Player Component
const MuxVideoPlayer = ({ playbackId }: { playbackId: string }) => {
    return (
      <MuxPlayer
        streamType="on-demand"
        playbackId={playbackId}
        style={{
          width: "100%",
          borderRadius: "8px",
          aspectRatio: "16 / 9",
        }}
      />
    );
  };
  // Metric Bar Component with improved visuals
interface MetricBarProps {
  label: string;
  value: number;
  color: string;
}

const MetricBar = ({ label, value, color }: MetricBarProps) => {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1 
        }}>
          <Typography variant="body2">{label}</Typography>
          <Typography variant="body2" fontWeight="medium">{value}%</Typography>
        </Box>
        <Box sx={{ 
          width: '100%', 
          height: 8, 
          bgcolor: 'grey.100', 
          borderRadius: 1,
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              width: `${value}%`,
              height: '100%',
              bgcolor: color,
              borderRadius: 1,
              transition: 'width 0.3s ease'
            }}
          />
        </Box>
      </Box>
    );
  };

  const DetailedAnalysisCard = ({ version }: { version: PitchVersion }) => {
    return (
      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Detailed Analysis</Typography>
        
        {/* General Feedback */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Your pitch for Radiant Hue has improved in clarity and focus. You effectively highlight the use of ethically sourced natural ingredients and inclusivity, which strengthens your unique selling proposition.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            However, areas needing improvement remain. The previous analysis suggested adding an engaging question, which was not incorporated. Additionally, filler words like 'uh' and 'you know' reduce the professional tone.
          </Typography>
        </Box>
  
        {/* Technical Analysis */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Technical Analysis
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography component="div">
              ✅ <strong>Visual Quality:</strong> Clean background, good lighting, and professional attire.<br />
              ✅ <strong>Eye Contact:</strong> Varied, but maintaining more consistent focus on the camera would help.<br />
              ✅ <strong>Body Language:</strong> Neutral; adding more expressive gestures can enhance engagement.<br />
              ✅ <strong>Filler Words:</strong> 'Uh' and 'you know' detract from professionalism—minimizing these will strengthen your delivery.
            </Typography>
          </Box>
        </Box>
  
        {/* Suggestions */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Suggestions
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography component="div">
              🔹 <strong>Engage the Audience:</strong> Introduce a question or interactive element.<br />
              🔹 <strong>Reduce Filler Words:</strong> Minimize 'uh' and 'you know' for a more polished delivery.<br />
              🔹 <strong>Enhance Confidence:</strong> Project a more professional and assured tone.<br />
              🔹 <strong>Consistent Eye Contact:</strong> Maintaining steady camera focus will increase audience engagement.<br />
              🔹 <strong>Express Enthusiasm:</strong> Use varied facial expressions and body language to emphasize key points.
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  };
  
interface PitchVersion {
    isFavorite: boolean;
    title: string;
    videoUrl: string;
    analysis: {
      score: number;
      metrics: {
        clarity: number;
        pace: number;
        engagement: number;
      };
    };
    feedback: Array<{
      id: string;
      author: string;
      timestamp: string;
      content: string;
    }>;
  }
// Main Dialog Component
interface PitchVersionsDialogProps {
  open: boolean;
  onClose: () => void;
}

// Main Dialog Component
const PitchVersionsDialog = ({ open, onClose }: PitchVersionsDialogProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const versions = SAMPLE_PITCH_DATA.RADIANT_HUE.versions as unknown as PitchVersion[];
    
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          m: 1,  // Reduced margin (default is 3)
          width: '100%',
          maxHeight: 'calc(100% - 16px)'  // Adjust based on your margin
        }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           {/*} <Typography variant="h6">RadiantHue Pitch Versions</Typography> */}
            <Typography variant="h6" color="text.secondary">
              Version {currentIndex + 1} of {versions.length}
            </Typography>
            <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <X size={20} />
        </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pb: 3 ,
          px:1// Add padding at bottom for dot indicators
        }}>
          <PitchCarousel 
            versions={versions}
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
          />
        </DialogContent>
      </Dialog>
    );
  };
  
  // Update PitchCarousel for better spacing
  const PitchCarousel = ({ versions, currentIndex, onIndexChange }: { versions: PitchVersion[], currentIndex: number, onIndexChange: (index: number) => void }) => {
    const handlePrevious = () => {
      onIndexChange(currentIndex > 0 ? currentIndex - 1 : versions.length - 1);
    };
  
    const handleNext = () => {
      onIndexChange(currentIndex < versions.length - 1 ? currentIndex + 1 : 0);
    };
  
    return (
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%'
      }}>
        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={handlePrevious}>
            <ChevronLeft />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton>
              {versions[currentIndex].isFavorite ? (
                <Star sx={{ color: 'warning.main' }} />
              ) : (
                <StarBorder />
              )}
            </IconButton>
            <Typography variant="h6">
              {versions[currentIndex].title}
            </Typography>
          </Box>
  
          <IconButton onClick={handleNext}>
            <ChevronRight />
          </IconButton>
        </Box>
  
        {/* Content Area */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <PitchContent version={versions[currentIndex]} />
        </Box>
  
        {/* Dot Indicators at bottom */}
        <Box sx={{ pt: 2 }}>
          <DotIndicator 
            total={versions.length}
            current={currentIndex}
            onChange={onIndexChange}
          />
        </Box>
      </Box>
    );
  };
  
  // Update PitchContent for better card layout
  const PitchContent = ({ version }: { version: PitchVersion }) => {
    return (
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        {/* Video Player */}
        <Box sx={{ width: '100%' }}>
          <MuxPlayer
            streamType="on-demand"
            playbackId={version.videoUrl}
            style={{
              width: "100%",
              borderRadius: "8px",
              aspectRatio: "16 / 9",
            }}
          />
        </Box>
  
        {/* Analysis and Feedback Cards */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Analysis Card */}
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Analysis</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MetricBar
                label="Overall Score"
                value={version.analysis.score}
                color="primary.main"
              />
              <MetricBar
                label="Clarity"
                value={version.analysis.metrics.clarity}
                color="success.main"
              />
              <MetricBar
                label="Pace"
                value={version.analysis.metrics.pace}
                color="warning.main"
              />
              <MetricBar
                label="Engagement"
                value={version.analysis.metrics.engagement}
                color="info.main"
              />
            </Box>
          </Paper>
          <DetailedAnalysisCard version={version} />

          {/* Feedback Card */}
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Feedback</Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              {version.feedback.map((item) => (
                <Paper key={item.id} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2">{item.author}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{item.content}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  };

export default PitchVersionsDialog;