import adminAxiosInstance from "@/config/AdminAxiosInstence";


export const applicationService = {
  getApplicationById: async (id: string) => {
    const response = await adminAxiosInstance.get(
      `/application/${id}`
    );
    return response; // Returning the full response object
  },
  verifyApplication: async (applicationId: string, payload: object) => {
    const response = await adminAxiosInstance.patch(
      `/verify-application/${applicationId}`,
      payload
    );
    return response;
  },
  getApplications: async (
    currentPage: number,
    searchQuery: string,
    sortBy: string,
    filter: string
  ) => {
    const response = await adminAxiosInstance.get("/applications", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        filter,
      },
    });
    return response;
  },
};

