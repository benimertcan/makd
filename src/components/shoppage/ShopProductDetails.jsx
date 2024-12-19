import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/productActions";
import { ChevronRight, Heart, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Brands from "../Brands";

const ShopProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentProduct, isLoading, error } = useSelector((store) => store.product);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="size-12 animate-spin text-primary-blue" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p>Product not found</p>
            </div>
        );
    }

    const { name, description, price, stock, rating, sell_count, images = [] } = currentProduct;

    return (
        <div className="flex flex-col gap-5">
            {/* Breadcrumb */}
            <div className="flex flex-row gap-2 place-items-center mx-8">
                <Link to="/" className="h6">Home</Link>
                <ChevronRight className="size-5 text-second-text-color" />
                <Link to="/shop" className="h6">Shop</Link>
                <ChevronRight className="size-5 text-second-text-color" />
                <h6 className="h6 text-second-text-color">{name}</h6>
            </div>

            {/* Product Details */}
            <div className="flex flex-col lg:flex-row gap-8 mx-8">
                {/* Image Gallery */}
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                            src={images[selectedImage]?.url || "/images/product-placeholder.jpg"}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                                    selectedImage === index ? 'border-primary-blue' : 'border-transparent'
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

                {/* Product Info */}
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <h2 className="h2">{name}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Star className="size-5 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-600">{sell_count} sold</span>
                    </div>
                    <p className="text-xl font-bold text-primary-blue">${price}</p>
                    <p className="text-gray-600">{description}</p>
                    
                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ${stock > 50 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock > 50 ? 'In Stock' : `Low Stock (${stock} left)`}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-4">
                        <button className="bg-primary-blue text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
                            Add to Cart
                        </button>
                        <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 transition-colors">
                            <Heart className="size-6" />
                        </button>
                    </div>
                </div>
            </div>

            <Brands />
        </div>
    );
};

export default ShopProductDetails;