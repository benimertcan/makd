import React from 'react';
import { Button } from "@/components/ui/button";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Desktop View */}
            <div className="hidden md:flex justify-center items-center min-h-screen">
                <div className="container mx-auto px-4 py-12 flex">
                    {/* Left Side - Text Content */}
                    <div className="w-1/2 pr-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Get answers to all your questions.
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Problems trying to resolve the conflict between the
                            two major realms of Classical physics.
                        </p>
                        <Button size="lg" className="bg-primary-blue hover:bg-blue-700">
                            CONTACT OUR COMPANY
                        </Button>
                        {/* Social Media Links */}
                        <div className="flex gap-6 mt-8">
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <img src="/svg/twitter.svg" alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <img src="/svg/facebook.svg" alt="Facebook" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <img src="/svg/instagram.svg" alt="Instagram" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-blue-600">
                                <img src="/svg/youtube.svg" alt="YouTube" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    {/* Right Side - Image */}
                    <div className="w-1/2">
                        <img 
                            src="/images/contact.jpg" 
                            alt="Contact Us" 
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden px-4 py-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Get answers to all your questions.
                    </h1>
                    <p className="text-base text-gray-600 mb-6">
                        Problems trying to resolve the conflict between the
                        two major realms of Classical physics.
                    </p>
                    <Button size="default" className="bg-primary-blue hover:bg-blue-700">
                        CONTACT OUR COMPANY
                    </Button>
                    {/* Social Media Links */}
                    <div className="flex justify-center gap-6 mt-6">
                        <a href="#" className="text-gray-500 hover:text-blue-600">
                            <img src="/svg/twitter.svg" alt="Twitter" className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600">
                            <img src="/svg/facebook.svg" alt="Facebook" className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600">
                            <img src="/svg/instagram.svg" alt="Instagram" className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-blue-600">
                            <img src="/svg/youtube.svg" alt="YouTube" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
