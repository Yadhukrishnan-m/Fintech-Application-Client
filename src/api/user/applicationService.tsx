import userAxiosInstance from "@/config/UserAxiosInstence";


export const applicationService = {
  getApplications: async (currentPage: number) => {
    const params: Record<string, number> = {};

    if (currentPage !== undefined) {
      params.page = currentPage;
    }

    return await userAxiosInstance.get("/applications", { params });
  },
  getApplicationDetails: async (id: string) => {
    return await userAxiosInstance.get(`/application/${id}/details`);
  },
  applyForLoan: async (formData: FormData) => {
    return await userAxiosInstance.post("/apply-loan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
