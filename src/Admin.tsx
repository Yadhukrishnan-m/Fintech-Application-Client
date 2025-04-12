import  { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/shared/Loader";

// Lazy load components
const Login = lazy(() => import("./pages/admin/LoginPage"));
const IsAdminLogout = lazy(() => import("./protected/IsAdminLogout"));
const IsAdminLogin = lazy(() => import("./protected/IsAdminLogin"));
const AdminPages = lazy(() => import("./layouts/AdminLayout"));
const NotFound = lazy(() => import("@/components/shared/NotFound"));



function Admin() {
  return (
    <>
      <Suspense fallback={<Loader message={'loading...'} />}>
        <Routes>
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
          <Route path="*" element={<NotFound role={"admin"} />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Admin;
