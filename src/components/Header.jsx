import { User, Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link
import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';
import LoginForm from './LoginForm';
function Header() {
    const user = useSelector((state) => state.auth);


    return (
        <>
            <header className="flex flex-col my-5">
                <div className='flex flex-row place-items-center justify-between mx-10'>
                    <img src="public/images/logo.svg" alt="Logo" />
                    <div className='flex flex-row gap-3'>
                        <Link to="/signup" className='text-text-transparent text-center place-content-center h6 lg:h5'>
                            {
                                user ? (
                                    <p>{user.user}</p>
                                ) : (
                                    <User className='size-8' />
                                )
                            }
                        </Link>
                        {
                            !user ? (
                                <Link to="/login" className='text-text-transparent text-center place-content-center  h6 lg:h5'>
                                    <User className='size-8' />
                                </Link>
                            ):(
                                ""
                            )
                        }

                        <Search className='size-8' />
                        <ShoppingCart className='size-8' />
                        <Menu className='size-8' />
                    </div>
                </div>

                <div className="flex flex-col gap-5 text-text-transparent my-20 text-center lg:flex-row lg:place-self-center lg:my-0 lg:-mt-7 lg:mr-7 mobile-menu lg:h5 lg:text-second-text-color">
                    <Link to="/">Home</Link>
                    <Link to="/shop" className='hidden lg:flex lg:place-items-end'>Shop <ChevronDown className='size-5' /></Link>
                    <Link to="/about" className='hidden lg:block'>About</Link>
                    <Link to="/block" className='hidden lg:block'>Block</Link>
                    <Link to="/product" className='lg:hidden'>Product</Link>
                    <Link to="/pricing" className='lg:hidden'>Pricing</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/pages" className='hidden lg:block'>Pages</Link>
                </div>
            </header>
        </>
    );
}

export default Header;