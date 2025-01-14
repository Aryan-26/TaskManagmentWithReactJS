import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Show = ({ task = [] ,flash,createdBy=[], updatedBy, assignedUser,project=[]}) => {
  console.log(flash);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200">
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

      <div className="container max-w-xl mx-auto pt-20">
  <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 transform transition duration-500 hover:shadow-2xl hover:-translate-y-1">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">Task Details</h2>
      <Link
        href={route('tasks.edit', task.id)}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
      >
        Edit Task
      </Link>
    </div>

    
    <div className="mb-4">
      <span className="font-semibold text-gray-600">Name:</span>
      <span className="text-gray-800 ml-2">{task.name}</span>
    </div>

    <div className="mb-4">
              <span className="font-semibold text-gray-600">Project:</span>
              <span className="text-gray-800 ml-2">{task.project ? task.project.name : 'None'}</span>
            </div>
    <div className="mb-4">
      <span className="font-semibold text-gray-600">Description:</span>
      <p className="text-gray-800 ml-2">{task.description}</p>
    </div>

    <div className="mb-4">
      <span className="font-semibold text-gray-600">Status:</span>
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ml-2 ${
          task.status === 'Pending'
            ? 'bg-yellow-200 text-yellow-800'
            : task.status === 'In Progress'
            ? 'bg-blue-200 text-blue-800'
            : 'bg-green-200 text-green-800'
        }`}
      >
        {task.status.replace('_', ' ')}
      </span>
    </div>

    <div className="mb-4">
              <span className="font-semibold text-gray-600">Start Date:</span>
              <span className="text-gray-800 ml-2">{formatDate(task.start_date)}</span>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-600">End Date:</span>
              <span className="text-gray-800 ml-2">{formatDate(task.end_date)}</span>
            </div>

    <div className="mb-4">
      <span className="font-semibold text-gray-600">Assigned User:</span>
      <span className="text-gray-800 ml-2">
        {task.assigned_user ? task.assigned_user.name : 'Unassigned'}
      </span>
    </div>

    <div className="mb-4">
      <span className="font-semibold text-gray-600">Created By:</span>
      <span className="text-gray-800 ml-2">
        {task.created_by ? task.created_by.name : 'Unassigned'}
      </span>
    </div>

    <div className="mb-4">
      <span className="font-semibold text-gray-600">Last Updated By:</span>
      <span className="text-gray-800 ml-2">
        {task.updated_by ? task.updated_by.name : 'Unassigned'}
      </span>
    </div>


 
    <Link
      href={route('tasks.index')}
      className="mt-6 inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray700 rounded-md transition duration-300"
    >
      Back to Tasks
    </Link>
  </div>
</div>


    </div>
      <Footer className="bg-gray-800 text-white py-4 mt-auto" />
      
      </div>
  );
};

export default Show;

