import { Phone , Plane, LocateIcon} from "lucide-react"

function Footer({ children }) {


    return (
        <>
            <footer className="flex  py-16 w-full gap-10 place-content-center bg-bg-dark text-text-light">
                <div className="flex flex-col w-[60%] gap-10 place-items-center ">
                    <div className="flex flex-col w-full md:flex-row justify-between gap-8">
                        <div className="flex flex-col gap-4 ">
                            <h2 className="h2">Consulting Agency For Your Business</h2>
                            <h5 className="h5 text-second-text-color">the quick fox jumps over the lazy dog</h5>
                        </div>
                        <button className='bg-primary-blue w-40 h-10 text-2xl font-bold rounded-md'>Contact Us</button>
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
                            <ul className="flex flex-col gap-2 paragraph font-bold">
                                <li className="flex flex-row gap-1"><Phone className="text-disable-element-color"/>(480)-555-0103</li>
                                <li className="flex flex-row gap-1"><LocateIcon className="text-disable-element-color" />4517 Washington Ave.</li>
                                <li className="flex flex-row gap-1"><Plane  className="text-disable-element-color"/>debra.holt@example.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
