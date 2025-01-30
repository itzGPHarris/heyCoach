// src/components/AICoach/useMessages.ts
import { useState } from 'react';
import useStore from '../../store';

export const useMessages = (pitchId: string | null) => {
  const [isTyping, setIsTyping] = useState(false);
  const { addMessage, getMessagesForPitch } = useStore();

  const simulateAIResponse = async () => {
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      "Let's focus on improving your pitch clarity. Try emphasizing your key value proposition more.",
      "I noticed your pace was a bit quick. Consider slowing down during the main points.",
      "Great energy! To enhance engagement, try incorporating a brief customer story.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    addMessage({
      id: `${Date.now()}`,
      text: randomResponse,
      sender: 'ai',
      content: randomResponse,
      fromAI: true,
      timestamp: new Date().toISOString(),
      pitchId: pitchId || ''
    });
    
    setIsTyping(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    addMessage({
      id: `${Date.now()}`,
      text: content,
      sender: 'user',
      content,
      fromAI: false,
      timestamp: new Date().toISOString(),
      pitchId: pitchId || ''
    });

    await simulateAIResponse();
  };

  return {
    messages: pitchId ? getMessagesForPitch(pitchId) : [],
    sendMessage,
    isTyping
  };
};