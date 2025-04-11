import { Route, Routes } from "react-router-dom";
import Login from "./pages/admin/LoginPage";
// import IsAdminLogin from "./protected/IsAdminLogin";
import IsAdminLogout from "./protected/IsAdminLogout";
import AdminPages from "./layouts/AdminLayout";
import IsAdminLogin from "./protected/IsAdminLogin";
import NotFound from "./components/shared/NotFound";

function Admin() {
  return (
    <>
      <Routes>
        {/* <Route index element={<HomePage />}></Route> */}
        <Route
          path="/login"
          element={
            <IsAdminLogout>
              <Login />
            </IsAdminLogout>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <IsAdminLogin>
              <AdminPages />
            </IsAdminLogin>
          }
        ></Route>
              <Route path="*" element={<NotFound role={'admin'}/>} />
      
      </Routes>
    </>
  );
}

export default Admin;
