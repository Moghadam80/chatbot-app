"use client";

import { useEffect, useRef, useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { addToBasket } from "@/store/basketSlice";
import { getMessages } from "@/actions/get-messages";
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
  setShowSearchHelp: Dispatch<SetStateAction<boolean>>;
}

export default function ChatContent({ showSearchHelp, setShowSearchHelp }: ChatContentProps) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = session?.user?.email || "guest";

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoadingMessages(true);
      try {
        if (status === "authenticated") {
          const fetchedMessages = await getMessages(userId);
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };
    loadMessages();
  }, [status, userId]);

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

    try {
      const data = await sendMessageAction(userId, input);
      if (data && data.message) {
        const botMessage: Message = { 
          role: "bot", 
          text: data.message,
          products: data.products || []
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setTyping(false);
      setLoading(false);
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

    try {
      await submitFeedbackAction(userId, updatedMessages[index].text, feedback);
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

  return (
    <main className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full lg:h-[80vh]">
      <h1 className="text-2xl lg:text-3xl font-bold text-teal-400 mb-4">Ask anything you want!</h1>

      {showSearchHelp ? (
        <div className="flex-1">
          <SearchHelp 
            onSearchExampleClick={handleSearchExampleClick} 
            onBackToChat={() => setShowSearchHelp(false)}
          />
        </div>
      ) : (
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
      )}

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
  );
} 