import userAxiosInstance from "@/config/UserAxiosInstence";
import { ContactFormData } from "@/interfaces/interfaces";



export const publicServices = {
  sendContactForm: async (formData: ContactFormData) => {
    const response = await userAxiosInstance.post("/contact-us", formData);
    return response.data;
  },
};
