// app/components/ProductDetails.tsx
import { getProduct } from '@/actions/product/get-product';
import AddToCartSection from './AddToCartSection';

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
