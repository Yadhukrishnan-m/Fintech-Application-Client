 ;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoanDetails from "@/components/admin/LoanDetails";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { loanServices } from "@/api/admin/LoanService";

export default function LoanDetailsPage() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchLoanData = async () => {
      if (!id) {
        return
      }
      try {
        setLoading(true);
        const response = await loanServices.getLoanById(id)
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


 if (id) {
   fetchLoanData();
 
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
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <Breadcrumb
          paths={[
            { name: "Loans", link: "/admin/loans" },
            { name: "Loan Detail" },
          ]}
        />
        <LoanDetails loan={(loan )} />
      </div>
    </div>
  );
}
