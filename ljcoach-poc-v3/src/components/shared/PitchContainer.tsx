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
  pitchId: number; // ✅ Ensures `pitchId` is defined
  title: string;
  description: string;
  videoUrl: string;
  score: number;
  likes: number;
  lastModified: string;
  comments: CommentData[];
  onUpdateComments: (newComments: CommentData[]) => void;
}

const PitchContainer: React.FC<PitchContainerProps> = ({
  pitchId,
  title,
  description,
  videoUrl,
  score,
  likes,
  lastModified,
  comments,
  onUpdateComments
}) => {
  const [manualOrientation, setManualOrientation] = useState<"auto" | "portrait" | "landscape">("auto");

  const handleSwitchChange = () => {
    setManualOrientation(manualOrientation === "auto" ? "portrait" : "auto");
  };

  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <PitchHeader
        title={title}
        score={score}
        likes={likes}
        lastModified={lastModified}
        manualOrientation={manualOrientation}
        onToggleOrientation={handleSwitchChange}
      />

      <PitchVideo videoUrl={videoUrl} manualOrientation={manualOrientation} />

      <PitchAnalysis />

      {/* ✅ Now correctly passing pitchId */}
      <PitchComments pitchId={pitchId} comments={comments} onUpdateComments={onUpdateComments} />
    </Card>
  );
};

export default PitchContainer;
