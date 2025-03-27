import Login from '@/components/shared/Login'
import adminAxiosInstance from '@/config/AdminAxiosInstence';
import { addAdminToken } from '@/redux/slice/AdminTokenSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const handleAdminLogin = async (values: {
        email: string;
        password: string;
      }) => {
        const response = await adminAxiosInstance.post("/login", values);
       
        console.log(response.data.success);

        if (response.data.success) {
          dispatch(addAdminToken(response.data.accessToken));
          navigate("/admin");
        } else {
          throw new Error("Invalid credentials");
        }
      };
  return (
    <>
      <Login onSubmit={handleAdminLogin} role="admin" />
    </>
  );
}

export default LoginPage