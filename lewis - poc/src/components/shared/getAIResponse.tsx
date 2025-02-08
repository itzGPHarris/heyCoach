// Updated getAIResponse.tsx - AI Coach Now Acknowledges Video Uploads
import React from "react";
import { Message } from "../../types/types";

export const getAIResponse = (
    input: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    //_setIsNewIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>,
   // _jumpToMessage: (query: string) => string | null
  ) => {
  let response: Partial<Message> = {};

  if (input.toLowerCase().includes("video uploaded")) {
    response = { text: "🎥 Thanks! I'm analyzing your video now..." };
  } else {
    response = { text: "I'm not sure how to help with that." };
  }

  setMessages((prev) => [...prev, { id: prev.length + 1, sender: "coach", ...response }]);

  return response;
};

export default getAIResponse;
// Compare this snippet from lewis%20-%20poc/src/components/shared/getAIresponse.tsx: