"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { fetchAPI } from "@/utils/fetchApi";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = "12345"; // Replace with real user ID

  useEffect(() => {
    // Load chat history when the page loads
    const loadMessages = async () => {
      const res = await fetch(`/api/conversations/${userId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    };

    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);
    try {
      const data = await fetchAPI("/api/chat", {
        method: "POST",
        body: { userId, message: input, role: "user" },
      });

      if (data.message) {
        const botMessage: Message = { role: "bot", text: data.message };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("Failed to receive bot message:", data.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
  };

   // Handle "Enter" key press
   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault(); // Prevents newline in the input field
      sendMessage();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AI Chat Support</h1>
      <div className="border rounded px-4 pb-4 h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === "user" ? "text-right my-2" : "text-left"}>
            <span className={`inline-block p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-500">AI is typing...</p>}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
