import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Inertia } from '@inertiajs/inertia';
import ProjectCard from './Partials/ProjectCard';

const Index = () => {
  const { flash, user, projects } = usePage().props;
  const [message, setMessage] = useState(flash);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const projectsArray = Array.isArray(projects) ? projects : [];
  const handleDelete = (projectId) => {
    Inertia.delete(route('projects.destroy', projectId), {
      onSuccess: () => console.log('Project deleted successfully!'),
      onError: (error) => console.error('Error deleting project:', error),
    });
  };

  return (
    <div className="bg-gray-100">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      <main className="flex-1 pt-[80px] px-4 bg-gray-100">
        <div className="max-w-10xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Project List</h1>
            <Link
              href={route('projects.create')}
              className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Create Project
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsArray.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No projects found.
              </div>
            ) : (
              projectsArray.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  user={user}
                  handleDelete={handleDelete}
                  formatDate={formatDate}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer className="bg-gray-800 text-white p-4" />
    </div>
  );
};

export default Index;
