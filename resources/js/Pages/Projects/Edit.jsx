import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia"; // Import Inertia
import { usePage } from "@inertiajs/react"; // Import Inertia
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ReactSelect from "@/Components/ReactSelect"; // Import your ReactSelect component
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

const EditProject = ({ project, clients, employees, onUpdate }) => {

  const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : '';  // Format date to 'YYYY-MM-DD'
  };
  console.log(usePage().props)
  // console.log(project)
  // Prepopulate form data from the project prop
  // console.log(client);
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    client_id: project?.client_id || "",
    employee_ids: project.users ? project.users.map((user) => user.id) : [],
    start_date: formatDate(project.start_date) || "",  // Format start_date
    end_date: formatDate(project.end_date) || "", 
  });
console.log(project);

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleEmployeeChange = (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormData({ ...formData, employee_ids: selectedIds });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      await Inertia.patch(route("projects.update", project.id), formData, {
        onError: (err) => setErrors(err),
    });
    
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData)

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-20">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-t-lg flex items-center space-x-3">
            <h2 className="text-xl font-semibold">Edit Project</h2>
          </div>
          <div className="px-6 py-6">
            <form method ="PUT" onSubmit={handleSubmit} className="space-y-6">
      
              <div>
                <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Project Name
                </InputLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter project name"
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                  value={formData.name}
                  onChange={handleChange}
                  
                />
                {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>} */}
              </div>

              <div>
                <InputLabel htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </InputLabel>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  placeholder="Provide a brief description of the project"
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                  value={formData.description}
                  onChange={handleChange}
                />
                {/* {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>} */}
              </div>

            
              <div>
                <InputLabel htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                  Client
                </InputLabel>
                <select
                  name="client_id"
                  id="client_id"
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                  value={formData.client_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Client
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {/* {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id[0]}</p>} */}
              </div>

              
              <div>
                <InputLabel htmlFor="employees" className="block text-sm font-medium text-gray-700">
                  Assign Employees
                </InputLabel>
                <ReactSelect
                  isMulti
                  options={employees.map((employee) => ({
                    label: employee.name,
                    value: employee.id,
                  }))}
                  value={employees
                    .filter((employee) => formData.employee_ids.includes(employee.id))
                    .map((employee) => ({
                      label: employee.name,
                      value: employee.id,
                    }))}
                  onChange={handleEmployeeChange}
                  placeholder="Select employees"
                  isClearable
                />
                {/* {errors.employee_ids && <p className="text-red-500 text-sm mt-1">{errors.employee_ids[0]}</p>} */}
              </div>

            
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    value={formData.start_date}
                    onChange={handleDateChange}
                  />
                  {/* {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date[0]}</p>} */}
                </div>

                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
                    value={formData.end_date}
                    onChange={handleDateChange}
                  />
                  {/* {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date[0]}</p>} */}
                </div>
              </div>

           
              <div className="flex justify-end items-center">
                {/* <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Project
                </button> */}
                <PrimaryButton
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Update Project
        </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProject;
