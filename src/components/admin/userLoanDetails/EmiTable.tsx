 ;

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IEMI } from "@/interfaces/interfaces";
import { Eye, AlertCircle } from "lucide-react";
import moment from "moment";

interface EmiTableProps {
  emiData: IEMI[];
}

export function EmiTable({ emiData }: EmiTableProps) {
  const [selectedEmi, setSelectedEmi] = useState<IEMI | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewTransaction = (emi: IEMI) => {
    setSelectedEmi(emi);
    setDialogOpen(true);
  };

  const formatDate = (date: Date | string) => {
    return moment(date).format("MMM D, YYYY");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Upcoming
          </Badge>
        );
      case "due":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Due Today
          </Badge>
        );
      case "grace":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Grace Period
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-teal-50 to-white">
              <TableHead className="w-[80px]">EMI #</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Grace Period</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Penalty</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emiData.map((emi) => (
              <TableRow
                key={emi.emiNumber}
                className={
                  emi.status === "overdue"
                    ? "bg-red-50 hover:bg-red-100"
                    : emi.status === "paid"
                    ? "bg-green-50 hover:bg-green-100"
                    : "hover:bg-gray-100"
                }
              >
                <TableCell className="font-medium">{emi.emiNumber}</TableCell>
                <TableCell>{formatDate(emi.dueDate)}</TableCell>
                <TableCell>{formatDate(emi.gracePeriodEndDate)}</TableCell>
                <TableCell className="text-right font-medium">
                  ₹{emi.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {emi.penalty > 0 ? (
                    <div className="flex items-center justify-end">
                      <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500 font-medium">
                        ₹{emi.penalty.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    "₹0.00"
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  ₹{(emi.penalty + emi.amount).toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(emi.status)}</TableCell>
                <TableCell className="text-center">
                  {emi.transaction ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewTransaction(emi)}
                      className="h-8 w-8 p-0 text-teal-600 hover:bg-teal-100 hover:text-teal-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No transaction
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-teal-800 text-xl flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Transaction Details
            </DialogTitle>
            <DialogDescription>
              EMI #{selectedEmi?.emiNumber} payment information
            </DialogDescription>
          </DialogHeader>

          {selectedEmi?.transaction && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="text-center mb-3">
                  <span className="text-xs text-gray-500">Transaction ID</span>
                  <div className="font-mono text-sm bg-white p-2 rounded border border-gray-200 shadow-sm">
                    {selectedEmi.transaction.transactionId}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500"> Total Amount</div>
                    <div className="font-bold text-teal-700">
                      ₹{selectedEmi.transaction.amount.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500">Penalty</div>
                    <div
                      className={`font-bold ${
                        (selectedEmi?.transaction?.penaltyAmount ?? 0) > 0
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      ₹
                      {selectedEmi?.transaction?.penaltyAmount?.toFixed(2) ??
                        "0.00"}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500">Emi amount</div>
                    <div className="font-bold text-blue-700">
                      ₹
                      {selectedEmi?.transaction?.amount !== undefined &&
                      selectedEmi?.transaction?.penaltyAmount !== undefined
                        ? (
                            selectedEmi.transaction.amount -
                            selectedEmi.transaction.penaltyAmount
                          ).toFixed(2)
                        : "0.00"}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="font-bold text-green-700 capitalize">
                      {selectedEmi.transaction.paymentStatus}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="text-xs text-gray-500">Payment Date</div>
                  <div className="font-medium">
                    {formatDate(selectedEmi.transaction.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
