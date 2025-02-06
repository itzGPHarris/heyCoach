// Updated on - 2025-02-05, Time: Pacific Time (PT), 14:40

// Fixed NewIdeaForm.tsx - Ensures Dialog Closes Properly on Submission or Cancel
import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, Button, Typography, TextField } from "@mui/material";
import VideoUploader from "./VideoUploader";

interface NewIdeaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; videoUrl: string | null; isPortrait: boolean }) => void;
  initialData?: { title?: string; videoSrc?: string | null; isPortrait?: boolean };
}

const NewIdeaForm: React.FC<NewIdeaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(initialData?.videoSrc || null);
  const [isPortrait, setIsPortrait] = useState<boolean>(initialData?.isPortrait || false);

  useEffect(() => {
    console.log("📥 Initial data in NewIdeaForm:", { title, videoUrl, isPortrait });
  }, [title, videoUrl, isPortrait]);

  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
    const video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => {
      const detectedOrientation = video.videoHeight > video.videoWidth;
      setIsPortrait(detectedOrientation);
      console.log("📸 Detected Video Orientation:", detectedOrientation ? "Portrait" : "Landscape");
    };
  };

  const handleSubmit = () => {
    console.log("🛑🛑🛑 Calling onClose to close the dialog");

    if (!title.trim() || !description.trim()) {
      console.log("❌ Submission blocked: Missing required fields");
      return;
    }
    console.log("🚀 Submitting New Idea:", { title, description, videoUrl, isPortrait });
    onSubmit({ title, description, videoUrl: videoUrl ?? "", isPortrait });
    console.log("🛑 Calling onClose to close the dialog");
    onClose(); // ✅ Try closing immediately
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6">Create a New Pitch Idea</Typography>
        <TextField label="Idea Title" fullWidth variant="outlined" sx={{ mt: 2 }} value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Description" fullWidth multiline rows={2} variant="outlined" sx={{ mt: 2 }} value={description} onChange={(e) => setDescription(e.target.value)} />

        {videoUrl ? (
          <video controls width="100%">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}>Upload a Video:</Typography>
            <VideoUploader onVideoSelect={handleVideoUpload} />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!title.trim() || !description.trim()}>
          Add Idea
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewIdeaForm;
