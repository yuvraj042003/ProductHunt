import React from 'react';
import { Link } from 'react-router-dom';
import UpvoteButton from './UpvoteButton';

const ProductCard = ({ product }) => (
  <div className="border p-4 rounded shadow">
    <img src={product.logo} alt={product.name} className="w-16 h-16 mb-2" />
    <h3 className="text-xl font-bold">{product.name}</h3>
    <p className="text-gray-600">{product.tagline}</p>
    <p>Upvotes: {product.upvoteCount}</p>
    <UpvoteButton productId={product._id} />
    <Link to={`/product/${product._id}`} className="text-blue-500">View Details</Link>
  </div>
);

export default ProductCard;
