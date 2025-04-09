// import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { CalendarDays, Check, Clock, DollarSign, Loader2, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoanDetailsProps {
  loan: {
    _id: string;
    loanId: string;
    name: string;
    description: string;
    isActive: boolean;
    minimumAmount: number;
    maximumAmount: number;
    minimumTenure: number;
    maximumTenure: number;
    minimumInterest: number;
    maximumInterest: number;
    duePenalty: number;
    features: string;
    eligibility: string;
    loanImage: string;
    createdAt: string;
    updatedAt: string;
  };
  interest:number|string
}

export default function LoanDetails({ loan ,interest}: LoanDetailsProps) {
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [user,setuser]=useState('')
const [isloading,setisloading]=useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setisloading(true)
        const response = await userAxiosInstance.get(`/get-user`);
        if (response.data.success) {
          console.log(response.data.user);
          
          setIsBlacklisted(response.data.user.isBlacklisted); 
          setuser(response.data.user.status)
          setisloading(false)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

    
    const navigate=useNavigate()
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Split features and eligibility by line breaks or periods for better display
  const featuresList = loan.features
    .split(/\n|\./)
    .filter((item) => item.trim().length > 0);

  const eligibilityList = loan.eligibility
    .split(/\n|\./)
    .filter((item) => item.trim().length > 0);

if (isloading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        <p className="mt-2 text-gray-600">Loading loan details...</p>
      </div>
    </div>
  );
}
 

  return (
    <div className="max-w-8xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image and basic info */}
        <div className="lg:col-span-1">
          <Card className="border-teal-100 shadow-md overflow-hidden h-full">
            <div className="h-48 overflow-hidden">
              <img
                src={loan.loanImage || "/placeholder.svg"}
                alt={loan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="bg-teal-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-teal-800">{loan.name}</CardTitle>
                {/* <Badge
                  variant={loan.isActive ? "default" : "outline"}
                  className={
                    loan.isActive ? "bg-teal-600 hover:bg-teal-700" : ""
                  }
                >
                  {loan.isActive ? "Active" : "Inactive"}
                </Badge> */}
              </div>
              <p className="text-xs text-teal-600 font-medium">
                Loan ID: {loan.loanId}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-2">
                  Loan Amount Range
                </h3>
                <div className="flex items-center space-x-2 text-teal-700">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    {formatCurrency(loan.minimumAmount)} -{" "}
                    {formatCurrency(loan.maximumAmount)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-2">
                  Tenure Range
                </h3>
                <div className="flex items-center space-x-2 text-teal-700">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {loan.minimumTenure} - {loan.maximumTenure} months
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-2">
                  Interest Rate
                </h3>
                <div className="flex items-center space-x-2 text-teal-700">
                  <Percent className="h-4 w-4" />
                  <span>
                    {loan.minimumInterest}% - {loan.maximumInterest}%
                  </span>
                </div>
              </div>
              {interest !== "Not Verified" && (
                <div>
                  <h3 className="text-sm font-medium text-teal-800 mb-2">
                    Interest Rate
                  </h3>
                  <div className="flex items-center space-x-2 text-teal-700">
                    <Percent className="h-4 w-4" />
                    <span>interest for your CIBIL score {interest}%</span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-2">
                  Due Penalty
                </h3>
                <div className="flex items-center space-x-2 text-teal-700">
                  <Percent className="h-4 w-4" />
                  <span>{loan.duePenalty}%</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-teal-800 mb-2">
                  Last Updated
                </h3>
                <div className="flex items-center space-x-2 text-teal-700">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(loan.updatedAt)}</span>
                </div>
              </div>
              {isBlacklisted ? (
                <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md w-full cursor-not-allowed">
                  You are blacklisted, so you can't apply for a loan
                </button>
              ) : user !== "verified" ? (
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md w-full"
                  onClick={() => navigate(`/dashboard/profile`)}
                >
                  Only verified accounts can apply for a loan
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/loan/application/${loan._id}`)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md w-full"
                >
                  Apply Loan
                </button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column - Details */}
        <div className="lg:col-span-2">
          <Card className="border-teal-100 shadow-md h-full">
            <CardHeader className="bg-teal-50">
              <CardTitle className="text-teal-800">Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="text-lg font-medium text-teal-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{loan.description}</p>
              </div>

              <Separator className="bg-teal-100" />

              <div>
                <h3 className="text-lg font-medium text-teal-800 mb-3">
                  Features
                </h3>
                <ul className="space-y-2">
                  {featuresList.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="bg-teal-100" />

              <div>
                <h3 className="text-lg font-medium text-teal-800 mb-3">
                  Eligibility
                </h3>
                <ul className="space-y-2">
                  {eligibilityList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="bg-teal-100" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-teal-800">Created On</h4>
                  <p className="text-gray-700">{formatDate(loan.createdAt)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-teal-800">Last Updated</h4>
                  <p className="text-gray-700">{formatDate(loan.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
}
