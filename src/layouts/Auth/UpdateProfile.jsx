import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../lib/axios";
const UpdateProfile = () => {
  const [form, setForm] = useState({
    name: "",
    profilePicture: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setForm({ ...form, profilePicture: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    if (form.profilePicture) {
      data.append("file", form.profilePicture);
    }

    try {
      await api.patch("/api/v1/user/update-profile", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Profile updated");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 pt-20">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span>Name</span>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white mt-1"
              onChange={handleChange}
            />
          </label>
          <label className="block">
            <span>Profile Picture</span>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white mt-1"
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
