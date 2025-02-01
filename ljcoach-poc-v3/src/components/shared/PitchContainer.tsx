import React, { useState } from "react";
import { Card } from "@mui/material";
import PitchHeader from "./PitchHeader";
import PitchVideo from "./PitchVideo";
import PitchComments from "./PitchComments";
import PitchAnalysis from "./PitchAnalysis";

interface CommentData {
  id: number;
  author: string;
  role: string;
  text: string;
}

interface PitchContainerProps {
  pitchId: number;
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
  onUpdateComments: (newComments: CommentData[]) => void; // ✅ Ensure this exists

}

const PitchContainer: React.FC<PitchContainerProps> = ({
  pitchId,
  title,
  videoUrl,
  score,
  likes,
  lastModified,
  comments
}) => {
  const [localComments, setLocalComments] = useState<CommentData[]>(comments);
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto"); // ✅ Added

  const handleUpdateComments = (newComments: CommentData[]) => {
    setLocalComments(newComments);
  };

  const handleToggleOrientation = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
  };

  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <PitchHeader 
        title={title}
        score={score}
        likes={likes}
        lastModified={lastModified}
        manualOrientation={manualOrientation} // ✅ Pass manual orientation
        onToggleOrientation={handleToggleOrientation} // ✅ Pass toggle function
      />
      <PitchVideo videoUrl={videoUrl} manualOrientation={manualOrientation} /> {/* ✅ Fixed */}
      <PitchAnalysis />
      <PitchComments pitchId={pitchId} comments={localComments} onUpdateComments={handleUpdateComments} />
    </Card>
  );
};

export default PitchContainer;
