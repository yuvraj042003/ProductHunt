import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div className="max-w-full mx-auto p-6 pt-35">
            <div className="bg-gray-400 shadow-md rounded-lg p-6">
                <h1 className="text-3xl bg-gray-400 font-bold mb-4">Profile</h1>
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <div className="mb-4">
                    <img
                        src="https://i.pravatar.cc/150?img=4"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                </div>
                <p className="mb-2"><strong>Name:</strong> John Doe</p>
                <p className="mb-2"><strong>Email:</strong> Jhon@kulp.ai</p>
                <p className="mb-2"><strong>Mobile:</strong>+91 8823882321</p>
                <p className="mb-2"><strong>Username:</strong> johndoe</p>
                <p className="mb-2"><strong>Joined:</strong> January 1, 2025</p>
                <p className="mb-2"><strong>Bio:</strong> A passionate developer and AI enthusiast.</p>

                <Link to="/update-profile">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                        Edit Profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
