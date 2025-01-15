import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ReactSelect from '@/Components/ReactSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const ProjectForm = ({ clients = [], employees = [], project = null, onSubmit }) => {
    const { data, setData, errors, processing, reset } = useForm({
        name: project?.name || '',
        description: project?.description || '',
        client_id: project?.client_id || '',
        employee_ids: project?.users ? project.users.map(user => user.id) : [],
        start_date: project?.start_date ? moment(project.start_date).toDate() : null,
        end_date: project?.end_date ? moment(project.end_date).toDate() : null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data, reset);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <InputLabel htmlFor="name" value="Project Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="employee_ids" value="Assign Employees" />
                    <ReactSelect
                        id="employee_ids"
                        name="employee_ids"
                        isMulti
                        closeMenuOnSelect={false}
                        options={employees.map(employee => ({ value: employee.id, label: employee.name }))}
                        value={data.employee_ids.map(id => {
                            const employee = employees.find(emp => emp.id === id);
                            return employee ? { value: employee.id, label: employee.name } : null;
                        })}
                        onChange={(selectedOptions) =>
                            setData('employee_ids', selectedOptions ? selectedOptions.map(option => option.value) : [])
                        }
                        className="mt-1"
                        isClearable={true}
                        placeholder="Select Employees"
                    />
                    <InputError message={errors.employee_ids} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="client_id" value="Assign Client" />
                    <ReactSelect
                        id="client_id"
                        name="client_id"
                        options={clients.map(client => ({ value: client.id, label: client.name }))}
                        value={clients.find(client => client.id === data.client_id)}
                        onChange={(option) => setData('client_id', option?.value)}
                        className="mt-1"
                        isClearable={true}
                        placeholder="Select a Client"
                    />
                    <InputError message={errors.client_id} className="mt-2" />
                </div>

                <div className="flex gap-6">
                    <div>
                        <InputLabel htmlFor="start_date" value="Start Date" />
                        <DatePicker
                            id="start_date"
                            selected={data.start_date}
                            onChange={(date) => setData('start_date', date)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select start date"
                            maxDate={data.end_date}
                        />
                        <InputError message={errors.start_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="end_date" value="End Date" />
                        <DatePicker
                            id="end_date"
                            selected={data.end_date}
                            onChange={(date) => setData('end_date', date)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select end date"
                            minDate={data.start_date}
                        />
                        <InputError message={errors.end_date} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-6">
                <PrimaryButton disabled={processing} className="ml-4">
                    {project ? 'Update Project' : 'Create Project'}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default ProjectForm;
