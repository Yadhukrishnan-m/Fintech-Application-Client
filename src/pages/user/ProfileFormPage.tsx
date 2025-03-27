import Breadcrumb from "@/components/shared/Breadcrumb";
import CustomerForm from "@/components/user/profile/ProfileForm";
function ProfileFormPage() {
  return (
    <>
     
          <Breadcrumb
            paths={[
              { name: "User-Profile", link: "/dashboard/profile" },
              { name: "Form" },
            ]}
          ></Breadcrumb>
          <CustomerForm />
       
    </>
  );
}

export default ProfileFormPage;
