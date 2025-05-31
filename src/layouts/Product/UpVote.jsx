import React from 'react';
import axios from 'axios';

const UpvoteButton = ({ productId }) => {
  const handleUpvote = async () => {
    try {
      await axios.post(`/api/products/${productId}/upvote`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      window.location.reload(); // or use state to avoid reload
    } catch (err) {
      console.error(err);
      alert(err.response.data.error || 'Failed to upvote');
    }
  };

  return (
    <button onClick={handleUpvote} className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded">
      Upvote
    </button>
  );
};

export default UpvoteButton;
