import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileHeader from "@/components/user/profile/ProfileHeader"; // Import the ProfileHeader component
import VerifiedProfileDetails from "@/components/user/profile/VerifiedProfile";
import { authService } from "@/api/AuthServiceAndProfile";

interface User {
  customerId: string;
  name: string;
  email: string;
  phone?: number;
  finscore?: number;
  status: "pending" | "completed" | "rejected" | "verified";
}

interface VerifiedUserData {
  _id: string;
  customerId: string;
  name: string;
  email: string;
  phone?: number;
  finscore?: number;
  isBlacklisted: boolean;
  status: "pending" | "completed" | "rejected" | "verified";
  createdAt: string;
  updatedAt: string;
  aadhaarDoc: string;
  aadhaarNumber: string;
  cibilDoc: string;
  cibilScore: number;
  dob: string;
  gender: string;
  income: number;
  job: string;
  panDoc: string;
  panNumber: string;
}

function ProfilePage() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

const fetchUser = useCallback(async () => {
  try {
    const response = await authService.getUser();

    setUser(response.data.user);

    if (
      location.state &&
      response.data.user?.status === location.state?.updated
    ) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              status: location.state?.updated ? "completed" : "pending",
            }
          : null
      );
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}, [location.state]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser,location.pathname]);
 
    

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader user={user} />

      {user?.status === "verified" && (
        <VerifiedProfileDetails userData={ user as VerifiedUserData} />
      )}
    </div>
  );
}

export default ProfilePage;
