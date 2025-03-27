import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { ArrowRight, } from "lucide-react";
import { Link } from "react-router-dom";

interface Loan {
  _id: string;
  loanId: string;
  name: string;
  description: string;
  isActive: boolean;
  minimumAmount: number;
  maximumAmount: number;
  minimumTenure: number;
  maximumTenure: number;
  minimumInterest: number;
  maximumInterest: number;
  duePenalty: number;
  features: string;
  eligibility: string;
  loanImage: string;
  createdAt: string;
  updatedAt: string;
}

interface LoanListProps {
  loans: Loan[];
}

export default function LoanList({ loans }: LoanListProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get a short description from the full description
//   const getShortDescription = (description: string) => {
//     return description.length > 100
//       ? description.substring(0, 100) + "..."
//       : description;
//   };

  return (
    <div className="max-w-6xxl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-teal-800 mb-8">
        Loans we provide
      </h1>

      <div className="space-y-8">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="flex flex-col md:flex-row gap-6 border-b border-teal-100 pb-8"
          >
            {/* Left side - Loan type with icon */}
            <div className="md:w-1/4 flex flex-col items-center text-center">
              <div className="bg-teal-50 p-4 rounded-full mb-3">
                <img
                  src={loan.loanImage}
                  alt={loan.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </div>
              <h2 className="text-lg font-semibold text-teal-800 mb-1">
                {loan.name}
              </h2>
              <p className="text-sm text-gray-600 mb-3 px-4">
                {/* {getShortDescription(loan.features)} */}
              </p>
              <Link to={`/loan/application/${loan._id}`}>
                <Button
                  variant="outline"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50"
                >
                  Apply now
                </Button>
              </Link>
            </div>

            {/* Right side - Application details */}
            <div className="md:w-3/4 bg-white p-6 rounded-lg">
              <p className="text-gray-700 mb-4">{loan.description} </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-teal-50 px-3 py-1 rounded text-sm">
                  <span className="text-gray-600">Amount:</span>{" "}
                  <span className="font-medium text-teal-800">
                    {formatCurrency(loan.minimumAmount)} -{" "}
                    {formatCurrency(loan.maximumAmount)}
                  </span>
                </div>
                <div className="bg-teal-50 px-3 py-1 rounded text-sm">
                  <span className="text-gray-600">Tenure:</span>{" "}
                  <span className="font-medium text-teal-800">
                    {loan.minimumTenure} - {loan.maximumTenure} months
                  </span>
                </div>
                <div className="bg-teal-50 px-3 py-1 rounded text-sm">
                  <span className="text-gray-600">Interest:</span>{" "}
                  <span className="font-medium text-teal-800">
                    {loan.minimumInterest}% - {loan.maximumInterest}%
                  </span>
                </div>
              </div>

              <Link to={`/loan/${loan._id}`}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
