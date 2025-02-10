// AIResponseHandler.tsx - Ensures Correct AI Response After Video Upload
import { Dispatch, SetStateAction } from "react";
import { Message } from "../../types/types";

const AI_RESPONSE_DELAY = 1000;
const AI_ANALYSIS_DELAY = 4000;

export const handleAIResponse = (
  input: string,
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  if (input.toLowerCase().includes("video uploaded")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          id: prev.length + 1, 
          sender: "coach", 
          text: "Thanks! I'm analyzing your video now...",
          timestamp: new Date().toLocaleTimeString() // ✅ Fix: Add timestamp
        }
      ]);
    }, AI_RESPONSE_DELAY);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          sender: "coach",
          text: "📊 **Here’s a quick summary:**\n\n⏳ **Duration:** 2 minutes 15 seconds\n🎤 **Clarity:** Well-spoken, minor background noise\n⚡ **Pacing:** Slightly rushed in the middle\n👀 **Engagement:** Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
          timestamp: new Date().toLocaleTimeString() // ✅ Fix: Add timestamp
        }
      ]);
    }, AI_ANALYSIS_DELAY);
  } else if (input.toLowerCase().includes("detailed analysis")) {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 3,
          sender: "coach",
          text: "🔍 **Detailed Analysis:**\n\n✅ **Introduction:** Strong and confident, great hook\n❗ **Middle Section:** Pacing too fast, consider adding pauses\n🎭 **Body Language:** Engaging, but some gestures could be refined\n📢 **Projection:** Clear voice, slight echo in audio\n\nWould you like to compare this with a previous version of your pitch?",
          timestamp: new Date().toLocaleTimeString() // ✅ Fix: Add timestamp
        }
      ]);
    }, AI_ANALYSIS_DELAY + 2000);
  }
};

export default handleAIResponse;
