import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Card, CardContent } from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import PitchCarousel from "./PitchCarousel"; // Each idea will have a PitchCarousel

interface PitchIdea {
  id: number;
  title: string;
}

const PitchFeed: React.FC = () => {
  const [pitchIdeas, setPitchIdeas] = useState<PitchIdea[]>([
    { id: 1, title: "Startup Funding Pitch" },
    { id: 2, title: "Product Demo Pitch" },
  ]);

  const handleNewIdea = () => {
    const newIdea: PitchIdea = {
      id: pitchIdeas.length + 1,
      title: `New Idea ${pitchIdeas.length + 1}`,
    };
    setPitchIdeas([...pitchIdeas, newIdea]);
  };

  const handleDeleteIdea = (id: number) => {
    setPitchIdeas(pitchIdeas.filter((idea) => idea.id !== id));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", pt: 3 }}>
      {/* Header & New Idea Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <Button variant="contained" startIcon={<AddCircleOutline />} onClick={handleNewIdea}>
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
    </Box>
  );
};

export default PitchFeed;
