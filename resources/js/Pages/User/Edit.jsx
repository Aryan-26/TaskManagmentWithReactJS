import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

function Edit() {
  const { props } = usePage();
  const { user, errors, states = [] } = props; // Ensure states is an array

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || '',
    password: '',
    password_confirmation: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Inertia.put(`/users/${user.id}`, formData, {
      onSuccess: () => {
        setSuccessMessage('User updated successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="m-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-10 pb-100 pt-20">
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6 shadow-md">
            {successMessage}
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit User: {formData.name}</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <InputLabel htmlFor="name" className="block text-sm font-medium text-gray-700">Name</InputLabel>
                <TextInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                 <InputError message={errors.name} />
                {/* {errors.name && <div className="text-sm text-red-500 mt-2">{errors.name}</div>} */}
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="email" className="block text-sm font-medium text-gray-700">Email</InputLabel>
                <TextInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                 <InputError message={errors.email} />
                {errors.email && <div className="text-sm text-red-500 mt-2">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="role" className="block text-sm font-medium text-gray-700">Role</InputLabel>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  {states.map((state, index) => (
                    <option key={index} value={state.value}>{state.label}</option>
                  ))}
                </select>
                  <InputError message={errors.role} />
                {errors.role && <div className="text-sm text-red-500 mt-2">{errors.role}</div>}
              </div>
            </div>

            <div className="mt-6">
            <PrimaryButton
    type="submit"
    disabled={loading}
    className={`w-full flex justify-center text-2xl px-4 py-2 ${
        loading ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-700'
    } text-white font-semibold rounded-md transition duration-300`}
>
    {loading ? 'Updating...' : 'Update User'}
</PrimaryButton>

            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
