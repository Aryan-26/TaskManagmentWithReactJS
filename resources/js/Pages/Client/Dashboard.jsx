import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const ClientDashboard = ({ clientDetails, projects, projectsCount, tasksCount, tasks }) => {
  return (
    <>
    
      <Navbar />
      <div className="container mx-auto p-6 pt-20 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Client Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage your projects and tasks effortlessly in one place.
          </p>
        </header>

        {/* Overview Cards */}
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-blue-700">Projects</h2>
              <p className="text-xl font-medium text-gray-700 mt-2">
                Total Projects: <span className="font-bold">{projectsCount}</span>
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700">Tasks</h2>
              <p className="text-xl font-medium text-gray-700 mt-2">
                Total Tasks: <span className="font-bold">{tasksCount}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="text-sm text-gray-500 mt-4">
                  <p>Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
                  <p>End Date: {new Date(project.end_date).toLocaleDateString()}</p>
                </div>
                <InertiaLink
                  href={`/projects/${project.id}`}
                  className="inline-block mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                  View Details
                </InertiaLink>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Tasks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
                <div className="text-sm text-gray-500 mt-4">
                  <p>Start Date: {new Date(task.start_date).toLocaleDateString()}</p>
                  <p>End Date: {new Date(task.end_date).toLocaleDateString()}</p>
                </div>
                <InertiaLink
                  href={`/projects/${task.id}`}
                  className="inline-block mt-4 px-4 py-2 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
                >
                  View Details
                </InertiaLink>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
