import { UserCircle, Mail, Phone, Award, CheckCircle2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  customerId: string;
  name: string;
  email: string;
  phone?: number;
  finscore?: number;
  status: "pending" | "completed" | "rejected" | "verified";
  message?: string;
}

interface ProfileHeaderProps {
  user: User | null;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
      <div className="bg-teal-600 h-32 sm:h-40"></div>
      <div className="px-6 sm:px-10 pb-10 -mt-16 relative">
        <div className="h-32 w-32 rounded-full border-4 border-white bg-teal-100 flex items-center justify-center shadow-lg mx-auto">
          {user?.name ? (
            <span className="text-4xl font-bold text-teal-700">
              {user.name.charAt(0)}
            </span>
          ) : (
            <UserCircle className="h-20 w-20 text-teal-700" />
          )}
        </div>

        <div className="text-center mt-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {user?.name || "Loading..."}
          </h1>
          <p className="text-gray-500 mt-1">Customer ID: {user?.customerId}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {user?.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 text-teal-600 mr-2" />
                <span>{user.email}</span>
              </div>
            )}
            {user?.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 text-teal-600 mr-2" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>

          {user && (
            <div className="mt-8 inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full font-medium shadow-md hover:bg-teal-700 transition-colors">
              <Award className="h-5 w-5 mr-2" />
              <span>FinScore: {user.finscore}</span>
            </div>
          )}

          {/* Status-based Button */}
          <div className="mt-6">
            {user?.status === "pending" && (
              <button
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-medium shadow-md hover:bg-yellow-600 transition-colors"
                onClick={() =>
                  navigate("/dashboard/profile/complete-profile", {
                    state: { from: "pending" },
                  })
                }
              >
                Complete Profile & Add Documents
              </button>
            )}
            {user?.status === "rejected" && (
              <>
              <p className="text-red-500">Reason for rejection:- {user?.message}</p>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium shadow-md hover:bg-red-600 transition-colors"
                  onClick={() =>
                    navigate("/dashboard/profile/complete-profile", {
                      state: { from: "rejected" },
                    })
                  }
                >
                  Update Documents & Retry Verification
                </button>
              </>
            )}
            {user?.status === "completed" && (
              <p className="text-blue-600 font-semibold">
                Profile under verification, please wait...
              </p>
            )}
            {user?.status === "verified" && (
              <p className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
                <CheckCircle2Icon className="w-6 h-6 text-green-600" /> Verified
                Profile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
