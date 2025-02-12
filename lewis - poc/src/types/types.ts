export interface Message {
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


