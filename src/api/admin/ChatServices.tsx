import adminAxiosInstance from "@/config/AdminAxiosInstence";
import { IMessage } from "@/interfaces/interfaces";


export const chatServices = {
  fetchAllChats: async () => {
    const response = await adminAxiosInstance.get("/all-chats");
    return response;
  },

  fetchChatByUserId: async (userId: string) => {
    const response = await adminAxiosInstance.get(`/get-chat/${userId}`);
    return response;
  },

  sendMessage: async (message: Partial<IMessage>) => {
    const response = await adminAxiosInstance.post("/send-message", message);
    return response;
  },
};
