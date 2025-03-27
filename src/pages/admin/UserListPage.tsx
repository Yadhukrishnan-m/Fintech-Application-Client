import UserList from "@/components/admin/Userslist";

function UserListPage() {
  return (
    <>
      <div className=" bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
          <h1 className="text-3xl font-bold text-teal-700 mb-6">
           Users
          </h1>
          <UserList />
        </div>
      </div>
    </>
  );
}

export default UserListPage;
