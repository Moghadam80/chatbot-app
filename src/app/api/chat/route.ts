import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY; // Ensure this is set in .env.local
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { userId, message, role } = await req.json();

    if (!userId || !message || !role) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Store the user's message
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }
    conversation.messages.push({ role, text: message, timestamp: new Date() });
    await conversation.save();

    // Send the message to the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const geminiResponse = await response.json();
    const botMessage = geminiResponse.candidates[0].content?.parts[0].text;
    console.log(botMessage, 'sas');


    // Store the bot's response
    conversation.messages.push({ role: "bot", text: botMessage, timestamp: new Date() });
    await conversation.save();

    return NextResponse.json({ message: botMessage });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
