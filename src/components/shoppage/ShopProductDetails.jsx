import { ChevronRight, EyeIcon, Heart, ShoppingCart, Star } from "lucide-react";
import { ShopCarousel } from "../Carousel";
import { BestSellerMini } from "../BestSellerProducts";
import Brands from "../Brands";
import { Link } from "react-router-dom";

const ShopProductDetails = () => {
    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4">
            <Link
                to="/shop"
                className="self-start mb-4 text-primary-blue hover:underline flex items-center gap-2 no-underline"
            >
                <ChevronRight className="rotate-180" />
                Back to Products
            </Link>

            {/* Product Main Info Section */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="lg:w-1/2">
                    {typeof window !== "undefined" && window.document && window.document.createElement ? (
                        <ShopCarousel />
                    ) : (
                        <></>
                    )}
                </div>

                <div className="lg:w-1/2 flex flex-col gap-6">
                    <h6 className="h6 text-text-dark">Graphic Design</h6>
                    <div className="flex flex-row gap-2 place-items-center">
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} className="size-4 fill-star-yellow" />
                        ))}
                        <h6 className="h6 text-second-text-color">10 Reviews</h6>
                    </div>
                    <h4 className="h4 font-bold">$1,119.33</h4>
                    <h6 className="h6 text-second-text-color">Availabilitiy :<span className="text-primary-blue"> In Stock</span></h6>
                    <p className="paragraph text-second-text-color font-medium border-b-[1px] border-second-text-color border-opacity-50 pb-4">
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <div className="flex flex-row gap-2">
                        <div className="bg-[#23A6F0] size-5 rounded-full" />
                        <div className="bg-[#23856D] size-5 rounded-full" />
                        <div className="bg-[#E77C40] size-5 rounded-full" />
                        <div className="bg-[#252B42] size-5 rounded-full" />
                    </div>
                    <div className="flex flex-row gap-4">
                        <button className="bg-primary-blue w-36 lg:w-40 h-10 rounded-md self-center text-md font-bold text-text-light">Select Options</button>
                        <Heart className="cursor-pointer hover:text-primary-blue" />
                        <ShoppingCart className="cursor-pointer hover:text-primary-blue" />
                        <EyeIcon className="cursor-pointer hover:text-primary-blue" />
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full">
                <div className="flex flex-row gap-6 py-3 border-b border-second-text-color/20 mb-8">
                    <a className="small text-second-text-color font-medium border-b-2 border-primary-blue cursor-pointer">Description</a>
                    <a className="small text-second-text-color cursor-pointer hover:border-b-2 hover:border-primary-blue">Additional Information</a>
                    <a className="small text-second-text-color cursor-pointer hover:border-b-2 hover:border-primary-blue">Reviews <span className="text-text-price">(0)</span></a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="col-span-1">
                        <img className="w-full h-auto max-w-md mx-auto" src="/images/productDetailBackground.jpg" alt="Product detail" />
                    </div>
                    
                    <div className="col-span-1">
                        <h3 className="h3 mb-4">the quick fox jumps over</h3>
                        <div className="flex flex-col gap-4">
                            <p className="paragraph text-second-text-color">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                            <p className="paragraph text-second-text-color">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                            <p className="paragraph text-second-text-color">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="h3 mb-4">the quick fox jumps over</h3>
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <a key={index} className="paragraph text-second-text-color flex items-center gap-2 hover:text-primary-blue">
                                    <ChevronRight className="size-4" />
                                    the quick fox jumps over the lazy dog
                                </a>
                            ))}
                        </div>
                        <h3 className="h3 mb-4">the quick fox jumps over</h3>
                        <div className="flex flex-col gap-2">
                            {[1, 2, 3].map((_, index) => (
                                <a key={index} className="paragraph text-second-text-color flex items-center gap-2 hover:text-primary-blue">
                                    <ChevronRight className="size-4" />
                                    the quick fox jumps over the lazy dog
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <BestSellerMini />
            <Brands />
        </div>
    );
};

export default ShopProductDetails;