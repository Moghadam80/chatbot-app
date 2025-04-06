"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginPopup from "./LoginPopup";

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">AI Shop Assistant</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/chat" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Chat
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-700">{session.user?.name}</span>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginPopupOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={() => setIsLoginPopupOpen(false)} 
      />
    </nav>
  );
} 