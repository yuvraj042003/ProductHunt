import React from "react";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-center px-4">
      {/* Animated remote loader GIF */}
      <img
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzZqNWhjOXhiaWdjODZyamxnbnp5aGx5Y2FlcDk4Z2dpNXJxeGtyMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1vlBgKjXEz1jTtsuiH/giphy.gif"
        alt="Under Construction"
        className="w-40 h-40 mb-6"
      />

      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-yellow-400">
        🚧 Page Under Construction
      </h1>

      <p className="text-lg text-gray-300 mb-6 max-w-md">
        We're busy building something amazing! This page is under construction and will be live soon.
      </p>

      <p className="text-sm text-gray-500 italic">Thank you for your patience 🙌</p>
    </div>
  );
};

export default UnderConstruction;
