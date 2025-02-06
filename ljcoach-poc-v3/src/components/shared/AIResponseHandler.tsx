// Updated on - 2025-02-05, Time: Pacific Time (PT), 16:15

// Updated AIResponseHandler.tsx - Fixes Jump-to-Message Targeting for Pitch Cards
import React from "react";
import Competition from "../shared/Competition";
import PitchContainer from "../shared/PitchContainer";

interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
}

export const getAIResponse = (
  input: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsNewIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>,
  jumpToMessage: (query: string) => string | null 
) => {
  if (input.toLowerCase().includes("compete")) {
    return { component: <Competition /> };
  } else if (input.toLowerCase().includes("last pitch")) {
    return {
      component: (
        <PitchContainer
          pitchId={1}
          title="Sustainable Solutions for a Better Tomorrow"
          description="A pitch focusing on eco-friendly innovations to drive a greener future."
          videoUrl="sample_video_url"
          score={85}
          likes={120}
          lastModified="Feb 4, 2025"
          comments={[]}
          isPortrait={false}
        />
      ),
    };
  } else if (input.toLowerCase().includes("favorite pitch")) {
    return {
      component: (
        <PitchContainer
          pitchId={2}
          title="RadiantHue - Inclusive Beauty for All!"
          description="A pitch dedicated to inclusive and sustainable beauty solutions."
          videoUrl="favorite_pitch_video_url"
          score={92}
          likes={210}
          lastModified="Feb 5, 2025"
          comments={[]}
          isPortrait={false}
        />
      ),
    };
  } else if (input.toLowerCase().includes("new pitch")) {
    setIsNewIdeaOpen(true);
    return { text: "📝 Opening New Idea Form..." };
  } else if (input.toLowerCase().includes("view competitions")) {
    return { text: "Here are new competitions you can enter:\n1️⃣ Startup Pitch Challenge\n2️⃣ Global Founder’s Summit" };
  } else if (input.toLowerCase().includes("my competition entries")) {
    return { text: "Here are the competitions you've entered:\n🏆 Pitch Masters 2025\n🚀 Future Founders Challenge" };
  } else if (input.toLowerCase().includes("find my")) {
    const query = input.replace("find my", "").trim().toLowerCase(); 
    const targetId = jumpToMessage(query);
  
    if (targetId) {
      return {
        component: (
          <span>
            🔎 I found your '{query}'.{" "}
            <button
              onClick={() => {
                setTimeout(() => {
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }, 500);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#0090F2",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "inherit",
                fontWeight: "bold",
              }}
            >
              Click here to view
            </button>
          </span>
        ),
      };
    }
    return { text: `❌ Sorry, I couldn't find '${query}' in the feed.` };
  }
  
  return { text: "I'm not sure how to help with that." };
};

export default getAIResponse;
