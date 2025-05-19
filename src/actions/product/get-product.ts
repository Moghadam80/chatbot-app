import { Product } from "@/types/product";
import { fetchAPI } from "@/utils/fetchApi";
import products from '@/data/products.json';

export async function getProduct(productId: string): Promise<Product | null> {
    try {
        // If we're on the server, return the products directly
        if (typeof window === 'undefined') {
            return products.find((product) => product.id === productId) || null;
        }

        if (!productId) return null;

        const response = await fetchAPI(`/api/products/${productId}`, { method: "GET" });

        return response.product || null;

    } catch (error) {
        console.error('Error fetching messages:', error);
        return null;
    }
}