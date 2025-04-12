import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import IsLogin from "./protected/IsLogin";
import IsLogout from "./protected/IsLogout";
import Loader from "./components/shared/Loader";

// Lazy load all page components
const HomePage = lazy(() => import("./pages/user/HomePage"));
const Register = lazy(() => import("./pages/user/Register"));
const LoginForm = lazy(() => import("./pages/user/login"));
const ForgotPasswordEmailPage = lazy(
  () => import("./pages/user/ForgotPasswordEmailPage")
);
const ResetPasswordPage = lazy(() => import("./pages/user/ResetPasswordPage"));
const ProfileAndDashboard = lazy(() => import("./layouts/Profile&Dashboard"));
const LoanListingPage = lazy(() => import("./pages/user/LoanListingPage"));
const LoanDetailsPage = lazy(() => import("./pages/user/LoanDetailsPage"));
const LoanApplicationPage = lazy(
  () => import("./pages/user/LoanApplicationPage")
);
const NotificationPage = lazy(() => import("./pages/user/NotificationPage"));
const ContactUsPage = lazy(() => import("./pages/user/ContactUsPage"));
const AboutUsPage = lazy(() => import("./pages/user/AboutUsPage"));
const NotFound = lazy(() => import("./components/shared/NotFound"));

function User() {
  return (
    <Suspense fallback={<Loader message={'loading...'} />}>
      <Routes>
        <Route index element={<HomePage />} />

        <Route
          path="/register"
          element={
            <IsLogout>
              <Register />
            </IsLogout>
          }
        />

        <Route
          path="/login"
          element={
            <IsLogout>
              <LoginForm />
            </IsLogout>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordEmailPage />} />

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/dashboard/*"
          element={
            <IsLogin>
              <ProfileAndDashboard />
            </IsLogin>
          }
        />

        <Route path="/loans" element={<LoanListingPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/loan/:id" element={<LoanDetailsPage />} />
        <Route path="/loan/application/:id" element={<LoanApplicationPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        <Route path="*" element={<NotFound role={"user"} />} />
      </Routes>
    </Suspense>
  );
}

export default User;
