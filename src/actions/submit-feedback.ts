import { fetchAPI } from "@/utils/fetchApi";

export async function submitFeedbackAction(userId: string, message: string, feedback: "up" | "down") {
  return await fetchAPI("/api/feedback", {
    method: "POST",
    body: { userId, message, feedback },
  });
} 