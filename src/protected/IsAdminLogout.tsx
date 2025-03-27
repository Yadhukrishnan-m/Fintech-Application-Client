import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

function IsLogout({ children }: Props) {
  const adminTocken = useSelector(
    (state: RootState) => state.adminTokenSlice.adminToken
  );

  if (adminTocken) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
}

export default IsLogout;
