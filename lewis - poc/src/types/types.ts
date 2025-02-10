export interface Message {
  id: number;
  sender: "user" | "coach";
  text?: string;
  component?: JSX.Element;
  timestamp: string;
  parentId?: number;
  quickReplies?: string[]; // ✅ Make quickReplies optional
}
