import React from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import TextInput from "@/Components/TextInput"; 
import InputLabel from "@/Components/InputLabel"; 

function AddClient({errors}) {
    
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "client",
        company_name: "",
        contact_number: ""
    });

    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("clientDetails.store"));
    };

    return (
        <>
            <Navbar />
            <main className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto pt-20">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                            Add New Client
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Name Field */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name<span className="text-red-500">*</span>
                                    </InputLabel>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-500" : ""}`}
                                    />
                                    {errors.name && (
                                        <div className="text-sm text-red-500 mt-2">{errors.name}</div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email<span className="text-red-500">*</span>
                                    </InputLabel>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && (
                                        <div className="text-sm text-red-500 mt-2">{errors.email}</div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password<span className="text-red-500">*</span>
                                    </InputLabel>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? "border-red-500" : ""}`}
                                    />
                                    {errors.password && (
                                        <div className="text-sm text-red-500 mt-2">{errors.password}</div>
                                    )}
                                </div>

                                {/* Company Name Field */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                                        Company Name<span className="text-red-500">*</span>
                                    </InputLabel>
                                    <TextInput
                                        id="company_name"
                                        name="company_name"
                                        value={data.company_name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.company_name ? "border-red-500" : ""}`}
                                    />
                                    {errors.company_name && (
                                        <div className="text-sm text-red-500 mt-2">{errors.company_name}</div>
                                    )}
                                </div>

                                {/* Contact Number Field */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                                        Contact Number<span className="text-red-500">*</span>
                                    </InputLabel>
                                    <TextInput
                                        id="contact_number"
                                        name="contact_number"
                                        value={data.contact_number}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.contact_number ? "border-red-500" : ""}`}
                                    />
                                    {errors.contact_number && (
                                        <div className="text-sm text-red-500 mt-2">{errors.contact_number}</div>
                                    )}
                                </div>

                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                            
                                    className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${processing ? 'opacity-50 cursor-notallowed' : ''}`}
                                >
                                    {processing ? "Adding..." : "Add Client"}
                                </button>
                            </div>

                            {/* Back Button */}
                            <div>
                                <button 
                                  type='button' 
                                  onClick={() => window.history.back()} // Navigate back to the previous page
                                  className='flex justify-center w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 focus:ring focus:ring-gray'
                                  >
                                  Back
                              </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default AddClient;
