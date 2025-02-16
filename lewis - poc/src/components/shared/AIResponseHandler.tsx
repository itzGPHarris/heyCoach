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
  pitchId: string
) => {
  const timestamp = new Date();

  if (input.toLowerCase().includes("video uploaded")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          id: crypto.randomUUID(),
          sender: "coach",
          content: "Thanks! I'm analyzing your video now...",
          text: "Thanks! I'm analyzing your video now...",
          fromAI: true,
          timestamp: timestamp,
          pitchId,
          quickReplies: ["Get quick analysis", "Wait for detailed breakdown"]
        }
      ]);
    }, DELAYS.AI_RESPONSE);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "coach",
          content: "📊 Here's a quick summary:\n\n⏳ Duration: 2 min 15 sec\n🎤 Clarity: Well-spoken, minor background noise\n⚡ Pacing: Slightly rushed in the middle\n👀 Engagement: Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
          text: "📊 Here's a quick summary:\n\n⏳ Duration: 2 min 15 sec\n🎤 Clarity: Well-spoken, minor background noise\n⚡ Pacing: Slightly rushed in the middle\n👀 Engagement: Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
          fromAI: true,
          timestamp: timestamp,
          pitchId,
          quickReplies: ["See detailed breakdown", "Show specific improvements"]
        }
      ]);
    }, DELAYS.AI_ANALYSIS);
  } else if (input.toLowerCase().includes("detailed analysis")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "coach",
          content: "🔍 **Detailed Analysis:**\n\n✅ Introduction: Strong and confident, great hook\n❗ Middle Section: Pacing too fast, consider adding pauses\n🎭 Body Language: Engaging, but some gestures could be refined\n📢 Projection: Clear voice, slight echo in audio\n\nWould you like to compare this with a previous version of your pitch?",
          text: "🔍 **Detailed Analysis:**\n\n✅ Introduction: Strong and confident, great hook\n❗ Middle Section: Pacing too fast, consider adding pauses\n🎭 Body Language: Engaging, but some gestures could be refined\n📢 Projection: Clear voice, slight echo in audio\n\nWould you like to compare this with a previous version of your pitch?",
          fromAI: true,
          timestamp,
          pitchId,
          quickReplies: ["Compare versions", "Get team feedback", "Upload new version"]
        }
      ]);
    }, DELAYS.DETAILED_ANALYSIS);
  }
};

export default handleAIResponse;