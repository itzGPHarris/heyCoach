// Updated on - 2025-02-05, Time: Pacific Time (PT), 14:55

// Fixed AIResponseHandler.tsx - Ensures Proper Export and Usage in FeedView.tsx
import React from "react";
import Competition from "../shared/Competition";
import PitchContainer from "../shared/PitchContainer";
//import NewIdeaForm from "../shared/NewIdeaForm";

interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
}

export const getAIResponse = (
  input: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsNewIdeaOpen: React.Dispatch<React.SetStateAction<boolean>>
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
          title="Radiant Hue - Inclusive Beauty for All!"
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
    setIsNewIdeaOpen(true); // ✅ Fix: Trigger modal from parent state
    return { text: "📝 Opening New Idea Form..." };
  } else if (input.toLowerCase().includes("competition")) {
    return { text: "Here are competitions you can enter:\n1️⃣ Startup Pitch Challenge\n2️⃣ Global Founder’s Summit" };
  } else if (input.toLowerCase().includes("analyze")) {
    return { text: "Analyzing your latest pitch... 📊 AI suggests improving clarity in the introduction." };
  }
  return { text: "I'm not sure how to help with that." };
};

export default getAIResponse;
