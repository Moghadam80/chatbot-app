import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { userId, message } = await req.json();
    if (!userId || !message) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Fetch last 5 messages from the database for context
    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    const systemMessage = "You are a professional AI assistant for an eCommerce website. Answer questions about products, orders, and support accurately.";

    // Prepare the message context (only text, no role)
    const lastMessages = [
      systemMessage, // Include system message first
      ...conversation.messages.slice(-20).map((msg: { text: string }) => msg.text), // Extract text only
      message, // Include latest user message
    ];

    // Send conversation history as plain text to Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: lastMessages.map((text) => ({ text })) }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate AI response");
    }

    // Extract AI-generated response text
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure about that.";

    // Store user and AI messages in MongoDB
    conversation.messages.push(
      { role: "user", text: message, timestamp: new Date() },
      { role: "bot", text: aiMessage, timestamp: new Date() }
    );
    await conversation.save();

    return NextResponse.json({ message: aiMessage });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
