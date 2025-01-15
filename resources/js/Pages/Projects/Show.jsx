import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React from "react";

const ProjectDetails = ({ project }) => {
  console.log(project);

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return { label: "Pending", style: "bg-yellow-500 text-white" };
      case "incomplete":
        return { label: "Incomplete", style: "bg-red-500 text-white" };
      case "complete":
        return { label: "Complete", style: "bg-green-500 text-white" };
      default:
        return { label: "Unknown", style: "bg-gray-500 text-white" };
    }
  };


  const isAllTasksCompleted = project.tasks.every((task) => task.status === "Completed");

  const label = isAllTasksCompleted ? "Completed" : "In Progress"; 

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />


      <div className="relative bg-gray-50 mb-10 pt-20">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/1IgVe0tV9yDjWtp68dAZJq/36ca564d33306d407dabe39c33322dd9/TaskManagement-hero.png"
          alt={project.name}
          className="w-full h-72 object-cover rounded-b-lg shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg sm:text-xl lg:text-2xl">
            {project.description}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 shadow-lg rounded-lg p-8 mb-10 max-w-5xl mx-auto">


        <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-2 border-gray-200 pb-4">
          Project Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm text-gray-500">Start Date</span>
            <span className="text-lg font-bold text-gray-900">
              {new Date(project.start_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm text-gray-500">End Date</span>
            <span className="text-lg font-bold text-gray-900">
              {new Date(project.end_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div
            className={`flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${label === "Completed"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-yellow-500"
              }`}
          >
            <span className="text-sm text-gray-500">Status</span>
            <span className={`text-lg font-bold`}>
              {label}
            </span>
          </div>;
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm text-gray-500">Created By</span>
            <p className="text-lg font-bold text-gray-900">
              {project.created_by?.name || "N/A"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <span className="text-sm text-gray-500">Updated By</span>
            <p className="text-lg font-bold text-gray-900">
              {project.updated_by?.name || "N/A"}
            </p>
          </div>
        </div>


        {project.client && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Client Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <span className="text-sm text-gray-500">Client Name</span>
                <p className="text-lg font-bold text-gray-900">{project.client.name}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <span className="text-sm text-gray-500">Client Email</span>
                <p className="text-lg font-bold text-gray-900">{project.client.email}</p>
              </div>

            </div>
          </div>
        )}
      </div>




      <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Assigned Employees</h2>
        {project.users && project.users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.users.map((user, index) => (
              <div key={user.id} className="p-4 border rounded-lg">
                <div>
                  <span className="text-gray-600">Employee Name:</span>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Employee Email:</span>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No employees have been assigned to this project.</p>
        )}
      </div>



      <div className="bg-white shadow-lg rounded-lg p-8 mb-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Tasks</h2>
        {Array.isArray(project.tasks) && project.tasks.length > 0 ? (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <ul className="list-none divide-y divide-gray-200">
              {project.tasks.map((task) => (
                <li key={task.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-3"
                        defaultChecked={task.status === "completed"}
                      />
                      <span className="text-gray-800">{task.name}</span>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-600">No tasks available for this project.</p>
        )}
      </div>

      <Footer />
    </div>
    
  );
};

export default ProjectDetails;
