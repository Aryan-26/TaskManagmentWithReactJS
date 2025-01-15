import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ReactSelect from "@/Components/ReactSelect"; 
import TextInput from "@/Components/TextInput"; 
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function Create() {
    const { props } = usePage(); 
    const { errors, states, success, error } = props; 

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setData(name, value);
        }
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setData(actionMeta.name, selectedOption?.value || ""); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                // reset();
            },
            onError: (errors) => {
                console.log("Backend Errors:", errors); 
            },
        });
    };

    useEffect(() => {
        if (success) {
            alert(success);
        }
        if (error) {
            alert(error); 
        }
    }, [success, error]);

    const userRole = "admin"; 

    return (
        <>
            <Navbar />
            <main>
                <div className="max-w-7xl mx-auto pt-20">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Create New User
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="mb-4">
                                    <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </InputLabel>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    />
 <InputError message={errors.name} />
                                   
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                        <InputError message={errors.email} />
                                    
                                </div>

                                {userRole === "admin" && (
                                  <div className="mb-4">
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <ReactSelect
                                            name="role"
                                            value={data.role} 
                                            onChange={handleSelectChange} 
                                            options={states}
                                            isClearable
                                            className={`mt-1 block w-full ${
                                              errors.role ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                                            }`}
                                        />
                                            <InputError message={errors.role} />
                                        
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                        <InputError message={errors.password} />
                                    
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <TextInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.password_confirmation ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                      <InputError message={errors.password_confirmation} />
                                   
                                </div>

                            </div>

                            <div className="mt-6">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full px-4 py-4 flex justify-center  old bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300 ${
                                        processing ? 'opacity-50' : ''
                                    }`}
                                >
                                    {processing ? "Creating..." : "Create User"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Create;
