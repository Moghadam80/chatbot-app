import { fetchAPI } from "@/utils/fetchApi";

export async function sendMessageAction(userId: string, input: string) {
  if (!input.trim()) return null;

  const data = await fetchAPI("/api/chat", {
    method: "POST",
    body: { userId, message: input },
  });

  return data;
} 