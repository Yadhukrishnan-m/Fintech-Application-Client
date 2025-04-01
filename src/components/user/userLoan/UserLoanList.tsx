import {  IUserLoanPopulated } from "@/interfaces/interfaces";
import {
  Calendar,
  CreditCard,
  Percent,
  Clock,
  ArrowRightCircle,
} from "lucide-react";


interface LoanCardProps {
  loan: IUserLoanPopulated;
  onViewDetails: (loanId: string) => void;
}
export default function UserLoanListCard({
  loan,
  onViewDetails,
}: LoanCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-teal-500 to-teal-800 text-white p-6 rounded-xl shadow-lg w-[30%] mb-6 transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

      {/* Loan Information */}
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-teal-200" />
        {loan.loanId.name}
      </h3>

      <div className="grid grid-cols-1 gap-3 mt-4">
        <div className="space-y-2">
          <p className="text-sm opacity-90 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-200" />
            <span>
              Applied: {new Date(loan.createdAt).toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm opacity-90 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-teal-200" />
            <span>Amount: ₹{loan.amount.toLocaleString()}</span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm opacity-90 flex items-center gap-2">
            <Percent className="h-5 w-5 text-teal-200" />
            <span>Interest: {loan.interest}%</span>
          </p>
          <p className="text-sm opacity-90 flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-200" />
            <span>Tenure: {loan.tenure} months</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          <p className="text-teal-200 font-medium">Next Due Date:</p>
          <p className="font-semibold">
            {new Date(loan.nextDueDate).toLocaleDateString()}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(loan._id)}
          className="flex items-center justify-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-md font-semibold transition hover:bg-teal-600 hover:text-white"
        >
          View Details
          <ArrowRightCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}