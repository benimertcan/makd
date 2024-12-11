import { User, Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
function Header() {

    return (
        <>
            <header className="flex flex-col my-5">

                <div className='flex flex-row place-items-center  justify-between mx-10'>
                    <img src="public/images/logo.svg"  />
                    <div className='flex flex-row gap-3'>
                        <User className='size-8' />
                        <Search className='size-8' />
                        <ShoppingCart className='size-8' />
                        <Menu className='size-8' />
                    </div>
                </div>

                <div className="flex flex-col gap-5 text-text-transparent my-20 text-center lg:flex-row lg:place-self-center lg:my-0 lg:-mt-7 mobile-menu lg:h5 lg:text-second-text-color">
                    <a className=''>Home</a>
                    <a className=' hidden lg:flex lg:place-items-end '>Shop <ChevronDown className='size-5'/></a>
                    <a className=' hidden lg:block '>About</a>
                    <a className=' hidden lg:block '>Block</a>
                    <a className=' lg:hidden'>Product</a>
                    <a className=' lg:hidden'>Pricing</a>
                    <a className=''>Contact</a>
                    <a className=' hidden lg:block '>Pages</a>
                </div>
            </header>
        </>
    )
}

export default Header
