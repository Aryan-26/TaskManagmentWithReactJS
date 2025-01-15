import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Index = ({ clients ,clientDetails}) => {
    const { props } = usePage();
    const { flash } = props;
    const [message, setMessage] = useState(flash);
console.log(clients);


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 9000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
<>
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg" />

            <main className="flex-1 pt-[80px] px-6 md:px-12">
                <div className="max-w-10xl mx-auto pt-6">
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

                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-gray-800">Our Clients</h1>
                        <Link
                            href={route('client-details.create')}
                            className="inline-flex items-center px-8 py-4 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 .5v6m0 -6h6m6 -6h6m6 -6h6"></path>
                            </svg>
                            Create New Client
                        </Link>
                    </div>

                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-teal-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-sm font-semibold">Profile</th>
                                    <th className="px-4 py-2 text-sm font-semibold">Name</th>
                                    <th className="px-4 py-2 text-sm font-semibold">Email</th>
                                    <th className="px-4 py-2 text-sm font-semibold">Role</th>
                                    <th className="px-4 py-2 text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-50 divide-y divide-gray-200">
                                {clients.length > 0 ? (
                                    clients?.map((client) => (
                                        <tr key={client.id} className="hover:bg-gray-100">
                                            <td className="px-4 py-3">
                                                <img
                                                    src={client.profile_photo_url || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                                                    alt={client.name}
                                                    className="w-10 h-10 rounded-full mx-auto"
                                                />
                                            </td>
                                            <td className="px-4 py-3">{client.name}</td>
                                            <td className="px-4 py-3">{client.email}</td>
                                           <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${client.role === 'admin'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                >
                                                    {client.role.charAt(0).toUpperCase() + client.role.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 space-x-2">
                                            {/* {client.client_detail && client.client_detail.id ? (
                                                        <Link
                                                            href={route('client-details.show', client.client_detail.id)}
                                                            className="text-teal-600 hover:underline"
                                                        >
                                                            View
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-500">No Details</span>
                                                    )} */}
                                                    <Link
    href={route('client-details.show', client.client_detail ? client.client_detail.id : '')}
    className="text-teal-600 hover:underline"
>
    View
</Link>

                                                <Link
                                                    href={route('users.edit', client.id)}
                                                    className="text-yellow-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 py-4">
                                            No clients found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="join mt-6 flex justify-center space-x-2">
            
          </div>
                    </div>
                </div>
            </main>

        </div>
            <Footer />
            </>
    );
};

export default Index;
