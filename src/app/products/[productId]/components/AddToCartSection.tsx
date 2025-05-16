// app/components/AddToCartSection.tsx
'use client';

import { Product } from '@/types/product';
import { addToBasket } from '@/store/basketSlice';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'react-toastify';

type Props = {
  product: Product;
};

export default function AddToCartSection({ product }: Props) {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addToBasket(product));

    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      toast.success(`${product.name} has been added to your cart!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <button
      onClick={addToCart}
      className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full ml-2 hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  );
}
