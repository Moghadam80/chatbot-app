'use server';

import { fetchAPI } from "@/utils/fetchApi";

interface Message {
    role: "user" | "bot";
    text: string;
    feedback?: "up" | "down";
    products?: any[];
}

export async function getMessages(userId: string): Promise<Message[]> {
    try {
        if (userId && userId !== "guest") {
            const data = await fetchAPI(`/api/conversations/${userId}`, { method: "GET" });
            return data.messages || [];
        }
        return [];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}