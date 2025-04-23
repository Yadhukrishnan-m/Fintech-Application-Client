import userAxiosInstance from "@/config/UserAxiosInstence";

export const notificationServices = {
  getTotalUnreadNotifications: async () => {
    return await userAxiosInstance.get("/total-unreaded");
  },
  getNotifications: async () => {
    return await userAxiosInstance.get("/get-notifications");
  },

  markAllAsRead: async () => {
    return await userAxiosInstance.get("/notifications-mark-read");
  },
};
