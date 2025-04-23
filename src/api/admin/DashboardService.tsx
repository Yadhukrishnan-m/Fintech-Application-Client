import adminAxiosInstance from "@/config/AdminAxiosInstence";

export const dashboardServices = {
  getTotals: async () => {
    const response = await adminAxiosInstance.get("/dashboard/get-totals");
    return response;
  },
  getApplicationChart: async (timeFrame: string) => {
    const response = await adminAxiosInstance.get(
      `/dashboard/application-chart/${timeFrame}`
    );
    return response;
  },
  getTransactionChart: async (timeFrame: string) => {
    const response = await adminAxiosInstance.get(
      `/dashboard/transaction-chart/${timeFrame}`
    );
    return response;
  },
  generateReportPDF: async (dateRange: [Date, Date]) => {
    const response = await adminAxiosInstance.post(
      "/dashboard/report/pdf",
      {
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
      },
      {
        responseType: "blob", // Get binary data
      }
    );
    return response; // Returns the full response
  },
  generateReportExcel: async (dateRange: [Date, Date]) => {
    const response = await adminAxiosInstance.post(
      "/dashboard/report/excel",
      {
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
      },
      {
        responseType: "blob", // Get binary data
      }
    );
    return response; // Returns the full response
  },
};
