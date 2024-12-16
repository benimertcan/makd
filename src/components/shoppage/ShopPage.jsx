import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from '../Footer';
function ShopPage({children}) {
    const dispatch = useDispatch();
    const username = useSelector((store) => {
        return store.auth.username;
      });
    return (
        <>
        <>
            <header className="flex flex-col my-10 min-w-full">
                <div className='flex flex-row place-items-center justify-between mx-8'>
                    <img src="/images/logo.svg" alt="Logo" />
                    <div className='flex flex-row gap-3 lg:gap-5 lg:text-primary-blue flex-wrap place-content-end'>
                    <Menu className='size-8 hover:size-7 lg:hidden' />
                    </div>
                </div>

                <div className="flex flex-col gap-5 place-items-center  text-text-transparent my-20 text-center lg:flex-row lg:place-self-center lg:my-0 lg:-mt-7 lg:mr-20 mobile-menu lg:h5 lg:text-second-text-color">
                    <Link to="/">Home</Link>
                    <Link to="/shop" className='lg:flex place-self-center place-items-center flex flex-row lg:place-items-end'>Shop <ChevronDown className='hidden lg:block size-5' /></Link>
                    <Link to="/about" className=''>About</Link>
                    <Link to="/block" className=''>Blog</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/pages" className=''>Pages</Link>

                    <div className='flex flex-col gap-5  lg:flex-row  text-primary-blue flex-wrap place-content-center'>
                    <Link to="/signup" className='text-text-transparent flex flex-row lg:flex-row place-items-center text-center place-content-center h6 lg:h5'>
                            <User className='size-8 hover:size-7 '   /> 
                            {username ? <p className='paragraph text-nowrap lg:h6'>{username}</p> : <p className='h3 font-normal'>Login / Register</p>}
                        </Link>
                        {username ? <LogOut className='size-8 hover:size-7' onClick={() => {
                            if (dispatch && typeof dispatch === 'function') {
                                dispatch({ type: 'LOGOUT' });
                            }
                            toast.success('Successfully logged out.');
                        }}/> : ""}
                        <Search className='size-8 hover:size-7 place-self-center' />
                       <Link to="/shop" className='place-self-center' > <ShoppingCart className='size-8 hover:size-7' /></Link>
                        <Heart className='size-8 place-self-center hover:size-7 '  />
                        </div>
                </div>
            </header>
            <>{children}</>
            <Footer/>
            </>
        </>
    );
}

export default ShopPage;