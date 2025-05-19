import React, { Suspense } from 'react';
import ProductDetails from './components/ProductDetails';
import { Product } from '@/types/product';
import { fetchAPI } from '@/utils/fetchApi';

// Add revalidation time (in seconds)
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true;

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

// Generate static paths for the most common products
export async function generateStaticParams() {
    const products: Product[] = await fetchAPI('/api/products', { method: 'GET' }).then((res) => res.products)

    return products.map((product) => ({ productId: String(product.id) }));
}

const ProductPage = async (props: Props) => {
  const { productId } = await props.params;
  
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading product...</div>}>
      <ProductDetails productId={productId} />
    </Suspense> 
  );
};

export default ProductPage;
