import React, { useState } from 'react';

import { ArrowBigUp, Check } from 'lucide-react';
import api from '../../lib/axios';

const UpvoteButton = ({ productId, initialUpvoteCount = 0, onUpvoteChange }) => {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to upvote');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post(
        `/api/v1/product/${productId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newCount = response.data.upvoteCount;
      setUpvoteCount(newCount);
      setIsUpvoted(true);

      if (onUpvoteChange) {
        onUpvoteChange(newCount);
      }

    } catch (err) {
      console.error('Upvote error:', err);

      const status = err.response?.status;
      const message = err.response?.data?.error || 'Failed to upvote';

      if (status === 400) {
        alert('You have already upvoted this product');
        setIsUpvoted(true);
      } else if (status === 401) {
        alert('Please login to upvote');
      } else {
        alert(message);
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isLoading || isUpvoted}
      className={`
        px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2
        transition-all duration-200 w-full
        ${isUpvoted
          ? 'bg-green-600 text-white cursor-not-allowed'
          : 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer'}
        ${isLoading ? 'opacity-50' : ''}
      `}
      title={isUpvoted ? 'Already upvoted' : 'Click to upvote'}
    >
      {isUpvoted ? (
        <>
          <Check className="w-4 h-4" /> Upvoted • {upvoteCount}
        </>
      ) : (
        <>
          <ArrowBigUp className={`w-4 h-4 ${isLoading ? 'animate-pulse' : ''}`} />
          {isLoading ? 'Upvoting...' : `Upvote • ${upvoteCount}`}
        </>
      )}
    </button>
  );
};

export default UpvoteButton;
