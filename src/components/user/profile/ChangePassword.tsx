import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import userAxiosInstance from "@/config/UserAxiosInstence"; // Replace with your axios instance
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "@/components/shared/Toast";
import  { AxiosError } from "axios";
// ✅ Define password validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[\W_]/, "Must include a special character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await userAxiosInstance.patch("/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.data.success) {
        SuccessToast("Password changed successfully!");
        navigate("/dashboard/profile"); // Redirect to profile page after change
      } else {
        ErrorToast(response.data.message || "Failed to change password");
      }
    } catch (error:unknown) {
        if (error instanceof AxiosError) {
          console.error("Error changing password:", error);
         const errorMessage =
           error.response?.data?.message ?? "Something went wrong";
         ErrorToast(errorMessage);
        } else {
          ErrorToast("An unexpected error occurred");
        }
    
    }
  };

  return (
    <div className="w-3xl    mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm text-gray-600">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("currentPassword")}
              className="w-full p-2 border rounded-md"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-600">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              className="w-full p-2 border rounded-md"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-gray-600">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full p-2 border rounded-md"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-md flex items-center justify-center"
        >
          <Lock className="h-5 w-5 mr-2" />
          Change Password
        </button>
      </form>
    </div>
  );
}
