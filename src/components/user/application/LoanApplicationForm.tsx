import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Check, FileText, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { ErrorToast, SuccessToast } from "@/components/shared/Toast";
import { AxiosError } from "axios";
// import { ErrorToast } from "@/components/shared/Toast";

// Loan Data Type
type LoanData = {
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
  additionalDocuments: string[];
};

// Define a default loan data shape to prevent null issues
const defaultLoanData: LoanData = {
  _id: "",
  loanId: "",
  name: "Loan",
  description: "",
  isActive: true,
  minimumAmount: 1000,
  maximumAmount: 100000,
  minimumTenure: 6,
  maximumTenure: 36,
  minimumInterest: 0,
  maximumInterest: 0,
  duePenalty: 0,
  features: "",
  eligibility: "",
  loanImage: "",
  additionalDocuments: [],
};

export default function LoanApplicationForm() {
  const { id } = useParams();
  const [loanData, setLoanData] = useState<LoanData>(defaultLoanData);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fetchError, setFetchError] = useState(false); // New state for fetch error
  const navigate = useNavigate();
  // Create schema based on loan data
  const formSchema = z.object({
    amount: z
      .number()
      .min(
        loanData.minimumAmount,
        `Amount must be at least ₹${loanData.minimumAmount.toLocaleString()}`
      )
      .max(
        loanData.maximumAmount,
        `Amount cannot exceed ₹${loanData.maximumAmount.toLocaleString()}`
      ),
    tenure: z.string().refine((val) => {
      const num = Number.parseInt(val);
      return num >= loanData.minimumTenure && num <= loanData.maximumTenure;
    }, `Tenure must be between ${loanData.minimumTenure} and ${loanData.maximumTenure} months`),
    ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
    accountNumber: z
      .string()
      .min(9, "Account Number must be at least 9 digits")
      .max(18, "Account Number must be at most 18 digits")
      .regex(/^\d+$/, "Account Number must contain only numbers"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: loanData.minimumAmount,
      tenure: loanData.minimumTenure.toString(),
      ifscCode: "",
      accountNumber: "",
    },
  });

  useEffect(() => {
    if (dataLoaded) {
      form.reset({
        amount: loanData.minimumAmount,
        tenure: loanData.minimumTenure.toString(),
      });
    }
  }, [dataLoaded, form, loanData]);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        if (!id) {
          throw new Error("Loan ID is required");
        }

        const response = await userAxiosInstance.get(`/loan/${id}`);
        if (response.data.success) {
          setLoanData(response.data.loan);
          setDataLoaded(true);
        } else {
          throw new Error("Failed to load loan details");
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
        setFetchError(true);
        setErrorMessage("An error occurred while fetching loan details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanData();
  }, [id]);

  function handleFileChange(
    document: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Please upload only JPG or PNG image formats");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit");
      event.target.value = "";
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [document]: file }));
    setErrorMessage("");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const requiredDocuments = loanData.additionalDocuments || [];
    const allDocumentsUploaded = requiredDocuments.every((doc) => files[doc]);

    if (!allDocumentsUploaded) {
      ErrorToast("Please upload all required documents");
      setErrorMessage("Please upload all required documents");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      formData.append("loanId", loanData._id);
      formData.append("amount", values.amount.toString());
      formData.append("tenure", values.tenure);
      formData.append("accountNumber", values.accountNumber);
      formData.append("ifscCode", values.ifscCode);

      requiredDocuments.forEach((docName) => {
        if (files[docName]) {
          formData.append(docName, files[docName]!);
        }
      });

      const response = await userAxiosInstance.post("/apply-loan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitting(false);
      if (response.data.success) {
        SuccessToast("successfully applied for loan");
        navigate(`/dashboard/applications`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message || "An unknown error occurred";

        if (errorMessage === "Blacklisted user cant do this operation") {
          setErrorMessage("You are blacklisted and cannot apply for a loan.");
          ErrorToast("You are blacklisted and cannot apply for a loan.");
        } else {
          setErrorMessage(errorMessage);
          ErrorToast(errorMessage);
        }
        setIsSubmitting(false);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          <p className="mt-2 text-gray-600">Loading loan details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Alert className="max-w-md bg-red-50 border-red-200 text-red-800">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const validTenures = [6, 12, 18, 24, 36, 48];
  const tenureOptions = validTenures.filter(
    (tenure) =>
      tenure >= loanData.minimumTenure && tenure <= loanData.maximumTenure
  );

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      <Card className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-white">
          <div className="flex items-center">
            <div className="w-2 h-10 bg-teal-500 rounded-r mr-4"></div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {loanData.name} Application
              </CardTitle>
              <CardDescription className="text-gray-500 mt-1">
                Complete the form below to apply for your loan
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Loan Amount (₹)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      Enter an amount between ₹
                      {loanData.minimumAmount.toLocaleString()} and ₹
                      {loanData.maximumAmount.toLocaleString()}
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Account Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* IFSC Code */}
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      IFSC Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Loan Tenure (Months)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 focus:border-teal-500 focus:ring-teal-500">
                          <SelectValue placeholder="Select loan tenure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tenureOptions.map((tenure) => (
                          <SelectItem key={tenure} value={tenure.toString()}>
                            {tenure} months
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-gray-500 text-sm">
                      Choose a tenure between {loanData.minimumTenure} and{" "}
                      {loanData.maximumTenure} months
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {loanData.additionalDocuments &&
                loanData.additionalDocuments.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                      Required Documents
                    </h3>
                    {loanData.additionalDocuments.map((document, index) => (
                      <div key={index} className="space-y-2">
                        <FormLabel
                          htmlFor={`document-${index}`}
                          className="block text-gray-700 font-medium"
                        >
                          {document.charAt(0).toUpperCase() + document.slice(1)}
                        </FormLabel>
                        <div className="relative">
                          <div
                            className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                              files[document]
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-teal-400"
                            }`}
                          >
                            {files[document] ? (
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-teal-500 mr-2" />
                                <span className="text-sm text-gray-700 truncate flex-1">
                                  {files[document]?.name}
                                </span>
                                <Check className="h-5 w-5 text-teal-500" />
                              </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  JPG or PNG (max 5MB)
                                </p>
                              </div>
                            )}
                            <Input
                              id={`document-${index}`}
                              type="file"
                              onChange={(e) => handleFileChange(document, e)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              accept=".jpg,.jpeg,.png"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {errorMessage && submitStatus === "error" && (
                <Alert className="bg-red-50 border-red-200 text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {submitStatus === "success" && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your loan application has been submitted successfully. We'll
                    review your application and get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              <CardFooter className="px-0 pt-2 pb-0">
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
