import { useParams } from "react-router-dom";
import { products } from "../layouts/ProductData";
import { ArrowUp, ExternalLink, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-35 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Side */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img src={product.image} className="w-14 h-14 rounded-md" />
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-sm text-white-300">{product.tagline}</p>
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
            className="rounded-md"
          />
          <img
            src="https://ph-files.imgix.net/3158206e-f654-45dd-95e9-33cc25cf7ffc.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=391&h=220&fit=max&frame=1&dpr=1"
            className="rounded-md"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, idx) => (
            <Badge variant="outline" key={idx}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* Launch Team */}
        <Card>
          <CardContent className="p-1 ">
            <h3 className="font-medium mb-2">🚀 Launch Team</h3>
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/40?img=1" />
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/40?img=2" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardContent className="p-1 space-y-4">
            <h4 className="mb-2 font-semibold">💬 What do you think?</h4>
            <Textarea placeholder="Share your thoughts..." />
            <Button className="mt-2 bg-amber-400 items-end justify-content-end cursor-pointer">comment</Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Side */}
      <div className="space-y-6">
        {/* Rank + Upvote */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-gray-600">Launching Today</p>
            <h3 className="text-3xl font-bold my-2">#{product.rank || 6}</h3>
            <Button variant="destructive" className="w-full">
              <ArrowUp className="w-4 h-4 mr-2" /> Upvote • {product.upvotes}
            </Button>
          </CardContent>
        </Card>

        {/* External links */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 w-4 h-4" />
              Visit Website
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 w-4 h-4" />
              Share
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Company Info</h4>
            <p className="text-sm">🌐 {product.website || "ainee.com"}</p>
            <p className="text-sm">📱 App Store • Play Store</p>
            <p className="text-sm mt-2">🛫 Launched in 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
