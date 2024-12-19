import { Link } from "react-router-dom";

const ShopProduct = ({ product }) => {
    if (!product) return null;

    const { id, name, price, description, images = [] } = product;
    const imageUrl = images[0]?.url || "/images/meatProduct.jpg";

    return (
        <Link to={`/shop/product/${id}`} className="no-underline text-inherit">
            <div className="flex flex-col place-items-center w-72 gap-4 cursor-pointer hover:opacity-90">
                <div className="relative w-full aspect-square overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full h-full object-cover"
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
                <div className="flex flex-row gap-2 self-center">
                    <h5 className="h5 text-text-price">${price}</h5>
                </div>
                <div className="flex flex-row place-self-center gap-1">
                    <div className="bg-[#23A6F0] size-5 rounded-full" />
                    <div className="bg-[#23856D] size-5 rounded-full" />
                    <div className="bg-[#E77C40] size-5 rounded-full" />
                    <div className="bg-[#252B42] size-5 rounded-full" />
                </div>
            </div>
        </Link>
    );
};

export default ShopProduct;