// import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ReactSelect from "@/Components/ReactSelect"; // Import your custom ReactSelect component
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from '@/Components/TextInput'
// import InputLabel from "@/Components/InputLabel";

const Create = () => {
    const { props } = usePage();
    const { clients, employees, errors } = props; // Access data passed from the server
    const { data, setData, post } = useForm({
        name: "",
        description: "",
        client_id: "",
        employee_ids: [],
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("projects.store"), data);
    };
// console.log(data);    // Options mapping for employees
    const employeeOptions = employees.map((employee) => ({
        value: employee.id,
        label: employee.name,
    }));

    // Handle changes in ReactSelect
    const handleEmployeeChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setData("employee_ids", selectedIds);
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />

                <div className="container mx-auto mt-24 px-4">
                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
                        <div className="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 5.75L15.25 5.75L15.25 9.25L9.75 9.25L9.75 5.75Z M4 6.5V15.5M19 6.5V15.5M9.75 13.75L15.25 13.75L15.25 17.25L9.75 17.25Z" />
                            </svg>
                            <h2 className="text-xl font-semibold">Create New Project</h2>
                        </div>
                        <div className="px-6 py-6">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-6">
                                    <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name </InputLabel>
                                    <TextInput
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter project name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className={`block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                    />
                                        <InputError message={errors.name} />
                                    {/* {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>} */}
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="description" className="block text-sm font-medium text-gray-700">Description</InputLabel>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="3"
                                        placeholder="Brief description of the project"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className={`block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.description ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    <InputError message={errors.description} />
                                    {/* {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>} */}
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="client_id" className="block text-sm font-medium text-gray-700">Client</InputLabel>
                                    <select
                                        name="client_id"
                                        id="client_id"
                                        value={data.client_id}
                                        onChange={(e) => setData("client_id", e.target.value)}
                                        className={`block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.client_id ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="" disabled>Select a client</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                <InputError message={errors.client_id} />
                                    {/* {errors.client_id && <p className="mt-2 text-sm text-red-600">{errors.client_id}</p>} */}
                                </div>

                                <div className="mb-6">
                                    <InputLabel htmlFor="employee_ids" className="block text-sm font-medium text-gray-700">Assign Employees</InputLabel>
                                    <ReactSelect
                                        isMulti
                                        options={employeeOptions}
                                        value={employeeOptions.filter((option) => data.employee_ids.includes(option.value))}
                                        onChange={handleEmployeeChange}
                                        isClearable
                                        placeholder="Select employees"
                                    />
                                
                                        <InputError message={errors.employee_ids} />
                                    {/* {errors.employee_ids && <p className="mt-2 text-sm text-red-600">{errors.employee_ids}</p>} */}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-6">
                                    <div>
                                        <InputLabel htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</InputLabel>
                                        <TextInput
                                            type="date"
                                            name="start_date"
                                            id="start_date"
                                            value={data.start_date}
                                            onChange={(e) => setData("start_date", e.target.value)}
                                            className={`block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.start_date ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        <InputError message={errors.start_date} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</InputLabel>
                                        <TextInput
                                            type="date"
                                            name="end_date"
                                            id="end_date"
                                            value={data.end_date}
                                            onChange={(e) => setData("end_date", e.target.value)}
                                            className={`block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.end_date ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        <InputError message={errors.end_date} />
                                        {/* {errors.end_date && <p className="mt-2 text-sm text-red-600">{errors.end_date}</p>} */}
                                    </div>
                                </div>

                                <div className="flex justify-end items-center mt-6">
                                    {/* <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Create Project
                                    </button> */}
                                    <PrimaryButton
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Create Project
        </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Create;
