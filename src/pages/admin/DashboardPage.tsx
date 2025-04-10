
import { ApplicationsChart } from "@/components/admin/dashboard/ApplicationChart";
import { LoanAmountChart } from "@/components/admin/dashboard/LoanAmountChart";
import { FinancialMetricsCards } from "@/components/admin/dashboard/FinantialMetricsCard"; 

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-8">
        Financial Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <FinancialMetricsCards />
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <ApplicationsChart />
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <LoanAmountChart />
      </div>

        <ReportDownloader />
     
    </div>
  );
};

import ReportDownloader from "@/components/admin/dashboard/DownloadCard";

export default Dashboard;
