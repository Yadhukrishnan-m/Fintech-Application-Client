import adminAxiosInstance from "@/config/AdminAxiosInstence";


export const loanServices = {
  createLoan: async (formData: FormData) => {
    const response = await adminAxiosInstance.post("/create-loan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  updateLoan: async (loanId: string, formData: FormData) => {
    const response = await adminAxiosInstance.put(
      `/update-loan/${loanId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
  getLoanById: async (id: string) => {
    const response = await adminAxiosInstance.get(`/loan/${id}`);
    return response; // Returns the full response
  },
  getLoans: async (
    currentPage: number,
    searchQuery: string,
    sortBy: string,
    filterActive: string
  ) => {
    const response = await adminAxiosInstance.get("/loans", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        isActive:
          filterActive !== "all" ? filterActive === "active" : undefined,
      },
    });
    return response; // Returns the full response
  },
  toggleLoanStatus: async (loanId: string) => {
    return adminAxiosInstance.patch(`/loans/${loanId}/toggle-status`);
  },
};
