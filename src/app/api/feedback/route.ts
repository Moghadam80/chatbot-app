import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { userId, message, feedback } = await req.json();

    if (!userId || !message || !feedback) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Update the feedback for the specific message in the conversation
    const conversation = await Conversation.findOne({ userId });
    if (conversation) {
      const msgToUpdate = conversation.messages.find((msg: { text: string; role: string }) => msg.text === message && msg.role === "bot");
      if (msgToUpdate) {
        msgToUpdate.feedback = feedback; // Save feedback (thumbs up/down)
        await conversation.save();
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Message not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
