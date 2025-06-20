import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProductCard from '../Product/ProductCard';
import api from '@/lib/axios';
import SortButton from './SortButton';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('new');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase() || '';

  useEffect(() => {
    api.get('/api/v1/product/products')
      .then(res => {
        const data = res.data;
        const productList = Array.isArray(data.products)
          ? data.products
          : Array.isArray(data)
          ? data
          : [];

        setProducts(productList);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery) ||
        (p.description || '').toLowerCase().includes(searchQuery) ||
        (p.category || '').toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'new' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="my-8">
      <SortButton onChange={setSortOrder} />

      {sortedProducts.length > 0 ? (
        sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-gray-500">
          {searchQuery
            ? `No products found for "${searchQuery}"`
            : 'No products available.'}
        </p>
      )}
    </div>
  );
};

export default AllProducts;
