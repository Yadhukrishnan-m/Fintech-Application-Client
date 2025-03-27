import ApplicationDetails from "@/components/admin/ApplicationDetails";
import adminAxiosInstance from "@/config/AdminAxiosInstence";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ILoanApplicationResponse,
  ILoanApplication,
} from "../../interfaces/interfaces";
import { Loader2 } from "lucide-react";
import Breadcrumb from "@/components/shared/Breadcrumb";

function ApplicationDetailsPage() {
  const { id } = useParams();
  const [application, setApplication] = useState<ILoanApplication | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await adminAxiosInstance.get<ILoanApplicationResponse>(
          `/application/${id}`
        );
        if (response.data.success) {
          setApplication(response.data.application);
        } else {
          setApplication(undefined);
        }
      } catch (error) {
        console.error("Error fetching application details:", error);
        setApplication(undefined);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
      <span className="ml-2 text-teal-600">Loading ...</span>
    </div>
  );
  if (!application) return <p>Data not found</p>;

  return ( <div className="bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <Breadcrumb
        paths={[
          { name: "applications", link: "/admin/application" },
          { name: "Application Detail" },
        ]}
      />
      <ApplicationDetails applicationData={application} />
    </div>
  </div>)
}

export default ApplicationDetailsPage;
