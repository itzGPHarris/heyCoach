// src/store/slices/messageSlice.ts
import { StateCreator } from 'zustand';
import { Message, ChatMessage } from '../types';

export interface MessageState {
  messages: Message[];
  coachMessages: ChatMessage[];
}

export interface MessageActions {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setCoachMessages: (messages: ChatMessage[]) => void;
  addCoachMessage: (message: ChatMessage) => void;
  getMessagesForPitch: (pitchId: string) => Message[];
}

export type MessageSlice = MessageState & MessageActions;

const createMessageSlice: StateCreator<MessageSlice> = (set, get) => ({
  // Initial state
  messages: [],
  coachMessages: [],

  // Actions
  setMessages: (messages) => set({ messages }),
  
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  
  setCoachMessages: (messages) => set({ coachMessages: messages }),
  
  addCoachMessage: (message) => set((state) => ({ 
    coachMessages: [...state.coachMessages, message] 
  })),

  getMessagesForPitch: (pitchId) => {
    const state = get();
    return state.messages.filter((message) => message.pitchId === pitchId);
  }
});

export default createMessageSlice;