import { Circle, Download } from "lucide-react"
import Photo from "./Photo"

function MostPopular({ source }) {

    return (
        <>
            <div className="flex flex-col place-content-center text-center p-5 gap-5 lg:h-[76vh] w-80 bg-background-light">
                <h3 className="h3">MOST POPULAR</h3>
                <p className="paragraph w-60 place-self-center text-second-text-color">We focus on ergonomics and meeting
                    you where you work. It's only a
                    keystroke away.</p>
                    <img src={"/images/meatProduct.jpg"} alt="meatProduct"/>
                    <h6 className="h6 text-text-dark">English Department</h6>
                    <h6 className="h6 text-second-text-color justify-center gap-2 flex flex-row"><Download/> 15 Sales</h6>
                    <div className="flex flex-row gap-1 self-center">
                                <h5 className="h5 text-second-text-color">$16.48</h5>
                                <h5 className="h5 text-text-price">$6.48</h5>
                                </div>
                                <div className="flex flex-row place-self-center gap-1">
                                    <div className="bg-[#23A6F0] size-5 rounded-full"/>
                                    <div className="bg-[#23856D] size-5 rounded-full"/>
                                    <div className="bg-[#E77C40] size-5 rounded-full"/>
                                    <div className="bg-[#252B42] size-5 rounded-full"/>
                                </div>
            </div>
        </>
    )
}

export default MostPopular
