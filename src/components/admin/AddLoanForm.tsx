
// import { useState, type ChangeEvent } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Upload, X, Plus, Trash2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import adminAxiosInstance from "@/config/AdminAxiosInstence";
// import { useNavigate } from "react-router-dom";
// import { ErrorToast, SuccessToast } from "../shared/Toast";
// import { AxiosError } from "axios";

// // Define the form schema with Zod
// const formSchema = z
//   .object({
//     name: z
//       .string()
//       .min(10, { message: "Name must be at least 10 characters." }),
//     description: z
//       .string()
//       .min(10, { message: "Description must be at least 10 characters." }),
//     status: z.string({
//       required_error: "Please select a status.",
//     }),
//     minimum_amount: z.coerce
//       .number()
//       .positive({ message: "Minimum amount must be positive." })
//       .min(1000, { message: "Minimum amount must be at least 1000." }),
//     maximum_amount: z.coerce
//       .number()
//       .positive({ message: "Maximum amount must be positive." })
//       .max(1000000, { message: "Maximom amount must be at least 1000000." }),
//     minimum_tenure: z.string({
//       required_error: "Please select minimum tenure.",
//     }),
//     maximum_tenure: z.string({
//       required_error: "Please select maximum tenure.",
//     }),
//     minimum_interest: z.coerce
//       .number()
//       .min(1, { message: "Minimum interest cannot be negative." }),
//     maximum_interest: z.coerce
//       .number()
//       .positive({ message: "Maximum interest must be positive." })
//       .max(99, { message: "Maximom interest should be upto 99%." }),
//     due_penalty: z.coerce
//       .number()
//       .min(1, { message: "Due penalty cannot be negative and minimum 1%." }),
//     features: z
//       .string()
//       .min(10, { message: "Features must be at least 10 characters." }),
//     eligibility: z
//       .string()
//       .min(10, { message: "Eligibility must be at least 10 characters." }),
//     additional_documents: z
//       .array(
//         z
//           .string()
//           .min(5, {
//             message: "Each document description must be at least 5 characters.",
//           })
//       )
//       .max(5, { message: "You can add a maximum of 5 additional documents." })
//       .optional(),
//   })

//   .refine((data) => data.maximum_amount > data.minimum_amount, {
//     message: "Maximum amount must be greater than minimum amount",
//     path: ["maximum_amount"],
//   })
//   .refine(
//     (data) =>
//       Number.parseInt(data.maximum_tenure) >
//       Number.parseInt(data.minimum_tenure),
//     {
//       message: "Maximum tenure must be greater than minimum tenure",
//       path: ["maximum_tenure"],
//     }
//   )

//   .refine((data) => data.maximum_interest > data.minimum_interest, {
//     message: "Maximum interest must be greater than minimum interest",
//     path: ["maximum_interest"],
//   });

// // Define the type for our form
// type FormValues = z.infer<typeof formSchema>;

// type LoanData = {
//   _id?: string;
//   name: string;
//   description: string;
//   status: string;
//   minimumAmount: number;
//   maximumAmount: number;
//   minimumTenure: string;
//   maximumTenure: string;
//   minimumInterest: number;
//   maximumInterest: number;
//   duePenalty: number;
//   features: string;
//   eligibility: string;
//   loanImage?: string;
//   additionalDocuments?: string[];
// };

// type LoanFormProps = {
//   loanData?: LoanData;
//   isEditMode?: boolean;
// };

// export default function LoanForm({
//   loanData,
//   isEditMode = false,
// }: LoanFormProps): JSX.Element {    
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(
//     loanData?.loanImage || null
//   );
//   const [isImageChanged, setIsImageChanged] = useState(false);
//   const [additionalDocuments, setAdditionalDocuments] = useState<string[]>(
//     loanData?.additionalDocuments || []
//   );
//   const navigate = useNavigate();

//   // Initialize the form
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues:
//       isEditMode && loanData
//         ? {
//             name: loanData.name,
//             description: loanData.description,
//             status: loanData.status,
//             minimum_amount: loanData.minimumAmount,
//             maximum_amount: loanData.maximumAmount,
//             minimum_tenure: loanData.minimumTenure.toString(),
//             maximum_tenure: loanData.maximumTenure.toString(),
//             minimum_interest: loanData.minimumInterest,
//             maximum_interest: loanData.maximumInterest,
//             due_penalty: loanData.duePenalty,
//             features: loanData.features,
//             eligibility: loanData.eligibility,
//             additional_documents: loanData.additionalDocuments || [],
//           }
//         : {
//             name: "",
//             description: "",
//             status: "",
//             minimum_amount: 0,
//             maximum_amount: 0,
//             minimum_tenure: "",
//             maximum_tenure: "",
//             minimum_interest: 0,
//             maximum_interest: 0,
//             due_penalty: 0,
//             features: "",
//             eligibility: "",
//             additional_documents: [],
//           },
//   });

//   // Handle image upload
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//       setIsImageChanged(true);
//     }
//   };

//   // Remove image
//   const removeImage = (): void => {
//     setImage(null);
//     setImagePreview(null);
//     setIsImageChanged(true);
//   };

//   // Add new document field
//   const addDocumentField = (): void => {
//     setAdditionalDocuments([...additionalDocuments, ""]);
//     // Update form values
//     const currentDocs = form.getValues().additional_documents || [];
//     form.setValue("additional_documents", [...currentDocs, ""]);
//   };

//   // Remove document field
//   const removeDocumentField = (index: number): void => {
//     const updatedDocs = [...additionalDocuments];
//     updatedDocs.splice(index, 1);
//     setAdditionalDocuments(updatedDocs);

//     // Update form values
//     const currentDocs = form.getValues().additional_documents || [];
//     const updatedFormDocs = [...currentDocs];
//     updatedFormDocs.splice(index, 1);
//     form.setValue("additional_documents", updatedFormDocs);
//   };

//   // Update document field
//   const updateDocumentField = (index: number, value: string): void => {
//     const updatedDocs = [...additionalDocuments];
//     updatedDocs[index] = value;
//     setAdditionalDocuments(updatedDocs);

//     // Update form values
//     const currentDocs = form.getValues().additional_documents || [];
//     const updatedFormDocs = [...currentDocs];
//     updatedFormDocs[index] = value;
//     form.setValue("additional_documents", updatedFormDocs);
//   };

//   async function onSubmit(data: FormValues): Promise<void> {
//     try {
//       // Create FormData
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("status", data.status);
//       formData.append("minimumAmount", data.minimum_amount.toString());
//       formData.append("maximumAmount", data.maximum_amount.toString());
//       formData.append("minimumTenure", data.minimum_tenure);
//       formData.append("maximumTenure", data.maximum_tenure);
//       formData.append("minimumInterest", data.minimum_interest.toString());
//       formData.append("maximumInterest", data.maximum_interest.toString());
//       formData.append("duePenalty", data.due_penalty.toString());
//       formData.append("features", data.features);
//       formData.append("eligibility", data.eligibility);

//       // Add additional documents
//       if (data.additional_documents && data.additional_documents.length > 0) {
//         // Convert array to JSON string to send in formData
//         formData.append(
//           "additionalDocuments",
//           JSON.stringify(
//             data.additional_documents.filter((doc) => doc.trim() !== "")
//           )
//         );
//       }

//       // Only append image if it's a new image or we're creating a new loan
//       if (image && (isEditMode ? isImageChanged : true)) {
//         formData.append("loanImage", image);
//       }

//       // If we're editing, we need to send a flag to indicate if the image was removed
//       if (isEditMode) {
//         formData.append("isImageChanged", isImageChanged.toString());
//         if (isImageChanged && !image) {
//           formData.append("removeImage", "true");
//         }
//       }

//       let response;
//       if (isEditMode && loanData?._id) {
//         // Update existing loan
//         response = await adminAxiosInstance.put(
//           `/update-loan/${loanData._id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else {
//         // Create new loan
//         response = await adminAxiosInstance.post("/create-loan", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       SuccessToast(response.data.message);
//       if (response.data.success) {
//         navigate("/admin/loans");
//       }

//       console.log("Response:", response.data);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         if (error.response?.data?.message) {
//           ErrorToast(error.response.data.message);
//         } else {
//           ErrorToast("An unexpected error occurred.");
//         }
//       } else {
//         ErrorToast("An unknown error occurred.");
//       }
//     }
//   }

//   return (
//     <Card className="w-full max-w-6xl mx-auto shadow-lg border border-gray-200">
//       <CardHeader className="bg-white border-b">
//         <CardTitle className="text-gray-800">
//           {isEditMode ? "Edit Loan" : "Loan Application Form"}
//         </CardTitle>
//         <CardDescription className="text-gray-600">
//           Create a new loan product with all required details.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">Loan Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Home Loan, Car Loan, etc."
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">Status</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="border-gray-200 focus:ring-gray-300">
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="active">Active</SelectItem>
//                         <SelectItem value="inactive">Inactive</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Provide a detailed description of the loan"
//                       {...field}
//                       className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="minimum_amount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Minimum Amount
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="maximum_amount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Maximum Amount
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="minimum_tenure"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Minimum Tenure (months)
//                     </FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="border-gray-200 focus:ring-gray-300">
//                           <SelectValue placeholder="Select minimum tenure" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="6">6 months</SelectItem>
//                         <SelectItem value="12">12 months</SelectItem>
//                         <SelectItem value="18">18 months</SelectItem>
//                         <SelectItem value="24">24 months</SelectItem>
//                         <SelectItem value="36">36 months</SelectItem>
//                         <SelectItem value="48">48 months</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="maximum_tenure"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Maximum Tenure (months)
//                     </FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="border-gray-200 focus:ring-gray-300">
//                           <SelectValue placeholder="Select maximum tenure" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="6">6 months</SelectItem>
//                         <SelectItem value="12">12 months</SelectItem>
//                         <SelectItem value="18">18 months</SelectItem>
//                         <SelectItem value="24">24 months</SelectItem>
//                         <SelectItem value="36">36 months</SelectItem>
//                         <SelectItem value="48">48 months</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <FormField
//                 control={form.control}
//                 name="minimum_interest"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Minimum Interest (%)
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         step="0.01"
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="maximum_interest"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Maximum Interest (%)
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         step="0.01"
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="due_penalty"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Due Penalty (%)
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         step="0.01"
//                         {...field}
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-500" />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="features"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Features</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="List the features of this loan product"
//                       {...field}
//                       className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="eligibility"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Eligibility</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe who is eligible for this loan"
//                       {...field}
//                       className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
//                     />
//                   </FormControl>
//                   <FormMessage className="text-red-500" />
//                 </FormItem>
//               )}
//             />

//             {/* Additional Documents Section */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <FormLabel className="text-gray-700">
//                   Additional Documents
//                 </FormLabel>
//                 <Button
//                   type="button"
//                   onClick={addDocumentField}
//                   variant="outline"
//                   className="flex items-center gap-2 border-teal-500 text-teal-600 hover:bg-teal-50"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Document
//                 </Button>
//               </div>

//               {additionalDocuments.length > 0 ? (
//                 <div className="space-y-3">
//                   {additionalDocuments.map((doc, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <Input
//                         value={doc}
//                         onChange={(e) =>
//                           updateDocumentField(index, e.target.value)
//                         }
//                         placeholder="Enter document description"
//                         className="border-gray-200 focus:border-gray-300 focus:ring-gray-300 flex-1"
//                       />
//                       <Button
//                         type="button"
//                         onClick={() => removeDocumentField(index)}
//                         variant="destructive"
//                         size="icon"
//                         className="bg-red-500 hover:bg-red-600"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-500 italic">
//                   No additional documents added. Click "Add Document" to add
//                   requirements.
//                 </p>
//               )}
//               {form.formState.errors.additional_documents && (
//                 <p className="text-red-500 text-sm">
//                   {form.formState.errors.additional_documents.message as string}
//                 </p>
//               )}
//             </div>

//             <div>
//               <FormLabel className="text-gray-700">Loan Image</FormLabel>
//               <div className="mt-2">
//                 {imagePreview ? (
//                   <div className="relative w-full h-48 border border-gray-200 rounded-md overflow-hidden">
//                     <img
//                       src={
//                         isImageChanged || !isEditMode
//                           ? imagePreview
//                           : loanData?.loanImage
//                       }
//                       alt="Loan preview"
//                       className="w-full h-full object-cover"
//                     />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="icon"
//                       className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
//                       onClick={removeImage}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-4 text-gray-500" />
//                         <p className="mb-2 text-sm text-gray-700">
//                           <span className="font-semibold">Click to upload</span>{" "}
//                           or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-600">
//                           PNG, JPG or WEBP (MAX. 2MB)
//                         </p>
//                       </div>
//                       <input
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                   </div>
//                 )}
//                 {!image && !imagePreview && form.formState.isSubmitted && (
//                   <p className="text-sm font-medium text-red-500 mt-2">
//                     Loan image is required
//                   </p>
//                 )}
//               </div>
//             </div>

//             <CardFooter className="px-0 pb-0">
//               <Button
//                 type="submit"
//                 className="w-full bg-teal-600 hover:bg-teal-700 text-white"
//               >
//                 {isEditMode ? "Update Loan" : "Submit Loan Application"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

import { useState, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload, X, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../shared/Toast";
import { AxiosError } from "axios";

// Define the form schema with Zod
const formSchema = z
  .object({
    name: z
      .string()
      .min(10, { message: "Name must be at least 10 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    status: z.string({
      required_error: "Please select a status.",
    }),
    minimum_amount: z.coerce
      .number()
      .positive({ message: "Minimum amount must be positive." })
      .min(1000, { message: "Minimum amount must be at least 1000." }),
    maximum_amount: z.coerce
      .number()
      .positive({ message: "Maximum amount must be positive." })
      .max(1000000, { message: "Maximom amount must be at least 1000000." }),
    minimum_tenure: z.string({
      required_error: "Please select minimum tenure.",
    }),
    maximum_tenure: z.string({
      required_error: "Please select maximum tenure.",
    }),
    minimum_interest: z.coerce
      .number()
      .min(1, { message: "Minimum interest cannot be negative." }),
    maximum_interest: z.coerce
      .number()
      .positive({ message: "Maximum interest must be positive." })
      .max(99, { message: "Maximom interest should be upto 99%." }),
    due_penalty: z.coerce
      .number()
      .min(1, { message: "Due penalty cannot be negative and minimum 1%." }),
    features: z
      .string()
      .min(10, { message: "Features must be at least 10 characters." }),
    eligibility: z
      .string()
      .min(10, { message: "Eligibility must be at least 10 characters." }),
    additional_documents: z
      .array(
        z.string().min(5, {
          message: "Each document description must be at least 5 characters.",
        })
      )
      .max(5, { message: "You can add a maximum of 5 additional documents." })
      .optional(),
  })

  .refine((data) => data.maximum_amount > data.minimum_amount, {
    message: "Maximum amount must be greater than minimum amount",
    path: ["maximum_amount"],
  })
  .refine(
    (data) =>
      Number.parseInt(data.maximum_tenure) >
      Number.parseInt(data.minimum_tenure),
    {
      message: "Maximum tenure must be greater than minimum tenure",
      path: ["maximum_tenure"],
    }
  )

  .refine((data) => data.maximum_interest > data.minimum_interest, {
    message: "Maximum interest must be greater than minimum interest",
    path: ["maximum_interest"],
  });

// Define the type for our form
type FormValues = z.infer<typeof formSchema>;

type LoanData = {
  _id?: string;
  name: string;
  description: string;
  status: string;
  minimumAmount: number;
  maximumAmount: number;
  minimumTenure: string;
  maximumTenure: string;
  minimumInterest: number;
  maximumInterest: number;
  duePenalty: number;
  features: string;
  eligibility: string;
  loanImage?: string;
  additionalDocuments?: string[];
};

type LoanFormProps = {
  loanData?: LoanData;
  isEditMode?: boolean;
};

export default function LoanForm({
  loanData,
  isEditMode = false,
}: LoanFormProps): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    loanData?.loanImage || null
  );
  const [isImageChanged, setIsImageChanged] = useState(false);
  const navigate = useNavigate();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      isEditMode && loanData
        ? {
            name: loanData.name,
            description: loanData.description,
            status: loanData.status,
            minimum_amount: loanData.minimumAmount,
            maximum_amount: loanData.maximumAmount,
            minimum_tenure: loanData.minimumTenure.toString(),
            maximum_tenure: loanData.maximumTenure.toString(),
            minimum_interest: loanData.minimumInterest,
            maximum_interest: loanData.maximumInterest,
            due_penalty: loanData.duePenalty,
            features: loanData.features,
            eligibility: loanData.eligibility,
            additional_documents: loanData.additionalDocuments || [],
          }
        : {
            name: "",
            description: "",
            status: "",
            minimum_amount: 0,
            maximum_amount: 0,
            minimum_tenure: "",
            maximum_tenure: "",
            minimum_interest: 0,
            maximum_interest: 0,
            due_penalty: 0,
            features: "",
            eligibility: "",
            additional_documents: [],
          },
  });

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsImageChanged(true);
    }
  };

  // Remove image
  const removeImage = (): void => {
    setImage(null);
    setImagePreview(null);
    setIsImageChanged(true);
  };

  // Add new document field
  const addDocumentField = (): void => {
    const currentDocs = form.getValues().additional_documents || [];
    form.setValue("additional_documents", [...currentDocs, ""], {
      shouldValidate: true,
    });
  };

  // Get additional documents from form
  const additionalDocuments = form.watch("additional_documents") || [];

  async function onSubmit(data: FormValues): Promise<void> {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("status", data.status);
      formData.append("minimumAmount", data.minimum_amount.toString());
      formData.append("maximumAmount", data.maximum_amount.toString());
      formData.append("minimumTenure", data.minimum_tenure);
      formData.append("maximumTenure", data.maximum_tenure);
      formData.append("minimumInterest", data.minimum_interest.toString());
      formData.append("maximumInterest", data.maximum_interest.toString());
      formData.append("duePenalty", data.due_penalty.toString());
      formData.append("features", data.features);
      formData.append("eligibility", data.eligibility);

      // Add additional documents
      if (data.additional_documents && data.additional_documents.length > 0) {
        // Convert array to JSON string to send in formData
        formData.append(
          "additionalDocuments",
          JSON.stringify(
            data.additional_documents.filter((doc) => doc.trim() !== "")
          )
        );
      }

      // Only append image if it's a new image or we're creating a new loan
      if (image && (isEditMode ? isImageChanged : true)) {
        formData.append("loanImage", image);
      }

      // If we're editing, we need to send a flag to indicate if the image was removed
      if (isEditMode) {
        formData.append("isImageChanged", isImageChanged.toString());
        if (isImageChanged && !image) {
          formData.append("removeImage", "true");
        }
      }

      let response;
      if (isEditMode && loanData?._id) {
        // Update existing loan
        response = await adminAxiosInstance.put(
          `/update-loan/${loanData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new loan
        response = await adminAxiosInstance.post("/create-loan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      SuccessToast(response.data.message);
      if (response.data.success) {
        navigate("/admin/loans");
      }

      console.log("Response:", response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          ErrorToast(error.response.data.message);
        } else {
          ErrorToast("An unexpected error occurred.");
        }
      } else {
        ErrorToast("An unknown error occurred.");
      }
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg border border-gray-200">
      <CardHeader className="bg-white border-b">
        <CardTitle className="text-gray-800">
          {isEditMode ? "Edit Loan" : "Loan Application Form"}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Create a new loan product with all required details.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Loan Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Home Loan, Car Loan, etc."
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 focus:ring-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the loan"
                      {...field}
                      className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="minimum_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Minimum Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maximum_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Maximum Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="minimum_tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Minimum Tenure (months)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 focus:ring-gray-300">
                          <SelectValue placeholder="Select minimum tenure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maximum_tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Maximum Tenure (months)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 focus:ring-gray-300">
                          <SelectValue placeholder="Select maximum tenure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="minimum_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Minimum Interest (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maximum_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Maximum Interest (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_penalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Due Penalty (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the features of this loan product"
                      {...field}
                      className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eligibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Eligibility</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe who is eligible for this loan"
                      {...field}
                      className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Additional Documents Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-gray-700">
                  Additional Documents
                </FormLabel>
                <Button
                  type="button"
                  onClick={addDocumentField}
                  variant="outline"
                  className="flex items-center gap-2 border-teal-500 text-teal-600 hover:bg-teal-50"
                  disabled={additionalDocuments.length >= 5}
                >
                  <Plus className="h-4 w-4" />
                  Add Document
                </Button>
              </div>

              {additionalDocuments.length > 0 ? (
                <div className="space-y-3">
                  {additionalDocuments.map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FormField
                        control={form.control}
                        name={`additional_documents.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1 m-0">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter document description"
                                className="border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 mt-1" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedDocs = [...additionalDocuments];
                          updatedDocs.splice(index, 1);
                          form.setValue("additional_documents", updatedDocs, {
                            shouldValidate: true,
                          });
                        }}
                        variant="destructive"
                        size="icon"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No additional documents added. Click "Add Document" to add
                  requirements.
                </p>
              )}

              {/* Display the array-level validation error */}
              {form.formState.errors.additional_documents &&
                typeof form.formState.errors.additional_documents.message ===
                  "string" && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.additional_documents.message}
                  </p>
                )}
            </div>

            <div>
              <FormLabel className="text-gray-700">Loan Image</FormLabel>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative w-full h-48 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={
                        isImageChanged || !isEditMode
                          ? imagePreview
                          : loanData?.loanImage
                      }
                      alt="Loan preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-700">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-600">
                          PNG, JPG or WEBP (MAX. 2MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
                {!image && !imagePreview && form.formState.isSubmitted && (
                  <p className="text-sm font-medium text-red-500 mt-2">
                    Loan image is required
                  </p>
                )}
              </div>
            </div>

            <CardFooter className="px-0 pb-0">
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isEditMode ? "Update Loan" : "Submit Loan Application"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}