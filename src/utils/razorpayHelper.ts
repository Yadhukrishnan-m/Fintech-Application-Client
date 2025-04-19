import { ErrorToast, SuccessToast } from "@/components/shared/Toast";
import userAxiosInstance from "@/config/UserAxiosInstence";

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): {
        open: () => void;
        on: (
          event: string,
          handler: (response: RazorpayFailureResponse) => void
        ) => void;
      };
    };
  }
}

export const initiateRazorpayPayment = async (
  orderId: string,
  totalAmount: number,
  userLoanId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID!,
      amount: totalAmount * 100, // converting to subunits (e.g., paise)
      currency: "INR",
      name: "QuicFin",
      description: "Loan EMI Payment",
      order_id: orderId,
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
      handler: async (response: RazorpaySuccessResponse) => {
        try {
          await userAxiosInstance.post("/razorpay/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            userLoanId,
          });
          SuccessToast("Payment Successful!");
          resolve();
        } catch (error) {
          console.error("Payment verification failed:", error);
          ErrorToast(
            "Payment verification failed. Please try again or contact support."
          );
          reject(error);
        }
      },
      modal: {
        ondismiss: async () => {
          try {
        
            await userAxiosInstance.post("/razorpay/payment/cancel", {
              userLoanId,
            });
          } catch (error) {
            console.error(
              "Error notifying server about payment cancellation:",
              error
            );
          }

          ErrorToast("Payment process was cancelled.");
          reject(new Error("Payment process cancelled by user."));
        },
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on(
      "payment.failed",
      async (response: RazorpayFailureResponse) => {
        try {
          await userAxiosInstance.post("/razorpay/verify-payment", {
            razorpay_payment_id: response.error.metadata.payment_id || null,
            razorpay_order_id: response.error.metadata.order_id || orderId,
            razorpay_signature: null,
            userLoanId,
          });
        } catch (err) {
          console.error("Error while verifying failed payment:", err);
        }
        ErrorToast(`Payment Failed: ${response.error.description}`);
        reject(response.error);
      }
    );

    paymentObject.open();
  });
};
