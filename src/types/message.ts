export interface Message {
    role: "user" | "bot";
    text: string;
    feedback?: "up" | "down";
    products?: any[];
  }