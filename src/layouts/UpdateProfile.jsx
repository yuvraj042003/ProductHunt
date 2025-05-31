import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Add your update logic (API call, form validation, etc.)
    
    // Simulate async update and redirect
    setTimeout(() => {
      navigate('/'); // Redirect to home
    }, 1000);
  };

  return (
    <div className="max-w-full mx-auto p-6 pt-35">
      <div className="bg-gray-400 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm  font-medium mb-2">Profile Picture</label>
                <input type="file" accept="image/*" className="w-full  px-3 py-2 border border-gray-300 rounded" />
            </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mobile</label>
            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>
                            Role <span className="text-xs italic">(Note: Only Admin can change the Role.)</span>
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-400 text-black-400">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
