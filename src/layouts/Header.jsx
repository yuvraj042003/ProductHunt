import React, { useEffect, useState } from "react";
import { Search, User } from "lucide-react";
import RegisterLogin from "./Auth/Registerlogin";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Auth/Profile";

const Headers = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showAuth]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/v1/product/products');
        const data = await res.json();
        let products = [];

        if (Array.isArray(data)) {
          products = data;
        } else if (Array.isArray(data.products)) {
          products = data.products;
        } else {
          for (const key in data) {
            if (Array.isArray(data[key])) {
              products = data[key];
              break;
            }
          }
        }

        setAllProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Normalize helper
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, ' ').trim();

  // Debounced suggestions
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmedQuery = normalize(query);

      if (trimmedQuery && allProducts.length > 0) {
        const filtered = allProducts.filter(product => {
          const name = normalize(product.name);
          const desc = normalize(product.description);
          const category = normalize(product.category);
          const tags = Array.isArray(product.tags) ? normalize(product.tags.join(' ')) : '';

          return (
            name.includes(trimmedQuery) ||
            desc.includes(trimmedQuery) ||
            category.includes(trimmedQuery) ||
            tags.includes(trimmedQuery)
          );
        });

        setSuggestions(filtered.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, allProducts]);

  const handleSuggestionClick = (product) => {
    const productId = product._id || product.id;
    if (productId) {
      navigate(`/product/${productId}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    } else if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-800 text-white border-b border-gray-400 w-full">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Product Hunt</p>

          {/* Search Box */}
          <div className="relative w-1/3">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder={isLoading ? "Loading products..." : "Search products..."}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute w-full bg-white shadow-md z-10 rounded mt-1 max-h-60 overflow-auto">
                {suggestions.map((product, index) => (
                  <li
                    key={product._id || index}
                    onClick={() => handleSuggestionClick(product)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                      {product.price && (
                        <div className="text-sm font-semibold text-green-600">₹{product.price}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* No match */}
            {query.trim() && suggestions.length === 0 && !isLoading && (
              <ul className="absolute w-full bg-white shadow-md z-10 rounded mt-1">
                <li className="px-4 py-2 text-gray-500 text-sm">
                  No products found for "{query}"
                </li>
              </ul>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
            <Link to="/under-construction" className="hover:text-blue-400 transition-colors">About Us</Link>
            <div onClick={() => setShowAuth(true)} className="cursor-pointer">
              <User className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-[400px]">
            {isLoggedIn ? <Profile /> : <RegisterLogin />}
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Headers;
