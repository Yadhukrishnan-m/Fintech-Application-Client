"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { IMessage } from "@/interfaces/interfaces";

interface MessageListProps {
  messages: IMessage[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (messagesEndRef.current) {
    const parent = messagesEndRef.current.parentElement;
    if (parent) {
      parent.scrollTo({
        top: parent.scrollHeight,
        behavior: "smooth",
      });
    }
  }
}, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <p className="text-gray-500">No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1  overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === currentUserId;
     

        return (
          <div
            key={message._id}
            className={cn(
              "flex",
              isOwnMessage ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                isOwnMessage
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-800"
              )}
            >
              <p className="break-words">{message.content}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  isOwnMessage ? "text-teal-100" : "text-gray-500"
                )}
              >
                {format(new Date(message.createdAt), "p")}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
