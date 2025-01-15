import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import ReactSelect from "@/Components/ReactSelect";
import axios from "axios";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const CreateTask = ({users, projects, status }) => {
    const { data, setData, errors, post } = useForm({
        name: '',
        description: '',
        status: 'pending',
        assigned_to: [],
        project_id: '',
        start_date: '',
        end_date: '',
    });

    const [employees, setEmployees] = useState([]);

    // useEffect(() => {
    //     if (data.project_id) {
    //         fetchAssignedEmployees();
    //     }
    // }, [data.project_id]);

    useEffect(() => {
        const selectedProject = projects.find(project => project.id === data.project_id);

        if (selectedProject) {
            setEmployees(
                selectedProject.users.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            console.log(users);
        }
    }, [data.project_id, projects]);
    // const fetchAssignedEmployees = () => {
    //     axios
    //         .get(route('projects.employees', data.project_id))
    //         .then((response) => {
    //             setEmployees(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching employees:", error);
    //         });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("tasks.store"));
    };

    // const handleAssignedToChange = (selectedOptions) => {
    //     // const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    //     setData("assigned_to", selectedIds);
    // };

    return (
        <>
            <Navbar className="pb-5" />
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">Create New Task</h1>
            <div className="max-w-6xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Create New Task</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <h2 className="text-xl font-medium text-gray-800 mb-4">Task Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">Task Name</InputLabel>
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`mt-2 block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter task name"
                                />
                            <InputError message={errors.name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" className="block text-sm font-medium text-gray-700">Description</InputLabel>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={`mt-2 block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter task description"
                                />
                                <InputError message={errors.description} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-medium text-gray-800 mb-4">Task Metrics</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="status" className="block text-sm font-medium text-gray-700">Status</InputLabel>
                                <ReactSelect
                                    name="status"
                                    value={{ label: data.status.charAt(0).toUpperCase() + data.status.slice(1), value: data.status }}
                                    options={status}
                                    onChange={(selectedOption) => setData("status", selectedOption?.value || "")}
                                    isClearable
                                    className={`mt-2 block w-full ${errors.status ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                <InputError message={errors.status} />
                            </div>

                            <div>
                                <InputLabel htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project</InputLabel>
                                <select
                                    name="project_id"
                                    id="project_id"
                                    value={data.project_id}
                                    onChange={(e) => setData('project_id', e.target.value)}
                                    className={`mt-2 block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.project_id ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="" disabled>Select a project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.project_id} />
                            </div>

                            <div>
                                <InputLabel htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">Assigned To</InputLabel>
                                <ReactSelect
                                    // isMulti
                                    name="assigned_to"
                                    id="assigned_to"
                                    options={employees}
                                    value={employees.filter(employee => data.assigned_to.includes(employee.value))}
                                    // onChange={handleAssignedToChange}
                                    onChange={(option) => setData('assigned_to', option ? option.value : '')}
                                    placeholder="Select employees"
                                    isClearable
                                />
                                <InputError message={errors.assigned_to} />
                            </div>

                            <div>
                                <InputLabel htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</InputLabel>
                                <input
                                    type="date"
                                    name="start_date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData("start_date", e.target.value)}
                                    className={`mt-2 block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.start_date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <InputError message={errors.start_date} />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</InputLabel>
                                <input
                                    type="date"
                                    name="end_date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className={`mt-2 block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.end_date ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <InputError message={errors.end_date} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
    {/* <button 
        type="submit" 
        className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
    >
        Create Task
    </button> */}
 <PrimaryButton
            type="submit"
            className="px-6 py-3 flex justify-center w-full bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Create Task
        </PrimaryButton>

</div>
                    <div className="flex justify-end mt-6">
    <a 
        href={route('tasks.index')} 
        className="w-full px-6 py-3 text-center bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
    >
       Back 
    </a>
</div>

                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateTask;
