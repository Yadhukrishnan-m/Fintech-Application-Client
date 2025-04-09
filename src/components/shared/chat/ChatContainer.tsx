"use client";

import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { IMessage, IUser } from "@/interfaces/interfaces";

interface ChatContainerProps {
  userId: string;
  isAdmin: boolean;
  currentChatUser: Partial<IUser> | null;
  messages: IMessage[];
  onSendMessage: (content: string) => void;
}

export function ChatContainer({
  userId,
  isAdmin,
  currentChatUser,
  messages,
  onSendMessage,
}: ChatContainerProps) {
  if (!currentChatUser) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          {isAdmin
            ? "Select a user to start chatting"
            : "Start a conversation with support"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-screen min-h-screen border rounded-lg overflow-hidden  bg-white">
      <ChatHeader user={currentChatUser} />
      <MessageList messages={messages} currentUserId={userId} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
