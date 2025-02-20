interface AIResponse {
  text: string;
  quickReplies?: string[];
}

const staticResponses: Record<string, { responses: string[], quickReplies: string[] }> = {
  "confidence": {
    responses: [
      "Confidence comes with practice. Try recording yourself multiple times and reviewing your progress.",
      "A strong stance and clear voice projection can help you appear more confident.",
      "Would you like some specific techniques to build confidence in your delivery?"
    ],
    quickReplies: ["Get feedback", "Upload a video"]
  },
  "filler words": {
    responses: [
      "Minimizing 'uh' and 'you know' makes your pitch sound more polished. Try pausing instead of using fillers.",
      "Recording and reviewing your speech can help you identify and reduce filler words.",
      "Would you like exercises to help eliminate filler words from your speech?"
    ],
    quickReplies: ["Get feedback", "Upload a video"]
  }
};

async function getAIResponse(input: string): Promise<AIResponse> {
  const lowerInput = input.toLowerCase();
  
  // Check for video upload cases first
  if (lowerInput.includes("video uploaded")) {
    return {
      text: "I'm analyzing your video...",
      quickReplies: ["Get quick analysis", "See detailed breakdown"]
    };
  }

  if (lowerInput.includes("quick analysis")) {
    return {
      text: "Here's a quick summary of your video.\n\n⏳ **Duration:** 2 min 15 sec\n🎤 **Clarity:** Well-spoken\n⚡ **Pacing:** Slightly rushed\n👀 **Engagement:** Good energy\n\nWould you like to see more details?",
      quickReplies: ["See detailed breakdown", "Show specific improvements"]
    };
  }

  if (lowerInput.includes("detailed analysis prompt")) {
    return {
      text: "Would you like a **detailed breakdown** of pacing, engagement, and clarity?",
      quickReplies: ["See detailed breakdown", "Get team feedback"]
    };
  }

  // Check for static responses
  const matchedKeyword = Object.keys(staticResponses).find(keyword => 
    lowerInput.includes(keyword)
  );
  
  if (matchedKeyword) {
    const responseSet = staticResponses[matchedKeyword];
    return {
      text: responseSet.responses[Math.floor(Math.random() * responseSet.responses.length)],
      quickReplies: responseSet.quickReplies
    };
  }

  // For all other cases, return just the text without quick replies
  return {
    text: `I understand you're asking about "${input}". Could you clarify what specific aspect you'd like help with?`
  };
}

export default getAIResponse;
