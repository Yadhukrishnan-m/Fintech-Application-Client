import { useEffect, useState, useCallback, useMemo } from "react";
import DataTable, { Column } from "@/components/shared/DataTable";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import Pagination from "@/components/shared/Pagination";
import debounce from "lodash.debounce"; 

interface User {
  customerId: string;
  name: string;
  email: string;
  cibilScore: number;
  _id: string;
}

const columns: Column<User>[] = [
  { key: "customerId", label: "Customer ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "cibilScore", label: "CIBIL Score" },
];

const links = [
  {
    label: "User Details",
    to: (row: User) => `/admin/users/${row._id}`,
  },
];

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search, Sort, and Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filter, setFilter] = useState<string>("");


  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminAxiosInstance.get("/verified-users", {
        params: {
          page: currentPage,
          search: searchQuery,
          sortBy,
          filter,
        },
      });
      
      setUsers(response.data.users.users);
      setTotalPages(response.data.users.totalPages || 1);
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
    fetchUsers();
  }, [fetchUsers]);

  // Memoize the DataTable component to prevent unnecessary re-renders
  const memoizedDataTable = useMemo(() => {
    return (
      <DataTable
        columns={columns}
        data={users}
        links={links}
        actionsLabel="User Details"
        linksLabel="User Details"
      />
    );
  }, [users]);

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
          placeholder="Search by Name, Email, Customer ID"
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
        <option value="cibil_desc">CIBIL Score: High to Low</option>
        <option value="cibil_asc">CIBIL Score: Low to High</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      {/* Filter by CIBIL Score */}
      <select
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="p-2 border rounded-md mb-4"
      >
        <option value="">Filter by CIBIL Score</option>
        <option value="300-549">300 - 549 (Poor)</option>
        <option value="550-649">550 - 649</option>
        <option value="650-749">650 - 749</option>
        <option value="750-900">750 - 900</option>
      </select>
      
      {loading ? (
        <p className="text-center">Loading...</p>
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

export default UserList;