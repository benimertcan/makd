import { Phone , Plane, LocateIcon} from "lucide-react"

function ShopFooter() {


    return (
        <>
            <footer className="flex  py-16 w-full gap-10 place-content-center bg-text-light text-text-dark">
                <div className="flex flex-col w-[60%] gap-10 place-items-center ">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <h3 className="h3">Bandage</h3>
                    <div className="flex flex-row gap-3">
                            <img src="/svg/facebook.svg" className="size-8"/>
                            <img src="/svg/instagram.svg" className="size-8"/>
                            <img src="/svg/twitter.svg" className="size-8"/>
                        </div>
                    </div>
             
                    <div className="flex flex-col w-full justify-between gap-10 md:flex-row">
                        <div>
                            <h5 className="h5 pb-5">Company Info</h5>
                            <ul className="flex flex-col gap-2 paragraph font-bold">
                                <li>About Us</li>
                                <li>Carrier</li>
                                <li>We are hiring</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="h5 pb-5">Legal</h5>
                            <ul className="flex flex-col gap-2 paragraph font-bold">
                                <li>About Us</li>
                                <li>Carrier</li>
                                <li>We are hiring</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="h5 pb-5">Features</h5>
                            <ul className="flex flex-col gap-2 paragraph font-bold">
                                <li>Businness Marketing</li>
                                <li>User Analytic</li>
                                <li>Live Chat</li>
                                <li>Unlimited Support</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="h5 pb-5">Resources</h5>
                            <ul className="flex flex-col gap-2 paragraph font-bold">
                                <li>IOS & Android</li>
                                <li>Wath a Demo</li>
                                <li>Customers</li>
                                <li>API</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="h5 pb-5">Get In Touch</h5>
                           <input type="email" placeholder="Your Email" className="bg-transparent h-7  w-32 border-text-dark  p-2  text-text-dark placeholder:text-text-dark" />
                            <button className='bg-primary-blue text-nowrap w-28 h-7  text-text-light font-bold '>Subscribe</button>
                        </div>
                    </div>
                    <div className="flex text-center flex-col w-full  gap-3 lg:place-self-start lg:flex-row ">
                        <h5 className="h5 font-normal">Made With Love By Finland</h5>
                        <h5 className="h5 font-normal">All Rights Reserved</h5>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default ShopFooter
