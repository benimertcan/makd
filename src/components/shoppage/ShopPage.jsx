import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link, Route, Switch } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from '../Footer';
import ShopFooter from './ShopFooter';
import ShopProductDetails from './ShopProductDetails';
import Shop from './Shop';

function ShopPage() {
    const dispatch = useDispatch();
    const username = useSelector((store) => {
        return store.auth.username;
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex flex-col my-10 min-w-full justify-between">
                <div className='flex flex-row place-items-center justify-between mx-8'>
                    <img src="/images/logo.svg" alt="Logo" />
                    <div className='flex flex-row gap-3 lg:gap-5 lg:text-primary-blue flex-wrap place-content-end'>
                        <Menu className='size-8 hover:size-7 lg:hidden' />
                    </div>
                </div>

                <div className="flex min-w-[70vw] flex-col gap-5 place-items-center justify-evenly text-text-transparent my-20 text-center lg:flex-row lg:place-self-end lg:my-0 lg:-mt-7 lg:mr-20 mobile-menu lg:h5 lg:text-second-text-color">
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <Link to="/">Home</Link>
                        <Link to="/shop" className='lg:flex place-self-center place-items-center flex flex-row lg:place-items-end'>Shop <ChevronDown className='hidden lg:block size-5' /></Link>
                        <Link to="/about" className=''>About</Link>
                        <Link to="/block" className=''>Blog</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/pages" className=''>Pages</Link>
                    </div>
                    <div className='flex flex-col gap-5 lg:flex-row text-primary-blue flex-wrap place-content-center'>
                        <Link to="/signup" className='text-text-transparent flex flex-row lg:flex-row place-items-center text-center place-content-center h6 lg:h5'>
                            <User className='size-8 hover:size-7' /> 
                            {username ? <p className='paragraph text-nowrap lg:h6'>{username}</p> : <p className='h3 font-normal'>Login / Register</p>}
                        </Link>
                        {username ? <LogOut className='size-8 hover:size-7' onClick={() => {
                            if (dispatch && typeof dispatch === 'function') {
                                dispatch({ type: 'LOGOUT' });
                            }
                            toast.success('Successfully logged out.');
                        }}/> : ""}
                        <Search className='size-8 hover:size-7 place-self-center' />
                        <Link to="/shop" className='place-self-center'><ShoppingCart className='size-8 hover:size-7' /></Link>
                        <Heart className='size-8 place-self-center hover:size-7' />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex justify-center items-start w-full max-w-[1200px] mx-auto px-4">
                <Switch>
                    <Route exact path="/shop" component={Shop} />
                    <Route path="/shop/product/:id" component={ShopProductDetails} />
                </Switch>
            </main>

            {/* Footer */}
            <ShopFooter/>
        </div>
    );
}

export default ShopPage;