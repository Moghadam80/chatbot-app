import React from 'react';

export default function CartLoading() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="space-y-3 sm:space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2 sm:space-x-4 p-2 sm:p-4 bg-white rounded-lg shadow animate-pulse">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-1 sm:mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="w-16 sm:w-24 h-6 sm:h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-8 p-2 sm:p-4 bg-white rounded-lg shadow">
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mb-2 sm:mb-4"></div>
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
} 