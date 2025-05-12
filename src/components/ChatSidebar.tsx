"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface ChatSidebarProps {
  showSearchHelp: boolean;
  setShowSearchHelp: Dispatch<SetStateAction<boolean>>;
}

export default function ChatSidebar({ showSearchHelp, setShowSearchHelp }: ChatSidebarProps) {
  const { data: session, status } = useSession();

  return (
    <aside className="lg:w-1/4 w-full bg-gray-800 p-4 rounded-lg shadow-md mb-6 lg:mb-0 mr-2 lg:h-[80vh]">
      <h2 className="text-xl font-bold text-teal-400 mb-4">🛍️ Shop Assistant</h2>
      
      <ul>
        <li 
          className="text-teal-400 cursor-pointer hover:text-teal-300"
          onClick={() => setShowSearchHelp(true)}
        >
          🔍 Search Help
        </li>
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
  );
} 