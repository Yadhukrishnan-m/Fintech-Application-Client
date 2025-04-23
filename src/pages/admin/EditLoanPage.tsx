import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddLoanForm from "@/components/admin/AddLoanForm";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { loanServices } from "@/api/admin/LoanService";

export default function EditLoanPage() {
  const { id } = useParams(); 
  const [loanData, setLoanData] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchLoanData() {
      if (!id) {
        return
      }
      try {
const response = await loanServices.getLoanById(id);
        const data = response.data.loan;

        const modifiedData = {
          ...data,
          status: data.isActive ? "Active" : "Inactive",
        };

        setLoanData(modifiedData);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    }

    fetchLoanData();
  }, [id]); 

  if (!loanData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <Breadcrumb
          paths={[
            { name: "Loans", link: "/admin/loans" },
            { name: "Add New Loan" },
          ]}
        />
        <AddLoanForm loanData={loanData} isEditMode={true} />
      </div>
    </div>
  );
}
