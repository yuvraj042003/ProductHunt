import React, { useState }  from "react";
import { Search, User } from "lucide-react";
import RegisterLogin from "./Registerlogin";
import Profile from "./Profile";
import { Link } from "react-router-dom";
const Headers = () => {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800 text-white border-b border-gray-400 w-full">
      <div className="border border-gray-600 flex space-between px-4 py-2 w-full">
        <p className="text-lg font-semibold">Product Hunt</p>
      {/* Search Box */}
      <div className="flex-1 mx-6">
        <div className="relative border border-gray-600">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-1">
        <div className="border border-gray-600 px-4 py-2">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
        </div>
          <div className="border border-gray-600 px-4 py-2">
          <Link to="/under-construction" className="hover:text-blue-400 transition-colors">
            Product
          </Link>
        </div>
        <div className="border border-gray-600 px-4 py-2">
           <Link to="/under-construction" className="hover:text-blue-400 transition-colors">
            About Us
          </Link>
        </div>
        
        {/* Profile Icon */}
        <div
              className="border border-gray-600 p-2"
              onClick={() => setShowAuth(true)}
            >
              <User className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          </div>
      </div>
    </div>
     </header>
     {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative">
            {/* <RegisterLogin /> */}
            <Profile />
            {/* Close Button */}
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      </>
  );
};

export default Headers;