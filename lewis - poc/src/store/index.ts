import { create } from 'zustand';
import createUISlice, { UISlice } from './slices/uiSlice';
import createPitchSlice, { PitchSlice } from './slices/pitchSlice';
import createMessageSlice, { MessageSlice } from './slices/messageSlice';

export type StoreState = UISlice & PitchSlice & MessageSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createUISlice(...args),
  ...createPitchSlice(...args),
  ...createMessageSlice(...args),
}));

export default useStore;