'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addToBasket } from '@/store/basketSlice';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      dispatch(addToBasket(product));
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-400 text-sm">{product.name}</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            priority
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-teal-400 mb-2">{product.name}</h3>
        <p className="text-gray-300 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 