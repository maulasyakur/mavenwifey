import { supabase } from "@/lib/supabase";
import type { ChatMessage } from "../hooks/use-realtime-chat";

export async function sendMessage(message: ChatMessage, roomName: string) {
  const { error } = await supabase.from("messages").insert({
    id: parseInt(message.id),
    content: message.content,
    username: message.user.name,
    created_at: message.createdAt,
    room_name: roomName,
  });

  if (error) {
    console.error("Error saving message:", error);
  }
}
