import { User, Search, ShoppingCart, Menu } from 'lucide-react';
function Header() {

    return (
        <>
            <header className="flex flex-col my-5">

                <div className='flex flex-row place-items-center  justify-evenly'>
                    <img src="public/images/logo.svg" className="size-16" />
                    <div className='flex flex-row gap-5'>
                        <User className='size-8' />
                        <Search className='size-8' />
                        <ShoppingCart className='size-8' />
                        <Menu className='size-8' />
                    </div>
                </div>

                <div className="flex flex-col gap-5 text-text-transparent my-20 text-center">
                    <a className='mobile-menu'>Home</a>
                    <a className='mobile-menu'>Product</a>
                    <a className='mobile-menu'>Pricing</a>
                    <a className='mobile-menu'>Contact</a>
                </div>
            </header>
        </>
    )
}

export default Header
