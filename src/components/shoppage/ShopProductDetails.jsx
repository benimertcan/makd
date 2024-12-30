import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/productActions";
import { addToCart } from "../../store/cartSlice";
import { ChevronRight, Heart, Loader2, Star, ArrowLeft, ChevronLeft, ChevronRight as ChevronRightIcon, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ProductTabs from "./ProductTabs";
import BestSellerProducts from "../BestSellerProducts";
import { toast } from 'react-toastify';

const ShopProductDetails = () => {
    const { gender, categoryName, categoryId, productNameSlug, productId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentProduct, isLoading, error } = useSelector((store) => store.product);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, productId]);

    const handleBack = () => {
        history.goBack();
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8 animate-pulse">
                    <button 
                        className="flex items-center gap-2 text-primary-blue w-fit"
                    >
                        <ArrowLeft className="size-5" />
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </button>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Image Skeleton */}
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="flex gap-4 mt-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                ))}
                            </div>
                        </div>
                        {/* Content Skeleton */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
                                ))}
                            </div>
                            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <div className="h-12 bg-gray-200 rounded w-40"></div>
                                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-primary-blue hover:text-primary-blue/80 transition-colors mb-8"
                >
                    <ArrowLeft className="size-5" />
                    Back
                </button>
                <div className="flex justify-center items-center min-h-[400px]">
                    <p className="text-red-500 text-lg">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-primary-blue hover:text-primary-blue/80 transition-colors mb-8"
                >
                    <ArrowLeft className="size-5" />
                    Back
                </button>
                <div className="flex justify-center items-center min-h-[400px]">
                    <p className="text-gray-500 text-lg">Product not found. ID: {productId}</p>
                </div>
            </div>
        );
    }

    const { name, description, price, stock, rating = 4.5, sell_count, images = [] } = currentProduct;

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-primary-blue hover:text-primary-blue/80 transition-colors mb-8"
            >
                <ArrowLeft className="size-5" />
                Back
            </button>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Image Gallery */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                        <img
                            src={images[selectedImage]?.url || "/images/product-placeholder.jpg"}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                        <button 
                            onClick={prevImage} 
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <ChevronLeft className="size-6" />
                        </button>
                        <button 
                            onClick={nextImage} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <ChevronRightIcon className="size-6" />
                        </button>
                    </div>
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                                    selectedImage === index ? 'ring-2 ring-primary-blue' : ''
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt={`${name} - view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star}
                                    className={`size-5 ${star <= Math.floor(rating) 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'fill-gray-200 text-gray-200'}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">{rating}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">{sell_count} Reviews</span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-primary-blue">
                            ${price.toFixed(2)}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-green-500 font-medium">
                                Availability:
                            </span>
                            <span className="text-green-500">
                                In Stock
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-8">
                        {description}
                    </p>

                    <div className="flex gap-4 mb-8">
                        {/* Color options */}
                        <button className="w-8 h-8 rounded-full bg-[#23A6F0] ring-2 ring-offset-2 ring-[#23A6F0]"></button>
                        <button className="w-8 h-8 rounded-full bg-[#2DC071]"></button>
                        <button className="w-8 h-8 rounded-full bg-[#E77C40]"></button>
                        <button className="w-8 h-8 rounded-full bg-[#252B42]"></button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            className="px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-blue/90 transition-colors"
                            onClick={() => {
                                dispatch(addToCart(currentProduct));
                                toast.success('Product added to cart!');
                            }}
                        >
                            Select Options
                        </button>
                        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            <Heart className="size-6" />
                        </button>
                        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            <Eye className="size-6" />
                        </button>
                        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            🛒
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-16">
                <ProductTabs 
                    description={description}
                    additionalInfo={currentProduct.additional_information}
                    reviews={currentProduct.reviews}
                />
            </div>

            {/* Best Seller Products */}
            <div className="mt-16">
                <BestSellerProducts />
            </div>
        </div>
    );
};

export default ShopProductDetails;