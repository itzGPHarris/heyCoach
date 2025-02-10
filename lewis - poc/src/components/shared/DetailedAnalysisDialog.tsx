import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from "@mui/material";

interface DetailedAnalysisDialogProps {
  open: boolean;
  onClose: () => void;
}

const DetailedAnalysisDialog: React.FC<DetailedAnalysisDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detailed Analysis & Transcript</DialogTitle>
      <DialogContent>
        {/* AI Analysis Section */}
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
          <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
            Filler words like **'uh'** and **'you know'** are highlighted for improvement.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
            **Hi, I'm Harper Lewis, founder of Radiant Hue.**  
            _Uh,_ the beauty industry has made great strides, but many products still fall short in terms of inclusivity and environmental impact.  
            Radiant Hue is a makeup brand that changes the narrative.  
            We're dedicated to providing clean beauty products that are safe for all skin types and tones without compromising on quality or performance.  
            Our inclusive a, _uh,_ range is designed to celebrate everyone's unique beauty using ethically sourced natural ingredients.  
            With Radiant Hue, _uh,_ you can feel good about what you put on your skin and proud of the impact you're making, _you know._  
            Together, let's redefine beauty one hue at a time.
          </Typography>
        </Box>

        {/* Close Button */}
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedAnalysisDialog;
