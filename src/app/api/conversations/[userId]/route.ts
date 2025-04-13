import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

type RouteContext = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  await connectToDatabase();
  try {
    const { params } = context;
    const { userId } = await params;
    const conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
