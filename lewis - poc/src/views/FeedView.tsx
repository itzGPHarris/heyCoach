import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import MessageList from "./MessageList";
import { Message } from "../types/types";
import getAIResponse from "../components/shared/getAIResponse";
import DetailedAnalysisDialog from "../components/shared/DetailedAnalysisDialog";
import ImprovementsDialog from "../components/shared/ImprovementsDialog";
import MediaUploadDialog from "../views/MediaUploadDialog";
import { getLastPitchVersion } from "../utils/PitchVersionStorage";
import VideoUploadHandler from "../components/handlers/VideoUploadHandler"; // ✅ Ensure upload handling works
import emptyStateImage from "../assets/jumper.svg"; // ✅ Add an image

interface FeedViewProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const FeedView: React.FC<FeedViewProps> = ({ messages, setMessages }) => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [improvementsDialogOpen, setImprovementsDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [isVersionUpload, setIsVersionUpload] = useState(false);
  const [improvementsText, setImprovementsText] = useState("");

  /** Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  /** ✅ Handle Quick-Reply Button Clicks */
  const handleQuickReply = async (reply: string) => {
    if (reply === "See Detailed Breakdown") {
      setDialogOpen(true);
      return;
    }

    if (reply === "Upload New Version") {
      setIsVersionUpload(true);
      setMediaDialogOpen(true);
      return;
    }

    if (reply === "Show Specific Improvements") {
      const lastVersion = getLastPitchVersion();

      if (lastVersion) {
        const clarityChange = (Math.random() * 10 - 5).toFixed(1);
        const pacingChange = (Math.random() * 10 - 5).toFixed(1);
        const engagementChange = (Math.random() * 10 - 5).toFixed(1);

        let improvementsSummary = `🔍 Your pitch has been revised! Here’s what changed:\n\n`;
        if (Math.abs(parseFloat(clarityChange)) > 2) {
          improvementsSummary += `- **Clarity:** ${clarityChange > "0" ? "Improved" : "Needs More Work"} by ${Math.abs(parseFloat(clarityChange))}%\n`;
        }
        if (Math.abs(parseFloat(pacingChange)) > 2) {
          improvementsSummary += `- **Pacing:** ${pacingChange > "0" ? "More Balanced" : "Still Rushed"} by ${Math.abs(parseFloat(pacingChange))}%\n`;
        }
        if (Math.abs(parseFloat(engagementChange)) > 2) {
          improvementsSummary += `- **Engagement:** ${engagementChange > "0" ? "More Dynamic" : "Needs More Energy"} by ${Math.abs(parseFloat(engagementChange))}%\n`;
        }

        setImprovementsText(improvementsSummary);
        setImprovementsDialogOpen(true);
      }
      return;
    }

    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: reply, timestamp }]);

    setTimeout(async () => {
      const response: string = await getAIResponse(reply);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "coach", text: response, timestamp: new Date().toLocaleTimeString() }]);
    }, 1500);
  };

  /** ✅ Handle Video Uploads */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload });
    setIsVersionUpload(false); // ✅ Reset after upload
  };

  return (
    <Box ref={feedRef} sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 800, height: "calc(100vh - 56px - 72px)", paddingBottom: "16px" }}>
      
      <img src={emptyStateImage} alt="No messages" style={{ maxWidth: "80%", marginBottom: 16 }} />

      <MessageList messages={messages} onQuickReply={handleQuickReply} />
      <DetailedAnalysisDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <ImprovementsDialog open={improvementsDialogOpen} onClose={() => setImprovementsDialogOpen(false)} improvementsText={improvementsText} />
      <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={handleSendVideo} isVersionUpload={isVersionUpload} />
    </Box>
  );
};

export default FeedView;
