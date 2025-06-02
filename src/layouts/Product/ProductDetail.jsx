import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowUp, ExternalLink, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "../../lib/axios";
import CommentSection from "../Comments/CommentSection";
import CommentItem from "../Comments/ViewComment";
import CommentInput from "../Comments/CreateComment";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    if (!product?._id) return;
    try {
      const res = await api.get(`/api/v1/comment/get-comment/${product._id}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [product?._id]);

  // Fetch comments whenever product changes (after product is loaded)
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        // Fetch product by ID
        console.log("Fetching product with ID:", id);
        const res = await api.get(`/api/v1/product/${id}`);
        const prod = res.data.product;
        
        console.log("Product fetched:", prod);
        setProduct(prod);

        // Fetch all products to calculate rank
        const allRes = await api.get("/api/v1/product/products");
        const allProducts = Array.isArray(allRes.data.products)
          ? allRes.data.products
          : Array.isArray(allRes.data)
          ? allRes.data
          : [];

        console.log("All products fetched:", allProducts.length);

        // Sort by newest first
        allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Find product rank
        const productRank = allProducts.findIndex((p) => p._id === id) + 1;
        setRank(productRank);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(`Failed to load product: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  const handleCopyLink = () => {
    const url = window.location.origin + location.pathname;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-6 pt-35">
      <p className="text-center mt-10">Loading product...</p>
    </div>
  );
  
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto p-6 pt-35">
        <p className="text-center mt-10 text-red-500">
          {error || "Product not found."}
        </p>
        <div className="text-center mt-4">
          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pt-35 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Side */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          {product.logo && (
            <img
              src={product.logo}
              alt={product.name}
              className="w-14 h-14 rounded-md object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.tagline}</p>
          </div>
          <Badge className="ml-4 bg-red-300">Launching today</Badge>
        </div>

        {/* Description */}
        <p className="text-gray-700">
          {product.description ||
            "This is your AI-driven product description. Capture notes, transform formats, share knowledge, etc."}
        </p>

        {/* Carousel Placeholder */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://ph-files.imgix.net/3158206e-f654-45dd-95e9-33cc25cf7ffc.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=391&h=220&fit=max&frame=1&dpr=1"
            alt="Product Preview 1"
            className="rounded-md object-cover"
          />
          <img
            src="https://ph-files.imgix.net/3158206e-f654-45dd-95e9-33cc25cf7ffc.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=391&h=220&fit=max&frame=1&dpr=1"
            alt="Product Preview 2"
            className="rounded-md object-cover"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(product.tags || []).map((tag, idx) => (
            <Badge variant="outline" key={idx}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* Launch Team */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">🚀 Launch Team</h3>
            <div className="flex gap-4">
              {product.submittedBy ? (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage 
                      src={product.submittedBy.profilePicture} 
                      alt={product.submittedBy.name}
                    />
                    <AvatarFallback>
                      {product.submittedBy.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{product.submittedBy.name}</span>
                </div>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/40?img=1" />
                    <AvatarFallback>YS</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/40?img=2" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
  <CardContent className="p-4 space-y-4">
    <h4 className="mb-2 font-semibold">💬 What do you think?</h4>

    <CommentInput
      productId={product._id}
      onSubmit={() => {
        // Optional: reload comments from API
        console.log("New comment submitted!");
      }}
    />
    <CommentSection
        product={product}
        comments={comments}
        onCommentsReload={fetchComments}
      />
  </CardContent>
</Card>
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        {/* Rank + Upvote */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-gray-600">
              Launched on {new Date(product.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <h3 className="text-3xl font-bold my-2">#{rank || "N/A"}</h3>
            <Button variant="destructive" className="w-full" disabled>
              <ArrowUp className="w-4 h-4 mr-2" /> Upvote •{" "}
              {product.upvotes?.length || product.upvoteCount || 0}
            </Button>
          </CardContent>
        </Card>

        {/* External links */}
        <Card>
          <CardContent className="p-4 space-y-2">
            {product.websiteUrl && (
              <a
                href={product.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </Button>
              </a>
            )}
            
            <Link to={`/edit-product/${id}`}>
              <Button variant="outline" className="w-full">
                Edit Product
              </Button>
            </Link>
            
            <Link to={`/delete-product/${id}`}>
              <Button variant="outline" className="w-full bg-red-500 text-white hover:bg-red-600">
                Delete Product
              </Button>
            </Link>
            
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Company Info</h4>
            <p className="text-sm">🌐 {product.websiteUrl || "Not provided"}</p>
            <p className="text-sm">📱 App Store • Play Store</p>
            <p className="text-sm mt-2">🛫 Launched in 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
