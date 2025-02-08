export interface Message {
    id: number;
    sender: "user" | "coach";
    text?: string;
    component?: JSX.Element;
    expandedComponent?: JSX.Element | null;
    timestamp?: string;
  }
  