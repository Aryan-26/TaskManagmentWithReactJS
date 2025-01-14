import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';  // Make sure you import usePage
import Navbar from '@/Components/Navbar';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import Footer from '@/Components/Footer';
import DeleteUserForm from './Partials/DeleteUserForm';
import TextInput from '@/Components/TextInput';

const Profile = ({ user }) => {
  // Use `usePage` to get props passed from the server
  //   const { user } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsPasswordModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsDeleteModalOpen] = useState(false);


  const openUpdateProfileModal = () => setIsModalOpen(true);
  const closeUpdateProfileModal = () => setIsModalOpen(false);

  const openUpdateProfilePasswordModal = () => setIsPasswordModalOpen(true);
  const closeUpdateProfilePasswordModal = () => setIsPasswordModalOpen(false);

  const openProfileDeleteModal = () => setIsDeleteModalOpen(true);
  const closeProfileDeleteModal = () => setIsDeleteModalOpen(false);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(route('profile.update'));
  const handleFormSubmit = (e) => {
    e.preventDefault();
    post(route('profile.update'), {
      onSuccess: () => closeUpdateProfileModal(),
      onError: (errors) => console.log(errors),
    });
  };

  return (
    <div className='con '>
      <Navbar />

      <div className="flex justify-center pt-20">
        <div className="bg-white rounded-lg shadow-md p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <img
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-md"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt={user.name}
            />
            <div className="mt-6 sm:mt-0 sm:ml-8">
              <h1 className="text-2xl font-bold mb-2 text-gray-900">
                {user.name}{" "}
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${user.role === "admin"
                      ? "bg-red-600 text-white"
                      : "bg-blue-600 text-white"
                    }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </h1>
              <p className="text-lg text-gray-600">{user.email}</p>
              <p className="text-lg text-gray-600">{user.number}</p>
              <div className="grid grid-cols-3 space-x-2">

                <div className="mt-6">
                  <button
                    onClick={openUpdateProfileModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition transform hover:scale-105"
                  >
                    Update Profile
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    onClick={openUpdateProfilePasswordModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition transform hover:scale-105"
                  >
                    Update Profile
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    onClick={openProfileDeleteModal}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition transform hover:scale-105"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              onClick={closeUpdateProfileModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Update Profile
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <TextInput
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeUpdateProfileModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* update Password */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              onClick={closeUpdateProfilePasswordModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Update Profile Password
            </h2>
            <UpdatePasswordForm />
          </div>
        </div>
      )}

      {/* delete profile */}
      {isModalDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              onClick={closeProfileDeleteModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Update Profile Password
            </h2>
            <DeleteUserForm />
          </div>
        </div>
      )}


    </div>

  );
};

export default Profile;
