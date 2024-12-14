import { CircleChevronLeft, CircleChevronRight } from "lucide-react"

function BestSeller() {
    const images = ["/images/caramelCone.png", "/images/apple.jpg", "/images/meat.jpg"]
    return (
        <>
            <div className=" flex flex-col ">
                <div className="flex flex-col gap-5 p-3 mx-4 justify-center place-content-center content-center text-center place-items-center border-solid border-b-[1px] lg:flex-row lg:justify-between">
                    <h3 className="h3 text-text-dark">BESTSELLER PRODUCTS</h3>
                    <div className="flex flex-row gap-5 ">
                        <h6>Men</h6>
                        <h6>Women</h6>
                        <h6>Accessories</h6>
                    </div>
                    <div className="flex flex-row gap-4 text-second-text-color">
                        <CircleChevronLeft className="size-10" />
                        <CircleChevronRight className="size-10" />
                    </div>
                </div>
                <div className="flex flex-col gap-5 p-5 ">
                    <div className="flex flex-col md:flex-row">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="flex flex-col place-items-center p-3 ">
                                <img src={image} className="size-56"  alt={`Image ${index}`} />
                                <h5 className="h5">Graphic Design</h5>
                                <h6 className="h6 text-second-text-color">English Department</h6>
                                <div className="flex flex-row gap-1">
                                <h5 className="h5 text-second-text-color">$16.48</h5>
                                <h5 className="h5 text-text-price">$6.48</h5>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                    <div className="flex flex-col md:flex-row max-md:hidden ">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="flex flex-col place-items-center p-3 ">
                                <img src={image} className="size-56"  alt={`Image ${index}`} />
                                <h5 className="h5">Graphic Design</h5>
                                <h6 className="h6 text-second-text-color">English Department</h6>
                                <div className="flex flex-row gap-1">
                                <h5 className="h5 text-second-text-color">$16.48</h5>
                                <h5 className="h5 text-text-price">$6.48</h5>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </>
    )
}

export function BestSellerMini() {
    const images = ["/images/cone.png", "/images/wood.jpg", "/images/bleach.jpg","/images/candy.jpg"]
    return (
        <>
            <div className="gap-3 my-10 p-5 place-self-center">
                <div className="flex flex-col gap-5 p-3 justify-center place-content-center content-center text-center place-items-center lg:flex-row lg:justify-between">
                    <h3 className="h3 text-text-dark">BESTSELLER PRODUCTS</h3>
                    
                   
                </div>
                <div className="flex flex-col gap-5 p-5 ">
                    <div className="flex flex-col md:flex-row">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="flex flex-col place-items-center p-3 ">
                                <img src={image} className="size-60"  alt={`Image ${index}`} />
                                <h5 className="h5">Graphic Design</h5>
                                <h6 className="h6 text-second-text-color">English Department</h6>
                                <div className="flex flex-row gap-1">
                                <h5 className="h5 text-second-text-color">$16.48</h5>
                                <h5 className="h5 text-text-price">$6.48</h5>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default BestSeller
