import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle, FileText, Loader2, X } from "lucide-react";
import { ILoanApplication } from "../../interfaces/interfaces";
import AlertDialog from "../shared/AlertDialog";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../shared/Toast";
import { AxiosError } from "axios";
import { applicationService } from "@/api/admin/ApplicationServices";
interface ApplicationDetailsProps {
  applicationData: ILoanApplication;
}

export default function ApplicationDetails({
  applicationData,
}: ApplicationDetailsProps) {
   
    
  const [application,] =
    useState<ILoanApplication>(applicationData);
const [loading, setLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(
      null
    );
  const navigate = useNavigate();
  const confirmApproval = async () => {
      try {
        let payload
setLoading(true)
        if (actionType==='approve') {
            payload = { status: "approved" };
        }else

        if (actionType === "reject") {
          payload = { status: "rejected", message: rejectionReason };
        }else{
          return
        }

        const response = await applicationService.verifyApplication(
          application._id,
          payload
        );


        if (response.data.success) {
            SuccessToast('successfully updated')
          navigate("/admin/application");
        }
      } catch (error) {
        console.log(error);
       if (error instanceof AxiosError) {
               ErrorToast(error.response!.data.message);
              
             }
      } finally {
        setIsAlertOpen(false);
        setLoading(false);
      }
  };
  const handleApprove = () => {
   setActionType("approve");
  setIsAlertOpen(true);
  };

  const handleReject = () => {
   if (!rejectionReason.trim()) return;
  setActionType("reject");
  setIsAlertOpen(true)
 setShowRejectionForm(false);
    
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-500">Pending</Badge>;
    }
  };

  if(loading)return (
    <div className="flex justify-center items-center h-96">
      <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
      <span className="ml-2 text-teal-600">updating aplication status ...</span>
    </div>
  );

  return (
    <div className="container mx-auto p-1 max-w-8xl">
        
      <Card className="border-teal-1 border-t-4 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-teal-800 text-2xl">
                Loan Application
              </CardTitle>
              <CardDescription>
                Application ID: {application.applicationId}
              </CardDescription>
            </div>
            <div>{getStatusBadge(application.status)}</div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Applicant Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">
                    {application.userId?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer ID:</span>
                  <span className="font-medium">
                    {application.userId?.customerId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">
                    {application.userId?.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Job:</span>
                  <span className="font-medium">{application.userId?.job}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Number:</span>
                  <span className="font-medium">
                    {application.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">IFSC CODE:</span>
                  <span className="font-medium">
                    {application.ifscCode}
                  </span>
                </div>{" "}
                <div className="flex justify-between">
                  <span className="text-gray-500">Income:</span>
                  <span className="font-medium">
                    RS.{application.userId?.income}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CIBIL Score:</span>
                  <span
                    className={`font-medium ${
                      application.userId?.cibilScore &&
                      application.userId.cibilScore > 700
                        ? "text-green-600"
                        : application.userId?.cibilScore &&
                          application.userId.cibilScore > 500
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {application.userId?.cibilScore}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Loan Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Loan Name:</span>
                  <span className="font-medium">{application.loanId.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Loan Id:</span>
                  <span className="font-medium">
                    {application.loanId.loanId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Loan Amount:</span>
                  <span className="font-medium">${application.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tenure:</span>
                  <span className="font-medium">
                    {application.tenure} months
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Interest Rate:</span>
                  <span className="font-medium">{application.interest}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Due Penalty:</span>
                  <span className="font-medium">{application.duePenalty}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Application Date:</span>
                  <span className="font-medium">
                    {formatDate(application.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {application.status === "rejected" && application.message && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-700">
                    Rejection Reason
                  </h4>
                  <p className="text-red-600 mt-1">{application.message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-5 shadow-sm border border-teal-100 mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {application.documents.map((doc, index) => {
                const docEntries = Object.entries(doc);
                return docEntries.map(([key, value], i) => (
                  <div
                    key={`${index}-${i}`}
                    className="border rounded-lg p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-sm font-medium">{key}</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                          onClick={() => setSelectedImage(value)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{key}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 flex justify-center">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt={key}
                            className="max-h-[70vh] object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ));
              })}
            </div>
          </div>
        </CardContent>

        {application.status === "pending" && (
          <CardFooter className="flex justify-end space-x-4 bg-gray-50 py-4">
            {showRejectionForm ? (
              <div className="w-full space-y-3">
                <Textarea
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full border-teal-200 focus:border-teal-300 focus:ring-teal-200"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowRejectionForm(false)}
                    className="bg-white border-teal-500 text-teal-600 hover:bg-teal-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={rejectionReason.trim() === ""}
                    className="bg-white border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="bg-white border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setShowRejectionForm(true)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  className="bg-white border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                  onClick={handleApprove}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>
      <AlertDialog
        isOpen={isAlertOpen}
        onConfirm={confirmApproval}
        onClose={() => setIsAlertOpen(false)}
        title={
          actionType === "approve"
            ? "Confirm Loan Approval"
            : "Confirm Loan Rejection"
        }
        message={
          actionType === "approve"
            ? "Are you sure you want to approve this loan and transfer money?"
            : "Are you sure you want to reject this loan?"
        }
      />
    </div>
  );
}
