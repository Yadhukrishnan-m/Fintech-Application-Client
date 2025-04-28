 ;

import { useState } from "react";
import {
  Banknote,
  Calendar,
  Check,
  Clock,
  FileText,
  Info,
  Percent,
  Timer,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ILoanApplication } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import AlertDialog from "@/components/shared/AlertDialog";
import { AxiosError } from "axios";
import { ErrorToast, SuccessToast } from "@/components/shared/Toast";
import userAxiosInstance from "@/config/UserAxiosInstence";

interface ApplicationDetailsCardProps {
  applicationData: ILoanApplication;
}

export default function ApplicationDetailsCard({
  applicationData,
}: ApplicationDetailsCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDocName, setSelectedDocName] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen]=useState(false)

  // Destructure application data
  let {status}=applicationData
  const {
    applicationId,
    createdAt,
    amount,
    interest,
    tenure,
    
    message,
    duePenalty,
    documents,
    accountNumber,
    
  } = applicationData;

  // Format the amount with Indian Rupee symbol and thousands separator
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <Check className="h-5 w-5 text-emerald-500" />;
      case "rejected":
        return <X className="h-5 w-5 text-rose-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

 async function  handleLogoutConfirm(){

  try {
   const responce= await userAxiosInstance.get(
      `/application/cancel-application/${applicationData._id}`
    );
    if (responce.data.success) {
      status='cancelled'
      SuccessToast('responce.data.success')
    }

    
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      ErrorToast(error.response.data.message);
    } else {
      ErrorToast("An unknown error occurred.");
    }
  } finally {
   setIsAlertOpen(false)
  }
 }

  return (
    <Card className="w-full max-w-7xl shadow-xl border-0 overflow-hidden bg-white">
      {/* Status Banner */}
      <div
        className={`w-full py-4 px-2 flex items-center justify-between ${
          status === "approved"
            ? "bg-emerald-50 border-b border-emerald-100"
            : status === "pending"
            ? "bg-amber-50 border-b border-amber-100"
            : "bg-rose-50 border-b border-rose-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`px-3 py-1 text-sm font-medium flex items-center gap-1.5 ${
              status === "approved"
                ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                : status === "pending"
                ? "border-amber-200 bg-amber-100 text-amber-700"
                : "border-rose-200 bg-rose-100 text-rose-700"
            }`}
          >
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <span
            className={`text-sm font-medium ${
              status === "approved"
                ? "text-emerald-700"
                : status === "pending"
                ? "text-amber-700"
                : "text-rose-700"
            }`}
          >
            Application ID: <span className="font-bold">{applicationId}</span>
          </span>
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </div>
      </div>

      <CardContent className="p-0">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Loan Application Details
          </h2>
          <p className="text-gray-500 mb-6">
            Review your loan application information and uploaded documents
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loan Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <Info className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Loan Information
                </h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-teal-600" />
                      <p className="text-2xl font-bold text-gray-800">
                        {formattedAmount}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <div className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-teal-600" />
                      <p className="text-2xl font-bold text-gray-800">
                        {interest}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tenure</p>
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-teal-600" />
                      <p className="text-2xl font-bold text-gray-800">
                        {tenure} months
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Due Penalty</p>
                    <div className="flex items-center gap-2">
                      <Percent className="h-5 w-5 text-teal-600" />
                      <p className="text-2xl font-bold text-gray-800">
                        {duePenalty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {status === "rejected" && message && (
                <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl">
                  <h4 className="text-base font-medium text-rose-700 mb-2 flex items-center gap-2">
                    <X className="h-5 w-5" />
                    Rejection Reason
                  </h4>
                  <p className="text-rose-600 text-sm">{message}</p>
                </div>
              )}

              {status === "approved" && (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                  <h4 className="text-base font-medium text-emerald-700 mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Approval Information
                  </h4>
                  <p className="text-emerald-600 text-sm">
                    Your loan has been approved. money is transfered ti account
                    .No:- {accountNumber}
                  </p>
                </div>
              )}

              {status === "pending" && (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                  <h4 className="text-base font-medium text-amber-700 mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Application Status
                  </h4>
                  <p className="text-amber-600 text-sm mb-4">
                    Your application is currently under review. We will notify
                    you once a decision has been made.
                  </p>
                  <Button
                    variant="destructive"
                    className="w-full md:w-auto flex items-center gap-2"
                    onClick={()=>setIsAlertOpen(true)}
                  >
                    <X className="h-4 w-4" />
                    Cancel Application
                  </Button>
                  <AlertDialog
                    isOpen={isAlertOpen}
                    onConfirm={handleLogoutConfirm}
                    onClose={() => setIsAlertOpen(false)}
                    title="Confirm cancel "
                    message="Are you sure you want to cancel the application?"
                  />
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Uploaded Documents
                  </h3>
                </div>
                <Badge variant="outline" className="bg-gray-100 text-gray-700">
                  {documents.length}{" "}
                  {documents.length === 1 ? "Document" : "Documents"}
                </Badge>
              </div>

              {documents.length > 0 ? (
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                  <div
                    className={`grid grid-cols-1 ${
                      documents.length > 1 ? "sm:grid-cols-2" : ""
                    } ${documents.length > 3 ? "lg:grid-cols-3" : ""} gap-4`}
                  >
                    {documents.map((doc, index) => {
                      const [docName, docUrl] = Object.entries(doc)[0];

                      return (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all hover:border-teal-300 group"
                          onClick={() => {
                            setSelectedImage(docUrl);
                            setSelectedDocName(docName);
                            setIsDialogOpen(true);
                          }}
                        >
                          <div className="p-3 bg-white border-b border-gray-200 group-hover:border-teal-200 transition-colors">
                            <h4 className="text-sm font-medium text-gray-700 group-hover:text-teal-700 truncate">
                              {docName}
                            </h4>
                          </div>
                          <div className="h-36 relative bg-white">
                            <img
                              src={docUrl || "/placeholder.svg"}
                              alt={docName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg?height=200&width=300";
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-xl text-center text-gray-500 border border-gray-200">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium text-gray-600 mb-1">
                    No Documents
                  </p>
                  <p className="text-sm text-gray-500">
                    No documents have been uploaded for this application.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Document Viewer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              {selectedDocName}
            </DialogTitle>
          </DialogHeader>

          <div className="h-[60vh] bg-gray-100 flex items-center justify-center p-4">
            <img
              src={selectedImage || ""}
              alt="Document Preview"
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/placeholder.svg?height=600&width=800";
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
