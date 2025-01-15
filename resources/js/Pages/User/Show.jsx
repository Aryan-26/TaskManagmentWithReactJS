import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const UserDetails = ({  user, success, error }) => {
  return (
    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto pt-20">
    
      {success && (
        <div className="bg-green-600 text-white p-5 rounded-lg shadow-lg mb-6 transition transform hover:scale-105">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-600 text-white p-5 rounded-lg shadow-lg mb-6 transition transform hover:scale-105">
          {error}
        </div>
      )}

      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          User Details: <span className="text-indigo-600">{user.name}</span>
        </h1>
      </div>

     
      <div className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-400 p-10 rounded-xl shadow-xl transition duration-500 hover:scale-105">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="flex justify-center items-center">
            <img
              src={
                "https://www.shareicon.net/data/128x128/2016/07/26/802016_man_512x512.png"
              }
              alt={user.name}
              className="w-44 h-44 rounded-full object-cover shadow-lg transform transition duration-300 hover:scale-110"
            />
          </div>

          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Name</h2>
              <p className="text-lg text-gray-600">{user.name}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Email</h2>
              <p className="text-lg text-gray-600">{user.email}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Role</h2>
              <p className="text-lg">
                <span
                  className={`px-4 py-2 inline-block rounded-full text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-red-500 text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Created At</h2>
              <p className="text-lg text-gray-600">
                {new Date(user.created_at).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Last Updated</h2>
              <p className="text-lg text-gray-600">
                {new Date(user.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        
        <div className="mt-8 flex justify-start">
          <Link
            href={route("users.index")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-md shadow-xl hover:bg-gradient-to-l hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
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
                d="M11 19l-7-7 7-7m6 14l7-7-7-7"
              />
            </svg>
            Back to Users
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UserDetails;
