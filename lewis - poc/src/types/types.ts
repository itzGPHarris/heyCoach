import { ChatMessage } from "../store";

/* types/types.ts */
export interface Message {
  content: string; // ✅ Change 'text' to 'content' to match ChatMessage
  fromAI: boolean; // ✅ Ensure 'fromAI' is a boolean, not a function
  pitchId: string;
  id: string;
  //sender: "user" | "coach";
  sender: string;
  text?: string;
  component?: JSX.Element;
  timestamp: string;
  parentId?: string;
  quickReplies?: string[]; // ✅ Make quickReplies optional
  isFormatted?: boolean; // ✅ Ensure this exists

}

export interface StoreActions {
  setActiveTab: (tab: string) => void;
  toggleAICoach: () => void;
  setCoachMessages: (messages: ChatMessage[]) => void; // ✅ Ensure this is included
}



export interface ChatMessage {
  id: string;
  content: string; // ✅ This is required for AICoach
  timestamp: Date;
  fromAI: boolean; // ✅ Required for AI/user distinction
  sender: 'user' | 'coach' | 'team';

}
