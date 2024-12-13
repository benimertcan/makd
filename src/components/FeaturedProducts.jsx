import FeaturedProduct from "./FeaturedProduct";



const FeaturedProducts = () => {
const backImages = ["/images/backOne.jpg", "/images/backTwo.jpg", "/images/backThree.jpg"]
    return (
        <>
            <section className="flex flex-col  gap-10 my-20 place-items-center w-full justify-center lg:gap-6 ">
                <h6 className="h6 text-primary-blue">Pratice Advice</h6>
                <h2 className="h2">Featured Products</h2>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">
            {
                backImages.map((image, index) => <FeaturedProduct key={index} image={image}/>)
            }
              </div>
            </section>
        </>
    );
};

export default FeaturedProducts;