/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/feed/hooks/useFeed.ts
import { useState, useRef, useEffect, useCallback } from 'react';
import useStore from '../../../store';
import { Message } from '../../../store/types';
import { generateUUID } from '../../../utils/uuid';

export const useFeed = () => {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [improvementsDialogOpen, setImprovementsDialogOpen] = useState(false);
  const [teamFeedbackDialogOpen, setTeamFeedbackDialogOpen] = useState(false);
  const [competitionDialogOpen, setCompetitionDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [isVersionUpload, setIsVersionUpload] = useState(false);

  // Mock team feedback data - could be moved to a constant or API
  const [teamFeedback] = useState([
    {
      user: "John",
      comment: "Your ending is strong, but the middle felt rushed.",
      avatarUrl: "/api/placeholder/32/32",
      timestamp: "10:30 AM",
      videoThumbnail: "/api/placeholder/64/64"
    },
    // ... rest of the mock data
  ]);

  const { messages, addMessage } = useStore();

  useEffect(() => {
    const feed = feedRef.current;
    if (feed) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const processUserCommand = useCallback((input: string) => {
    const commandMap: Record<string, () => void> = {
      "see detailed breakdown": () => setDialogOpen(true),
      "see analysis": () => setDialogOpen(true),
      "upload a new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "upload new version": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
      "show specific improvements": () => setImprovementsDialogOpen(true),
      "get team feedback": () => setTeamFeedbackDialogOpen(true),
      "enter a competition": () => setCompetitionDialogOpen(true),
      "new pitch": () => { setIsVersionUpload(true); setMediaDialogOpen(true); },
    };

    if (commandMap[input]) {
      commandMap[input]();
      return;
    }

    // Preserve static AI responses
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
    };
    
    const findAIResponse = (input: string) => {
      const lowerMessage = input.toLowerCase();
      const matchedKeyword = Object.keys(staticResponses).find((keyword) => 
        lowerMessage.includes(keyword)
      );
      
      return matchedKeyword 
        ? staticResponses[matchedKeyword][Math.floor(Math.random() * staticResponses[matchedKeyword].length)] 
        : "That's an interesting point! Could you clarify what you need help with?";
    };

    setTimeout(() => {
      const aiMessage = findAIResponse(input);
      addMessage({
        id: generateUUID(),
        pitchId: "defaultPitchId",
        sender: "coach",
        text: aiMessage,
        timestamp: new Date(),
        content: aiMessage,
        fromAI: true,
      });
    }, 1500);
  }, [addMessage]);

  const handleQuickReply = useCallback((reply: string) => {
    processUserCommand(reply.trim().toLowerCase());
  }, [processUserCommand]);

  const handleUserInput = useCallback((input: string) => {
    addMessage({
      id: generateUUID(),
      pitchId: "defaultPitchId",
      sender: "user",
      text: input,
      timestamp: new Date(),
      content: input,
      fromAI: false
    });

    setTimeout(() => {
      processUserCommand(input.trim().toLowerCase());
    }, 0);
  }, [addMessage, processUserCommand]);

  return {
    feedRef,
    messages,
    teamFeedback,
    dialogs: {
      analysis: { isOpen: dialogOpen, setOpen: setDialogOpen },
      improvements: { isOpen: improvementsDialogOpen, setOpen: setImprovementsDialogOpen },
      teamFeedback: { isOpen: teamFeedbackDialogOpen, setOpen: setTeamFeedbackDialogOpen },
      competition: { isOpen: competitionDialogOpen, setOpen: setCompetitionDialogOpen },
      media: { isOpen: mediaDialogOpen, setOpen: setMediaDialogOpen }
    },
    isVersionUpload,
    setIsVersionUpload,
    handleQuickReply,
    handleUserInput,
    processUserCommand
  };
};