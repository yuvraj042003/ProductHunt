import ProductList from "../layouts/ProductList";
import React from "react";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
           <ProductList/>
        </div>
    );
}
export default Body;