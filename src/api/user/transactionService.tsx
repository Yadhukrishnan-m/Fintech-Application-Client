import userAxiosInstance from "@/config/UserAxiosInstence";




export const transactionService = {
  getTransactions: async (
    currentPage: number,
    searchQuery: string,
    sortBy: string,
    statusFilter: string,
    typeFilter: string
  ) => {
    return await userAxiosInstance.get("/transactions", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        statusFilter,
        typeFilter,
      },
    });
  },
};
