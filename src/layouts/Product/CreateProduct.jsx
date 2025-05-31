import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    description: '',
    category: '',
    websiteUrl: '',
    logo: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product created successfully!', response.data.product.name);
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4">
      {Object.keys(form).map(field => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="border p-2 w-full"
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
