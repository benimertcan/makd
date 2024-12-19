import { Grid2X2, List, Loader2 } from "lucide-react";
import { useSelector } from 'react-redux';
import ShopProduct from "./ShopProduct";
import Brands from "../Brands";

const ShopProducts = () => {
    const { products, isLoading, error } = useSelector((store) => store.product);

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

    return (
        <div className="flex flex-col place-items-center gap-5 place-self-center w-full">
            <div className="flex flex-col place-items-center gap-4 lg:flex-row justify-between w-full">
                <h6 className="h6">Showing all {products.length} results</h6>
                <div className="flex flex-row gap-3 place-items-center">
                    <h6 className="h6">Views: </h6>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center">
                        <Grid2X2 className="size-3 text-text-dark" />
                    </button>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center">
                        <List className="size-3" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {products.map((product) => (
                    <ShopProduct key={product.id} product={product} />
                ))}
            </div>
            <div className="flex flex-row">
                <table className="">
                    <tbody>
                        <tr className="flex child:text-primary-blue child:p-2 child:border-second-text-color child:shadow-lg child:border-[1px] child:border-opacity-40">
                            <td className="!text-second-text-color">First</td>
                            <td>1</td>
                            <td className="!text-text-light bg-primary-blue">2</td>
                            <td>3</td>
                            <td>Next</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Brands />
        </div>
    );
};

export default ShopProducts;