import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import ProductCard from './Product/ProductCard';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/v1/product/products');
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
  <div className="max-w-5xl mt-20 mx-auto px-4 py-8 space-y-6">
    <h2 className="text-2xl font-bold mb-4">🚀 Featured Products</h2>

    {loading ? (
      <p>Loading products...</p>
    ) : (
      <>
        {visibleProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {products.length > visibleCount ? (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load More Products
            </button>
          </div>
        ) : products.length > 0 ? (
          <p className="text-center text-gray-500 mt-4">🎉 You've reached the end!</p>
        ) : null}
      </>
    )}
  </div>
);
}

export default ProductListPage;
