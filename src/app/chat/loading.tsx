import React from 'react';

export default function ChatLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-2 sm:p-4">
      <div className="flex-1 space-y-3 sm:space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mb-1 sm:mb-2 animate-pulse"></div>
              <div className="h-12 sm:h-16 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-10 sm:h-12 bg-gray-200 rounded-lg animate-pulse mt-2"></div>
    </div>
  );
} 