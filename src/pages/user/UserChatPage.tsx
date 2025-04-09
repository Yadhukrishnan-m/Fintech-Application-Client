import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { ChatContainer } from "@/components/shared/chat/ChatContainer";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
import { IChat, IMessage, IUser } from "@/interfaces/interfaces";
import userAxiosInstance from "@/config/UserAxiosInstence";
import socket from "@/config/socket";
// import socket, { registerChat } from "@/config/socket";

export default function UserChatPage() {
  const [userId, setUserId] = useState<string>("");
  const [admin, setAdmin] = useState<Partial<IUser> | null>(null);
  const [chat, setChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
  // const navigate = useNavigate();

  const fetchChat = useCallback(async () => {
    try {
      const response = await userAxiosInstance.get("/get-chat");
      setChat(response.data.chat);
      setMessages(response.data.messages || []);
      
      
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  }, []);

  useEffect(() => {
    fetchChat();
    // socket.emit('joinRoom', chat?._id )
  }, [fetchChat]);

  useEffect(() => {
    if (chat?.admin_id) {
      setAdmin({
        _id: chat.admin_id,
        name: "Support Team",
      });
      setUserId(chat.user_id);
    }
  }, [chat]);

  // Register chat and setup socket listeners
  useEffect(() => {
    socket.connect()
    // registerChat(userId, false);
    if(chat?._id){
        // console.log(messages)
        const roomId = chat?._id;
        console.log(chat);
        if (socket !== undefined) socket.emit("joinRoom", roomId);
        console.log("work avunno");

        socket.on("receiveMessage", (msg) => {
          console.log(msg, 'lookes');
          console.log(messages[0])
          setMessages((prev) => [...prev, msg ]);
        });
    }

    return () => {
        socket.off('receiveMessage');
        socket.disconnect()
    }

  }, [chat]);



  const handleSendMessage = (content: string) => {

    // if (!admin || !isConnected) return;

    // const chat_id = `chat_${userId}_${admin._id}`;
    const message: Partial<IMessage> = {
        chat_id:chat?._id,
        content,
    };
    console.log(socket, message, )
    async function send(){
        try {
             const response = await userAxiosInstance.post(
               "/send-message",
               message
             );

             if (response.data.success) {
            //    setMessages((prev) => [
            //      ...prev,
            //     response.data.messages
            //    ]);
             }
        
            
        } catch (error) {
            console.log(error);
            
        }
    }
    send()
    socket.emit('sendMessage', {roomId: chat?._id , message: message.content, userId })


  };

  if (!userId || !admin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
  
      <div className="max-w-7xl mx-auto " >
        {/* <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Chat with Support</h1>
        </div> */}
        <div className="h-[calc(100vh-120px)]">
          <ChatContainer
            userId={userId}
            isAdmin={false}
            currentChatUser={admin}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
  
  );
}
