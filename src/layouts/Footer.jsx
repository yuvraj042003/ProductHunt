import React from 'react';
import { Link } from 'react-router-dom';
import { MailboxIcon, Phone, Copyright } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                    <div className="flex items-center mb-2">
                        <MailboxIcon className="w-5 h-5 mr-2" />
                        <span>  
                        info@company.com
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                    <nav className="flex space-x-4">
                        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                        <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
                        <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
                    </nav>
                </div>
                <div className="text-center mt-4 md:mt-0">
                    <p className="text-sm">
                    Copyright 2023 Company Name. All rights reserved.
                    </p>
                    <p className="text-sm">
                    Yuvish Developer
                    </p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;