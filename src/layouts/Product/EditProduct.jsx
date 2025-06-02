import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/axios';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/api/v1/product/${id}`).then(res => setForm(res.data.product));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.patch(`/api/v1/product/${id}/edit-product`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Updated successfully');
  };

  if (!form) return <p>Loading...</p>;

  return (
  <>
    <h2 className="font-bold text-3xl mb-4 mt-40 ml-80">Edit Product</h2>
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4 mt-10">
      {["name", "tagline", "description", "category", "websiteUrl", "logo"].map(field => (
        <input
          key={field}
          name={field}
          value={form[field] || ''}
          onChange={handleChange}
          placeholder={field}
          className="border p-2 w-full"
        />
      ))}
      <button type="submit" className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded">Update</button>
    </form>
  </>
  );
};

export default EditProduct;
