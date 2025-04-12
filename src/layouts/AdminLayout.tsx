import { FC, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Only component that's not lazy loaded (appears immediately)
const SideBar = lazy(() => import("../components/admin/SideBar"));

// Lazy load all page components
const UserVerificationPage = lazy(
  () => import("@/pages/admin/UserVerificationPage")
);
const UserVerificationListPage = lazy(
  () => import("@/pages/admin/UserVerificationListPage")
);
const UserListPage = lazy(() => import("@/pages/admin/UserListPage"));
const UserDetailsPage = lazy(() => import("@/pages/admin/UserDetailsPage"));
const LoanListingPage = lazy(() => import("@/pages/admin/LoanListingPage"));
const AddLoanPage = lazy(() => import("@/pages/admin/AddLoanPage"));
const EditLoanPage = lazy(() => import("@/pages/admin/EditLoanPage"));
const LoanDetailsPage = lazy(() => import("@/pages/admin/LoanDetailsPage"));
const ApplicationListPage = lazy(
  () => import("@/pages/admin/ApplicationListPage")
);
const ApplicationDetailsPage = lazy(
  () => import("@/pages/admin/ApplicationDetailsPage")
);
const CapitalAndTransactionsPage = lazy(
  () => import("@/pages/admin/CapitalAndTransactionsPage")
);
const UserLoanListPage = lazy(() => import("@/pages/admin/UserLoanListPage"));
const EmiDetails = lazy(() => import("@/pages/admin/EmiDetailsPage"));
const NotificationPage = lazy(() => import("@/pages/admin/NotificationPage"));
const AdminChatPage = lazy(() => import("@/pages/admin/AdminChatPage"));
const DashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const NotFound = lazy(() => import("@/components/shared/NotFound"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="text-blue-600 text-xl font-semibold">Loading...</div>
  </div>
);

const AdminPages: FC = () => {
  return (
    <div className="h-screen flex">
      <div className="h-screen">
        <Suspense fallback={<Loading />}>
          <SideBar />
        </Suspense>
      </div>
      <div className="flex-grow overflow-y-auto bg-gray-100 sm:p-6">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="application" element={<ApplicationListPage />} />
            <Route
              path="capital-transaction"
              element={<CapitalAndTransactionsPage />}
            />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="chat-support" element={<AdminChatPage />} />
            <Route
              path="User-verification"
              element={<UserVerificationListPage />}
            />
            <Route
              path="/user-verification/:id"
              element={<UserVerificationPage />}
            />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="loans" element={<LoanListingPage />} />
            <Route path="/loans/edit-loan/:id" element={<EditLoanPage />} />
            <Route path="/loans/add-loan" element={<AddLoanPage />} />
            <Route
              path="/loans/loan-details/:id"
              element={<LoanDetailsPage />}
            />
            <Route path="/user-loan/:userLoanId" element={<EmiDetails />} />
            <Route
              path="/application/:id"
              element={<ApplicationDetailsPage />}
            />
            <Route path="userloan" element={<UserLoanListPage />} />
            <Route path="*" element={<NotFound role={"admin"} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminPages;
