import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OtpModal from "@/components/user/OtpModal";
import {  SuccessToast } from "@/components/shared/Toast";
import Header from "@/components/user/shared/Header";
import Footer from "@/components/user/shared/Footer";
import { authService } from "@/api/AuthServiceAndProfile";
import GoogleLoginComponent from "@/components/user/GoogleLogin";

// Validation schema
const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /[A-Z]/,
        "Password must have at least one uppercase, one lowercase, one number, and one special character"
      )
      .regex(
        /[a-z]/,
        "Password must have at least one uppercase, one lowercase, one number, and one special character"
      )
      .regex(
        /[0-9]/,
        "Password must have at least one uppercase, one lowercase, one number, and one special character"
      )
      .regex(
        /[\W_]/,
        "Password must have at least one uppercase, one lowercase, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Form types
type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [storedFormValues, setStoredFormValues] = useState<FormValues | null>(
    null
  );
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setIsLoading(true);
    try {
      setStoredFormValues(values);
     const otpResponse = await authService.generateOtp(values.email);
      console.log("✅ OTP generated successfully:", otpResponse.data);
      setIsOtpModalOpen(true);
      console.log("Form submitted:", values);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinalSubmit = async () => {
   await authService.register(storedFormValues as FormValues);
     SuccessToast("successfully registered now login!!");
       navigate("/login");
    try {
      console.log();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center min-h-screen p-">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>
            <GoogleLoginComponent />
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
        <OtpModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          onFinalSubmit={onFinalSubmit}
          email={storedFormValues?.email || ""}
        />
      </div>
      <Footer />
    </>
  );
}
