import { useEffect, useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import { useNavigate, useParams } from "react-router-dom";

interface Loan {
  _id: string;
  loanId: {
    _id: string;
    name: string;
  };
  amount: number;
  userLoanId: string;
  gracePeriod: number;
  interest: number;
  duePenalty: number;
  tenure: number;
}

export default function LoansOfUser() {
  const [userLoans, setUserLoans] = useState<Loan[]>([]);
  const [hoveredLoan, setHoveredLoan] = useState<string | null>(null);
  const {id}=useParams()
 const navigate=useNavigate()
  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const response = await adminAxiosInstance.get(
          `/user/user-loans/${id}`
        );

        setUserLoans(response.data.userLoans);
      } catch (error) {
        console.error("Error fetching user loans:", error);
      }
    };

    fetchUserLoans();
  }, [id]);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6"> Loans taken</h2>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Loans</h3>
          <Badge
            variant="outline"
            className="bg-teal-50 text-teal-700 border-teal-200"
          >
            {userLoans.length} Active
          </Badge>
        </div>

        <div className="space-y-2 mt-4">
          {userLoans.map((loan) => (
            <Card
              key={loan._id}
              className={`cursor-pointer transition-all duration-200 ${
                hoveredLoan === loan._id
                  ? "border-teal-500 shadow-sm"
                  : "border-gray-200"
              }`}
              onClick={() =>
                console.log(`View details for loan: ${loan.userLoanId}`)
              }
              onMouseEnter={() => setHoveredLoan(loan._id)}
              onMouseLeave={() => setHoveredLoan(null)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <CreditCard className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-sm">
                          {loan.loanId.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-teal-50 text-teal-700 text-[10px] px-1.5 py-0"
                        >
                          {loan.userLoanId}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>${loan.amount.toLocaleString()}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>{loan.tenure} months</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>{loan.interest}% interest</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className={`flex items-center text-xs font-medium ${
                        hoveredLoan === loan._id
                          ? "text-teal-600"
                          : "text-muted-foreground"
                      }`}
                      onClick={()=>navigate(`/admin/user-loan/${loan._id}`)}
                    >
                      Details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
