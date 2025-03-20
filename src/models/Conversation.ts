import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface IConversation extends Document {
  userId: string;
  messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new Schema<IConversation>({
  userId: { type: String, required: true },
  messages: [MessageSchema],
});

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema); 