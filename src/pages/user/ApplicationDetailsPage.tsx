import { useCallback, useEffect, useState } from "react";
import ApplicationDetails from "../../components/user/application/ApplicationDetails";
import { ILoanApplication } from "@/interfaces/interfaces";
import { useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { applicationService } from "@/api/user/applicationService";

const ApplicationDetailsPage = () => {
const [applicationData, setApplicationData] = useState<ILoanApplication | null>(
  null
);
const {id}=useParams()
 const [loading,setLoading]=useState(false)

    const fetchApplications = useCallback(async () => {
      setLoading(true);
      if (!id) {
        return 
      }
      try {
       const response = await applicationService.getApplicationDetails(id);
console.log();

        setApplicationData(response.data.application);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, [id]);
    
     
    
          useEffect(() => {
            fetchApplications();
          }, [fetchApplications]);

          
          if (loading) {
            return <Loader message={'loading data...'}/>
          }
          if (!applicationData) {
            return <p>data not found</p>;
          }



  // return (
  //   <>
      
  //       <ApplicationDetails applicationData={applicationData} />
    
  //   </>
  // );


   return (
     <div className="bg-gray-100">
       <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
         <Breadcrumb
           paths={[
             { name: "applications", link: "/dashboard/applications" },
             { name: "Application Detail" },
           ]}
         />
         <ApplicationDetails applicationData={applicationData} />
       </div>
     </div>
   );
};

export default ApplicationDetailsPage;
