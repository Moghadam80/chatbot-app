import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { userId, message, role } = await req.json();

    if (!userId || !message || !role) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    let conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    conversation.messages.push({ role, text: message, timestamp: new Date() });
    await conversation.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving conversation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
