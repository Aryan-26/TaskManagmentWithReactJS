import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const TaskCard = ({ task, user, handleDelete }) => {
  return (
    <div
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

          {user && (user.role === "admin" || user.role === "employee") && (
            <a
              href={`/tasks/${task.id}/edit`}
              className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1 text-sm"
            >
              <i className="fas fa-edit"></i> <span>Edit</span>
            </a>
          )}

          {user && (user.role === "admin" || user.role === "employee") && (
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-600 hover:text-red-800 font-semibold transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
