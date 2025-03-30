
import { useCallback, useEffect, useMemo, useState } from "react";
import LoanList from "@/components/user/loans/LoanListing";
import { Loader2 } from "lucide-react";
import userAxiosInstance from "@/config/UserAxiosInstence";
import Header from "@/components/user/shared/Header";
import Footer from "@/components/user/shared/Footer";
import debounce from "lodash.debounce";
import Pagination from "@/components/shared/Pagination";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userAxiosInstance.get("/loans", {
        params: { page: currentPage, search: searchQuery, sortBy },
      });

      if (response.data.success) {
        setLoans(response.data.loans);
        setTotalPages(response.data.totalPages);
      } else {
        setError("Failed to load loans");
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      setError("An error occurred while fetching loans");
       setLoans([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on new search
      }, 500),
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search by Loan Name"
            className="w-full p-2 border rounded-md"
            onChange={handleSearchChange}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border rounded-md"
          >
            <option value="name">Loan Name</option>
            <option value="minAmount_low">Min Amount: Low to High</option>
            <option value="minAmount_high">Min Amount: High to Low</option>
            <option value="maxAmount_low">Max Amount: Low to High</option>
            <option value="maxAmount_high">Max Amount: High to Low</option>
            <option value="interest_low">Min Interest: Low to High</option>
            <option value="interest_high">Min Interest: High to Low</option>
            <option value="penalty_low">Due Penalty: Low to High</option>
            <option value="penalty_high">Due Penalty: High to Low</option>
          </select>
        </div>

        {/* Loading & Error Handling */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
            <span className="ml-2 text-teal-600">Loading loans...</span>
          </div>
        ) : loans.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-500 text-center">
              <p className="text-lg font-medium">No loans found</p>
            </div>
          </div>
        ) : (
          <>
            <LoanList loans={loans} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
