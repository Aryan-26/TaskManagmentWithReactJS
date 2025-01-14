import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = ({ users, successMessage, errorMessage,flash, validationErrors }) => {
console.log(flash);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      ["success-message", "error-message", "validation-errors"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.style.display = "none";
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
 
  const handleDelete = (userId) => { 
    const confirmDelete = window.confirm("Are you sure? This will delete the user.");
    if (confirmDelete) {
      Inertia.delete(route('users.destroy', { user: userId })); 
    }
  };
  
  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg" />

      <main className="pt-[100px] px-6 bg-gray-50 min-h-screen">
        <div className="max-w-10xl mx-auto space-y-6">
         
          {successMessage && (
            <div
              id="success-message"
              className="flex items-center justify-between bg-teal-100 text-teal-700 px-4 py-3 rounded-md shadow-md"
            >
              <span>{successMessage}</span>
              <button
                onClick={() => (document.getElementById("success-message").style.display = "none")}
                className="font-bold"
              >
                ×
              </button>
            </div>
          )}
          {errorMessage && (
            <div
              id="error-message"
              className="flex items-center justify-between bg-red-100 text-red-700 px-4 py-3 rounded-md shadow-md"
            >
              <span>{errorMessage}</span>
              <button
                onClick={() => (document.getElementById("error-message").style.display = "none")}
                className="font-bold"
              >
                ×
              </button>
            </div>
          )}
          {validationErrors?.length > 0 && (
            <div
              id="validation-errors"
              className="bg-red-100 text-red-700 px-4 py-3 rounded-md shadow-md"
            >
              <ul className="list-disc pl-5 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

        
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            {/* <Link
              href={route('users.create')}
              className="flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add New User
            </Link> */}
           <PrimaryButton
    onClick={() => window.location.href = route('users.create')}
    className="flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 transition"
>
    <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
        ></path>
    </svg>
    Add New User
</PrimaryButton>

          </div>

          
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-sm font-semibold">#</th>
                    <th className="px-4 py-2 text-sm font-semibold">Profile</th>
                    <th className="px-4 py-2 text-sm font-semibold">Name</th>
                    <th className="px-4 py-2 text-sm font-semibold">Email</th>
                    <th className="px-4 py-2 text-sm font-semibold">Role</th>
                    <th className="px-4 py-2 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                  {users.data.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          alt={user.name}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-teal-600 hover:underline"
                        >
                          View
                        </Link>
                        <Link
                          href={`/users/${user.id}/edit`}
                          className="text-yellow-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 font-semibold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
          <div className="join mt-6 flex justify-center space-x-2">
            {users.prev_page_url && (
              <Link
                href={users.prev_page_url}
                className="join-item btn"
              >
                «
              </Link>
            )}
            <span className="join-item btn">{`Page ${users.current_page} of ${users.last_page}`}</span>
            {users.next_page_url && (
              <Link
                href={users.next_page_url}
                className="join-item btn"
              >
                »
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Index;
