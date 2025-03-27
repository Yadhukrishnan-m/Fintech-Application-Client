import { useEffect, useState, useCallback, useMemo } from "react";
import DataTable, { Column } from "@/components/shared/DataTable";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import Pagination from "@/components/shared/Pagination";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../shared/Toast";
import { Loader2 } from "lucide-react";

interface Loan {
  _id:string
  loanId: string;
  name: string;
  isActive: boolean;
  minimumAmount: number;
  maximumAmount: number;
  minimumTenure: number;
  maximumTenure: number;
  minimumInterest: number;
  maximumInterest: number;
  duePenalty: number;
}

const columns: Column<Loan>[] = [
  { key: "loanId", label: "Loan ID" },
  { key: "name", label: "Loan Name" },
  { key: "minimumAmount", label: "Min Amount(₹)" },
  { key: "maximumAmount", label: "Max Amount(₹)" },
//   { key: "minimumTenure", label: "Min Tenure(Months)" },
//   { key: "maximumTenure", label: "Max Tenure(Months)" },
  { key: "minimumInterest", label: "Min Interest(%)" },
  { key: "maximumInterest", label: "Max Interest(%)" },
  { key: "duePenalty", label: "Due Penalty" },
];
const links = [
  { label: "Show Loan", to: (row: Loan) => `/admin/loans/loan-details/${row._id}`, },
  { label: "Edit Loan", to: (row: Loan) => `/admin/loans/edit-loan/${row._id}` },
];
function LoanList() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterActive, setFilterActive] = useState<string>("all"); 
  const navigate = useNavigate();

  // Fetch loans data
  const fetchLoans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminAxiosInstance.get("/loans", {
        params: {
          page: currentPage,
          search: searchQuery,
          sortBy,
          isActive:
            filterActive !== "all" ? filterActive === "active" : undefined,
        },
      });
      setLoans(response.data.loans);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch loans. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, filterActive]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // Debounced Search
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }, 500),
    []
  );

  // Handlers
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterActive(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const toggleLoanActivation = async (loan: Loan) => {
    try {
      await adminAxiosInstance.patch(`/loans/${loan._id}/toggle-status`);
      setLoans((prevLoans) =>
        prevLoans.map((l) =>
          l.loanId === loan.loanId ? { ...l, isActive: !l.isActive } : l
        )
      );
    } catch (error) {
      console.log(error);
      ErrorToast("Failed to update loan status.");
      setError("Failed to update loan status.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search by Loan Name or ID"
          className="w-full p-2 border rounded-md"
          defaultValue={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-2 md:space-y-0">
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="p-2 border rounded-md w-full md:w-auto"
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

        {/* Filter Dropdown */}
        <select
          value={filterActive}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="all">All Loans</option>
          <option value="active">Active Loans</option>
          <option value="inactive">Inactive Loans</option>
        </select>

        {/* Add Loan Button */}
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 w-full md:w-auto"
          onClick={() => navigate("/admin/loans/add-loan")}
        >
          Add Loan
        </button>
      </div>

      {loading ? (
          <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
        <span className="ml-2 text-teal-600">Loading loans...</span>
      </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={loans}
            actionsLabel="Status"
            actions={[
              {
                label: (row) => (row.isActive ? "Deactivate" : "Activate"),
                onClick: toggleLoanActivation,
                getColor: (row) => row.isActive,
              },
            ]}
            links={links}
            linksLabel="Actions"
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default LoanList;
