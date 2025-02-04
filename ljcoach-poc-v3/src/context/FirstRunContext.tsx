import React, { createContext, useContext, useState } from 'react';

interface FirstRunContextProps {
  idea: string;
  videoSrc: string | null;
  isPortrait: boolean;
  setIdea: (idea: string) => void;
  setVideoSrc: (videoSrc: string | null) => void;
  setIsPortrait: (isPortrait: boolean) => void;
}

const FirstRunContext = createContext<FirstRunContextProps | undefined>(undefined);

export const FirstRunProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idea, setIdea] = useState('');
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  return (
    <FirstRunContext.Provider value={{ idea, setIdea, videoSrc, setVideoSrc, isPortrait, setIsPortrait }}>
      {children}
    </FirstRunContext.Provider>
  );
};

export const useFirstRun = (): FirstRunContextProps => {
  const context = useContext(FirstRunContext);
  if (!context) {
    throw new Error('useFirstRun must be used within a FirstRunProvider');
  }
  return context;
};
