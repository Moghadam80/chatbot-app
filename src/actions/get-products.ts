import { Product } from '@/types/product';
import { fetchAPI } from '@/utils/fetchApi';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchAPI('/api/products', { 
      method: 'GET',
      next: { revalidate: 0 }  // Disable caching to always get fresh data
    });
    return response.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
