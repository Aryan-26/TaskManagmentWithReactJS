import React from 'react';
import { usePage } from '@inertiajs/react'; 
import { Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Index = ({ clients }) => {
    const { props } = usePage();
    const { flash, errors } = props;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg" />
            
            <main className="flex-1 pt-[80px] px-6 md:px-12">
                <div className="max-w-10xl mx-auto pt-6">
                    {/* Success Message */}
                    {/* {flash.success && (
                        <div className="mb-8 p-4 bg-teal-100 border-l-4 border-teal-500 text-teal-700 rounded-lg shadow-md">
                            <div className="flex">
                                <svg className="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-sm font-medium"><strong>Success!</strong> {flash.success}</p>
                            </div>
                        </div>
                    )} */}

                    {/* Error Message */}
                    {/* {errors && (
                        <div className="mb-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
                            <div className="flex">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-.293-.293z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-3 text-sm font-medium"><strong>Error!</strong> {errors.join(', ')}</p>
                            </div>
                        </div>
                    )} */}

                    {/* Clients Section */}
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-gray-800">Our Clients</h1>
                        {/* <Link 
                            href={route('clientDetails.create')}
                            className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 .5v6m0 -6h6m6 -6h6m6 -6h6"></path>
                            </svg>
                            Create New Client
                        </Link> */}
                        <Link 
    href={route('clientDetails.create')}
    className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
>
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 .5v6m0 -6h6m6 -6h6m6 -6h6"></path>
    </svg>
    Create New Client
</Link>

                    </div>

                    {/* Clients Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <div key={client.id} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <div className="flex justify-center mb-6">
                                        <img src={client.profile_photo_url || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt={client.name} className="w-24 h-24 rounded-full object-cover border-4 border-teal-600"/>
                                    </div>
                                    <h2 className="text-xl font-semibold text-center text-gray-800">{client.name}</h2>
                                    <p className="text-center text-gray-500">{client.email}</p>

                                    {/* Role-based display */}
                                    <div className="mt-4 text-center">
                                        <span className={`px-3 py-2 text-xs font-medium rounded-full ${client.role === 'admin' ? 'bg-red-400 text-white' : 'bg-yellow-400 text-gray-800'}`}>
                                            {client.role.charAt(0).toUpperCase() + client.role.slice(1)}
                                        </span>
                                    </div>

                                    {/* View Client Link */}
                                    <div className="mt-6 text-center">
                                        <Link href={route('users.show', client.id)} className="text-teal-600 hover:text-teal-800 font-semibold">View Profile</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 text-center text-gray-500">
                                <img src="https://via.placeholder.com/300" alt="No clients found" className="mx-auto mb-6"/>
                                <p>No clients found.</p>
                                <Link href={route('clientDetails.create')} className="text-teal-600 hover:text-teal-700 font-semibold">Add a New Client</Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Index;
