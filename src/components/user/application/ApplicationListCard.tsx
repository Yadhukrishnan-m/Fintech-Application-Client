import { Calendar, CreditCard, Percent, ArrowRightCircle } from "lucide-react";

interface LoanCardProps {
  status: string;
  amount: number;
  interest: number;
  createdAt: string;
  onClick: () => void;
}

const ApplicationListCard: React.FC<LoanCardProps> = ({
  status,
  amount,
  interest,
  createdAt,
  onClick,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-teal-500 to-teal-800 text-white p-6 rounded-xl shadow-lg w-96 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none" />

      {/* Status Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold 
          ${
            status === "approved"
              ? "bg-green-500"
              : status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }
        `}
      >
        {status}
      </div>

      {/* Loan Information */}
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-teal-200" />
        Application Details
      </h3>

      <div className="space-y-2">
        <p className="text-sm opacity-90 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-200" />
          <span>Applied: {createdAt}</span>
        </p>
        <p className="text-sm opacity-90 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-teal-200" />
          <span>Amount: ₹{amount}</span>
        </p>
        <p className="text-sm opacity-90 flex items-center gap-2">
          <Percent className="h-5 w-5 text-teal-200" />
          <span>Interest: {interest}%</span>
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onClick}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-md font-semibold transition hover:bg-teal-600 hover:text-white"
      >
        View Details
        <ArrowRightCircle className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ApplicationListCard;
