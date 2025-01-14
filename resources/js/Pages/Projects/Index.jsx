import React from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Inertia } from '@inertiajs/inertia';

const Index = () => {
    // const { props } = usePage();
    // const { user ,projects,success, error } = props; 
    const { flash, user, projects } = usePage().props; // Access flash messages
    const { success, error } = flash || {}; // Extract success and error messages
    // console.log(projects);
    console.log(usePage().props);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      
    const projectsArray = Array.isArray(projects) ? projects : [];
    const handleDelete = (projectId) => {

            Inertia.delete(route('projects.destroy', projectId), {
                onSuccess: () => {
                    
                    console.log('Project deleted successfully!');
                },
                onError: (error) => {
                    console.log('Error deleting project:', error);
                    
                }
            });
        
    };
    return (
        <div className="flex flex-col min-h-screen">

            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

            <main className="flex-1 pt-[80px] px-4 bg-gray-100">
                <div className="max-w-10xl mx-auto p-6 space-y-6">
                   




                <div>
                        {success && <div className="bg-green-100 text-green-800 p-4 rounded mb-4">{success}</div>}
                        {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>}
                    </div>

                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-gray-800">Project List</h1>
                        {/* { user && user.role !== 'Admin' || user.role !== 'employee' || user.role !== 'client'&&  ( */}
                        <Link
                            href={route('projects.create')}
                            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                        >
                            Create Project
                        </Link>
              {/* )} */}
                    </div>               
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {projectsArray.length === 0 ? (
        <div className="col-span-full text-center text-gray-600">
            No projects found.
        </div>
    ) : (
        projectsArray.map((project) => (
            <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-200"
            >
                <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>

                <div className="mt-4 text-sm text-gray-500 space-y-1">
                    <div>
                        <strong>Assigned To:</strong>{' '}
                        {project.client ? project.client.name : 'Unassigned'}
                    </div>
                    {/* <div>
                        <strong>Assigned To:</strong>{' '}
                        {project.assigned_to ? project.assigned_to.name : 'Unassigned'}
                    </div> */}
                    <div>
                        <strong>Created By:</strong>{' '}
                        {project.created_by ? project.created_by.name : 'Unassigned'}
                    </div>
                    <div>
  <strong>Start Date:</strong>{' '}
  {project.start_date ? formatDate(project.start_date) : 'N/A'}
</div>
<div>
  <strong>End Date:</strong>{' '}
  {project.end_date ? formatDate(project.end_date) : 'N/A'}
</div>

                </div>

                <div className="mt-4 flex justify-between items-center">
                    <Link
                        href={route('projects.show', project.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v6h2V7zm0 8H9v2h2v-2z" /></svg>
                        View
                    </Link>
                    
                    { user && user.role === 'Admin' && user.role !== 'employee' || user.role !== 'client'&&  (
              

                    <Link
                      
                        href={`projects/${project.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-800 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 2.586a2 2 0 012.828 0l1.586 1.586a2 2 0 010 2.828l-.707.707L13.586 3.293l.707-.707zM11.293 4l-.707-.707L3.414 9H5v1.586l7.879-7.879zM3 12v5a1 1 0 001 1h5l7.879-7.879L10.293 4H3a1 1 0 00-.707.293L1.293 6A1 1 0 000 7v5a1 1 0 001 1h5l7.879-7.879L10.293 4H3a1 1 0 00-.707.293L1.293 6A1 1 0 000 7v5a1 1 0 001 .293V12z" /></svg>
                        Edit
                    </Link>
  )}
  { user && user.role === 'Admin' || user.role !== 'employee' || user.role !== 'client'&&  (
                    <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800 font-semibold transition">
                        Delete
                      </button>
   )}
                </div>
            </div>
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
