import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';


const ClientDetailsShow = () => {
     const { clientDetails, tasks, projects, user } = usePage().props;

     return (
          <>
          <div className="flex flex-col min-h-screen">
               <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

               <main className="flex-1 pt-[80px] px-4 bg-gray-100">
                    <div className="max-w-10xl mx-auto p-6 space-y-6">
                         <h1 className="text-4xl font-bold text-gray-800">{clientDetails.company_name}</h1>

                         <section className="mt-6">
                              <h2 className="text-2xl font-semibold text-gray-800">Client Information</h2>
                              <p className="text-gray-600 mt-2">Name: {clientDetails.user.name}</p>
                              <p className="text-gray-600">Email: {clientDetails.user.email}</p>
                              <p className="text-gray-600">Contact Number: {clientDetails.contact_number}</p>
                         </section>
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
                                             <Link
                                                  href={`/projects/${project.id}`}
                                                  className="inline-block mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                                             >
                                                  View Details
                                             </Link>
                                        </div>
                                   ))}
                              </div>
                         </section>



                    </div>
               </main>

          </div>
               <Footer className="bg-gray-800 text-white p-4" />
          </>
     );
};

export default ClientDetailsShow;
