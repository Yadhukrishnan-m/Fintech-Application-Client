import LoansOfUser from "@/components/admin/LoansOfUser";
import UserVerification from "@/components/admin/UserVerification";
import Breadcrumb from "@/components/shared/Breadcrumb";

function UserDetailsPage() {
    const mode = "details";
  return (
    
      <div className=" bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <Breadcrumb
            paths={[
              { name: "Users", link: "/admin/users" },
              { name: "User Details" },
            ]}
          />
          <UserVerification mode={mode} />
          <LoansOfUser/>
        </div>
      </div>
   
  );
}

export default UserDetailsPage;
