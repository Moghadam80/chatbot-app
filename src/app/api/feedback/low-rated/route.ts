import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

export async function GET() {
  await connectToDatabase();
  try {
    // Find bot messages with "down" feedback
    const lowRatedMessages = await Conversation.aggregate([
      { $unwind: "$messages" }, // Unwind the messages array
      { $match: { "messages.role": "bot", "messages.feedback": "down" } }, // Filter bot messages with "down" feedback
      { $project: { _id: 0, "messages.text": 1 } }, // Return only the message text
    ]);

    return NextResponse.json({ lowRatedMessages });
  } catch (error) {
    console.error("Error fetching low-rated responses:", error);
    return NextResponse.json({ error: "Failed to fetch low-rated responses" }, { status: 500 });
  }
}
