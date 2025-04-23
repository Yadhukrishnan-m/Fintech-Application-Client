import adminAxiosInstance from "@/config/AdminAxiosInstence";



export const transactionService = {
  getCapital: async () => {
    const response = await adminAxiosInstance.get("/get-capital");
    return response;
  },
  addCapital: async (amount: number) => {
    const response = await adminAxiosInstance.post("/add-capital", { amount });
    return response;
  },
  getTransactions: async (
    currentPage: number,
    searchQuery: string,
    sortBy: string,
    statusFilter: string,
    typeFilter: string
  ) => {
    const response = await adminAxiosInstance.get("/transactions", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        statusFilter,
        typeFilter,
      },
    });
    return response;
  },
};
