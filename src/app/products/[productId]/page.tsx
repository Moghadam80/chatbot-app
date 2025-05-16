import React, { Suspense } from 'react';
import ProductDetails from './components/ProductDetails';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductPage = async (props: Props) => {
  const { productId } = await props.params;
  
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading product...</div>}>
      <ProductDetails productId={productId} />
    </Suspense> 
  );
};

export default ProductPage;
