'use server';

import { fetchAPI } from "@/utils/fetchApi";
import { Message } from "@/types/message";

export async function getMessages(userId: string): Promise<Message[]> {
    try {
        if (userId && userId !== "guest") {
            const data = await fetchAPI(`/api/conversations/${userId}`, { 
                method: "GET",
                next: { revalidate: 0 }  // Disable caching to always get fresh data
            });
            return data.messages || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}