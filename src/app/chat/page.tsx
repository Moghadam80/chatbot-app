"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { fetchAPI } from "@/utils/fetchApi";
import { useSession, signIn, signOut } from "next-auth/react";

interface Message {
  role: "user" | "bot";
  text: string;
  feedback?: "up" | "down"; // Track thumbs up/down feedback
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = session?.user?.id || "guest";

  useEffect(() => {
    const loadMessages = async () => {
      if (status === "authenticated") {
        const data = await fetchAPI(`/api/conversations/${userId}`, { method: "GET" });
        setMessages(data.messages || []);
      }
    };

    loadMessages();
  }, [status]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    const data = await fetchAPI("/api/chat", {
      method: "POST",
      body: { userId, message: input },
    });

    setLoading(false);

    if (data.message) {
      const botMessage: Message = { role: "bot", text: data.message };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const submitFeedback = async (index: number, feedback: "up" | "down") => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback = feedback;
    setMessages(updatedMessages);

    await fetchAPI("/api/feedback", {
      method: "POST",
      body: { userId, message: updatedMessages[index].text, feedback },
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading authentication...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-blue-700">AI Chat Support</h1>
        {session ? (
          <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
            Sign Out
          </button>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Sign In
          </button>
        )}
      </div>

      <div className="border border-gray-300 shadow-lg rounded-lg p-4 h-96 overflow-y-auto bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 p-3 max-w-xs ${
              msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-white text-gray-800"
            } rounded-lg shadow-md`}
          >
            {msg.text}
            {msg.role === "bot" && (
              <div className="mt-2 flex space-x-2 text-sm">
                {msg.feedback ? (
                  msg.feedback === "up" ? (
                    <span className="text-green-500">👍 You liked this</span>
                  ) : (
                    <span className="text-red-500">👎 You disliked this</span>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => submitFeedback(index, "up")}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => submitFeedback(index, "down")}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      👎
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-500 text-center">AI is typing...</p>}
      </div>

      <div className="mt-6 flex items-center space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 px-6 rounded-lg`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
