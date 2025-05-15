import { Product } from '@/types/product';
import { fetchAPI } from '@/utils/fetchApi';
import products from '@/data/products.json';

export async function getProducts(): Promise<Product[]> {
  // If we're on the server, return the products directly
  if (typeof window === 'undefined') {
    return products;
  }

  // If we're on the client, fetch from the API
  try {
    const response = await fetchAPI('/api/products', { 
      method: 'GET',
      next: { revalidate: false, tags: ['products'] }
    });
    return response.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
