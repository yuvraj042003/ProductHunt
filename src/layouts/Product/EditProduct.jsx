import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setForm(res.data.product));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/products/${id}`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Updated successfully');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4">
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
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default EditProduct;
