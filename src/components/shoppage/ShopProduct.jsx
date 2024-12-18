import { Download } from "lucide-react";


const ShopProduct = () => {


    return (
       <div className="flex flex-col place-items-center max-w-80  gap-4 ">
         {typeof window !== "undefined" && window.document && window.document.createElement ? (
                    <img src={"/images/meatProduct.jpg"} alt="meatProduct" />
                ) : (
                    <></>
                )}
                <h6 className="h6 text-text-dark">Graphic Design</h6>
                <h6 className="h6 text-second-text-color justify-center gap-2 flex flex-row">
                English Department
                </h6>
                <div className="flex flex-row gap-1 self-center">
                    <h5 className="h5 text-second-text-color opacity-50">$16.48</h5>
                    <h5 className="h5 text-text-price">$6.48</h5>
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