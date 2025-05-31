import './App.css';
import Footer from './layouts/Footer';
import Headers from './layouts/Header';
import Body from './layouts/Body';
import ProductDetails from './pages/ProductDetails';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Headers />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
