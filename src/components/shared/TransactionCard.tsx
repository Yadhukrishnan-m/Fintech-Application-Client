import React from "react";
import { CreditCard, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { ITransaction } from "@/interfaces/interfaces";

// Define the transaction interface with role
interface TransactionCardProps {
  transaction: ITransaction;
  role: "user" | "admin"; // Role prop to differentiate views
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  role,
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge with appropriate styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get transaction type badge with color based on role
  const getTypeBadge = (type: string) => {
    const isUser = role === "user";

    switch (type) {
      case "emi":
        return (
          <Badge
            variant="outline"
            className={
              isUser
                ? "border-red-500 text-red-700"
                : "border-green-500 text-green-700"
            }
          >
            {isUser ? "EMI Paid" : "EMI Received"}
          </Badge>
        );
      case "payout":
        return (
          <Badge
            variant="outline"
            className={
              isUser
                ? "border-green-500 text-green-700"
                : "border-red-500 text-red-700"
            }
          >
            {isUser ? "Loan Received" : "Loan Payout"}
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Card
      key={transaction._id}
      className="mb-3 overflow-hidden border-l-4 hover:shadow-md transition-shadow duration-200"
      style={{
        borderLeftColor:
          transaction.paymentStatus === "completed"
            ? "#10b981"
            : transaction.paymentStatus === "pending"
            ? "#f59e0b"
            : "#ef4444",
      }}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-3 flex items-center">
            <div className="rounded-full bg-teal-100 p-2 mr-3">
              <CreditCard className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              {transaction.transactionId && (
                <>
                  <p className="text-xs">Transaction ID</p>
                  <p className="font-medium text-sm text-gray-900">
                    {transaction.transactionId}
                  </p>
                </>
              )}

              {transaction.userLoanId?.loanId?.name && (
                <>
                  <p className="text-xs text-gray-500">
                    {transaction.userLoanId.loanId.name}
                  </p>
                </>
              )}

              {transaction.userLoanId?.userLoanId && (
                <>
                  <p className="text-xs">
                    user loan ID : {transaction.userLoanId.userLoanId}{" "}
                  </p>
                </>
              )}

              {role === "admin" && transaction.userId?.customerId && (
                <>
                  <p className="text-xs">
                    user ID : {transaction.userId.customerId}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(transaction.amount)}
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-xs text-gray-500">Type</p>
            <div className="mt-1">{getTypeBadge(transaction.type)}</div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-xs text-gray-500">Status</p>
            <div className="mt-1">
              {getStatusBadge(transaction.paymentStatus)}
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">
              {formatDate(transaction.createdAt)}
            </span>
          </div>
          {/* {role == "admin" && (
            <div className="col-span-12 md:col-span-1 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
              >
                Details
              </Button>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
