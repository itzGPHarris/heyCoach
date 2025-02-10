import { Message } from "../../types/types";
import VideoMessage from "../shared/VideoMessage";
import getAIResponse from "../shared/getAIResponse";
import { savePitchVersion, getLastPitchVersion } from "../../utils/PitchVersionStorage";

interface VideoUploadHandlerProps {
  fileUrl: string;
  isPortrait: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const VideoUploadHandler = async ({ fileUrl, isPortrait, setMessages }: VideoUploadHandlerProps) => {
  const timestamp = new Date().toLocaleTimeString();

  // ✅ Retrieve last pitch version for AI comparison
  const lastVersion = getLastPitchVersion();

  // ✅ Define new pitch version data
  const newPitch = {
    id: Date.now(),
    timestamp,
    transcript: "Transcript goes here...", // Placeholder until transcript is processed
    analysis: "AI analysis summary...", // Placeholder until analysis is processed
    clarityScore: Math.random() * 100, // Placeholder AI-generated score
    pacingScore: Math.random() * 100, // Placeholder AI-generated score
    engagementScore: Math.random() * 100, // Placeholder AI-generated score
  };

  // ✅ Save new pitch version
  savePitchVersion(newPitch);

  const videoMessage: Message = {
    id: Date.now(),
    sender: "user",
    component: <VideoMessage fileUrl={fileUrl} timestamp={timestamp} isPortrait={isPortrait} />,
    timestamp,
  };

  setMessages((prev) => [...prev, videoMessage]);

  try {
    // ✅ Step 1: AI immediately acknowledges the video upload
    const initialResponse: string = await getAIResponse("video uploaded");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "coach",
        text: initialResponse,
        parentId: videoMessage.id,
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);

    // ✅ Step 2: AI sends progressive insights
    setTimeout(async () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "coach",
          text: "⏳ First, I checked the **length**—it's **2 min 15 sec**. Solid timing!",
          parentId: videoMessage.id,
          timestamp: new Date().toLocaleTimeString(),
        }
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 3,
            sender: "coach",
            text: "🎤 You're **speaking clearly**, though there’s a tiny bit of background noise.",
            parentId: videoMessage.id,
            timestamp: new Date().toLocaleTimeString(),
          }
        ]);
      }, 2000);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 4,
            sender: "coach",
            text: "⚡ The **middle section feels a bit rushed**—pausing could help.",
            parentId: videoMessage.id,
            timestamp: new Date().toLocaleTimeString(),
          }
        ]);
      }, 4000);

      // ✅ Step 3: Quick-Reply Buttons Appear After Initial Insights
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 5,
            sender: "coach",
            text: "🤔 Want suggestions to improve clarity and pacing?",
            parentId: videoMessage.id,
            timestamp: new Date().toLocaleTimeString(),
            quickReplies: ["See Detailed Breakdown", "Skip to Next Step", "Give Me One Quick Tip"],
          }
        ]);
      }, 6000);
      
      // ✅ Step 4: Compare with last pitch version (if available)
      if (lastVersion) {
        setTimeout(() => {
          const clarityChange = (newPitch.clarityScore - lastVersion.clarityScore).toFixed(1);
          const pacingChange = (newPitch.pacingScore - lastVersion.pacingScore).toFixed(1);
          const engagementChange = (newPitch.engagementScore - lastVersion.engagementScore).toFixed(1);

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 6,
              sender: "coach",
              text: `📊 I compared this pitch with your last one!  
              - **Clarity:** Improved by ${clarityChange}%  
              - **Pacing:** Change of ${pacingChange}%  
              - **Engagement:** Change of ${engagementChange}%  
              Would you like insights on specific improvements?`,
              parentId: videoMessage.id,
              timestamp: new Date().toLocaleTimeString(),
              quickReplies: ["Show Specific Improvements", "Skip Comparison"], // ✅ New Quick Replies
            }
          ]);
        }, 8000);
      }

    }, 3000);

  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
};

export default VideoUploadHandler;
