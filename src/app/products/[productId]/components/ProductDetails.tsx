// app/components/ProductDetails.tsx
import { getProduct } from '@/actions/product/get-product';
import AddToCartSection from './AddToCartSection';
import Link from 'next/link';

type Props = {
  productId: string;
};

export default async function ProductDetails({ productId }: Props) {
  const product = await getProduct(productId);

  if (!product) {
    return <div className="text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link 
        href="/products" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        Back to Products
      </Link>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-xl shadow-lg"
        />
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
          <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            Category: {product.category}
          </span>

          <AddToCartSection product={product} /> 
        </div>
      </div>
    </div>
  );
}
