import AddLoanForm from "@/components/admin/AddLoanForm";
import Breadcrumb from "@/components/shared/Breadcrumb";

export default function AddLoanPage () {
  return (
   
      <div className=" bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <Breadcrumb
            paths={[
              { name: "Loans", link: "/admin/loans" },
              { name: "Add New Loan" },
            ]}
          />
          <AddLoanForm />
        </div>
      </div>
   
  );
}

