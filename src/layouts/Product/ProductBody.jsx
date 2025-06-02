import React from 'react';
import AllProducts from './AllProduct';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProductBody = () => {

  const navigate = useNavigate();
   const CreateProduct = () => {
    navigate("/create-product");
  };
  return (
    <div className="p-6 mt-20 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Showcase</h1>

      
        <div className="mb-8">
          <Button variant="outline" className=" bg-yellow-50 w-1/4 cursor-pointer hover:bg-yellow-100 text-black font-semibold" 
          onClick={CreateProduct}
          >
            Create Product
          </Button>
        </div>
     

      <div className="space-y-6 ">
        <AllProducts />
      </div>
    </div>
  );
};

export default ProductBody;
