import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl space-y-4 sm:space-y-8">
        <div className="h-8 sm:h-12 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
        <div className="h-40 sm:h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="h-24 sm:h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-24 sm:h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 