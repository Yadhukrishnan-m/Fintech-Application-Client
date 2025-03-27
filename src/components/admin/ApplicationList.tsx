import { useEffect, useState, useCallback, useMemo } from "react";
import DataTable, { Column } from "@/components/shared/DataTable";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import Pagination from "@/components/shared/Pagination";
import debounce from "lodash.debounce";
import { Loader2 } from "lucide-react";

interface User {
  applicationId:string
  duePenalty: number;
  status: string;
  interest: number;
  amount: number;
  cibilScore: number;
  tenure: number;
  _id: string;
}

const columns: Column<User>[] = [
  { key: "applicationId", label: "Application Id" },

  { key: "status", label: "Application Status" },
  { key: "duePenalty", label: "Due Penalty(%)" },
  { key: "interest", label: "Interest" },
  { key: "amount", label: "Loan Amount " },
  { key: "tenure", label: "Tenure (months) " },
];

const links = [
  {
    label: "Show Details",
    to: (row: User) => `/admin/application/${row._id}`,
  },
];

function ApplicationList() {
  const [applications, setApplications] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search, Sort, and Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filter, setFilter] = useState<string>("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminAxiosInstance.get("/applications", {
        params: {
          page: currentPage,
          search: searchQuery,
          sortBy,
          filter,
        },
      });

      setApplications(response.data.applications.applications);
      setTotalPages(response.data.applications.totalPages || 1);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, filter]);

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

  // Handle filter change
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
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
      <DataTable
        columns={columns}
        data={applications}
        links={links}
        actionsLabel="show Details"
        linksLabel="Show Details"
      />
    );
  }, [applications]);

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
          placeholder="Search by Application ID"
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
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      {/* Filter by CIBIL Score */}
      <select
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="p-2 border rounded-md mb-4"
      >
        {/* <option value="pending">Filter by status </option> */}
        <option value="pending">pending</option>
        <option value="all">all </option>
        <option value="approved">verified</option>
        <option value="rejected">rejected</option>
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

export default ApplicationList;
