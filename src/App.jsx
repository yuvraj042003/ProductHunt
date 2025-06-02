import './App.css';
import Footer from './layouts/Footer';
import Headers from './layouts/Header';
import Body from './layouts/Body';
import ProductDetails from './pages/ProductDetails';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import UpdateProfile from './layouts/Auth/UpdateProfile';
import UnderConstruction from './layouts/UnderConstruction';
import Logout from './layouts/Auth/Logout';
import CreateProduct from './layouts/Product/CreateProduct';
import AllProducts from './layouts/Product/AllProduct';
import ProductCard from './layouts/Product/ProductCard';
import UpvoteButton from './layouts/Product/UpVote';
import DeleteProductButton from './layouts/Product/DeleteProduct';
import ProductBody from './layouts/Product/ProductBody';
import Downvote from './layouts/Product/DownVote';
import ProductDetail from './layouts/Product/ProductDetail';
import EditProduct from './layouts/Product/EditProduct';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Headers />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* Product Routes - Fixed routing conflicts */}
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product-card" element={<ProductCard />} />
          <Route path="/upvote-button" element={<UpvoteButton />} />
          <Route path="/downvote-button" element={<Downvote />} />
          <Route path="/products" element={<ProductBody />} />
          
          {/* Specific product routes - these should be at the end */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/delete-product/:id" element={<DeleteProductButton />} />
          {console.log("PROD flag:", import.meta.env.PROD)}
{console.log("API Base URL:", import.meta.env.VITE_RENDER_API_BASE_URL)}

          {/* Add more routes as needed */}
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;