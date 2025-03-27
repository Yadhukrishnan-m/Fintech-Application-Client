"use client";

import { useEffect, useState } from "react";
import LoanList from "@/components/user/loans/LoanListing";
import { Loader2 } from "lucide-react";
import userAxiosInstance from "@/config/UserAxiosInstence";
import Header from "@/components/user/shared/Header";
// import Banner from "@/components/user/shared/Banner";
import Footer from "@/components/user/shared/Footer";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const response = await userAxiosInstance.get("/loans");
        if (response.data.success) {
          setLoans(response.data.loans);
          console.log(response.data.loans);
          
        } else {
          setError("Failed to load loans");
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError("An error occurred while fetching loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <span className="ml-2 text-teal-600">Loading loans...</span>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-96">
  //       <div className="text-red-500 text-center">
  //         <p className="text-lg font-medium">{error}</p>
  //         <p className="mt-2">Please try again later</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (loans.length === 0) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-gray-500 text-center">
            <p className="text-lg font-medium">No loans available</p>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
    <Header/>
    {/* <Banner/> */}
      <LoanList loans={loans} />
      <Footer/>
    </>
  );
}
