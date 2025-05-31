import React from 'react';
import { Link } from 'react-router-dom';
import { MailboxIcon, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                    <div className="flex items-center mb-2">
                        <MailboxIcon className="w-5 h-5 mr-2" />
                        <span>  
                        sales@kulp.ai
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-center">
                    <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                    <nav className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                        <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-300 hover:text-white">Twitter</a>

                    </nav>
                </div>
                <div className="text-center mt-4 md:mt-0">
                    <p className="text-sm">
                    Yuvish Developer
                    </p>
                    <p className="text-sm">
                    Copyright &copy; 2025 Kulp.ai All rights reserved.
                    </p>
                    
                </div>
            </div>
        </footer>
    );
}
export default Footer;