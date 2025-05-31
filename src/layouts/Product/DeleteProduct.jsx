import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteProductButton = ({ productId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Deleted successfully');
    navigate('/');
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
      Delete Product
    </button>
  );
};

export default DeleteProductButton;
