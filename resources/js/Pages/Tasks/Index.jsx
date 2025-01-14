import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Index = ({ user , tasks = [], flash = null }) => {
console.log(flash);
  
  const [message, setMessage] = useState(flash);
  useEffect(() => {
      if (message) {
          const timer = setTimeout(() => {
              setMessage(null);
          }, 5000);
          return () => clearTimeout(timer);
      }
  }, [message]);
  

  const handleDelete = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      Inertia.delete(route("tasks.destroy", taskId));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

      <main className="flex-grow pt-16 bg-gray-50">
        <div className="mx-auto max-w-10xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tasks</h1>
          
            {(user && (user.role === 'admin' || user.role === 'employee')) && (
              <a
                href={route("tasks.create")}
                className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
              >
                Add Task
              </a>
            )}


          </header>

          {message && (
            <div className="mb-4">
              <div
                id="alert-message"
                className={`p-4 rounded-md shadow-md ${message.status === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
              >
                {message.description}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user && (user.role === 'admin') && (

              <>
              
              {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform transition duration-500 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
                  >
                    <a href={`/tasks/${task.id}`} className="block mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{task.name}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-3">{task.description}</p>
                      <p className="text-gray-600 mt-2 line-clamp-3">Project: {task.project.name}</p>
                      <p className="text-gray-600 mt-2 line-clamp-3">Start Date: {task.start_date}</p>
                      <p className="text-gray-600 mt-2 line-clamp-3">End Date: {task.end_date}</p>
                      <div className="mt-4 flex flex-col">
                        <span className="text-sm text-gray-500">Assigned User: {task.assigned_user ? task.assigned_user.name : "Unassigned"}</span>
                        <span className="text-sm text-gray-500">Created By: {task.created_by ? task.created_by.name : "Unassigned"}</span>
                        <span className="text-sm text-gray-500">Last Updated By: {task.updated_by ? task.updated_by.name : "Unassigned"}</span>
                      </div>
                    </a>
  
                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${task.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : task.status === "In Progress"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
  
                      <div className="flex space-x-2">
                        <a
                          href={`/tasks/${task.id}`}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 text-sm"
                        >
                          <i className="fas fa-eye"></i> <span>Show</span>
                        </a>
                        
  
                        
                        {user &&
                            (user.role === "admin" ||
                              user.role === "employee") && (
                              <a
                                href={`/tasks/${task.id}/edit`}
                                className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1 text-sm"
                              >
                                <i className="fas fa-edit"></i> <span>Edit</span>
                              </a>
                            )}
  
  
  {user &&
                            (user.role === "admin" ||
                              user.role === "employee") && (
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-600 hover:text-red-800 font-semibold transition"
                              >
                                Delete
                              </button>
                            )}
  {/*    
                        <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800 font-semibold transition">
                          Delete
                        </button> */}
    
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">No tasks available.</p>
              )}
              
              </>
            )}

            {user && (user.role === 'employee') && (

              <>
              
              {Array.isArray(tasks) && tasks.length > 0 ? (
tasks
.filter(
(task) =>
user.role === "admin" || task.assigned_to === user.id
)
.map((task) => (
<div
key={task.id}
className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transform transition duration-500 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
>
<a href={`/tasks/${task.id}`} className="block mb-4">
<h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
{task.name}
</h3>
<p className="text-gray-600 mt-2 line-clamp-3">
{task.description}
</p>
<p className="text-gray-600 mt-2 line-clamp-3">
Project: {task.project.name}
</p>
<p className="text-gray-600 mt-2 line-clamp-3">
Start Date: {task.start_date}
</p>
<p className="text-gray-600 mt-2 line-clamp-3">
End Date: {task.end_date}
</p>
<div className="mt-4 flex flex-col">
<span className="text-sm text-gray-500">
Assigned User:{" "}
{task.assigned_user
? task.assigned_user.name
: "Unassigned"}
</span>
<span className="text-sm text-gray-500">
Created By:{" "}
{task.created_by ? task.created_by.name : "Unassigned"}
</span>
<span className="text-sm text-gray-500">
Last Updated By:{" "}
{task.updated_by
? task.updated_by.name
: "Unassigned"}
</span>
</div>
</a>

<div className="mt-4 flex items-center justify-between">
<span
className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
task.status === "Pending"
? "bg-yellow-200 text-yellow-800"
: task.status === "In Progress"
? "bg-blue-200 text-blue-800"
: "bg-green-200 text-green-800"
}`}
>
{task.status.replace("_", " ")}
</span>

<div className="flex space-x-2">
<a
href={`/tasks/${task.id}`}
className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 text-sm"
>
<i className="fas fa-eye"></i> <span>Show</span>
</a>

{/* Conditionally render "Edit" button for admin and employee */}
{user &&
(user.role === "admin" ||
user.role === "employee") && (
<a
href={`/tasks/${task.id}/edit`}
className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1 text-sm"
>
<i className="fas fa-edit"></i> <span>Edit</span>
</a>
)}


</div>
</div>
</div>
))
) : (
<p className="text-gray-500 col-span-full text-center">
No tasks available.
</p>
)}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer className="bg-gray-800 text-white py-4" />
    </div>
  );
};

const AlertSuccess = ({ message }) => (
  <div className="bg-green-500 text-white p-4 rounded-md">{message}</div>
);

const AlertError = ({ message }) => (
  <div className="bg-red-500 text-white p-4 rounded-md">{message}</div>
);

export default Index;

