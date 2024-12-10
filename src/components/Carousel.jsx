import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const Carousel = () => {
    const images = ["public/images/nugget.jpg", "public/images/nugget.jpg", "public/images/nugget.jpg"];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto text-background-light">
            <div className="overflow-hidden relative h-[50vh]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover -z-1"
                        />
                        <div className="absolute inset-0 flex items-center justify-center ">
                            <div className='flex flex-col w-56 gap-5 text-center '>
                                <h1 className="text-white text-3xl font-bold">GROCERIES DELIVERY</h1>
                                <p className="text-white text-lg">We know how large objects is will act but things on a small scale</p>
                                <button className='bg-primary-blue w-32 h-10 rounded-sm self-center'>Start Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={prevSlide}
            >
                <ChevronLeft className=' size-10'  />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={nextSlide}
            >
                <ChevronRight className=' size-10' />
            </button>
        </div>

    );
};

export default Carousel;