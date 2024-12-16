import { Mail, Phone } from "lucide-react";



const ShopHeader = () => {


    return (
        <>
            <section className="w-full h-10 place-items-center flex flex-row justify-evenly bg-light-green text-text-light">
                <div className="flex flex-row gap-1 place-items-center  ">
                    <Phone className="size-5" />
                    <p className="small">(225) 555-0118</p>
                </div>
                <div className="flex flex-row gap-1 place-items-center  ">
                    <Mail className="size-5" />
                    <p className="small">michelle.rivera@example.com</p>
                </div>
                <h6 className="h6">Follow Us  and get a chance to win 80% off</h6>
                <div className="flex flex-row gap-2 place-items-center text-text-light ">
                    <h6 className="h6">Follow Us : </h6>
                   
                    <img src="/svg/instagram.svg" className="size-5 " />
                    <img src="/svg/youtube.svg" className="size-5" />
                    <img src="/svg/facebook.svg" className="size-5" />
                    <img src="/svg/twitter.svg" className="size-5" />
                    
                </div>
            </section>
        </>
    );
};

export default ShopHeader;