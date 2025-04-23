import Loader from "@/components/shared/Loader";
import Pagination from "@/components/shared/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  IUserLoanPopulated } from "@/interfaces/interfaces";
import UserLoanListCard from "@/components/user/userLoan/UserLoanList";
import { userLoanService } from "@/api/user/UserLoanServices";

const UserLoanListPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState<IUserLoanPopulated[]>([]);
  const navigate = useNavigate();

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    try {
     const response = await userLoanService.getUserLoans(currentPage);
console.log(response.data);

      setLoans(response.data.userLoans.userLoan);
      setTotalPages(response.data.userLoans.totalPages || 1);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  if (loading) {
    return <Loader message="Loading loans..." />;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 p-6">
        {loans.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg w-full">
            <p className="text-gray-500">No loans found</p>
          </div>
        ) : (
          loans.map((loan) => (
            <UserLoanListCard
              key={loan._id}
              loan={loan}
              onViewDetails={() => navigate(`/dashboard/loan/${loan._id}`)}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UserLoanListPage;
