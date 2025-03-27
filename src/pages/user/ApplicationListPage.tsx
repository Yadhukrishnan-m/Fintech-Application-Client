import Loader from "@/components/shared/Loader";
import Pagination from "@/components/shared/Pagination";
import ApplicationListCard from "@/components/user/application/ApplicationListCard";
import userAxiosInstance from "@/config/UserAxiosInstence";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Application {
  applicationId: string;
  duePenalty: number;
  status: string;
  interest: number;
  amount: number;
  cibilScore: number;
  tenure: number;
  createdAt:string
  _id: string;
}


const ApplicationListPage = () => {
      const [currentPage, setCurrentPage] = useState<number>(1);
      const [totalPages, setTotalPages] = useState<number>(1);
    const [loading,setLoading]=useState(false)
      const [applications, setApplications] = useState<Application[]>([]);
      const navigate=useNavigate()
    
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userAxiosInstance.get("/applications", {
        params: {
          page: currentPage,
        },
      });

      setApplications(response.data.applications.applications);
      setTotalPages(response.data.applications.totalPages || 1);
    } catch (error) {
      console.log(error);
    
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

   const handlePageChange = useCallback((newPage: number) => {
      setCurrentPage(newPage);
    }, []);

      useEffect(() => {
        fetchApplications();
      }, [fetchApplications]);
    
if (loading) {
    return (
     <Loader message={'loading...'}/>
    );
}
  return (
    <>
      <div className="flex flex-wrap gap-4 p-6">
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg w-full">
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          applications.map((app, index) => (
            <ApplicationListCard
              key={index}
              {...app}
              onClick={() => navigate(`/dashboard/applications/${app._id}`)}
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

export default ApplicationListPage;
