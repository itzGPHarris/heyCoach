import React, { useState } from "react";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import NewIdeaForm from "./NewIdeaForm";
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
    { id: 2, title: "GoldenGlam", description: "Showcasing product features.", videoUrl: "" },
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "600px",
        padding: 1,
        pb: 3,
        mb: 5
      }}
    >
      {/* Competition Section 
      <Competition /> */}

      {/* Header & New Idea Form */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, width: "95%" }}>
        <Typography variant="h5">Your Pitch Ideas</Typography>
        <NewIdeaForm onAddIdea={handleAddIdea} />
      </Box>

      {/* Pitch Ideas */}
      {pitchIdeas.map((idea) => (
        <Card key={idea.id} sx={{ mb: 4, width: "100%", backgroundColor: "#ededed" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
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
  );
};

export default PitchFeed;
