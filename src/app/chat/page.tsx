"use client";

import { useState, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const userId = "12345"; // Replace with actual user ID from auth system

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

    // Send message to API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, message: input, role: "user" }),
    });

    const data = await response.json();

    if (data.message) {
      const botMessage: Message = { role: "bot", text: data.message };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      console.error("Failed to receive bot message:", data.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Chat Support</h1>
      <div className="border rounded px-4 pb-4 h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === "user" ? "text-right my-2" : "text-left"}>
            <span className={`inline-block p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
        />
        <button type="submit" onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
