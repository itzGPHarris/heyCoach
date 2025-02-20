import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Button } from "@mui/material";

interface ImprovementsDialogProps {
  open: boolean;
  onClose: () => void;
  improvementsText: string;
}

const ImprovementsDialog: React.FC<ImprovementsDialogProps> = ({ open, onClose, improvementsText }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Coach's Feedback on Your Revision</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">{improvementsText}</Typography>
        </Box>
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImprovementsDialog;
