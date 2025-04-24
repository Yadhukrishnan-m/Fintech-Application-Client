"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { ErrorToast, SuccessToast } from "@/components/shared/Toast";
import axios from "axios";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  job: z
    .string()
    .min(2, { message: "Occupation must be at least 2 characters" }),
  income: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Income must be a number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Income must be a positive number",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileModalProps {
  userData: {
    name: string;
    phone?: number;
    job: string;
    income: number;
  };
  userId: string;
  onProfileUpdated?: () => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}


export default function EditProfileModal({
  userData,
  userId,
  onProfileUpdated,
  modalOpen,
  setModalOpen,
}: EditProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values from userData
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      phone: userData.phone?.toString() || "",
      job: userData.job,
      income: userData.income.toString(),
    },
  });

  // Reset form when userData changes or modal opens
  const resetForm = () => {
    form.reset({
      name: userData.name,
      phone: userData.phone?.toString() || "",
      job: userData.job,
      income: userData.income.toString(),
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      resetForm();
    }
    setModalOpen(newOpen); // ← controlled by parent
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      await axios.put(`/api/users/${userId}`, {
        name: data.name,
        phone: Number(data.phone),
        job: data.job,
        income: Number(data.income),
      });

      setModalOpen(false);
      SuccessToast("Your profile has been updated successfully.");
      if (onProfileUpdated) onProfileUpdated();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        ErrorToast(error.response.data.message);
      } else {
        ErrorToast("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Profile Details
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
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
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your occupation" {...field} />
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
                  <FormLabel>Annual Income (₹)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your annual income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
