  import { useEffect, useState } from "react";
  import { Avatar, AvatarFallback } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { AxiosError } from "axios";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Separator } from "@/components/ui/separator";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
  import {
    CheckCircle,
    XCircle,
    User,
    Calendar,
    CreditCard,
    FileText,
    IndianRupee,
    Briefcase,
    Phone,
    Mail,
    AlertCircle,
    Loader2,
  } from "lucide-react";
  import adminAxiosInstance from "@/config/AdminAxiosInstence";
  import { useNavigate, useParams } from "react-router-dom";
  import AlertDialog from "../shared/AlertDialog";
  import { ErrorToast, SuccessToast } from '../shared/Toast'
  // Define the customer data type
  enum CustomerStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    REJECTED = "rejected",
  }


  type CustomerData = {
    _id: string;
    customerId: string;
    name: string;
    email: string;
    phone: number;
    dob: string;
    gender: string;
    income: number;
    job: string;
    aadhaarNumber: string;
    aadhaarDoc: string;
    panNumber: string;
    panDoc: string;
    cibilScore: number;
    cibilDoc: string;
    finscore: number;
    isBlacklisted: boolean;
    status: CustomerStatus;
    createdAt: string;
    updatedAt: string;
  };

  type UserVerificationProps = {
    mode: "verification" | "details"; 
  };

  export default function UserVerification({ mode }: UserVerificationProps) {
    const [customer, setCustomer] = useState<CustomerData | null>(null);
    //   const [isProcessing, setIsProcessing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [actionType, setActionType] = useState<"verify" | "reject" | null>(
      null
    );
    const [isBlacklistAlertOpen, setIsBlacklistAlertOpen] = useState(false);
    const [isBlacklisting, setIsBlacklisting] = useState<boolean | null>(null);

    const { id } = useParams();
    const navigate = useNavigate();
    // Fetch data on component mount and on every re-render
    useEffect(() => {
      const fetchCustomerData = async () => {
        setLoading(true);
        try {
          const response = await adminAxiosInstance.get(`/user/${id}`);
          console.log(response.data.user);

          setCustomer(response.data.user);
        } catch (err) {
          console.error(err);
          setError("Failed to load customer data");
        } finally {
          setLoading(false);
        }
      };
      if (id) fetchCustomerData();
    }, [id]);

    const handleVerify = async () => {
      setActionType("verify");
      setIsAlertOpen(true);
    };

    const handleConfirmAction = async () => {
      if (!actionType) return;

      try {
        const response = await adminAxiosInstance.patch(`/verify-user/${id}`, {
          status: actionType === "verify" ? true : false,
        });

        if (response.data.success) {
        SuccessToast('verification status changed');
          navigate("/admin/user-verification");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            ErrorToast(
              error.response.data?.message || "Aadhaar/PAN conflict detected"
            );
          } else {
            setError("Failed to process request");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsAlertOpen(false);
      }
    };
    const handleReject = async () => {
      setActionType("reject");
      setIsAlertOpen(true);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

  const handleBlacklistToggle = () => {
    setIsBlacklisting(!customer?.isBlacklisted); // Set true if user is not blacklisted, false otherwise
    setIsBlacklistAlertOpen(true);
  };

  const confirmBlacklistToggle = async () => {
    if (isBlacklisting === null) return;

    try {
      const response = await adminAxiosInstance.patch(`/blacklist-user/${id}`, {
        action: isBlacklisting, // `true` for blacklist, `false` for unblacklist
      });

      if (response.data.success) {
        SuccessToast("successfully updated blacklisting status");
        setCustomer((prev) => prev && { ...prev, isBlacklisted: isBlacklisting });
      }
    } catch (error) {
      console.error("Failed to update blacklist status", error);
      ErrorToast("Failed to update blacklist status. Please try again.");
    } finally {
      setIsBlacklistAlertOpen(false);
    }
  };
    if (loading) return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <span className="ml-2 text-teal-600">s...</span>
      </div>
    );
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!customer)
      return <p className="text-center text-gray-500">No customer found</p>;
    return (
      <div className=" mx-auto p-4">
        <Card className="shadow-md border-gray-200">
          {mode === "verification" && (
            <CardHeader className="bg-white border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-800 text-2xl">
                    Customer Verification
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Review customer information and verify their profile
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          )}
          {mode === "details" && (
            <CardHeader className="bg-white border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-800 text-2xl">
                    Customer Details
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    customer information to check their profile
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          )}

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Basic Info */}
              <div className="md:col-span-1 flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-24 h-24 border-2 border-teal-200">
                  <AvatarFallback className="bg-teal-100 text-teal-800 text-xl">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h3 className="font-bold text-xl text-gray-800">
                    {customer.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ID: {customer.customerId}
                  </p>
                </div>

                <div className="w-full space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800 break-all">
                      {customer.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">{customer.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">DOB: {customer.dob}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-800">
                      Gender: {customer.gender}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      CIBIL Score
                    </span>
                    <span className="text-sm font-bold">
                      {customer.cibilScore}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        customer.cibilScore < 550
                          ? "bg-red-500"
                          : customer.cibilScore < 650
                          ? "bg-yellow-500"
                          : customer.cibilScore < 750
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (customer.cibilScore / 900) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Customer Details and Documents */}
              <div className="md:col-span-2">
                <Tabs defaultValue="details">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="details">Customer Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="details"
                    className="p-4 border rounded-b-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Personal Information
                          </h4>
                          <Separator className="my-2" />

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                Occupation:
                              </span>
                              <span className="text-sm">{customer.job}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Income:</span>
                              <span className="text-sm">
                                ₹{customer.income.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Account Information
                          </h4>
                          <Separator className="my-2" />

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                FinScore:
                              </span>
                              <span className="text-sm">{customer.finscore}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                Blacklisted:
                              </span>
                              <span className="text-sm">
                                {customer.isBlacklisted ? "Yes" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            ID Information
                          </h4>
                          <Separator className="my-2" />

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                Aadhaar Number:
                              </span>
                              <span className="text-sm">
                                {customer.aadhaarNumber}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                PAN Number:
                              </span>
                              <span className="text-sm">
                                {customer.panNumber}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Timestamps
                          </h4>
                          <Separator className="my-2" />

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                Created:
                              </span>
                              <span className="text-sm">
                                {formatDate(customer.createdAt)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">
                                Updated:
                              </span>
                              <span className="text-sm">
                                {formatDate(customer.updatedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="documents"
                    className="p-4 border rounded-b-lg"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedImage(customer.aadhaarDoc)}
                          >
                            <div className="p-2 bg-gray-50 border-b">
                              <h4 className="text-sm font-medium">
                                Aadhaar Document
                              </h4>
                            </div>
                            <div className="h-40 relative">
                              <img
                                src={customer.aadhaarDoc || "/placeholder.svg"}
                                alt="Aadhaar Document"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder.svg?height=200&width=300";
                                }}
                              />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <div className="h-[80vh] relative">
                            <img
                              src={selectedImage || ""}
                              alt="Document Preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg?height=600&width=800";
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedImage(customer.panDoc)}
                          >
                            <div className="p-2 bg-gray-50 border-b">
                              <h4 className="text-sm font-medium">
                                PAN Document
                              </h4>
                            </div>
                            <div className="h-40 relative">
                              <img
                                src={customer.panDoc || "/placeholder.svg"}
                                alt="PAN Document"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder.svg?height=200&width=300";
                                }}
                              />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <div className="h-[80vh] relative">
                            <img
                              src={selectedImage || ""}
                              alt="Document Preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg?height=600&width=800";
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedImage(customer.cibilDoc)}
                          >
                            <div className="p-2 bg-gray-50 border-b">
                              <h4 className="text-sm font-medium">
                                CIBIL Document
                              </h4>
                            </div>
                            <div className="h-40 relative">
                              <img
                                src={customer.cibilDoc || "/placeholder.svg"}
                                alt="CIBIL Document"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder.svg?height=200&width=300";
                                }}
                              />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <div className="h-[80vh] relative">
                            <img
                              src={selectedImage || ""}
                              alt="Document Preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg?height=600&width=800";
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {customer.status === "rejected" && (
              <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Profile Rejected</h4>
                  <p className="text-sm text-red-700">
                    This customer profile has been rejected due to verification
                    issues.
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          {mode === "verification" && (
            <CardFooter className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                onClick={handleReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Profile
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleVerify}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verify Profile
              </Button>
            </CardFooter>
          )}
          {mode === "details" && (
            <CardFooter className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant={customer?.isBlacklisted ? "default" : "outline"}
                className={
                  customer?.isBlacklisted
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                }
                onClick={handleBlacklistToggle}
              >
                {customer?.isBlacklisted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Remove from Blacklist
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Blacklist User
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>

        <AlertDialog
          isOpen={isAlertOpen}
          onConfirm={handleConfirmAction}
          onClose={() => setIsAlertOpen(false)}
          title={`Confirm ${
            actionType === "verify" ? "Verification" : "Rejection"
          }`}
          message={`Are you sure you want to ${
            actionType === "verify" ? "verify" : "reject"
          } this profile?`}
        />
        <AlertDialog
          isOpen={isBlacklistAlertOpen}
          onConfirm={confirmBlacklistToggle}
          onClose={() => setIsBlacklistAlertOpen(false)}
          title={
            isBlacklisting
              ? "Confirm Blacklisting"
              : "Confirm Removal from Blacklist"
          }
          message={
            isBlacklisting
              ? "Are you sure you want to blacklist this user?"
              : "Are you sure you want to remove this user from the blacklist?"
          }
        />
      </div>
    );
  }
