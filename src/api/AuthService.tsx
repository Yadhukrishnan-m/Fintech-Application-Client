

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
};
