import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserToken } from "@/redux/slice/UserTokenSlice";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // "1062985600515-9aj5fj7gs3n31mpjurcsjuap8iicc746.apps.googleusercontent.com";

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Google credential is missing");
      }
      const token: string = credentialResponse.credential;

      const response = await userAxiosInstance.post("google-login", { token });

      if (response.data.success) {
        dispatch(addUserToken(response.data.accessToken));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
