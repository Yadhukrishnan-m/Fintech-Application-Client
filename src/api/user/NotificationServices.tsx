import userAxiosInstance from "@/config/UserAxiosInstence";

export const notificationServices = {
  getTotalUnreadNotifications: async () => {
    return await userAxiosInstance.get("/total-unreaded");
  },
  getNotifications: async (currentPage: number) => {
    return await userAxiosInstance.get(
      `/get-notifications?page=${currentPage}`
    );
  },
  markAllAsRead: async () => {
    return await userAxiosInstance.get("/notifications-mark-read");
  },
};
