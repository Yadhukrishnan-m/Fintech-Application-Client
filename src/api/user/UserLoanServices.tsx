import userAxiosInstance from "@/config/UserAxiosInstence";

export const userLoanService = {
  getUserLoanEmis: async (id: string) => {
    return await userAxiosInstance.get(`/user-loan/emis/${id}`);
  },
  getUserLoans: async (currentPage: number) => {
    return await userAxiosInstance.get("/user-loans", {
      params: {
        page: currentPage,
      },
    });
  },
};
