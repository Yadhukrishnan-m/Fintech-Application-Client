import userAxiosInstance from "@/config/UserAxiosInstence";
 type MessagePayload = {
   chat_id: string;
   content: string;
 };

export const chatServices = {
  getChat: async () => {
    return await userAxiosInstance.get("/get-chat");
  },
  sendMessage: async (message: MessagePayload) => {
    return await userAxiosInstance.post("/send-message", { message });
  },
};
