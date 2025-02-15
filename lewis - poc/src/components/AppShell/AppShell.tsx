/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "../../styles/theme";
import useStore from "../../store";
import FeedView from "../../views/FeedView";
import DashboardView from "../../views/DashboardView";
import ProfileView from "../../views/ProfileView";
import ChatInput from "../../components/shared/ChatInput";
import getAIResponse from '../../components/shared/getAIResponse';
import { Message } from "../../types/types";
import VideoUploadHandler from "../../components/handlers/VideoUploadHandler";
import AppHeader from "../../components/shared/AppHeader";
import MediaUploadDialog from "../../views/MediaUploadDialog";
import SettingsDialog from "../../views/SettingsDialog";

function AppShell() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const store = useStore();

  // ✅ Manage state for modals
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

  const notifications = store.notifications || [];

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /** ✅ Handles user text messages */
  const handleSendMessage = async (input: string) => {
    const timestamp = new Date();
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: input,
      timestamp,
      pitchId: "",
      content: input,
      fromAI: false
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const staticResponses: Record<string, string[]> = {
        "confidence": [
    "Confidence comes with practice. Try recording yourself multiple times and reviewing your progress.",
    "A strong stance and clear voice projection can help you appear more confident.",
    "Would you like some specific techniques to build confidence in your delivery?"
  ],
  "filler words": [
    "Minimizing 'uh' and 'you know' makes your pitch sound more polished. Try pausing instead of using fillers.",
    "Recording and reviewing your speech can help you identify and reduce filler words.",
    "Would you like exercises to help eliminate filler words from your speech?"
  ],
  "engagement": [
    "Engage your audience by asking a question early on to create a connection.",
    "Using storytelling techniques can make your pitch more relatable and engaging.",
    "Would you like examples of strong engagement techniques?"
  ],
  "pacing": [
    "Your pacing should be natural—aim for about 150 words per minute to stay clear and engaging.",
    "Practice with a metronome or timed speech exercises to improve pacing consistency.",
    "Would you like to try an exercise to improve your pacing?"
  ],
  "eye contact": [
    "Try looking directly at the camera to establish a stronger connection with your audience.",
    "Avoid darting your eyes around—focus on keeping your gaze steady and intentional.",
    "Would you like tips on how to maintain natural eye contact?"
  ],
  "tone": [
    "A varied tone helps keep your audience interested. Avoid monotone delivery by emphasizing key words.",
    "Practice shifting your tone to highlight important points and create emphasis.",
    "Would you like exercises to improve your vocal tone variety?"
  ],
  "help": [
    "I'm here to help! What aspect of your pitch or preparation are you struggling with?",
    "Help is on the way! Are you looking for feedback, research guidance, or general tips?",
    "I can assist with structuring your pitch, refining your message, or organizing your ideas. Where should we start?"
  ],
  "research": [
    "Researching similar ideas can help refine your pitch. Have you looked at competitors or case studies?",
    "Gathering financial data is key. Check industry reports, investor insights, and startup benchmarks.",
    "Market opportunity is crucial. Have you identified your target audience and demand trends?"
  ],
  "what am i missing": [
    "Great question! Have you considered customer pain points, unique value propositions, or market positioning?",
    "Sometimes we miss small details that make a big impact. Would you like a checklist of key pitch elements?",
    "Are you addressing potential investor concerns like scalability, revenue model, or competitive advantage?"
  ],
  "get started": [
    "The first step is defining your core idea. Can you describe your pitch in one sentence?",
    "Start simple: Define your problem, solution, and audience. From there, we can refine your message.",
    "Would you like a step-by-step guide to structuring your pitch?"
  ],
  "get organized": [
    "Organization is key! Have you outlined your pitch structure or created a presentation roadmap?",
    "Consider using a simple framework: Problem, Solution, Market, Competition, and Call to Action.",
    "I can help you organize your thoughts into a structured and compelling pitch. Let’s start with your key message."
  ],
  "competitive advantage": [
    "A strong competitive advantage comes from differentiating factors like unique technology, exclusive partnerships, or cost leadership. Do you want help identifying yours?",
    "Sustainable competitive advantages often rely on intellectual property, brand strength, or network effects. Would you like to explore how to strengthen yours?"
  ],
  "message": [
    "Your message should be clear, concise, and memorable. Do you want help refining your key takeaway?",
    "The best messages resonate emotionally and logically with your audience. Would you like examples of effective messaging strategies?"
  ],
  "market positioning": [
    "Market positioning is about how your brand is perceived compared to competitors. Would you like to analyze your positioning strategy?",
    "Effective positioning requires identifying a unique niche or under-served segment. Want help defining yours?"
  ],
  "trends": [
    "Tracking industry trends helps anticipate changes in customer needs. Would you like insights into emerging trends in your field?",
    "Adapting to trends early can give you a competitive edge. Would you like strategies to leverage key trends?"
  ],
  "competitors": [
    "Understanding competitors’ strengths and weaknesses helps refine your strategy. Want help conducting a competitive analysis?",
    "Staying ahead requires differentiating from competitors. Would you like help identifying ways to stand out?"
  ],
  "framework": [
    "Frameworks like the Lean Canvas, SWOT Analysis, or Business Model Canvas can help structure your strategy. Want guidance on selecting the best one?",
    "Using a proven framework can streamline decision-making. Would you like an example of how to apply one to your business?"
  ]
      };
      
      const findAIResponse = (input: string) => {
        const lowerMessage = input.toLowerCase();
        const matchedKeyword = Object.keys(staticResponses).find((keyword) => lowerMessage.includes(keyword));
        return matchedKeyword 
          ? staticResponses[matchedKeyword][Math.floor(Math.random() * staticResponses[matchedKeyword].length)] 
          : "That's an interesting point! Could you clarify what you need help with?";
      };
      
      const handleSendMessage = async (input: string) => {
        const timestamp = new Date();
        const newUserMessage: Message = {
          id: crypto.randomUUID(),
          sender: "user",
          text: input,
          timestamp,
          pitchId: "",
          content: input,
          fromAI: false
        };
      
        setMessages((prev) => [...prev, newUserMessage]);
      
        setTimeout(() => {
          const aiMessage: Message = {
            id: crypto.randomUUID(),
            sender: "coach",
            text: findAIResponse(input),
            parentId: newUserMessage.id,
            timestamp: new Date(),
            pitchId: "",
            content: "",
            fromAI: true
          };
          setMessages((prev) => [...prev, aiMessage]);
        }, 1500);
      };
            const aiMessage: Message = {
        id: crypto.randomUUID(),
        sender: "coach",
        text: findAIResponse(input),
        parentId: newUserMessage.id,
        timestamp: new Date(),
        pitchId: "",
        content: "",
        fromAI: false
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  /** ✅ Handles video uploads using VideoUploadHandler */
  const handleSendVideo = (fileUrl: string, isPortrait: boolean) => {
    VideoUploadHandler({ fileUrl, isPortrait, setMessages, isVersionUpload: false });
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* ✅ Use AppHeader with modal controls */}
        <AppHeader 
          setDashboardOpen={setDashboardOpen} 
          setProfileOpen={setProfileOpen} 
          setSettingsOpen={setSettingsOpen} 
          anchorEl={anchorEl} 
          handleProfileClick={handleProfileClick} 
          handleMenuClose={handleMenuClose} 
        />

        <Box sx={{ flexGrow: 1, overflow: "hidden", backgroundColor: "background.default", position: "relative", display: "flex", flexDirection: "column", marginTop: "56px", paddingBottom: "70px" }}>
          <FeedView messages={messages} setMessages={setMessages} />
        </Box>

        {/* ✅ Dialog Modals */}
        <DashboardView open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
        <ProfileView open={profileOpen} onClose={() => setProfileOpen(false)} />
        <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} /> 
        <MediaUploadDialog open={mediaDialogOpen} onClose={() => setMediaDialogOpen(false)} onSendVideo={handleSendVideo} isVersionUpload={false} />
        {/* ✅ Fixed Chat Input Always Above Content */}
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "white", zIndex: 10, boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)" }}>
          <ChatInput
            onSendMessage={handleSendMessage}
            onOpenMediaDialog={() => setMediaDialogOpen(true)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppShell;
