"use client";

import type React from "react";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import TransactionCard from "@/components/shared/TransactionCard"; // Import the new component
import { ITransaction } from "@/interfaces/interfaces";
import Pagination from "@/components/shared/Pagination";
import adminAxiosInstance from "@/config/AdminAxiosInstence";




export default function TransactionList() {
  // State for transactions
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search, Sort, and Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt_desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Fetch transactions with all parameters - this simulates the API call
  const fetchTransactions = useCallback(async () => {
  setLoading(true);
  try {
    const response = await adminAxiosInstance.get("/transactions", {
      params: {
        page: currentPage,
        search: searchQuery,
        sortBy,
        statusFilter,
        typeFilter
      },
    });

    setTransactions(response.data.transactions);
    setTotalPages(response.data.totalPages || 1);
    
    
    
  } catch (error) {
    console.log(error);
    setError("Failed to fetch users. Please try again.");
  } finally {
    setLoading(false);
  }

    
 
  }, [currentPage, searchQuery, sortBy, statusFilter, typeFilter]);


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

  // Handle status filter change
  const handleStatusFilterChange = useCallback((newFilter: string) => {
    setStatusFilter(newFilter);
    setCurrentPage(1);
  }, []);

  // Handle type filter change
  const handleTypeFilterChange = useCallback((newFilter: string) => {
    setTypeFilter(newFilter);
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  // Fetch transactions when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Memoize the transaction cards to prevent unnecessary re-renders
  const memoizedTransactionCards = useMemo(() => {
    return transactions.map((transaction) => (
      <TransactionCard
        key={transaction._id}
        transaction={transaction}
        role='admin'
      />
    ));
  }, [transactions]);

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
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Transactions</h1>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search by Transaction ID"
              className="pl-10 border-gray-300"
              defaultValue={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <div className="flex items-center space-x-2">
              <ArrowUpDown size={16} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="amount_desc">Amount: High to Low</option>
                <option value="amount_asc">Amount: Low to High</option>
                <option value="createdAt_desc">Date: Newest</option>
                <option value="createdAt_asc">Date: Oldest</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={typeFilter}
                onChange={(e) => handleTypeFilterChange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="emi">EMI</option>
                <option value="payout">Payout</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
            <span className="ml-2 text-teal-600">Loading transactions...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-teal-500 text-teal-600 hover:bg-teal-50"
              onClick={() => fetchTransactions()}
            >
              Try Again
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div>
            {memoizedTransactionCards}

            {/* Pagination */}
            <div className="mt-6 flex justify-center">{memoizedPagination}</div>
          </div>
        )}
      </div>
    </div>
  );
}
