"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import defaultProfile from "../../assets/defaultProfile.png"; 
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/v1/user/profile"); 
        setUser(res.data.user); 
      } catch (err) {
        console.error("Failed to load profile:", err);
        toast.error("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg w-96">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg w-96">
        <p>User not found or not authenticated.</p>
      </div>
    );
  }
  

  const handleLogout = () => {
    navigate("/Logout");
  };
  return (
    <div className="bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">👤 Profile</h2>
      <img src ={user.profilePicture || defaultProfile} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
      <p><strong>Role:</strong> {user.role} </p>
  
      <div className="mt-4 space-x-32">
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        <a href="/update-profile">Update Profile</a>
      </Button>
      <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      Logout
    </Button>
      </div>
    </div>
  );
};

export default Profile;
