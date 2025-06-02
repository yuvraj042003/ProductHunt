import React, { useState } from 'react';
import api from '../../lib/axios';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    description: '',
    category: '',
    websiteUrl: '',
    logo: null, 
  });

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (name === 'logo') {
      setForm(prev => ({ ...prev, logo: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }
    try {
      const response = await api.post('/api/v1/product/create-product', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      
        },
      });

      alert(`✅ Product created: ${response.data.product.name}`);
      navigate('/product'); // Redirect to product list
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Something went wrong';
      alert(`❌ ${errorMessage}`);
      console.error('Create Product Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4 pt-30">
      <h2 className="font-bold text-3xl">Add Product</h2>

      <div>
        <label className="text-sm font-bold">Product Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold">Tagline</label>
        <input
          name="tagline"
          value={form.tagline}
          onChange={handleChange}
          placeholder="Tagline"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold">Website URL</label>
        <input
          name="websiteUrl"
          value={form.websiteUrl}
          onChange={handleChange}
          placeholder="https://example.com"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-bold">Logo</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-400 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
