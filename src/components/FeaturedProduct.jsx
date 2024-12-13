import { ChartColumn, ChevronRight, Clock } from "lucide-react";



const FeaturedProduct = ({ image }) => {

    if (!image) {
        console.error("Image source is not provided");
        return null;
    }

    return (
        <div className="flex flex-col  max-w-[14rem] lg:max-w-[20rem]">
            <div className="bg-cover bg-left bg-no-repeat size-56 lg:size-80"
                style={{ backgroundImage: `url(${image})` }}>
                <div className='flex flex-col  text-center place-items-start p-3'>
                    <p className=" bg-newRed text-text-light px-2 h6">NEW</p>
                </div>
            </div>
            <div className="flex flex-col justify-between p-3 gap-3 shadow-md">
                <div className="gap-2 flex flex-row">
                    <p className="small text-primary-blue opacity-90">Google</p>
                    <p className="small text-second-text-color">Trending</p>
                    <p className="small text-second-text-color">New</p>
                </div>
                <h4 className="h4 ">Loudest à la Madison #1
                    (L'integral)</h4>
                <p className="paragraph text-second-text-color">We focus on ergonomics and meeting
                    you where you work. It's only a
                    keystroke away.</p>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-1 place-items-center">
                            <Clock className="size-3 text-primary-blue" />
                        <p className="small text-second-text-color">22 April 2021</p>
                        </div>
                        <div className="flex flex-row gap-1 place-items-center">
                            <ChartColumn className="size-3 text-text-price" />
                        <p className="small text-second-text-color">10 Comments</p>
                        </div>
                    </div>
                    <div className="flex flex-row  place-items-center">
                    <h5 className="h5 text-second-text-color">Learn More</h5>
                    <ChevronRight className="size-5 text-primary-blue"/>
                    </div>
                   
            </div>
        </div>
    );
};

export default FeaturedProduct;

