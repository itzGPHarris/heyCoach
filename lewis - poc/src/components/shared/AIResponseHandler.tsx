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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>, // Now properly used
  setIsNewIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>,
  jumpToMessage: (query: string) => string | null 
) => {
  let response;

  if (input.toLowerCase().includes("compete")) {
    response = { component: <Competition /> };
  } else if (input.toLowerCase().includes("last pitch")) {
    response = {
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
    response = {
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
    response = { text: "📝 Opening New Idea Form..." };
  } else if (input.toLowerCase().includes("view competitions")) {
    response = { text: "Here are new competitions you can enter:\n1️⃣ Startup Pitch Challenge\n2️⃣ Global Founder’s Summit" };
  } else if (input.toLowerCase().includes("my competition entries")) {
    response = { text: "Here are the competitions you've entered:\n🏆 Pitch Masters 2025\n🚀 Future Founders Challenge" };
  } else if (input.toLowerCase().includes("find my")) {
    const query = input.replace("find my", "").trim().toLowerCase(); 
    const targetId = jumpToMessage(query);
  
    if (targetId) {
      response = {
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
    } else {
      response = { text: `❌ Sorry, I couldn't find '${query}' in the feed.` };
    }
  } else {
    response = { text: "I'm not sure how to help with that." };
  }

  // Ensure setMessages is used to update the state
  setMessages((prev) => [...prev, { id: prev.length + 1, sender: "coach", ...response }]);

  return response;
};

export default getAIResponse;
