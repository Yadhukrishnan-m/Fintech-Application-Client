import {
  User,
  Calendar,
  Briefcase,
  DollarSign,
  CreditCard,
  FileText,
  Shield,
  Award,
  Lock,
} from "lucide-react";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { authService } from "@/api/AuthServiceAndProfile";


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
interface User {
  customerId: string;
  name: string;
  email: string;
  phone?: number;
  finscore?: number;
  status: "pending" | "completed" | "rejected" | "verified";
}

interface VerifiedProfileDetailsProps {
  userData: VerifiedUserData;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function VerifiedProfileDetails({
  userData,
  setUser
}: VerifiedProfileDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleProfileUpdated = async () => {
    const response = await authService.getUser();
    
   setUser(response.data.user)
  };
  return (
    <div className="space-y-8 mb-10">
      {/* Personal Information Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <User className="mr-2 h-5 w-5" />
            Personal Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">{userData.phone}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-800 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-teal-600" />
                {userData.dob}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-gray-800 capitalize">
                {userData.gender}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer ID</p>
              <p className="font-medium text-gray-800">{userData.customerId}</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end">
          <EditProfileModal
            userData={{
              name: userData.name,
              phone: userData.phone,
              job: userData.job,
              income: userData.income,
            }}
            userId={userData._id}
            onProfileUpdated={handleProfileUpdated}
            modalOpen={editModalOpen}
            setModalOpen={setEditModalOpen}
          />
          <button
            onClick={() => setEditModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-md flex items-center"
          >
            <Lock className="h-5 w-5 mr-2" />
            Edit Details
          </button>

          <button
            onClick={() => navigate("/dashboard/change-password")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-md flex items-center"
          >
            <Lock className="h-5 w-5 mr-2" />
            Change Password
          </button>
        </div>
      </div>

      {/* Financial Information Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Financial Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Occupation</p>
              <p className="font-medium text-gray-800 flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-teal-600" />
                {userData.job}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Annual Income</p>
              <p className="font-medium text-gray-800 flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-teal-600" />₹
                {userData.income.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">CIBIL Score</p>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-teal-600" />
                <p className="font-medium text-gray-800">
                  {userData.cibilScore}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">FinScore</p>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-teal-600" />
                <p className="font-medium text-gray-800">{userData.finscore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Document Information
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Aadhaar Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-teal-600" />
              Aadhaar Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Aadhaar Number</p>
                <p className="font-medium text-gray-800">
                  {userData.aadhaarNumber.replace(
                    /(\d{4})(\d{4})(\d{4})/,
                    "$1 $2 $3"
                  )}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-2">Aadhaar Document</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-40 w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(userData.aadhaarDoc)}
                    >
                      <img
                        src={userData.aadhaarDoc}
                        alt="Aadhaar Document"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <img
                      src={selectedImage ?? ""}
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* PAN Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-teal-600" />
              PAN Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <p className="text-sm text-gray-500">PAN Number</p>
                <p className="font-medium text-gray-800">
                  {userData.panNumber}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-2">PAN Document</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-40 w- bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(userData.panDoc)}
                    >
                      <img
                        src={userData.panDoc}
                        alt="PAN Document"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <img
                      src={selectedImage ?? ""}
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* CIBIL Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-600" />
              CIBIL Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <p className="text-sm text-gray-500">CIBIL Score</p>
                <p className="font-medium text-gray-800">
                  {userData.cibilScore}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-2">CIBIL Document</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="relative h-40 w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(userData.cibilDoc)}
                    >
                      <img
                        src={userData.cibilDoc}
                        alt="CIBIL Document"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <img
                      src={selectedImage ?? ""}
                      alt="Document Preview"
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      {/* <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <User className="mr-2 h-5 w-5" />
            Account Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="font-medium text-gray-800">
              {formatDate(userData.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium text-gray-800">
              {formatDate(userData.updatedAt)}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
