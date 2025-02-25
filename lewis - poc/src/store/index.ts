import { create } from 'zustand';
import createUISlice, { UISlice } from './slices/uiSlice';
import createPitchSlice, { PitchSlice } from './slices/pitchSlice';
import createMessageSlice, { MessageSlice } from './slices/messageSlice';
import createSubmissionSlice, { SubmissionSlice } from './slices/createSubmissionSlice';


export type StoreState = UISlice & PitchSlice & MessageSlice & SubmissionSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createUISlice(...args),
  ...createPitchSlice(...args),
  ...createMessageSlice(...args),
  ...createSubmissionSlice(...args),

}));

export default useStore;