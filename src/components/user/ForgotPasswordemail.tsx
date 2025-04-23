import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../shared/Toast";
import { authService } from "@/api/AuthServiceAndProfile";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof loginSchema>;

export default function ForgotPasswordEmail() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>(""); // Success message state
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle Submit
  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setErrormsg("");
    setSuccessMsg("");
    try {
            const response = await authService.forgotPassword(values.email);


      if (response.data.success) {
        SuccessToast("A password reset link has been sent to your email.");
        // setSuccessMsg("A password reset link has been sent to your email.");
      } else {
         ErrorToast("Failed to send reset email.");
        // setErrormsg("Failed to send reset email.");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("Failed to send reset email. Please try again.")
      // setErrormsg("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Enter your email</CardTitle>
          {errormsg && <p className="text-red-500">{errormsg}</p>}
          {successMsg && <p className="text-green-500">{successMsg}</p>}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setErrormsg("");
                          setSuccessMsg("");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Return to sign-in?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
