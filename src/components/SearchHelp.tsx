'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import products from '@/data/products.json';

interface SearchHelpProps {
  onSearchExampleClick: (query: string) => void;
  onBackToChat: () => void;
}

const SearchHelp: React.FC<SearchHelpProps> = ({ onSearchExampleClick, onBackToChat }) => {
  const [activeTab, setActiveTab] = useState<'tips' | 'examples' | 'categories'>('tips');
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white h-[55vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-teal-400">🔍 Search Help</h2>
        <button 
          onClick={onBackToChat}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition"
          aria-label="Back to chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      <div className="flex border-b border-gray-700 mb-4">
        <button 
          className={`py-2 px-4 ${activeTab === 'tips' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('tips')}
        >
          Search Tips
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'examples' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('examples')}
        >
          Examples
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'categories' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === 'tips' && (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-300 mb-2">How to search effectively:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Use specific product names (e.g., "Wireless Headphones")</li>
                <li>Search by features (e.g., "noise cancellation")</li>
                <li>Search by price range (e.g., "under $100")</li>
                <li>Search by category (e.g., "electronics", "home")</li>
                <li>Ask for recommendations (e.g., "What's a good laptop backpack?")</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-300 mb-2">Advanced search tips:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Combine keywords (e.g., "wireless headphones under $200")</li>
                <li>Ask for comparisons (e.g., "Compare coffee makers")</li>
                <li>Ask for product details (e.g., "Tell me about the Smart Watch")</li>
                <li>Ask for related products (e.g., "What goes well with a yoga mat?")</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'examples' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-teal-300 mb-2">Try these example searches:</h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Show me wireless headphones",
                "What's the best smartwatch?",
                "I need a laptop backpack",
                "Tell me about your coffee makers",
                "Do you have yoga mats?",
                "What's the price of the Bluetooth speaker?"
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => onSearchExampleClick(example)}
                  className="bg-gray-700 hover:bg-gray-600 text-left p-3 rounded-lg transition"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-teal-300 mb-2">Browse by category:</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => onSearchExampleClick(`Show me ${category} products`)}
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition capitalize"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHelp; 