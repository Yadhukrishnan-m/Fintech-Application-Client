import adminAxiosInstance from "@/config/AdminAxiosInstence";
import userAxiosInstance from "../config/UserAxiosInstence";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  generateOtp: async (email: string) => {
    return await userAxiosInstance.post("/generate-otp", { email });
  },

  register: async (formData: RegisterPayload) => {
    return await userAxiosInstance.post("/register", formData);
  },
  login: async (credentials: { email: string; password: string }) => {
    return await userAxiosInstance.post("/login", credentials);
  },
  adminLogin: async (credentials: { email: string; password: string }) => {
    return await adminAxiosInstance.post("/login", credentials);
  },
  resetPassword: async (password: string, token: string | undefined) => {
    return await userAxiosInstance.post("/reset-password", {
      password,
      token,
    });
  },

  logout: async () => {
    return await userAxiosInstance.post("/logout");
  },
  adminLogout: async () => {
    return await userAxiosInstance.post("/logout");
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    return await userAxiosInstance.patch("/change-password", {
      currentPassword,
      newPassword,
    });
  },
  googleLogin: async (token: string) => {
    return await userAxiosInstance.post("/google-login", { token });
  },
  completeProfile: async (formData: FormData) => {
    return await userAxiosInstance.post("/complete-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getUser: async () => {
    return await userAxiosInstance.get("/get-user", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        "If-Modified-Since": "0",
      },
    });
  },
  forgotPassword: async (email: string) => {
    return await userAxiosInstance.post("forgot-password", {
      email,
    });
  },
  verifyOtp: async (otp: string, email: string) => {
    return await userAxiosInstance.post("/verify-otp", {
      otp,
      email,
    });
  },
};
