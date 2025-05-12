import React from 'react';

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-2 sm:p-4 animate-pulse">
            <div className="bg-gray-200 h-32 sm:h-48 rounded-md mb-2 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-1 sm:mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 