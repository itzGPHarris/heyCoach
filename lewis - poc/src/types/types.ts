export interface Message {
  id: number;
  //sender: "user" | "coach";
  sender: string;
  text?: string;
  component?: JSX.Element;
  timestamp: string;
  parentId?: number;
  quickReplies?: string[]; // ✅ Make quickReplies optional
  isFormatted?: boolean; // ✅ Ensure this exists

}


