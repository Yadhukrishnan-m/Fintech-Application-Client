import { useCallback, useEffect, useState } from "react";
import moment from "moment";

import { Bell } from "lucide-react";
import userAxiosInstance from "@/config/UserAxiosInstence";
import socket, { registerUser } from "@/config/socket";

// Simplified notification interface
interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[] | null>([]);
  const [userId, setUserId] = useState("");
  const fetchNotification = useCallback(async () => {
    try {
      const response = await userAxiosInstance.get("/get-notifications");
      setNotifications(response.data.notifications || []);
      setUserId(response.data.userId);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

    const makeasReaded = useCallback(async () => {
      try {
        await userAxiosInstance.get("/notifications-mark-read");
       
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }, []);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  useEffect(() => {
    if (!userId) return;

    registerUser(userId);

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("new_notification", (newNotification: Notification) => {
      console.log("Received new notification:", newNotification);
      setNotifications((prev) => [newNotification, ...(prev || [])]);
    });
    makeasReaded();
    return () => {
      socket.off("new_notification");
      socket.off("connect");
    };
  }, [userId, makeasReaded]);

  if (!notifications) {
    return <p>No notifications are found</p>;
  }

  // Group notifications by date
  const groupedNotifications: Record<string, Notification[]> = {};

  notifications.forEach((notification) => {
    const date = moment(notification.createdAt).format("MMM D, YYYY");
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [];
    }
    groupedNotifications[date].push(notification);
  });

  // Format the relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString: string) => {
    return moment(dateString).fromNow();
  };

  return (
    <div className="bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-800">
              All Notifications
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-8xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-medium text-gray-800">Notifications</h2>
          </div>

          {Object.entries(groupedNotifications).length > 0 ? (
            <div className="divide-y divide-gray-100">
              {Object.entries(groupedNotifications).map(
                ([date, dateNotifications]) => (
                  <div key={date}>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500">
                        {date}
                      </h3>
                    </div>

                    {dateNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 hover:bg-gray-100 transition-colors rounded-md cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {getRelativeTime(notification.createdAt)}
                                </span>
                                {/* Read/Unread Tag */}
                                <span
                                  className={`text-xs px-2 py-1 rounded-md ${
                                    notification.isRead
                                      ? "bg-gray-200 text-gray-600"
                                      : "bg-teal-100 text-teal-700"
                                  }`}
                                >
                                  {notification.isRead ? "Read" : "Unread"}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No notifications to display</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
