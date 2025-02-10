async function getAIResponse(input: string): Promise<string> {
  if (input.toLowerCase().includes("video uploaded")) {
    return "🎥 Got it! I'm analyzing your video...";
  }

  if (input.toLowerCase().includes("quick analysis")) {
    return "📊 Here's a quick summary of your video.\n\n⏳ **Duration:** 2 min 15 sec\n🎤 **Clarity:** Well-spoken\n⚡ **Pacing:** Slightly rushed\n👀 **Engagement:** Good energy\n\nWould you like to see more details?";
  }

  if (input.toLowerCase().includes("detailed analysis prompt")) {
    return "🔍 Would you like a **detailed breakdown** of pacing, engagement, and clarity?";
  }

  return `🤖 AI Coach: Here’s my feedback on "${input}"...`;
}

export default getAIResponse;
