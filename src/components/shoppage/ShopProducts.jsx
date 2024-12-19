import { Grid2X2, List } from "lucide-react";
import ShopProduct from "./ShopProduct";
import Brands from "../Brands";

const ShopProducts = () => {
    const products = [
        { id: "1", title: "Product 1" },
        { id: "2", title: "Product 2" },
        { id: "3", title: "Product 3" },
        { id: "4", title: "Product 4" },
        { id: "5", title: "Product 5" },
        { id: "6", title: "Product 6" },
    ];

    return (
        <div className="flex flex-col place-items-center gap-5 place-self-center">
            <div className="flex flex-col place-items-center gap-4 lg:flex-row justify-between w-full">
                <h6>Showing all 12 results</h6>
                <div className="flex flex-row gap-3 place-items-center">
                    <h6>Views: </h6>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center"><Grid2X2 className="size-3 text-text-dark" /></button>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center">   <List className="size-3" /> </button>
                </div>
                <div className="flex flex-row gap-5">
                    <select name="sort" className='text-second-text-color bg-text-light rounded-md paragraph  p-2 border-[#D9D9D9] border-[1px] ml-2' >
                        <option key={"pop"} value={"pop"} className='bg-text-light text-text-dark'>Popularity</option>
                    </select>
                    <button
                        type="submit"
                        className={`bg-primary-blue w-28 h-10 rounded-md self-center lg:w-32 lg:h-12 lg:text-2xl text-md font-bold text-text-light place-items-center `}
                    >Filter</button>
                </div>
            </div>
            <div className="flex flex-col place-items-center place-content-center lg:flex-row lg:flex-wrap  gap-5 ">
                {products.map((product) => (
                    <ShopProduct key={product.id} id={product.id} />
                ))}
            </div>
            <div className="flex flex-row">
                <table className="">
                    <tr className=" flex child:text-primary-blue child:p-2 child:border-second-text-color child:shadow-lg child:border-[1px] child:border-opacity-40">
                        <td className="!text-second-text-color">First</td>
                        <td>1</td>
                        <td className="!text-text-light bg-primary-blue">2</td>
                        <td>3</td>
                        <td>Next</td>
                    </tr>
                </table>
            </div>
            <Brands/>
        </div>
    );
};

export default ShopProducts;