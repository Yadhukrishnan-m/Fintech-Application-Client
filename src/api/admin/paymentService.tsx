import userAxiosInstance from "@/config/UserAxiosInstence";


export const paymentService = {
  createOrder: async (id: string) => {
    return await userAxiosInstance.get(`/razorpay/create-order/${id}`);
  },
  verifyPayment: async (
    razorpay_payment_id: string | null,
    razorpay_order_id: string,
    razorpay_signature: string | null,
    userLoanId: string
  ) => {
    return await userAxiosInstance.post("/razorpay/verify-payment", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userLoanId,
    });
  },
  cancelPayment: async (userLoanId: string) => {
    return await userAxiosInstance.post("/razorpay/payment/cancel", {
      userLoanId,
    });
  },
};
