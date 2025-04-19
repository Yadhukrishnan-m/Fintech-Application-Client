import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { useLocation, useNavigate } from "react-router-dom";
import { SuccessToast } from "@/components/shared/Toast";

const customerSchema = z.object({
  phone: z
    .string()
    .min(10, "phone number need  10 digits")
    .max(10, "phone number need  10 digits"),
  dob: z
    .string()
    .min(1, "Date of Birth is required")
    .refine((dob) => {
      const dobDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();

      // Adjust for cases where birthday hasn't occurred yet this year
      const monthDiff = today.getMonth() - dobDate.getMonth();
      const dayDiff = today.getDate() - dobDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
      }

      return age >= 18;
    }, "You must be at least 18 years old"),
  job: z.string().min(3, "Job title is required"),
  income: z.coerce
    .number()
    .positive("Income must be a positive number")
    .or(z.literal("")),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select a valid gender" }),
  }),
  aadhaarNumber: z.string().min(12, "Aadhaar must be 12 digits").max(12),
  panNumber: z.string().min(10, "PAN must be 10 characters").max(10),
  cibilScore: z.coerce
    .number()
    .min(300, "CIBIL Score must be 300-900")
    .max(900)
    .or(z.literal("")),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export default function CustomerForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [cibilFile, setCibilFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState<{
    aadhaar: string | null;
    pan: string | null;
    cibil: string | null;
  }>({
    aadhaar: null,
    pan: null,
    cibil: null,
  });
const [loading, setLoading] = useState(false);



  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      phone: "",
      dob: "",
      job: "",
      income: "",
      gender: "male" as "male" | "female" | "other",
      aadhaarNumber: "",
      panNumber: "",
      cibilScore: "",
    },
  });

  // Function to validate file type (only images allowed)
  const validateImageFile = (file: File | null): boolean => {
    if (!file) return false;

    // Check if the file type starts with 'image/'
    return file.type.startsWith("image/");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    fileType: "aadhaar" | "pan" | "cibil"
  ) => {
    // Clear previous error for this file type
    setFileErrors((prev) => ({ ...prev, [fileType]: null }));

    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validate file is an image
      if (!validateImageFile(selectedFile)) {
        setFileErrors((prev) => ({
          ...prev,
          [fileType]: "Only image files are allowed (jpg, png, etc.)",
        }));
        // Reset the input value to clear the selected file
        event.target.value = "";
        return;
      }

      // If validation passes, set the file
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true); // Start loading

    // Validate files before submitting
    const aadhaarValid = validateImageFile(aadhaarFile);
    const panValid = validateImageFile(panFile);
    const cibilValid = validateImageFile(cibilFile);

    // Update error states
    setFileErrors({
      aadhaar: aadhaarValid ? null : "image file required",
      pan: panValid ? null : "image file required",
      cibil: cibilValid ? null : "image file required",
    });
    if (aadhaarValid && panValid && cibilValid) {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("dob", data.dob);
      formData.append("job", data.job);
      formData.append("income", String(data.income));
      formData.append("gender", data.gender);
      formData.append("aadhaarNumber", data.aadhaarNumber);
      formData.append("panNumber", data.panNumber);
      formData.append("cibilScore", String(data.cibilScore));

      // Append files only if they exist
      if (aadhaarFile) formData.append("aadhaarDoc", aadhaarFile);
      if (panFile) formData.append("panDoc", panFile);
      if (cibilFile) formData.append("cibilDoc", cibilFile);

      try {
        const response = await userAxiosInstance.post(
          "/complete-profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        SuccessToast("successfully updated");
        if (response.data.success) {
          navigate("/dashboard/profile", {
            state: {
              updated: location?.state ? location.state?.from : "pending",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false); // Start loading
      }

      console.log("Form Data:", formData);
      setIsSubmitted(true);
    }
  };
  const renderFileUpload = (
    labelText: string,
    fileId: string,
    file: File | null,
    errorMsg: string | null,
    fileType: "aadhaar" | "pan" | "cibil"
  ) => {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <FormLabel className="block mb-2">{labelText}</FormLabel>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className={`w-full h-10 px-3 ${
                errorMsg
                  ? "text-red-600 border-red-200 hover:bg-red-50"
                  : "text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              }`}
              onClick={() => document.getElementById(fileId)?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {file ? file.name : "Choose File"}
            </Button>
            <input
              id={fileId}
              type="file"
              className="hidden"
              accept="image/*" // This restricts file selection dialog to show only images
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileType === "aadhaar"
                    ? setAadhaarFile
                    : fileType === "pan"
                    ? setPanFile
                    : setCibilFile,
                  fileType
                )
              }
            />
          </div>
          {errorMsg && (
            <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMsg}</span>
            </div>
          )}
          {file && !errorMsg && (
            <div className="mt-2">
              <div className="text-xs text-gray-500">Preview:</div>
              <div
                className="mt-1 border rounded overflow-hidden"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="bg-teal-50 border-b border-teal-100">
        <CardTitle className="text-2xl font-bold text-teal-700 text-center">
          Complete Your Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isSubmitted && (
          <Alert className="mb-6 bg-teal-50 border-teal-200">
            <Check className="h-4 w-4 text-teal-600" />
            <AlertDescription className="text-teal-700">
              Form submitted successfully!
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income (Yearly)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yearly income"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaarNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12-digit Aadhaar number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="panNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input placeholder="10-character PAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cibilScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIBIL Score</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Score between 300-900"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? undefined : e.target.value;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {renderFileUpload(
                "Upload Aadhaar",
                "aadhaarFile",
                aadhaarFile,
                fileErrors.aadhaar,
                "aadhaar"
              )}

              {renderFileUpload(
                "Upload PAN",
                "panFile",
                panFile,
                fileErrors.pan,
                "pan"
              )}

              {renderFileUpload(
                "Upload CIBIL Report",
                "cibilFile",
                cibilFile,
                fileErrors.cibil,
                "cibil"
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
