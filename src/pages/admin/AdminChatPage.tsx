import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContainer } from "@/components/shared/chat/ChatContainer";
import { UserListForMessage } from "@/components/shared/chat/UserListForMessage";
import { Button } from "@/components/ui/button";
import { IChat, IChatUser, IMessage } from "@/interfaces/interfaces";

import socket from "@/config/socket";
import { chatServices } from "@/api/admin/ChatServices";

export default function AdminChatPage() {
  const [adminId, setAdminId] = useState<string>("");
  const [users, setUsers] = useState<IChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IChatUser["user"] | null>(
    null
  );
  const [chat, setChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigate = useNavigate();

  const fetchChat = useCallback(async (userId: string) => {
    try {
        const response = await chatServices.fetchChatByUserId(userId);
      setChat(response.data.chat);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  }, []);

  useEffect(() => {
    const fetchUsersWithLastChats = async () => {
      try {
      const response = await chatServices.fetchAllChats();
        setUsers(response.data.chats);
        setAdminId(response.data.adminId);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchUsersWithLastChats();
  }, []);

  useEffect(() => {
    socket.connect();
    if (selectedUser && chat) {
      const roomId = chat._id;
      socket.emit("joinRoom", roomId);

    }


  }, [selectedUser, chat]);

  useEffect(() => {
  const handleReceiveMessage = (msg:IMessage) => {
    console.log(msg, "lookes");
    setMessages((prev) => [...prev, msg]);
  };

  // Add the event listener
  socket.on("receiveMessage", handleReceiveMessage);

  // Clean up function to remove the listener when component unmounts
  // or when dependencies change
  return () => {
    socket.off("receiveMessage", handleReceiveMessage);
  };
  }, []);
  useEffect(() => {
    if (!selectedUser?._id || !adminId) return;

    fetchChat(selectedUser._id);
  }, [selectedUser, adminId, fetchChat]);

  const handleSendMessage = (content: string) => {
    if (!selectedUser || !chat) return;

    const message: Partial<IMessage> = {
      chat_id: chat._id,
      content,
    };

    const send = async () => {
      try {
   await chatServices.sendMessage(message);
      } catch (error) {
        console.error("Send message error:", error);
      }
    };

    socket.emit("sendMessage", {
      roomId: chat?._id,
      message: message.content,
      userId: adminId,
    });
    

    send();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("#")}
          >
            ←
          </Button>
          <h1 className="text-2xl font-bold">Live Chat With Users</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          <div className="md:col-span-1 max-h-screen">
            <UserListForMessage
              users={users}
              onSelectUser={setSelectedUser}
              selectedUserId={selectedUser?._id}
            />
          </div>
          <div className="md:col-span-2">
            {selectedUser && (
              <ChatContainer
                userId={adminId}
                isAdmin={true}
                currentChatUser={selectedUser}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
