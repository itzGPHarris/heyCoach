import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { AddCircleOutline, MoreVert, Delete, Archive, FileCopy } from "@mui/icons-material";
import PitchCarousel from "./PitchCarousel";

interface PitchIdea {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const PitchFeed: React.FC = () => {
  const [pitchIdeas, setPitchIdeas] = useState<PitchIdea[]>([
    { id: 1, title: "RadientHue", description: "Pitch for potential investors.", videoUrl: "" },
    { id: 2, title: "GlamorGlo", description: "Showcasing product features.", videoUrl: "" },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

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
    if (window.confirm("Are you sure you want to delete this idea?")) {
      setPitchIdeas(pitchIdeas.filter((idea) => idea.id !== id));
    }
  };

  const handleArchiveIdea = (id: number) => {
    alert(`📁 Idea "${id}" archived.`);
  };

  const handleCloneIdea = (id: number) => {
    const originalIdea = pitchIdeas.find((idea) => idea.id === id);
    if (originalIdea) {
      const clonedIdea: PitchIdea = {
        id: Date.now(),
        title: `Copy of ${originalIdea.title}`,
        description: originalIdea.description,
        videoUrl: originalIdea.videoUrl,
      };
      setPitchIdeas([clonedIdea, ...pitchIdeas]);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleMenuClose = (id: number) => {
    setAnchorEl((prev) => ({ ...prev, [id]: null }));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", pt: 3 }}>
      {/* Header & New Idea Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={handleOpenDialog}>
          Start New Idea
        </Button>
      </Box>

      {/* ✅ Fix: Remove explicit scrolling here */}
      <Box sx={{ mb: 9 }}>
        {pitchIdeas.map((idea) => (
          <Card key={idea.id} sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="h6">{idea.title}</Typography>

                {/* Meatball Menu */}
                <IconButton onClick={(e) => handleMenuOpen(e, idea.id)}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl[idea.id] || null}
                  open={Boolean(anchorEl[idea.id])}
                  onClose={() => handleMenuClose(idea.id)}
                >
                  <MenuItem onClick={() => { handleMenuClose(idea.id); handleCloneIdea(idea.id); }}>
                    <FileCopy fontSize="small" sx={{ marginRight: 1 }} /> Clone Idea
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(idea.id); handleArchiveIdea(idea.id); }}>
                    <Archive fontSize="small" sx={{ marginRight: 1 }} /> Archive Idea
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(idea.id); handleDeleteIdea(idea.id); }} sx={{ color: "red" }}>
                    <Delete fontSize="small" sx={{ marginRight: 1 }} /> Delete Idea
                  </MenuItem>
                </Menu>
              </Box>

              {/* ✅ Fix: Ensure PitchCarousel fits properly inside */}
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                <PitchCarousel />
              </Box>
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
