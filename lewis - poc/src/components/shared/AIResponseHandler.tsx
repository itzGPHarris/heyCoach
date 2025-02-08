// AIResponseHandler.tsx - Handles AI Coach Video Analysis & Responses
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
      setMessages((prev: Message[]) => [...prev, { id: prev.length + 1, sender: "coach", text: "🎥 Thanks! I'm analyzing your video now..." }]);
    }, AI_RESPONSE_DELAY);

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: prev.length + 2,
        sender: "coach",
        text: "📊 Here’s a quick summary:\n\n⏳ **Duration:** 2 minutes 15 seconds\n🎤 **Clarity:** Well-spoken, minor background noise\n⚡ **Pacing:** Slightly rushed in the middle\n👀 **Engagement:** Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
      }]);
    }, AI_ANALYSIS_DELAY);
  }
};
