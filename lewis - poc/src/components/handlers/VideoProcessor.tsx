// src/components/handlers/VideoProcessor.tsx
//import { useStore } from "../../store";
import { Message } from "../../store/types";
import { getLastPitchVersion, savePitchVersion } from "../../utils/PitchVersionStorage";
import { generateUUID } from '../../utils/uuid';

export const processVideoUpload = (
  fileUrl: string,
  isPortrait: boolean,
  addMessage: (message: Message) => void,
  isVersionUpload: boolean
) => {
  console.log("🎭 VideoProcessor - Processing video:", { fileUrl, isPortrait });
  const timestamp = new Date().toLocaleTimeString();
  const lastVersion = getLastPitchVersion();
  const newPitchId = Date.now().toString();


  // Handle new pitch version
  const newPitch = {
    id: newPitchId,
    timestamp,
    transcript: "Transcript placeholder...",
    analysis: "AI analysis placeholder...",
    clarityScore: Math.random() * 100,
    pacingScore: Math.random() * 100,
    engagementScore: Math.random() * 100,
    version: 1,
    content: "Video content placeholder...",
    name: "Pitch Name Placeholder",
    date: new Date().toISOString()
  };

  if (isVersionUpload) {
    savePitchVersion(newPitch);
  }

  // Initial acknowledgment
  addMessage({
    id: generateUUID(),
    sender: "coach",
    timestamp: new Date(),
    pitchId: newPitchId,
    content: "Thank you! Give me a minute while I analyze your video...",
    text: "Thank you! Give me a minute while I analyze your video...",
    fromAI: true,
  });

  // Add analysis for first video
  if (!isVersionUpload) {
    setTimeout(() => {
      addMessage({
        id: generateUUID(),
        sender: "coach",
        parentId: newPitchId,
        timestamp: new Date(),
        quickReplies: ["See Analysis", "Upload New Version", "Get Team Feedback"],
        pitchId: newPitchId,
        content: `Here's a quick summary of your video:\nDuration: 2 min 15 sec\nClarity: Well-spoken\nPacing: Slightly rushed\nEngagement: Good energy\n\nWould you like help improving your pitch?`,
        text: `Here's a quick summary of your video:\nDuration: 2 min 15 sec\nClarity: Well-spoken\nPacing: Slightly rushed\nEngagement: Good energy\n\nWould you like help improving your pitch?`,
        fromAI: true,
      });
    }, 4500);
  }

  // Add comparison for version upload
  if (isVersionUpload && lastVersion) {
    setTimeout(() => {
      addMessage({
        id: generateUUID(),
        sender: "coach",
        timestamp: new Date(),
        pitchId: newPitchId,
        content: "Oh! A new version! Let me compare it to your last pitch...",
        text: "Oh! A new version! Let me compare it to your last pitch...",
        fromAI: true,
      });
    }, 7000);

    setTimeout(() => {
      const changes = generateChangeMetrics();
      addMessage({
        id: generateUUID(),
        sender: "coach",
        content: generateComparisonMessage(changes),
        text: generateComparisonMessage(changes),
        parentId: newPitchId,
        timestamp: new Date(),
        quickReplies: ["Here's what improved", "Get team feedback", "Enter a competition"],
        pitchId: newPitchId,
        fromAI: true
      });
    }, 9000);
  }
};

function generateChangeMetrics() {
  return {
    clarity: (Math.random() * 10 - 5).toFixed(1),
    pacing: (Math.random() * 10 - 5).toFixed(1),
    engagement: (Math.random() * 10 - 5).toFixed(1)
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateComparisonMessage(changes: any) {
  return `Here's a quick summary of your updated version.\n\n` +
    `Duration: 2 min 10 sec\n` +
    `Clarity: ${changes.clarity > 0 ? "Improved" : "Needs Work"}\n` +
    `Pacing: ${changes.pacing > 0 ? "More Balanced" : "Still Rushed"}\n` +
    `Engagement: ${changes.engagement > 0 ? "More Dynamic" : "Still Needs Energy"}\n\n` +
    `Would you like to see a breakdown of the differences?`;
}