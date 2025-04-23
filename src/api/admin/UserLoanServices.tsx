import adminAxiosInstance from "@/config/AdminAxiosInstence";

export const userLoanService = {
  getUserLoanEmis: async (userLoanId: string) => {
    const response = await adminAxiosInstance.get(
      `/user-loan/emis/${userLoanId}`
    );
    return response;
  },
  getLoansOfUser: async (id: string) => {
    const response = await adminAxiosInstance.get(`/user/user-loans/${id}`);
    return response;
  },
  getUserLoans: async (
    currentPage: number,
    searchQuery: string,
    sortBy: string
  ) => {
    const response = await adminAxiosInstance.get("/get-userloan", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
      },
    });
    return response; 
  },
};
