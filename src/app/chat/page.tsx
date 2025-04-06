"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchAPI } from "@/utils/fetchApi";

interface Message {
  role: "user" | "bot";
  text: string;
  feedback?: "up" | "down";
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setTyping(true);
    setLoading(true);

    const data = await fetchAPI("/api/chat", {
      method: "POST",
      body: { userId, message: input },
    });

    setTyping(false);
    setLoading(false);

    if (data.message) {
      const botMessage: Message = { role: "bot", text: data.message };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto h-screen py-8">
        <aside className="lg:w-1/4 w-full bg-gray-800 p-4 rounded-lg shadow-md mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-teal-400 mb-4">🧠 AnyChat</h2>
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded mb-4 transition">
            + New Chat
          </button>
          <ul>
            <li className="text-gray-500 text-sm mb-2">Today</li>
            <li className="mb-2 text-teal-400">💬 Helpful AI Ready</li>
            <li className="mb-2 text-teal-400">🌱 Greenhouse Effect</li>
            <li className="mb-4 text-teal-400">🎬 Movie Help</li>
            <li className="text-gray-500 text-sm mb-2">Last 7 Days</li>
            <li className="mb-2 text-teal-400">⚙️ Design Workflow</li>
            <li className="mb-2 text-teal-400">📷 Photo AI</li>
            <li className="mb-2 text-teal-400">🐱 Cats Eat Grass</li>
            <li className="text-teal-400">☁️ Weather AI</li>
          </ul>

          <div className="mt-8">
            {status === "authenticated" ? (
              <div className="flex items-center space-x-2">
                <img
                  src={session.user?.image || "/profile-pic.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{session.user?.name || "User"}</p>
                  <button onClick={() => signOut()} className="text-teal-400 text-sm">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500">Not logged in</p>
                <button
                  onClick={() => signIn()}
                  className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </aside>

        <main className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
          <h1 className="text-3xl font-bold text-teal-400 mb-4">Ask anything you want!</h1>

          <div className="flex-1 border p-4 rounded-lg overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index}>
                <p
                  className={`inline-block max-w-[80%] p-3 rounded-lg shadow-sm ${
                    msg.role === "user"
                      ? "bg-teal-600 text-white self-end"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </p>

                {msg.role === "bot" && (
                  <div className="mt-1 flex space-x-2">
                    {msg.feedback === "up" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded">👍 Liked</span>
                    ) : msg.feedback === "down" ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">👎 Disliked</span>
                    ) : (
                      <>
                        <button
                          onClick={() => submitFeedback(index, "up")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => submitFeedback(index, "down")}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          👎
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-200" />
                <span className="text-sm text-gray-400 ml-2">Bot is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex mt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-600 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`ml-4 px-6 py-4 rounded-lg text-white transition ${
                loading ? "bg-gray-600" : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
