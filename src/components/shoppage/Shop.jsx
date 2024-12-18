import { ChevronRight } from "lucide-react";
import ShopTags from "./ShopTags";




const Shop = () => {
const shopImages= ["/images/shopBackgroundOne.jpg", "/images/shopBackgroundTwo.jpg", "/images/shopBackgroundThree.jpg","/images/shopBackgroundFour.jpg","/images/shopBackgroundFive.jpg"]

    return (
        <>
            <section className="flex flex-col gap-5 place-items-center my-5">
              <div className="flex flex-col gap-8 place-items-center justify-between ">
                <h2 className="h3">Shop</h2>
                <div className="flex flex-row gap-2 place-items-center">
                    <h6 className="h6">Home</h6>
                    <ChevronRight className="size-5 text-second-text-color"/>
                    <h6 className="h6 text-second-text-color">Shop</h6>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                {
                  shopImages.map((image, index) => {
                    return (
                      <ShopTags key={index} image={image} />
                    )
                  }
                    )
                }
              </div>
            </section>
        </>
    );
};

export default Shop;