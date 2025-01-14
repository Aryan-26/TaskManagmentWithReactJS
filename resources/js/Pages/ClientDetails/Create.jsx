import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import TextInput from '@/Components/TextInput';

const AddClient = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        company_name: '',
        contact_number: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.index')); 
    };

    return (
        <div className="min-h-full bg-gray-50">
            <main>
                <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
                    
                    {errors.success && (
                        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 shadow" role="alert">
                            <span className="block sm:inline font-medium">{errors.success}</span>
                        </div>
                    )}
                    {errors.error && (
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 shadow" role="alert">
                            <span className="block sm:inline font-medium">{errors.error}</span>
                        </div>
                    )}

                   
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add New Client</h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                           
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && (
                                    <span className="text-sm text-red-600">{errors.name}</span>
                                )}
                            </div>

                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-600">{errors.email}</span>
                                )}
                            </div>

                           
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password<span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-600">{errors.password}</span>
                                )}
                            </div>

                           
                            <div>
                                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                                    Company Name<span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    id="company_name"
                                    name="company_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                />
                                {errors.company_name && (
                                    <span className="text-sm text-red-600">{errors.company_name}</span>
                                )}
                            </div>

                          
                            <div>
                                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                                    Contact Number<span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    id="contact_number"
                                    name="contact_number"
                                    type="text"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.contact_number}
                                    onChange={(e) => setData('contact_number', e.target.value)}
                                />
                                {errors.contact_number && (
                                    <span className="text-sm text-red-600">{errors.contact_number}</span>
                                )}
                            </div>

                            
                            <div>
                                <button 
                                  type='submit' 
                                  disabled={processing}
                                  className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${processing ? 'opacity-50 cursor-notallowed' : ''}`}
                                  >
                                  Add Client
                              </button>
                            </div>

                  
                            <div>
                                <button 
                                  type='button' 
                                  onClick={() => window.history.back()} // Navigate back to the previous page
                                  className='flex justify-center w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                                  >
                                  Back
                              </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddClient;
