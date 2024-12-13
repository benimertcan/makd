import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const Carousel = () => {
    const images = ["/images/nugget.jpg", "/images/nugget.jpg", "/images/nugget.jpg"];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full  mx-auto text-background-light">
            <div className="overflow-hidden relative h-[50vh] lg:h-[90vh]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        
                        <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
                            <div className='flex flex-col  gap-5 text-center p-10'>
                                <h2 className="h2">GROCERIES DELIVERY</h2>
                                <h4 className="h4">We know how large objects is will act but things on a small scale just do not act that way.</h4>
                                <button className='bg-primary-blue w-40 h-12 rounded-md self-center text-2xl font-bold	'>Start Now</button>
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