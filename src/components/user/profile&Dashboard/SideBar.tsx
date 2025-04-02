import React, { useState } from "react";
import {
  User,
  CreditCard,
  FileText,
  Repeat,
  LogOut,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { useDispatch } from "react-redux";
// import { removeAdminToken } from "@/redux/slice/AdminTokenSlice";
import AlertDialog from "@/components/shared/AlertDialog";
import { removeUserToken } from "@/redux/slice/UserTokenSlice";

interface MenuItem {
  path?: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const UserSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsAlertOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await userAxiosInstance.post("/logout");
      dispatch(removeUserToken());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems: MenuItem[] = [
    { path: "/dashboard/profile", icon: User, label: "User Profile" },
    { path: "/dashboard/loans", icon: CreditCard, label: "Loans" },
    { path: "/dashboard/applications", icon: FileText, label: "Applications" },
    { path: "/dashboard/transactions", icon: Repeat, label: "Transactions" },
  ];

  const bottomMenuItems: MenuItem[] = [
    { icon: LogOut, label: "Logout", onClick: handleLogout },
  ];

  const renderMenuItem = (item: MenuItem, index: number) => (
    <li key={index} className="w-full">
      {item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `group flex items-center p-4 text-lg rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-teal-700 text-white"
                : "text-teal-700 hover:bg-teal-600 hover:text-white"
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <item.icon size={24} className="group-hover:text-white" />
          <span className="ml-4">{item.label}</span>
        </NavLink>
      ) : (
        <Button
          variant="ghost"
          className="w-full justify-start p-4 text-lg text-teal-700 hover:bg-teal-600 hover:text-white"
          onClick={() => {
           if (item.onClick) {
             item.onClick(); 
           }
            setIsMobileMenuOpen(false);
          }}
        >
          <item.icon size={24} className="group-hover:text-white" />
          <span className="ml-4">{item.label}</span>
        </Button>
      )}
    </li>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-teal-700 text-white rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white text-teal-900 flex flex-col transition-all duration-300 ease-in-out overflow-y-auto w-80 h-screen fixed top-0 left-0 z-40 md:static md:w-80 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-teal-700 flex items-center justify-center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/")}
            className="w-24 h-24 cursor-pointer bg-teal-700 text-white rounded-full flex items-center justify-center text-xl font-semibold"
          >
            Quicfin
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow">
          <ul className="space-y-2 p-4 ">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>

        {/* Bottom Menu (Logout) */}
        <div className="border-t border-teal-700 mt-auto">
          <ul className="p-4 space-y-2">
            {bottomMenuItems.map(renderMenuItem)}
          </ul>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        onConfirm={handleLogoutConfirm}
        onClose={() => setIsAlertOpen(false)}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default UserSidebar;
