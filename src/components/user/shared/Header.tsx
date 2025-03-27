import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import store from "@/redux/store";
// import userAxiosInstance from "@/config/UserAxiosInstence";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const userId = store.getState().userTokenSlice.userToken;
   
  const navigate = useNavigate();

  return (
  
    <header className="w-full py-4 bg-white border-b">
     
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-teal-700 font-bold text-xl"
          >
            Quic<span className="text-teal-500">Loan</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {[
            { path: "/", label: "Home" },
            { path: "/loans", label: "Loans" },
            // { path: "/investments", label: "Investments" },
            { path: "/about-us", label: "About Us" },
            { path: "/contact-us", label: "Contact Us" },
          ].map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-gray-800 hover:text-teal-600 font-medium"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {userId ? (
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="hidden md:inline-flex bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium text-sm"
            >
              Profile & Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-flex bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium text-sm"
            >
              Login / Signup
            </button>
          )}

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-4 p-4">
          {[
            { path: "/", label: "Home" },
            { path: "/loans", label: "Loans" },
            { path: "/investments", label: "Investments" },
            { path: "/about-us", label: "About Us" },
            { path: "/contact-us", label: "Contact Us" },
          ].map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-gray-800 hover:text-teal-600 font-medium"
            >
              {label}
            </button>
          ))}
          {userId ? (
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium text-sm"
            >
              Profile & Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium text-sm"
            >
              Login / Signup
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
