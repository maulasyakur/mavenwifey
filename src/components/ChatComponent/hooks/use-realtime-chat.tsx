"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

interface UseRealtimeChatProps {
  roomName: string;
  username: string;
  userId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  user: {
    name: string;
    id: string;
  };
  createdAt: string;
}

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({
  roomName,
  username,
  userId,
}: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(roomName);

    newChannel
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as ChatMessage]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, username, supabase]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return;

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        user: {
          name: username,
          id: userId,
        },
        createdAt: new Date().toISOString(),
      };

      // Update local state immediately for the sender
      setMessages((current) => [...current, message]);

      await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      });
    },
    [channel, isConnected, username]
  );

  return { messages, sendMessage, isConnected };
}
