import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

export async function GET(req: Request, context: { params: { userId: string } }) {
  await connectToDatabase();
  try {
    const { userId } = context.params;
    const conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      return NextResponse.json({ messages: [] }); // Return empty if no history found
    }

    return NextResponse.json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
