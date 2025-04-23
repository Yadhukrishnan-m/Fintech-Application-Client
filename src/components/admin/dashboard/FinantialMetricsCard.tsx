import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {

  DollarSign,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { dashboardServices } from "@/api/admin/DashboardService";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  isPositive: boolean;
  percentage: string;
  icon: React.ReactNode;
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center text-sm">
       
        
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancialMetricsCards() {
    const [loanValue,setLoanValue]=useState(0)
    const [totalLoans, setTotalLoans] = useState(0);
    const [approvalRate, setApprovalRate] = useState(0);
    const [userCount, setUserCount] = useState(0);

    async function getTotals(){
        try {
                    const responce = await dashboardServices.getTotals();

               console.log(responce);

               if (responce.data.success) {
                 setLoanValue(responce.data.totalAmount);
                 setTotalLoans(responce.data.totalLoans);
                 setApprovalRate(responce.data.approvalRate);
                 setUserCount(responce.data.userCount);
               }
            
        } catch (error) {
            console.log(error);
            
        }
     
    }

    useEffect(()=>{
        getTotals()
    },[])
  return (
    <>
      <MetricCard
        title="Total Loan Value"
        value={loanValue.toString()}
        description="Total value of all loans"
        isPositive={true}
        percentage="12.5%"
        icon={<DollarSign className="h-4 w-4 text-teal-500" />}
      />
      <MetricCard
        title="Approved Loans"
        value={totalLoans.toString()}
        description="Currently Approved loans"
        isPositive={true}
        percentage="8.2%"
        icon={<Users className="h-4 w-4 text-blue-500" />}
      />
      <MetricCard
        title="Approval Rate"
        value={approvalRate.toString()+"%"}
        description="Application approval rate"
        isPositive={false}
        percentage="2.1%"
        icon={<CheckCircle className="h-4 w-4 text-green-500" />}
      />
      <MetricCard
        title="Total users"
        value={userCount.toString()}
        description="Loan Number of users"
        isPositive={true}
        percentage="0.8%"
        icon={<XCircle className="h-4 w-4 text-red-500" />}
      />
    </>
  );
}
