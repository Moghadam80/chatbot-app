"use client";

import { Suspense, useState } from "react";
import ChatContent from "@/components/ChatContent";
import ChatSidebar from "@/components/ChatSidebar";
import LoadingFallback from "@/components/LoadingFallback";

export default function ChatPage() {
  const [showSearchHelp, setShowSearchHelp] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto h-[90vh] py-8">
        <ChatSidebar showSearchHelp={showSearchHelp} setShowSearchHelp={setShowSearchHelp} />
        <Suspense fallback={<LoadingFallback />}>
          <ChatContent showSearchHelp={showSearchHelp} setShowSearchHelp={setShowSearchHelp} />
        </Suspense>
      </div>
    </div>
  );
}
