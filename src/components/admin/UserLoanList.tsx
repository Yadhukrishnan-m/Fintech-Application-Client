import { useEffect, useState, useCallback, useMemo } from "react";
import DataTable, { Column } from "@/components/shared/DataTable";
import Pagination from "@/components/shared/Pagination";
import debounce from "lodash.debounce";
import { Loader2 } from "lucide-react";
import {   IUserLoanPopulated } from "@/interfaces/interfaces";
import { userLoanService } from "@/api/admin/UserLoanServices";

type ExtendedUserLoan = Omit<IUserLoanPopulated, "loanId" | "userId"> & {
  loanName: string;
  customerId: string;
  loanId: string;
};



const columns: Column<ExtendedUserLoan>[] = [
  { key: "userLoanId", label: "userLoan Id" },
  { key: "customerId", label: "customer Id" },
  { key: "loanId", label: "loan Id" },
  { key: "loanName", label: "laon name" },
  { key: "interest", label: "Interest" },
  { key: "amount", label: "Loan Amount " },
  { key: "tenure", label: "Tenure (months) " },
];

interface Link<T> {
  label: string;
  to: (row: T) => string;
  columnName?: string;
}

const links: Link<ExtendedUserLoan>[] = [
  {
    label: "Show Details",
    to: (row: ExtendedUserLoan) => `/admin/user-loan/${row._id}`,
  },
];

function UserLoanList() {
  const [userLoans, setUserLoans] = useState<IUserLoanPopulated[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search, Sort, and Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
 

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
           const response = await userLoanService.getUserLoans(
             currentPage,
             searchQuery,
             sortBy
           );


      setUserLoans(response.data.userLoans);
      setTotalPages(response.data.totalPages || 1);
      console.log(response.data.userLoans, response.data.totalPages);
      
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, ]);

  //
  const formattedUserLoans= userLoans.map((loan) => ({
    ...loan,
    loanName: loan.loanId.name,
    customerId: loan.userId.customerId,
    loanId: loan.loanId.loanId,
  }));

  // Use debouncedSearch to handle search query changes
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }, 500),
    []
  );

  // Handle search change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  // Handle sort change
  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

 

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  // Fetch users when dependencies change
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Memoize the DataTable component to prevent unnecessary re-renders
  const memoizedDataTable = useMemo(() => {
    return (
      <DataTable columns={columns} data={formattedUserLoans} links={links} />
    );
  }, [formattedUserLoans]);

  // Memoize the Pagination component
  const memoizedPagination = useMemo(() => {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    );
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search by user-loan ID"
          className="w-full p-2 border rounded-md"
          defaultValue={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="p-2 border rounded-md mb-4"
      >
        <option value="amount_desc">Loan Amount: High to Low</option>
        <option value="amount_asc">Loan Amount: Low to High</option>
        <option value="interest_desc">interest : High to Low</option>
        <option value="interest_asc">interest: Low to High</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

    

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
          <span className="ml-2 text-teal-600">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {memoizedDataTable}
          {memoizedPagination}
        </>
      )}
    </div>
  );
}

export default UserLoanList;
