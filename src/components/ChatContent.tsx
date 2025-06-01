"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { addToBasket } from "@/store/basketSlice";
import { sendMessageAction } from "@/actions/send-message";
import { submitFeedbackAction } from "@/actions/submit-feedback";
import ProductCard from "@/components/ProductCard";
import SearchHelp from "@/components/SearchHelp";
import { Message } from "@/types/message";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ChatContentProps {
  showSearchHelp: boolean;
  setShowSearchHelp: (show: boolean) => void;
}

interface CustomSession {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function ChatContent({ showSearchHelp, setShowSearchHelp }: ChatContentProps) {
  const { data: session } = useSession() as { data: CustomSession | null };
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = session?.user?.id || "guest";

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const response = await fetch(`/api/conversations/${userId}`);
        const data = await response.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    if (userId !== "guest") {
      fetchMessages();
    } else{
      setIsLoadingMessages(false);

    }
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setTyping(true);
    setLoading(true);

    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);

    try {
      const response = await sendMessageAction(userId, userMessage);
      if (response) {
        setMessages(prev => [...prev, { 
          role: "bot", 
          text: response.message,
          products: response.products 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: "bot", 
        text: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setTyping(false);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = async (message: string, feedback: "up" | "down") => {
    try {
      await submitFeedbackAction(userId, message, feedback);
      setMessages(prev => prev.map(msg => 
        msg.text === message ? { ...msg, feedback } : msg
      ));
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSearchExampleClick = (query: string) => {
    setInput(query);
    setShowSearchHelp(false);
  };

  if (isLoadingMessages) {
    return (
      <main className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center lg:h-[80vh]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-200" />
          <span className="text-sm text-gray-400 ml-2">Loading messages...</span>
        </div>
      </main>
    );
  }

  if (showSearchHelp) {
    return (
      <main className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full lg:h-[80vh]">
        <div className="flex-1">
          <SearchHelp 
            onSearchExampleClick={handleSearchExampleClick} 
            onBackToChat={() => setShowSearchHelp(false)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full lg:h-[80vh]">
      <h1 className="text-2xl lg:text-3xl font-bold text-teal-400 mb-4">Ask anything you want!</h1>

      <div className="flex-1 min-h-[300px] border p-4 rounded-lg overflow-y-auto space-y-4">
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
              <>
                <div className="mt-1 flex space-x-2">
                  {msg.feedback === "up" ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">👍 Liked</span>
                  ) : msg.feedback === "down" ? (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">👎 Disliked</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleFeedback(msg.text, "up")}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.text, "down")}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        👎
                      </button>
                    </>
                  )}
                </div>
                
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {msg.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                )}
              </>
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
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-600 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className={`ml-4 px-6 py-4 rounded-lg text-white transition ${
            loading ? "bg-gray-600" : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </main>
  );
} 