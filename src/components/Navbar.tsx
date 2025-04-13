"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LoginPopup from "./LoginPopup";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setBasketOpen } from "@/store/basketSlice";
import ReduxCart from "./ReduxCart";

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.basket);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close menu on link click
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">AI Shop Assistant</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button for Mobile */}
            <button 
              onClick={handleMenuToggle} 
              className="md:hidden text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? '✖' : '☰'}
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:space-x-6">
              <Link 
                href="/products" 
                className="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-lg"
              >
                Products
              </Link>
              <Link 
                href="/chat" 
                className="text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded-lg"
              >
                Chat
              </Link>
              
              {/* Remove Cart Link from Desktop */}
              {/* <Link
                href="/cart" // Link to the cart page
                className="relative text-white hover:text-yellow-300 transition-colors px-3 py-2 rounded"
              >
                🛒 Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link> */}

              {session ? (
                <div className="flex items-center space-x-2">
                  {session.user?.image && (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-white">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginPopupOpen(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className={`flex-col flex items-center justify-center h-full transition-all duration-300 ${isMobileMenuOpen ? 'flex' : 'hidden'} overflow-y-auto rounded-lg shadow-lg bg-white`}>
                {/* Quit Icon */}
                <button 
                  onClick={handleMenuToggle} 
                  className="absolute top-4 right-4 text-black text-2xl"
                  aria-label="Close menu"
                >
                  ✖
                </button>

                <Link 
                  href="/" 
                  className="text-black hover:text-yellow-500 transition-colors px-3 py-2 rounded-lg"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-black hover:text-yellow-500 transition-colors px-3 py-2 rounded-lg"
                  onClick={handleLinkClick}
                >
                  Products
                </Link>
                <Link 
                  href="/chat" 
                  className="text-black hover:text-yellow-500 transition-colors px-3 py-2 rounded-lg"
                  onClick={handleLinkClick}
                >
                  Chat
                </Link>
                
                {/* Cart Link for Mobile */}
                <Link
                  href="/cart" // Link to the cart page
                  className="relative text-black hover:text-yellow-500 transition-colors px-3 py-2 rounded-lg"
                  onClick={handleLinkClick}
                >
                  🛒 Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
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
                    <span className="text-black">{session.user?.name}</span>
                    <button
                      onClick={() => signOut()}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginPopupOpen(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={() => setIsLoginPopupOpen(false)} 
      />
      
      {/* Remove the ReduxCart component from mobile view */}
      <div className="hidden md:block">
        <ReduxCart />
      </div>
    </nav>
  );
} 