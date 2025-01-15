// EmployeeDashboard.jsx
import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const EmployeeDashboard = ({ tasks, projects, user, tasksCount, projectsCount }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 font-semibold';
      case 'In Progress':
        return 'text-blue-600 font-semibold';
      case 'Completed':
        return 'text-green-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <Navbar />

      <div className="flex-1 container mx-auto pt-20 px-6 py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center leading-tight tracking-tight">
          Welcome, {user.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-6">
              Your Tasks ({tasksCount})
            </h2>
            {tasks.length > 0? (
              <ul>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center mb-4 pb-3 border-b last:border-b-0"
                  >
                    <div>
                      <p className="text-lg text-blue-600 hover:underline font-medium">
                        {task.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        End Date : {formatDate(task.end_date)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${statusClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No tasks assigned.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-6">
              Your Projects ({projectsCount})
            </h2>
            {projects.length > 0? (
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="mb-4 pb-3 border-b last:border-b-0"
                  >
                    <p className="text-lg font-medium text-gray-800">
                      {project.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Start: {formatDate(project.start_date)} - End: {formatDate(project.end_date)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No projects assigned.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeeDashboard;