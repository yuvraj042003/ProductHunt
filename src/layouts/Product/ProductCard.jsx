import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import UpvoteButton from './UpVote';
import Downvote from './DownVote';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => (
  <div className='gap-4 p-2'>
  <div className="flex items-start justify-between border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow bg-white w-full">
    <div className='flex-1 flex flex-col gap-8  ml-6'>
    {/* Product Details */}
    <Link
      to={`/product/${product._id}`}
      className="flex-1 flex gap-4 hover:opacity-90 transition-all"
    >
      <img
        src={product.logo}
        alt={product.name}
        className="w-16 h-16 rounded-md object-cover" />
      <div>
      
        <h3 className="text-xl font-bold text-black-600 hover:underline">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm">{product.tagline}</p>

        {product.category && (
          <p className="text-xs text-blue-600 font-medium mt-1">
            Category: {product.category}
          </p>
        )}

        {product.tags && product.tags.length > 0 && (
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
        )}
      </div>

    </Link>
    {/* Website Link - External */}
    {product.websiteUrl && (
      <div className="ml-20">
        <a
          href={product.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm">
            Visit Website
          </Button>
        </a>
         { console.log("Isko bhi dekhoi",product.tagline)}
      </div>
    )}

    </div>
     {/* Right Section: Upvotes, Comments, Downvotes  */}
    <div className="flex flex-col items-center justify-center ml-4 space-y-2">
      <div className="flex flex-col items-center">
        <UpvoteButton productId={product._id} />
        <span className="text-sm font-semibold">{product.upvoteCount || 0}</span>
        <Downvote productId={product._id} />
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm">{product.comments || 0}</span>
      </div>
    </div>
  </div>
  </div>
);

export default ProductCard;
