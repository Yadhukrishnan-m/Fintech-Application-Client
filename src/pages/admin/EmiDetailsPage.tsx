import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmiCards } from "@/components/admin/userLoanDetails/EmiCards";
import { EmiTable } from "@/components/admin/userLoanDetails/EmiTable";
import { EmiStatusChart } from "@/components/admin/userLoanDetails/UserLoanChart";

import { IEMI, IUserLoan } from "@/interfaces/interfaces";
import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { userLoanService } from "@/api/admin/UserLoanServices";

function EmiDetails() {
  const [emiData, setEmiData] = useState<IEMI[]>();
  const [loanDetails, setLoanDetails] = useState<IUserLoan>();
  const { userLoanId } = useParams();
  useEffect(() => {
    async function fetchLoanData() {
      if (!userLoanId) {
        return
      }
      try {
           const response = await userLoanService.getUserLoanEmis(userLoanId);

        setEmiData(response.data.emi);
        setLoanDetails(response.data.userLoan);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    }

    fetchLoanData();
  }, [userLoanId]);

  if (!emiData || !loanDetails) {
    return;
  }

  // Calculate summary statistics
  const totalEmis = emiData.length;
  const paidEmis = emiData.filter((emi) => emi.status === "paid").length;
  const overdueEmis = emiData.filter((emi) => emi.status === "overdue").length;
  const upcomingEmis = emiData.filter(
    (emi) => emi.status === "upcoming"
  ).length;
  const dueEmis = emiData.filter((emi) => emi.status === "due").length;
  const graceEmis = emiData.filter((emi) => emi.status === "grace").length;

  const totalAmount = emiData.reduce(
    (sum, emi) => sum + emi.amount + emi.penalty,
    0
  );
  const totalPenalty = emiData.reduce((sum, emi) => sum + emi.penalty, 0);
  const paidpenalty = emiData
    .filter((emi) => emi.transaction)
    .reduce((sum, emi) => sum + (emi.transaction?.penaltyAmount || 0), 0);
  const totalPaid = emiData
    .filter((emi) => emi.transaction)
    .reduce(
      (sum, emi) => sum + (emi.transaction?.amount || 0) + emi.penalty,
      0
    );

  return (
    <div className=" bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <Breadcrumb
          paths={[
            { name: "userLoans", link: "/admin/userloan" },
            { name: "Emi And Details" },
          ]}
        />
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-teal-800">
                Loan EMI Management
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage loan EMI payments and statuses. <br />
                UserLoan Id : {loanDetails.userLoanId}
                {/* customerId :{loanDetails.userId.customerId} */}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-md border-t-4 border-t-teal-500">
                <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-white">
                  <CardTitle className="text-teal-800">Loan Details</CardTitle>
                  <CardDescription>
                    Overview of the loan information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Principal Amount
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        ₹{loanDetails.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Interest Rate
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        {loanDetails.interest}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Tenure
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        {loanDetails.tenure} months
                      </p>
                    </div>
                    {/* <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    EMI Amount
                  </p>
                  <p className="text-2xl font-bold text-teal-700">
                    ₹{emiData.amount.toFixed(2)}
                  </p>
                </div> */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Grace Period
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        {loanDetails.gracePeriod} days
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Due Penalty
                      </p>
                      <p className="text-2xl font-bold text-teal-700">
                        {loanDetails.duePenalty}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <EmiStatusChart
                paidEmis={paidEmis}
                overdueEmis={overdueEmis}
                upcomingEmis={upcomingEmis}
                dueEmis={dueEmis}
                graceEmis={graceEmis}
              />
            </div>

            <EmiCards
              totalEmis={totalEmis}
              paidEmis={paidEmis}
              overdueEmis={overdueEmis}
              upcomingEmis={upcomingEmis}
              dueEmis={dueEmis}
              graceEmis={graceEmis}
              totalAmount={totalAmount}
              totalPenalty={totalPenalty}
              paidpenalty={paidpenalty}
              totalPaid={totalPaid}
            />

            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-white border-b">
                <CardTitle className="text-teal-800">EMI Schedule</CardTitle>
                <CardDescription>
                  View and manage all EMI payments for this loan.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <EmiTable emiData={emiData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiDetails