import userAxiosInstance from "@/config/UserAxiosInstence";


export const loanServices = {
  getLoans: async (
    currentPage?: number,
    searchQuery?: string,
    sortBy?: string
  ) => {
    const params: Record<string, string | number> = {};

    if (currentPage !== undefined) params.page = currentPage;
    if (searchQuery) params.search = searchQuery;
    if (sortBy) params.sortBy = sortBy;
    return userAxiosInstance.get("/loans", { params });
  },
  getLoanById: async (id: string) => {
    return await userAxiosInstance.get(`/loan/${id}`);
  },
  getInterestById: async (id: string) => {
    return await userAxiosInstance.get(`/get-interest/${id}`);
  },
};
