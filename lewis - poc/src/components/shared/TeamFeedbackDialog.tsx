import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface TeamFeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

const TeamFeedbackDialog: React.FC<TeamFeedbackDialogProps> = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareableLink = "https://yourapp.com/feedback/team-session"; // Replace with dynamic link

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Get Team Feedback</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Invite your team to review your pitch and provide feedback.
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Copy the link below and share it with your teammates.
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          value={shareableLink}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            ),
          }}
          sx={{ mt: 1 }}
        />
        {copied && (
          <Typography variant="caption" color="green" sx={{ mt: 1 }}>
            Link copied to clipboard!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamFeedbackDialog;
