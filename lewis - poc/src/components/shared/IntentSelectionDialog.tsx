// Updated on - 2025-02-05, Time: Pacific Time (PT), 12:45

// IntentSelectionDialog.tsx - Allows users to select their goal for using the app
import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip } from "@mui/material";

interface IntentSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectIntent: (selectedIntents: string[]) => void;
}

const intentOptions = [
  "Refine a Business Pitch",
  "Prepare for a Competition",
  "Improve a Boardroom Presentation",
  "Fundraising & Investor Pitches",
  "Public Speaking & Communication",
  "Brainstorm & Experiment",
];

const IntentSelectionDialog: React.FC<IntentSelectionDialogProps> = ({ open, onClose, onSelectIntent }) => {
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  const handleToggleIntent = (intent: string) => {
    setSelectedIntents((prev) =>
      prev.includes(intent) ? prev.filter((i) => i !== intent) : prev.length < 3 ? [...prev, intent] : prev
    );
  };

  const handleChooseForMe = () => {
    onSelectIntent(["AI Selected Intent"]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>How can I help you today?</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Choose up to 3 areas of focus. Or, let me analyze your content and suggest one for you.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {intentOptions.map((intent) => (
            <Chip
              key={intent}
              label={intent}
              color={selectedIntents.includes(intent) ? "primary" : "default"}
              onClick={() => handleToggleIntent(intent)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
        <Button fullWidth variant="outlined" onClick={handleChooseForMe} sx={{ mb: 2 }}>
          🤖 Choose for Me
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Skip for Now</Button>
        <Button onClick={() => { onSelectIntent(selectedIntents); onClose(); }} disabled={selectedIntents.length === 0}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntentSelectionDialog;
