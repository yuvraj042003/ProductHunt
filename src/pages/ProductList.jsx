import React from "react";
import { products } from "../layouts/ProductData";
import { MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
const ProductList = () => {
  return (
    <div className="p-6 max-w-10xl mx-auto"> {/* ✅ Slightly increased max-width */}
  <h2 className="text-2xl font-semibold mb-4">Top Products Launching Today</h2>
  <div className="space-y-6">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="flex items-start justify-between border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow bg-white w-full"
      >
        {/* ✅ Make this section a clickable link */}
        <Link to={`/product/${product.id}`} className="flex gap-4 hover:opacity-90 transition-all">
          <span className="text-lg font-medium mt-2">{index + 1}.</span>
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Right: Comments and Votes */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">{product.comments}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ArrowUp className="w-4 h-4 text-gray-500 hover:text-blue-500 cursor-pointer" />
            <span className="text-sm font-semibold">{product.upvotes}</span>
            <ArrowDown className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default ProductList;
