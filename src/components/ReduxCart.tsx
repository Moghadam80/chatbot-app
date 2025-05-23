'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromBasket, updateQuantity, setBasketOpen } from '@/store/basketSlice';

const ReduxCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.basket);
  
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto z-50 border-l border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
        <button 
          onClick={() => dispatch(setBasketOpen(false))}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ×
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                      className="px-2 py-1 bg-red-200 text-red-600 rounded hover:bg-red-300 transition"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                      className="px-2 py-1 bg-green-200 text-green-600 rounded hover:bg-green-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromBasket(item.product.id))}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="font-bold text-gray-800">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReduxCart; 