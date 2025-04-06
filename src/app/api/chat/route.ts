import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Conversation from "@/models/Conversation";
import products from "@/data/products.json";


const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { userId, message } = await req.json();
    if (!userId || !message) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    // Filter relevant products by keyword match
    const keywords = message.toLowerCase().split(' ');
    const matchedProducts = products.filter(product =>
      keywords.some((keyword: string) => 
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
      )
    ).slice(0, 3); // Limit to top 3 matches

    const productContext = matchedProducts
      .map(p => `Product: ${p.name}\nPrice: $${p.price}\nDescription: ${p.description}`)
      .join("\n\n");

    const systemMessage = `You are an AI assistant for an eCommerce store. Based on the product data below, answer the customer's question accurately and helpfully.\n\nProduct Catalog:\n${productContext}`;

    const lastMessages = [
      systemMessage,
      ...conversation.messages.slice(-10).map((msg: { text: string }) => msg.text),
      message
    ];

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: lastMessages.map(text => ({ text })) }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to generate AI response");

    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure about that.";

    conversation.messages.push(
      { role: "user", text: message, timestamp: new Date() },
      { role: "bot", text: aiMessage, timestamp: new Date() }
    );
    await conversation.save();

    return NextResponse.json({ 
      message: aiMessage,
      products: matchedProducts
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
