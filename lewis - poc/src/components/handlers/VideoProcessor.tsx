/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message } from "../../store/types"; // ✅ Ensure this import is consistent across the project
import { getLastPitchVersion, savePitchVersion } from "../../utils/PitchVersionStorage"; 
import { generateUUID } from '../../utils/uuid';

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
    id: Date.now().toString(), // ✅ Converts UUID to a timestamp-based string
    timestamp,
    transcript: "Transcript placeholder...",
    analysis: "AI analysis placeholder...",
    clarityScore: Math.random() * 100,
    pacingScore: Math.random() * 100,
    engagementScore: Math.random() * 100,
    version: 1, // Add version property
    content: "Video content placeholder..." // Add content property
  };
  if (isVersionUpload) {
    savePitchVersion(newPitch);
    console.log("✅ Saved new pitch version:", newPitch);
  }

// ✅ Step 1: AI Acknowledges the Upload
setMessages((prev) => [
  ...prev,
  {
    id: generateUUID(),
    sender: "coach",
    timestamp: new Date(),
    pitchId: newPitch.id.toString(), // ✅ Ensure pitchId is included
    content: "Thank you! Give me a minute while I analyze your video...",
    text: "Thank you! Give me a minute while I analyze your video...",
    fromAI: true,
  }
]);

// ✅ Step 2: AI Adds the Summary for the First Video (Keep This One!)
if (!isVersionUpload) {
  setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateUUID(),
          sender: "coach",
          parentId: newPitch.id.toString(), // ✅ Associate summary with this video
          timestamp: new Date(),
          quickReplies: ["See Analysis", "Upload New Version", "Get Team Feedback"],
          pitchId: newPitch.id.toString(), // ✅ Ensure pitchId is included
          content: `Here's a quick summary of your video:\nDuration: 2 min 15 sec\nClarity: Well-spoken\nPacing: Slightly rushed\nEngagement: Good energy\n\nWould you like help improving your pitch?`,
          text: `Here's a quick summary of your video:\nDuration: 2 min 15 sec\nClarity: Well-spoken\nPacing: Slightly rushed\nEngagement: Good energy\n\nWould you like help improving your pitch?`,
          fromAI: true,
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
        id: generateUUID(),
        sender: "coach",
        timestamp: new Date(),
        pitchId: newPitch.id.toString(), // ✅ Ensure pitchId is included
        content: "Oh! A new version! Let me compare it to your last pitch...",
        text: "Oh! A new version! Let me compare it to your last pitch...",
        fromAI: true,
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
        id: generateUUID(),
        sender: "coach",
        content: `Here's a quick summary of your updated version.\n\nDuration: 2 min 10 sec\nClarity: ${clarityChange > "0" ? "Improved" : "Needs Work"}\nPacing: ${pacingChange > "0" ? "More Balanced" : "Still Rushed"}\nEngagement: ${engagementChange > "0" ? "More Dynamic" : "Still Needs Energy"}\n\nWould you like to see a breakdown of the differences?`,
        text: `Here's a quick summary of your updated version.\n\nDuration: 2 min 10 sec\nClarity: ${clarityChange > "0" ? "Improved" : "Needs Work"}\nPacing: ${pacingChange > "0" ? "More Balanced" : "Still Rushed"}\nEngagement: ${engagementChange > "0" ? "More Dynamic" : "Still Needs Energy"}\n\nWould you like to see a breakdown of the differences?`,
        parentId: newPitch.id.toString(),
        timestamp: new Date(),
        quickReplies: ["Here's what improved", "Get team feedback", "Enter a competition"],
        pitchId: newPitch.id.toString(),
        fromAI: true // Add this required field
      }
    ]);
  }, 9000);
}

};
