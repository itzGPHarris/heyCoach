import React, { useState } from "react";
import { Box, Button, Typography, Card, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import { AddCircleOutline, MoreVert, Delete, Archive, FileCopy } from "@mui/icons-material";
import PitchCarousel from "./PitchCarousel";
import NewIdeaForm from "./NewIdeaForm";
import { useLocation } from 'react-router-dom';


interface PitchIdea {
  id: number;
  title: string;
  description: string;
  videoUrl?: string; // ✅ Ensures `videoUrl` is optional (no null)
  isPortrait: boolean; // ✅ Ensures `isPortrait` always has a boolean value
}



const PitchFeed: React.FC = () => {
  const [pitchIdeas, setPitchIdeas] = useState<PitchIdea[]>([
    { id: 1, title: "Startup Funding Pitch", description: "Pitch for investors.", videoUrl: "", isPortrait: false },
    { id: 2, title: "Product Demo Pitch", description: "Showcasing product features.", videoUrl: "", isPortrait: false },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const location = useLocation();
  const firstRunData = location.state || {}; // ✅ Get first-run data
  const allPitches = firstRunData.idea ? [firstRunData, ...pitchIdeas] : pitchIdeas; // ✅ Inject FirstRun pitch
  

  const handleAddIdea = (newIdea: { title: string; description: string; videoUrl: string | null; isPortrait: boolean }) => {
    console.log("🚀 New Idea Created:", newIdea);
  
    const ideaWithId: PitchIdea = {
      id: Date.now(),
      title: newIdea.title,
      description: newIdea.description,
      videoUrl: newIdea.videoUrl ?? "", // ✅ Ensures `videoUrl` is always a string
      isPortrait: newIdea.isPortrait ?? false, // ✅ Ensures `isPortrait` is always a boolean
    };
  
    setPitchIdeas((prevIdeas) => [ideaWithId, ...prevIdeas]);
  };
  
  

  const handleDeleteIdea = (id: number) => {
    if (window.confirm("Are you sure you want to delete this idea?")) {
      setPitchIdeas(pitchIdeas.filter((idea) => idea.id !== id));
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={handleOpenDialog}>
          Start New Idea
        </Button>
      </Box>



<Box>
  {allPitches.map((idea) => (
    <Card key={idea.id} sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6">{idea.title || firstRunData.idea}</Typography> {/* ✅ Ensure title is displayed */}
          <IconButton onClick={(e) => handleMenuOpen(e, idea.id)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl[idea.id] || null}
            open={Boolean(anchorEl[idea.id])}
            onClose={() => handleMenuClose(idea.id)}
          >
            <MenuItem onClick={() => handleMenuClose(idea.id)}>
              <FileCopy fontSize="small" sx={{ marginRight: 1 }} /> Clone Idea
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(idea.id)}>
              <Archive fontSize="small" sx={{ marginRight: 1 }} /> Archive Idea
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(idea.id); handleDeleteIdea(idea.id); }} sx={{ color: "red" }}>
              <Delete fontSize="small" sx={{ marginRight: 1 }} /> Delete Idea
            </MenuItem>
          </Menu>
        </Box>

        {/* ✅ Pass the uploaded video URL & isPortrait to PitchCarousel */}
        <PitchCarousel 
          videoUrl={idea.videoUrl ?? firstRunData.videoSrc ?? ""}  // ✅ Ensures `videoUrl` is always a string
          isPortrait={idea.isPortrait ?? firstRunData.isPortrait ?? false} // ✅ Ensure `isPortrait` is correctly passed
        />
      </CardContent>
    </Card>
  ))}
</Box>

      {/* New Idea Dialog */}
      <NewIdeaForm open={openDialog} onClose={handleCloseDialog} onSubmit={handleAddIdea} />
    </Box>
  );
};

export default PitchFeed;
