import React, { useState } from "react";
import api from "../../lib/axios";
import {ArrowBigDown} from "lucide-react"; 
const Downvote = ({ productId }) => {
  const [downvoted, setDownvoted] = useState(false);
  const [error, setError] = useState("");

  const handleDownvote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login required to downvote");

      await api.post(
        `/api/v1/product/${productId}/downvote`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDownvoted(true);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.error || "Something went wrong during downvote";
      setError(message);
      alert(message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <button
        onClick={handleDownvote}
        disabled={downvoted}
        className={`bg-yellow-500 text-white px-2 py-1 mt-2 rounded ${
          downvoted ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
        }`}
      >
        <ArrowBigDown className="inline mr-1" />
      </button>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  );
};

export default Downvote;
