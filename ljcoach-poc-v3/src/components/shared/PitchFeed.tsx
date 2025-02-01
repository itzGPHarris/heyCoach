import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Card, CardContent, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import PitchCarousel from "./PitchCarousel";

interface PitchIdea {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const PitchFeed: React.FC = () => {
  const [pitchIdeas, setPitchIdeas] = useState<PitchIdea[]>([
    { id: 1, title: "Startup Funding Pitch", description: "Pitch for potential investors.", videoUrl: "" },
    { id: 2, title: "Product Demo Pitch", description: "Showcasing product features.", videoUrl: "" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const handleOpenDialog = () => {
    setNewTitle("");
    setNewDescription("");
    setNewVideoUrl("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const videoFile = event.target.files[0];
      const videoURL = URL.createObjectURL(videoFile);
      setNewVideoUrl(videoURL);
    }
  };

  const handleAddIdea = () => {
    if (!newTitle.trim()) return;

    const newIdea: PitchIdea = {
      id: pitchIdeas.length + 1,
      title: newTitle,
      description: newDescription,
      videoUrl: newVideoUrl,
    };

    setPitchIdeas([newIdea, ...pitchIdeas]);
    handleCloseDialog();
  };

  const handleDeleteIdea = (id: number) => {
    setPitchIdeas(pitchIdeas.filter((idea) => idea.id !== id));
  };
  console.log(`📦 [feed] Loaded:`); // Debug log

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", pt: 3 }}>
      {/* Header & New Idea Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={handleOpenDialog}>
          Start New Idea
        </Button>
      </Box>

      {/* Scrollable Pitch Feed */}
      <Box sx={{ overflowY: "auto", maxHeight: "80vh", padding: 1 }}>
        {pitchIdeas.map((idea) => (
          <Card key={idea.id} sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="h6">{idea.title}</Typography>
                <IconButton color="error" onClick={() => handleDeleteIdea(idea.id)}>
                  <Delete />
                </IconButton>
              </Box>
              <PitchCarousel />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* New Idea Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h6">Create a New Pitch Idea</Typography>
          <TextField
            label="Idea Title"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            sx={{ mt: 2 }}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Upload a Video:
          </Typography>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          {newVideoUrl && (
            <video src={newVideoUrl} controls width="100%" style={{ marginTop: "10px", borderRadius: "8px" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAddIdea} variant="contained" color="primary" disabled={!newTitle.trim()}>
            Add Idea
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PitchFeed;
