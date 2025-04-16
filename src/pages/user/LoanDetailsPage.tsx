

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoanDetails from "@/components/user/loans/LoanDetails";
import { Loader2 } from "lucide-react";
import userAxiosInstance from "@/config/UserAxiosInstence";
import Header from "@/components/user/shared/Header";
import Footer from "@/components/user/shared/Footer";
import Breadcrumb from "@/components/shared/Breadcrumb";


export default function LoanDetailsPage() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [interest, setInterest]=useState('')


  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        setLoading(true);
        const response = await userAxiosInstance.get(`/loan/${id}`);
        if (response.data.success) {
          setLoan(response.data.loan);
        
          
        } else {
          setError("Failed to load loan details");
        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
        setError("An error occurred while fetching loan details");
      } finally {
        setLoading(false);
      }
    };


     const getInterest = async () => {
       try {
         const response = await userAxiosInstance.get(`/get-interest/${id}`, );
         console.log(response);
         if (response.data.success) {
           setInterest(response.data.interest);
         } else if (response.data.message === "user not verified") {
           setInterest("Not Verified");
           
           
         } else {
           setError("Failed to load interest details");
         }
       } catch (error) {
         console.log(error);

         setInterest("Not Verified");
       }
     };
   
    if (id) {

      fetchLoanData();
      
         getInterest();
      
     
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <span className="ml-2 text-teal-600">Loading loan details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-red-500 text-center">
          <p className="text-lg font-medium">{error}</p>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium">Loan not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Header />
          <Breadcrumb
                  paths={[
                    { name: "Loans", link: "/loans" },
                    { name: "Loan Details" },
                  ]}
                />
      <LoanDetails loan={loan} interest={interest} />
      <Footer />
    </div>
  );
}
