import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material"; // ✅ Import the missing icon


interface NewIdeaFormProps {
  onAddIdea: (title: string, description: string, videoUrl: string) => void;
}

const NewIdeaForm: React.FC<NewIdeaFormProps> = ({ onAddIdea }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState<string | null>(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTitle("");
    setNewDescription("");
    setNewVideoUrl(null);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const videoFile = event.target.files[0];
      const videoURL = URL.createObjectURL(videoFile);
      setNewVideoUrl(videoURL);
    }
  };

  const handleAddIdea = () => {
    if (newTitle.trim()) {
      onAddIdea(newTitle, newDescription, newVideoUrl || "");
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button variant="contained" 
        startIcon={<AddCircleOutline />} 
        onClick={handleOpenDialog}
        sx={{ backgroundColor: "#003366", "&:hover": { backgroundColor: "#000033" } }}          
        >
        New Idea
      </Button>

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
    </>
  );
};

export default NewIdeaForm;
