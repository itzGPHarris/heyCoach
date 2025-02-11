import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

interface CompetitionsDialogProps {
  open: boolean;
  onClose: () => void;
}

const activeCompetitions = [
  { id: 1, name: "Startup Pitch Challenge", deadline: "Feb 20, 2025" },
  { id: 2, name: "Tech Innovators Contest", deadline: "March 5, 2025" },
];

const upcomingCompetitions = [
  { id: 3, name: "AI Innovation Award", starts: "March 15, 2025" },
  { id: 4, name: "SaaS Pitch Battle", starts: "April 1, 2025" },
];

const CompetitionsDialog: React.FC<CompetitionsDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Enter a Competition</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Choose a competition to submit your pitch.
        </Typography>

        <Typography variant="h6">Active Competitions</Typography>
        <List>
          {activeCompetitions.map((comp) => (
            <ListItem key={comp.id} component="div">
              <ListItemText primary={comp.name} secondary={`Deadline: ${comp.deadline}`} />
              <Button variant="contained" color="primary">Submit</Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 2 }}>Upcoming Competitions</Typography>
        <List>
          {upcomingCompetitions.map((comp) => (
            <ListItem key={comp.id}>
              <ListItemText primary={comp.name} secondary={`Starts: ${comp.starts}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompetitionsDialog;
