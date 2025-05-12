import React from 'react';

const LoadingFallback = () => {
  return (
    <div className="lg:w-3/4 w-full bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-200" />
        <span className="text-sm text-gray-400 ml-2">Loading chat...</span>
      </div>
    </div>
  );
};

export default LoadingFallback; 