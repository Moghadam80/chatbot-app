import { Product } from "@/types/product";
import { fetchAPI } from "@/utils/fetchApi";

export async function getProduct(productId: string): Promise<Product | null> {
    try {
        if (!productId) return null;
        

        const response = await fetchAPI(`/api/products/${productId}`, { method: "GET" });
        console.log(response, 'response');

        return response.product || null;

    } catch (error) {
        console.error('Error fetching messages:', error);
        return null;
    }

}