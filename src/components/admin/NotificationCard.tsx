import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Bell, Send, User, Users } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../shared/Toast";
import adminAxiosInstance from "@/config/AdminAxiosInstence";


const notificationSchema = z
  .object({
    type: z.enum(["global", "personal"]),
    title: z.string().min(5, "Title is required"),
    message: z.string().min(5, "Message is required"),
    userId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.type === "personal" &&
        (!data.userId || data.userId.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "User ID is required for personal notifications",
      path: ["userId"],
    }
  );

const NotificationForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"global" | "personal">("global");
  const [userId, setUserId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  // Field-specific error states
  const [errors, setErrors] = useState<{
    title?: string;
    message?: string;
    userId?: string;
    form?: string;
  }>({});

  const validateForm = () => {
    try {
      const result = notificationSchema.parse({
        title,
        message,
        type,
        userId,
      });
      setErrors({});
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          fieldErrors[path] = err.message;
        });

        setErrors(fieldErrors);
      }
      return { success: false };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.success) return;

    setIsSubmitting(true);

    try {
    const response =await  adminAxiosInstance.post("/create-notification", {
      type,
      title,
      message,
      userId: type === "personal" ? userId : undefined,
    });
      
    if (response.data.success) {
         SuccessToast(
           `Notification ${type === "global" ? "broadcast" : "sent"}!`
         );
    }
      setTitle("");
      setMessage("");
      setType("global");
      setUserId("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        ErrorToast(
          error.response?.data?.message || "Failed to send notification"
        );
      } else {
        ErrorToast("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-teal-50 p-4">
      <Card className="w-full max-w-8xl border-teal-200 shadow-md">
        <CardHeader className="bg-teal-50 rounded-t-lg border-b border-teal-100">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-teal-600" />
            <CardTitle>Send Notification</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-teal-700">
            Notification Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-type">Notification Type</Label>
              <RadioGroup
                value={type}
                onValueChange={(value) =>
                  setType(value as "global" | "personal")
                }
                className="flex flex-wrap gap-4"
                id="notification-type"
              >
                <div className="flex items-center space-x-2 bg-white rounded-md border p-3 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500">
                  <RadioGroupItem
                    value="global"
                    id="global"
                    className="border-teal-400 text-teal-600"
                  />
                  <Label
                    htmlFor="global"
                    className="cursor-pointer flex items-center"
                  >
                    <Users className="h-4 w-4 mr-2 text-teal-600" /> Global
                    Broadcast
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-md border p-3 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500">
                  <RadioGroupItem
                    value="personal"
                    id="personal"
                    className="border-teal-400 text-teal-600"
                  />
                  <Label
                    htmlFor="personal"
                    className="cursor-pointer flex items-center"
                  >
                    <User className="h-4 w-4 mr-2 text-teal-600" /> Personal
                    Message
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {type === "personal" && (
              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input
                  id="user-id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID"
                  className={`border-teal-200 focus:ring-teal-500 ${
                    errors.userId ? "border-red-500" : ""
                  }`}
                />
                {errors.userId && (
                  <p className="text-sm text-red-500 mt-1">{errors.userId}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title"
                required
                className={`border-teal-200 focus:ring-teal-500 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your notification message"
                rows={4}
                required
                className={`border-teal-200 focus:ring-teal-500 min-h-[120px] resize-y ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {errors.form && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {errors.form}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Notification
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationForm;
