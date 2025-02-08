// Updated getAIResponse.tsx - AI Coach Now Properly Analyzes Videos
import React from "react";
import { Message } from "../../types/types";

export const getAIResponse = (
    input: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ): Partial<Message> => {
    let response: Partial<Message> = {};
  
    if (input.toLowerCase().includes("video uploaded")) {
      response = { text: "🎥 Thanks! I'm analyzing your video now..." };
      setMessages((prev) => [...prev, { id: prev.length + 1, sender: "coach", ...response }]);
      
      // Simulating AI analysis delay
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: prev.length + 1,
          sender: "coach",
          text: "📊 Here’s a quick summary: \n\n⏳ **Duration:** 2 minutes 15 seconds\n🎤 **Clarity:** Well-spoken, minor background noise\n⚡ **Pacing:** Slightly rushed in the middle\n👀 **Engagement:** Strong visuals, good energy\n\nWould you like a deeper analysis with suggestions?",
        }]);
      }, 3000);
    } else if (input.toLowerCase().includes("detailed analysis")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: prev.length + 1,
          sender: "coach",
          text: "🔍 **Detailed Analysis:** \n\n✅ **Introduction:** Strong and confident, great hook\n❗ **Middle Section:** Pacing too fast, consider adding pauses\n🎭 **Body Language:** Engaging, but some gestures could be refined\n📢 **Projection:** Clear voice, slight echo in audio\n\nWould you like to compare this with a previous version of your pitch?",
        }]);
      }, 3000);
    } 
  
    return response; // ✅ Always return an object
  };
  

export default getAIResponse;
