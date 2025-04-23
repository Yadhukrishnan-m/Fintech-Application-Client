import { loanServices } from "@/api/user/LoanService";
import { ErrorToast } from "@/components/shared/Toast";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Loan {
  _id: string;
  name: string;
  description: string;
  loanImage: string;
}

function LoanHighlights() {
const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, ] = useState(null);
const navigate=useNavigate()
  useEffect(() => {
    const fetchLoans = async () => {
      try { 
          const response = await loanServices.getLoans();
      setLoans(response.data.loans.slice(0, 3));
        console.log(response.data.loans);
        
      } catch (error) {
         if (error instanceof AxiosError) {
              if (error.response?.data?.message) {
                // setError(error.response.data.message);
                ErrorToast('currently no loans are available');
              } else {
                ErrorToast("An unexpected error occurred.");
              }
            } else {
              ErrorToast("An unknown error occurred.");
            }
       
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
  if (error) return <p className="text-center text-red-600">{error}</p>;
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Loan */}
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 mb-4">
                <img
                  src={loan.loanImage}
                  alt={loan.name}
                  className="text-teal-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">
                {loan.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {" "}
                {loan.description.split(".").slice(0, 2).join(".") +
                  (loan.description.split(".").length > 2 ? "." : "")}
              </p>
              <a
                onClick={()=>navigate(`/loan/${loan._id}`)}
                className="mt-auto text-teal-600 hover:text-teal-800 font-medium"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            onClick={()=>navigate("/loans")}
            className="inline-flex bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}

export default LoanHighlights;
