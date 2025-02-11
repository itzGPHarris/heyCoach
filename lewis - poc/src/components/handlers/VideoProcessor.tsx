/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message } from "../../types/types";
import { getLastPitchVersion, savePitchVersion } from "../../utils/PitchVersionStorage"; 

export const processVideoUpload = (
  _fileUrl: string,
  _isPortrait: boolean,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  isVersionUpload: boolean
) => {
  const timestamp = new Date().toLocaleTimeString();
  const lastVersion = getLastPitchVersion();

  // ✅ Define new pitch version data
  const newPitch = {
    id: Date.now(),
    timestamp,
    transcript: "Transcript placeholder...",
    analysis: "AI analysis placeholder...",
    clarityScore: Math.random() * 100,
    pacingScore: Math.random() * 100,
    engagementScore: Math.random() * 100,
  };

  if (isVersionUpload) {
    savePitchVersion(newPitch);
    console.log("✅ Saved new pitch version:", newPitch);
  }

  // ✅ Step 1: AI Acknowledges the Upload
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender: "coach",
      text: "🎥 Got it! I'm analyzing your video...",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);

  // ✅ Step 2: AI Adds the Summary for the First Video (Keep This One!)
  if (!isVersionUpload) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "coach",
          text: `📊 Here's a quick summary of your video.\n\n⏳ **Duration:** 2 min 15 sec\n🎤 **Clarity:** Well-spoken ⚡\n**Pacing:** Slightly rushed 👀\n**Engagement:** Good energy\n\nWould you like a deeper analysis?`,
          parentId: newPitch.id, // ✅ Associate summary with this video
          timestamp: new Date().toLocaleTimeString(),
          quickReplies: ["See Detailed Breakdown", "Skip to Next Step", "Give Me One Quick Tip", "Upload New Version"],
        }
      ]);
    }, 4500);
  }

  // ✅ Step 3: If "Upload New Version" Was Used, Add a Separate Summary for the New Version
  if (isVersionUpload && lastVersion) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "coach",
          text: "🔄 Looks like you've uploaded a new version! Let me compare it to your last pitch...",
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);
    }, 7000);

    // ✅ Step 4: Add a New Summary for the Second Version Instead of Replacing the First
    setTimeout(() => {
      const clarityChange = (Math.random() * 10 - 5).toFixed(1);
      const pacingChange = (Math.random() * 10 - 5).toFixed(1);
      const engagementChange = (Math.random() * 10 - 5).toFixed(1);

      let changesSummary = "";
      if (Math.abs(parseFloat(clarityChange)) > 2) {
        changesSummary += `- **Clarity:** ${clarityChange > "0" ? "Improved" : "Declined"} by ${Math.abs(parseFloat(clarityChange))}%\n`;
      }
      if (Math.abs(parseFloat(pacingChange)) > 2) {
        changesSummary += `- **Pacing:** ${pacingChange > "0" ? "Improved" : "Declined"} by ${Math.abs(parseFloat(pacingChange))}%\n`;
      }
      if (Math.abs(parseFloat(engagementChange)) > 2) {
        changesSummary += `- **Engagement:** ${engagementChange > "0" ? "Improved" : "Declined"} by ${Math.abs(parseFloat(engagementChange))}%\n`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "coach",
          text: `📊 Here's a quick summary of your updated version.\n\n⏳ **Duration:** 2 min 10 sec\n🎤 **Clarity:** ${clarityChange > "0" ? "Improved" : "Needs Work"}\n⚡ **Pacing:** ${pacingChange > "0" ? "More Balanced" : "Still Rushed"}\n👀 **Engagement:** ${engagementChange > "0" ? "More Dynamic" : "Still Needs Energy"}\n\nWould you like to see a breakdown of the differences?`,
          parentId: newPitch.id, // ✅ Associate with the second video
          timestamp: new Date().toLocaleTimeString(),
          quickReplies: ["Show Specific Improvements", "Skip Comparison"],
        }
      ]);
    }, 9000);
  }
};
