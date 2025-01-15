import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ReactSelect from "@/Components/ReactSelect"; 
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Inertia } from "@inertiajs/inertia";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const EditTask = ({  }) => {
    const { props } = usePage();
    const { users, status,task, projects, errors } = props;

    const { data, setData, put } = useForm({
        name: task.name || "",
        description: task.description || "",
        status: task.status || "pending", 
        project_id: task.project_id || "",
        assigned_to: task.assigned_to || '',
        start_date: task.start_date || "",
        end_date: task.end_date || "",
    });
   
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const selectedProject = projects.find(project => project.id === data.project_id);
        if (selectedProject) {
            setEmployees(
                selectedProject.users.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        }
    }, [data.project_id, projects]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.patch(route("tasks.update", task.id), data); 
    };
    

    const handleAssignedToChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setData("assigned_to", ...selectedIds);
    };

    const handleStatusChange = (selectedOption) => {
        setData("status", selectedOption ? selectedOption.value : "");
    };

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto pt-20">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Edit Task</h1>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div
                        className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md"
                        role="alert"
                    >
                        <h3 className="font-semibold">Something went wrong.</h3>
                        <ul className="list-disc pl-5">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                        <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Task Name
                        </InputLabel>
                        <TextInput
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className={`mt-1 block w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            required
                            className={`mt-1 block w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <ReactSelect
                            name="status"
                            id="status"
                            options={status}
                            value={{ label: data.status.charAt(0).toUpperCase() + data.status.slice(1), value: data.status }}
                            onChange={handleStatusChange}
                            placeholder="Select status"
                            isClearable
                        />
                        <InputError message={errors.status} />
                    </div>

                    <div>
                        <InputLabel htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                            Project
                        </InputLabel>
                        <select
                            name="project_id"
                            id="project_id"
                            value={data.project_id}
                            onChange={(e) => setData("project_id", e.target.value)}
                            required
                            className={`mt-1 block w-full px-4 py-2 border ${errors.project_id ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                                    <InputError message={errors.project_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
                            Assigned To
                        </InputLabel>
                        <ReactSelect
                            isMulti
                            name="assigned_to"
                            id="assigned_to"
                            options={employees}
                            value={employees.filter(employee => data.assigned_to.includes(employee.value))}
                            onChange={handleAssignedToChange}
                            placeholder="Select employees"
                            isClearable
                        />
                                    <InputError message={errors.assigned_to} />
                    </div>

                    <div>
                        <InputLabel htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                            Start Date
                        </InputLabel>
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            value={data.start_date}
                            onChange={(e) => setData("start_date", e.target.value)}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.start_date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                                    <InputError message={errors.start_date} />
                    </div>

                    <div>
                        <InputLabel htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                            End Date
                        </InputLabel>
                        <input
                            type="date"
                            name="end_date"
                            id="end_date"
                            value={data.end_date}
                            onChange={(e) => setData("end_date", e.target.value)}
                            required
                            className={`mt-1 block w-full px-4 py-2 border ${errors.end_date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                                    <InputError message={errors.end_date} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        {/* <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300"
                        >
                            Update Task
                        </button> */}
                         <PrimaryButton
                                    type="submit"
                                    className="px-6 py-3 flex justify-center w-full bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Update Task
                                </PrimaryButton>
                    </div>
                </form>
            </div>
            <Footer className="pt-50" />
        </>
    );
};

export default EditTask;
