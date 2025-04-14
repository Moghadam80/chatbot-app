"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LoginPopup from "./LoginPopup";
import { useAppSelector } from "@/store/hooks";
import ReduxCart from "./ReduxCart";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { items } = useAppSelector((state) => state.basket);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { href: "/", label: "Dashboard" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <div className="relative">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white md:hidden" aria-label="Open sidebar">
          <Menu size={28} />
        </button>
        <Link href="/" className="text-xl font-bold text-white">
          AI Shop Assistant
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-yellow-300">Dashboard</Link>
          <Link href="/chat" className="text-white hover:text-yellow-300">Chat</Link>
          <Link href="/products" className="text-white hover:text-yellow-300">Products</Link>
        </div>
        <div className="hidden md:block">
          <ReduxCart />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <div className="flex items-center space-x-3">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-500"
              />
            )}
            <div>
              <p className="font-semibold text-black dark:text-white">{session?.user?.name || "Guest"}</p>
              <p className="text-sm text-gray-500">Webpixels</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-red-500" aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map(({ href, label, badge }) => (
            <Link
              key={label}
              href={href}
              className="flex justify-between items-center px-3 py-2 text-gray-800 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 rounded-lg transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span>{label}</span>
              {badge && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}

          {/* Cart link */}
          <Link
            href="/cart"
            className="relative text-gray-800 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          <div className="mt-4">
            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsLoginPopupOpen(true);
                }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </aside>

      <LoginPopup isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />
    </div>
  );
}

