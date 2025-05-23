import ProductList from '@/components/ProductList';
import { getProducts } from '@/actions/product/get-products'

// Add revalidate time in seconds (e.g., 3600 = 1 hour)
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>
      <ProductList products={products} />
    </div>
  );
} 