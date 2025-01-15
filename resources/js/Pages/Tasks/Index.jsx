import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import TaskCard from "./Partials/TaskCard";

const Index = ({ user, tasks = [], flash = null }) => {
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
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

        <main className="flex-grow pt-16 bg-gray-50">
          <div className="mx-auto max-w-10xl px-4 py-12 sm:px-6 lg:px-8">
            {message && flash.message && (
              <div className="mb-4">
                <div
                  id="alert-message"
                  className={`p-4 rounded-md shadow-md ${flash.message.status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                    }`}
                >
                  {flash.message.description}
                </div>
              </div>
            )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(tasks) && tasks.length > 0 ? (
  tasks
    .filter((task) => user.role === "admin" || task.assigned_to === user.id)
    .map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        user={user}
        handleDelete={handleDelete}
      />
    ))
) : (
  <p className="text-gray-500 col-span-full text-center">No tasks available.</p>
)}

            </div>
          </div>
        </main>
      </div>
      <Footer className="bg-gray-800 text-white py-4" />
    </>
  );
};

export default Index;
