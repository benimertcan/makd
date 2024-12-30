import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/shoppingCartActions";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

const ShopProduct = ({ product, gender = "all", categoryName = "category" }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    if (!product) return null;

    const { id, name, price, description, images = [], category_id } = product;
    const imageUrl = images[0]?.url || "/images/meatProduct.jpg";
    
    // Create a URL-friendly slug from the product name
    const productNameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const handleProductClick = () => {
        history.push(`/shop/${gender}/${categoryName}/${category_id}/${productNameSlug}/${id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        dispatch(addToCart(product));
        toast.success('Product added to cart!');
    };

    return (
        <div 
            onClick={handleProductClick}
            className="flex flex-col place-items-center w-72 gap-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
            <div className="relative w-full aspect-square overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.stock < 50 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                        Low Stock
                    </span>
                )}
            </div>
            <h6 className="h6 text-text-dark truncate w-full text-center">{name}</h6>
            <h6 className="h6 text-second-text-color justify-center gap-2 flex flex-row line-clamp-1">
                {description}
            </h6>
            <div className="flex flex-row gap-2 self-center items-center">
                <h5 className="h5 text-text-price">${price}</h5>
                <button
                    onClick={handleAddToCart}
                    className="p-2 bg-primary-blue text-white rounded-full hover:bg-primary-blue/90 transition-colors"
                >
                    <ShoppingCart className="size-5" />
                </button>
            </div>
            <div className="flex flex-row place-self-center gap-1">
                <div className="bg-[#23A6F0] size-5 rounded-full" />
                <div className="bg-[#23856D] size-5 rounded-full" />
                <div className="bg-[#E77C40] size-5 rounded-full" />
                <div className="bg-[#252B42] size-5 rounded-full" />
            </div>
        </div>
    );
};

export default ShopProduct;