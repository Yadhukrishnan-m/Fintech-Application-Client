import Loader from "@/components/shared/Loader";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load all components
const SideBar = lazy(
  () => import("../components/user/profile&Dashboard/SideBar")
);
const Header = lazy(() => import("@/components/user/shared/Header"));
const Footer = lazy(() => import("@/components/user/shared/Footer"));
const ProfilePage = lazy(() => import("@/pages/user/ProfilePage"));
const ProfileFormPage = lazy(() => import("@/pages/user/ProfileFormPage"));
const ApplicationListPage = lazy(
  () => import("@/pages/user/ApplicationListPage")
);
const ApplicationDetailsPage = lazy(
  () => import("@/pages/user/ApplicationDetailsPage")
);
const UserLoanListPage = lazy(() => import("@/pages/user/UserLoanListPage"));
const ChangePassword = lazy(
  () => import("@/components/user/profile/ChangePassword")
);
const EmiListPage = lazy(() => import("@/pages/user/EmiListPage"));
const TransactionPage = lazy(() => import("@/pages/user/TransactionPage"));
const UserChatPage = lazy(() => import("@/pages/user/UserChatPage"));
const NotFound = lazy(() => import("@/components/shared/NotFound"));



export default function ProfileAndDashboard() {
  return (
    <>
      <Suspense fallback={<Loader  message="loading..." />}>
        <Header />
      </Suspense>

      <div className="flex h-screen">
        <div>
          <Suspense fallback={<Loader  message="loading..." />}>
            <SideBar />
          </Suspense>
        </div>

        <div className="flex-grow overflow-y-auto bg-gray-100 sm:p-6 p-4">
          <Suspense fallback={<Loader  message="loading..." />}>
            <Routes>
              <Route path="profile" element={<ProfilePage />} />
              <Route
                path="/profile/complete-profile"
                element={<ProfileFormPage />}
              />
              <Route path="applications" element={<ApplicationListPage />} />
              <Route path="loans" element={<UserLoanListPage />} />
              <Route path="chat-support" element={<UserChatPage />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route
                path="/applications/:id"
                element={<ApplicationDetailsPage />}
              />
              <Route path="/loan/:id" element={<EmiListPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="*" element={<NotFound role={"user"} />} />
            </Routes>
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<Loader message="loading..." />}>
        <Footer />
      </Suspense>
    </>
  );
}
