// AIResponseHandler.tsx - Ensures Correct AI Response After Video Upload
import { Dispatch, SetStateAction } from "react";
import { Message } from "../../types/types";

const DELAYS = {
  AI_RESPONSE: 1000,
  AI_ANALYSIS: 4000,
  DETAILED_ANALYSIS: 6000
};

export const handleAIResponse = (
  input: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  pitchId: string // ✅ Add pitchId as a parameter
) => {
  const timestamp = new Date().toLocaleTimeString();

  if (input.toLowerCase().includes("video uploaded")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          id: crypto.randomUUID(), // ✅ Ensures unique ID
          sender: "coach", 
          text: "Thanks! I'm analyzing your video now...",
          timestamp,
          pitchId // ✅ Ensure pitchId is included
        }
      ]);
    }, DELAYS.AI_RESPONSE);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(), // ✅ Ensures unique ID
          sender: "coach",
          text: "📊 Here’s a quick summary:\n\n⏳ Duration: 2 min 15 sec\n🎤 Clarity: Well-spoken, minor background noise\n⚡ Pacing: Slightly rushed in the middle\n👀 Engagement: Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
          timestamp,
          pitchId // ✅ Ensure pitchId is included
        }
      ]);
    }, DELAYS.AI_ANALYSIS);
  } else if (input.toLowerCase().includes("detailed analysis")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(), // ✅ Ensures unique ID
          sender: "coach",
          text: "🔍 **Detailed Analysis:**\n\n✅ Introduction: Strong and confident, great hook\n❗ Middle Section: Pacing too fast, consider adding pauses\n🎭 Body Language: Engaging, but some gestures could be refined\n📢 Projection: Clear voice, slight echo in audio\n\nWould you like to compare this with a previous version of your pitch?",
          timestamp,
          pitchId // ✅ Ensure pitchId is included
        }
      ]);
    }, DELAYS.DETAILED_ANALYSIS);
  }
};

export default handleAIResponse;
