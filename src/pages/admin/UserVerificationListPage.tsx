
import UserVerificationList from '../../components/admin/UserVerificationList';

function UserVerificationListPage() {

  return (
    <>
      <div className=" bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <h1 className="text-3xl font-bold text-teal-700 mb-6">Pending verifications</h1>
          <UserVerificationList />
        </div>
      </div>
    </>
  );
}

export default UserVerificationListPage