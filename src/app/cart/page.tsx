"use client";

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromBasket, updateQuantity } from '@/store/basketSlice';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector(state => state.basket);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromBasket(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleCheckout = () => {
    // Instead of redirecting to the checkout page
    alert('You will be redirected to the checkout page.'); // Show alert message
    // router.push('/checkout'); // Commented out the redirect
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h2 className="text-lg">{item.product.name}</h2>
                <p>Price: ${item.product.price}</p>
                <div className="flex items-center">
                  <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.product.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="mt-4">
            <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 