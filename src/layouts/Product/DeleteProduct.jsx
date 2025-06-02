import api from '../..//lib/axios';
import React from 'react';

import { useNavigate } from 'react-router-dom';

const DeleteProductButton = ({ productId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await api.delete(`/api/v1/product/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Deleted successfully');
    navigate('/');
  };

  return (
    <button onClick={handleDelete} className="bg-red-500  ml-70 text-white px-4 py-2 mt-4 rounded">
      Delete Product
    </button>
  );
};

export default DeleteProductButton;
