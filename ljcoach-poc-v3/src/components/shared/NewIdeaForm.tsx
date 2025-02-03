import { useState } from "react";
import { Dialog, DialogActions, DialogContent, Button, Typography, TextField } from "@mui/material";
import VideoUploader from "./VideoUploader";

interface NewIdeaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; videoUrl: string | null; isPortrait: boolean }) => void;
}

const NewIdeaForm: React.FC<NewIdeaFormProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false); // ✅ Track orientation

  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
  
    // ✅ Detect video orientation
    const video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
  
      const detectedOrientation = videoHeight > videoWidth; // ✅ True if portrait
      setIsPortrait(detectedOrientation);
  
      console.log("📸 Video uploaded - Width:", videoWidth, "Height:", videoHeight);
      console.log("🔄 Detected Orientation:", detectedOrientation ? "Portrait" : "Landscape");
    };
  };
  
  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description, videoUrl: videoUrl ?? "", isPortrait });
    console.log("🚀 Submitting New Idea:", { title, description, videoUrl, isPortrait });
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6">Create a New Pitch Idea</Typography>
        <TextField
          label="Idea Title"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          sx={{ mt: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ✅ Integrate Video Uploader */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Upload a Video:
        </Typography>
        <VideoUploader onVideoSelect={handleVideoUpload} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!title.trim()}>
          Add Idea
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewIdeaForm;
