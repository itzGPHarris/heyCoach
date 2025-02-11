import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PitchAIAnalysis from "./PitchAIAnalysis";
import InteractiveTranscript, { TranscriptSegment } from "./interactiveTranscript";

interface DetailedAnalysisDialogProps {
  open: boolean;
  onClose: () => void;
}

const transcriptData: TranscriptSegment[] = [
  { timecode: "00:00", text: "Welcome everyone, to the ummm most exciting business competition on the Internet.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for clarity)" }] },
  { timecode: "00:05", text: "This is Long Jump, where big ideas take the leap of faith and land into the world of opportunity." },
  { timecode: "00:10", text: "You can call me Coach, your guide through this ummm incredible journey of innovation, creativity, and entrepreneurial spirit.", highlights: [{ type: "filler", word: "ummm", suggestion: "(replace with pause)" }] },
  { timecode: "00:15", text: "Submit a 1 to 3-minute video pitch of ummm your product or business idea.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for clarity)" }] },
  { timecode: "00:20", text: "First impressions matter. Judges will look for originality, potential impact, and that special spark that sets your idea apart.", highlights: [{ type: "improvement", word: "Judges will", suggestion: "Judges will be evaluating" }] },
  { timecode: "00:25", text: "The stakes are high. The winner ummm of Long Jump takes home $25,000.", highlights: [{ type: "filler", word: "ummm", suggestion: "(remove for confidence)" }] },
  { timecode: "00:28", text: "That's $50,000 in total prizes up for grabs. Make your pitch count." },
];

const DetailedAnalysisDialog: React.FC<DetailedAnalysisDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* Dialog Title with Close Icon */}
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Detailed Analysis & Transcript
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* AI Analysis Section */}
        <Box sx={{ mb: 2 }}>
          <PitchAIAnalysis />
        </Box>

        {/* Detailed Feedback */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Harper, here’s your detailed feedback:</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Your pitch for Radiant Hue has improved in clarity and focus. You effectively highlight the use of ethically sourced natural ingredients and inclusivity, which strengthens your unique selling proposition.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            However, areas needing improvement remain. The previous analysis suggested adding an engaging question, which was not incorporated. Additionally, filler words like 'uh' and 'you know' reduce the professional tone.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Your speaking rate of **153 words per minute** is within the recommended range, and the video duration of **43.37 seconds** is appropriate. Improving engagement and confidence will enhance your pitch's impact.
          </Typography>
        </Box>

        {/* Technical Analysis */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Technical Analysis</Typography>
          <Typography variant="body1">
            ✅ **Visual Quality:** Clean background, good lighting, and professional attire.  
            ✅ **Eye Contact:** Varied, but maintaining more consistent focus on the camera would help.  
            ✅ **Body Language:** Neutral; adding more expressive gestures can enhance engagement.  
            ✅ **Filler Words:** 'Uh' and 'you know' detract from professionalism—minimizing these will strengthen your delivery.
          </Typography>
        </Box>

        {/* Suggested Improvements */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Suggestions</Typography>
          <Typography variant="body1">
            🔹 **Engage the Audience:** Introduce a question or interactive element.  
            🔹 **Reduce Filler Words:** Minimize 'uh' and 'you know' for a more polished delivery.  
            🔹 **Enhance Confidence:** Project a more professional and assured tone.  
            🔹 **Consistent Eye Contact:** Maintaining steady camera focus will increase audience engagement.  
            🔹 **Express Enthusiasm:** Use varied facial expressions and body language to emphasize key points.
          </Typography>
        </Box>

        {/* Transcript Section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Transcript with Coaching Notes</Typography>
          <InteractiveTranscript transcript={transcriptData} />
        </Box>

        {/* Bottom Close Button */}
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedAnalysisDialog;
