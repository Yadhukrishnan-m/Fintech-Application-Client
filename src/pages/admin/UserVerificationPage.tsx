import UserVerification from '@/components/admin/UserVerification'
import Breadcrumb from '@/components/shared/Breadcrumb';

function UserVerificationPage() {
  const mode='verification'
  return (
    <div className=" bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <Breadcrumb
          paths={[
            { name: "Unverified Users", link: "/admin/user-verification" },
            { name: "User Verification" },
          ]}
        />
        <UserVerification mode={mode} />
      </div>
    </div>
  );
}

export default UserVerificationPage