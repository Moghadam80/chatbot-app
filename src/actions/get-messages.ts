'use server';

import { fetchAPI } from "@/utils/fetchApi";
import { Message } from "@/types/message";

let messagesCache: { [key: string]: Message[] } = {};

export async function getMessages(userId: string): Promise<Message[]> {
    try {
        if (userId && userId !== "guest") {
            const data = await fetchAPI(`/api/conversations/${userId}`, { method: "GET" });
            const messages = data.messages || [];
            messagesCache[userId] = messages;
            return messages;
        }
        return [];
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}