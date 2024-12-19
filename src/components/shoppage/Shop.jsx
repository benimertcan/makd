import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import ShopTags from "./ShopTags";
import ShopProducts from "./ShopProducts";

const Shop = () => {
    const { categories } = useSelector((store) => store.category);
    
    const topCategories = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    return (
        <div className="w-full">
            <section className="flex flex-col gap-5 place-items-center my-5">
                <div className="flex flex-col gap-8 place-items-center justify-between">
                    <h2 className="h3">Shop</h2>
                    <div className="flex flex-row gap-2 place-items-center">
                        <h6 className="h6">Home</h6>
                        <ChevronRight className="size-5 text-second-text-color"/>
                        <h6 className="h6 text-second-text-color">Shop</h6>
                    </div>
                </div>
                <div className=" grid grid-cols-1  lg:grid-cols-5 gap-5 place-items-center">
                    {topCategories.map((category) => (
                        <ShopTags key={category.id} category={category} />
                    ))}
                </div>
                <ShopProducts />
            </section>
        </div>
    );
};

export default Shop;