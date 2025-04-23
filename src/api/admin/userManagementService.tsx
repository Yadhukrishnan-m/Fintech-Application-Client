import adminAxiosInstance from "@/config/UserAxiosInstence";

export const userManagementService = {
  getUserById: async (id: string) => {
    const response = await adminAxiosInstance.get(`/user/${id}`);
    return response;
  },
  verifyUserStatus: async (
    id: string,
    actionType: "verify" | "reject",
    rejectionReason?: string
  ) => {
    const payload = {
      status: actionType === "verify" ? true : false,
      message: actionType === "reject" ? rejectionReason : undefined,
    };
    const response = await adminAxiosInstance.patch(
      `/verify-user/${id}`,
      payload
    );
    return response;
  },
  getVerifiedUsers: async (params: {
    currentPage: number;
    searchQuery: string;
    sortBy: string;
    filter: string;
  }) => {
    const { currentPage, searchQuery, sortBy, filter } = params;

    const response = await adminAxiosInstance.get("/verified-users", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        filter,
      },
    });
    return response;
  },
  blacklistUser: async (id: string, isBlacklisting: boolean) => {
    const response = await adminAxiosInstance.patch(`/blacklist-user/${id}`, {
      action: isBlacklisting, // true for blacklist, false for unblacklist
    });
    return response;
  },
  getUnverifiedUsers: async ({
    currentPage,
    searchQuery,
    sortBy,
    filter,
  }: {
    currentPage: number;
    searchQuery: string;
    sortBy: string;
    filter: string;
  }) => {
    const response = await adminAxiosInstance.get("/unverified-users", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        filter,
      },
    });
    return response; // Returning the full response
  },
};
