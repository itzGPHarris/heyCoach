import React, { useState } from "react";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import { Delete } from "@mui/icons-material";

import PitchCarousel from "./PitchCarousel";
import NewIdeaForm from "./NewIdeaForm"; // ✅ Import the new component

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

  const handleAddIdea = (title: string, description: string, videoUrl: string) => {
    const newIdea: PitchIdea = {
      id: pitchIdeas.length + 1,
      title,
      description,
      videoUrl,
    };
    setPitchIdeas([newIdea, ...pitchIdeas]);
  };

  const handleDeleteIdea = (id: number) => {
    setPitchIdeas(pitchIdeas.filter((idea) => idea.id !== id));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", pt: 3, pl: 1, pr: 1  }}>
      {/* Header & New Idea Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <NewIdeaForm onAddIdea={handleAddIdea} /> {/* ✅ Uses the new component */}
      </Box>

      {/* Scrollable Pitch Feed */}
      <Box sx={{ overflowY: "auto", maxHeight: "80vh", padding: 1, justifyContent: "center" }}>
        {pitchIdeas.map((idea) => (
          <Card key={idea.id} sx={{ mb: 2, width:"98%",  backgroundColor: "#ededed"}}>
            <CardContent>
              <Box sx={{ width:"98%", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, pr: 1, pl: 1, borderRadius: "10px" }}>
                <Typography variant="h2">{idea.title}</Typography>
                <IconButton onClick={() => handleDeleteIdea(idea.id)}>
                  <Delete />
                </IconButton>
              </Box>
              <PitchCarousel />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PitchFeed;
