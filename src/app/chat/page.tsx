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
    <div className="min-h-screen bg-pink-100">
      <div className="flex max-w-5xl mx-auto h-screen py-8">
        <aside className="w-1/4 bg-pink-200 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-700 mb-4">AnyChat</h2>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">
            + New chat
          </button>

          <ul>
            <li className="mb-2 text-gray-600">Today</li>
            <li className="mb-2 flex items-center space-x-2">
              🧠 <span>Helpful AI Ready</span>
            </li>
            <li className="mb-2">🌱 Greenhouse Effect Explanation</li>
            <li className="mb-4">🎬 Movie Streaming Help</li>
            <li className="text-gray-600">Previous 7 days</li>
            <li className="mb-2">⚙️ Web Design Workflow</li>
            <li className="mb-2">📷 Photo Generation</li>
            <li className="mb-2">🐱 Cats Eat Grass</li>
            <li>☁️ Weather Dynamics</li>
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
                  <button onClick={() => signOut()} className="text-blue-500 text-sm">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600">You are not logged in</p>
                <button
                  onClick={() => signIn()}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </aside>

        <main className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Ask everything you want!
          </h1>

          <div className="border p-4 rounded-lg h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p
                  className={`${msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                    } p-3 rounded-lg`}
                >
                  {msg.text}
                </p>
                {msg.role === "bot" && (
                  <div className="mt-2 flex space-x-2">
                    {msg.feedback === "up" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded">
                        👍 Liked
                      </span>
                    ) : msg.feedback === "down" ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">
                        👎 Disliked
                      </span>
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
          </div>

          <div className="flex mt-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message here..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`ml-4 px-6 py-4 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
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
