import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/shared/Login'
import Footer from '../../components/user/shared/Footer'
import Header from '@/components/user/shared/Header'
import { useDispatch } from 'react-redux';
import { addUserToken } from '@/redux/slice/UserTokenSlice';
import { authService } from '@/api/AuthServiceAndProfile';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLogin = async (values: {
    email: string;
    password: string;
  }) => {
  const response = await authService.login(values);
    console.log('working....');
    console.log(response.data.success);
    
    if (response.data.success) {
      dispatch(addUserToken(response.data.accessToken));
      navigate("/");
    } else {
      throw new Error("Invalid credentials");
    }
  };
  return (
    <div>
        <Header/>
        <LoginForm onSubmit={handleUserLogin} role='user'></LoginForm>
        <Footer/>
    </div>
  )
}

export default Login