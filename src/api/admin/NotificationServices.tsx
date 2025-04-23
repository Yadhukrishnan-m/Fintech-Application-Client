import adminAxiosInstance from "@/config/AdminAxiosInstence";

export const notificationServices = {
  createNotification: async (
    type: string,
    title: string,
    message: string,
    userId?: string
  ) => {
    return adminAxiosInstance.post("/create-notification", {
      type,
      title,
      message,
      userId: type === "personal" ? userId : undefined,
    });
  },
};
