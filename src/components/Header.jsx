import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import { fetchCategories } from '../actions/categoryActions';

function Header() {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const username = useSelector((store) => store.auth.username);
    const { categories } = useSelector((store) => store.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <header className="flex flex-col my-10 min-w-full">
                <div className='flex flex-row place-items-center justify-between mx-8'>
                    <img src="/images/logo.svg" alt="Logo" />
                    <div className='flex flex-row gap-3 lg:gap-5 lg:text-primary-blue flex-wrap place-content-end'>
                        <Link to="/signup" className='text-text-transparent flex flex-col lg:flex-row place-items-center text-center place-content-center h6 lg:h5'>
                            <User className='size-8 hover:size-7'  /> 
                            {username ? <p className='paragraph text-nowrap lg:h6'>{username}</p> : <p className='hidden lg:block'>Login / Register</p>}
                        </Link>
                        {username ? <LogOut className='size-8 hover:size-7' onClick={() => {
                            if (dispatch && typeof dispatch === 'function') {
                                dispatch({ type: 'LOGOUT' });
                            }
                            toast.success('Successfully logged out.');
                        }}/> : ""}
                        <Search className='size-8 hover:size-7' />
                        <Link to="/shop" > <ShoppingCart className='size-8 hover:size-7' /></Link>
                        <Heart className='size-8 hover:size-7 hidden lg:block'  />
                        <Menu className='size-8 hover:size-7 lg:hidden' />
                    </div>
                </div>

                <div className="flex flex-col gap-5 text-text-transparent my-20 text-center lg:flex-row lg:place-self-center lg:my-0 lg:-mt-7 lg:mr-20 mobile-menu lg:h5 lg:text-second-text-color">
                    <Link to="/">Home</Link>
                    <div className="relative" ref={dropdownRef}>
                        <Link 
                            to="/shop"
                            className="flex items-center place-self-center gap-1 cursor-pointer hover:text-primary-blue"
                            onClick={(e) => {
                                e.preventDefault();
                                if (dropdownRef.current) {
                                    setShowDropdown(!showDropdown);
                                }
                            }}
                        >
                            Shop <ChevronDown className='size-5' />
                        </Link>
                        {showDropdown && categories && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-primary-blue text-text-light shadow-lg rounded-md py-2 z-50">
                                <Link
                                    to="/shop"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    All Products
                                </Link>
                                <div className="border-b my-2"></div>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/shop/${category.gender}/${category.title.toLowerCase()}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/about" className='hidden lg:block'>About</Link>
                    <Link to="/block" className='hidden lg:block'>Blog</Link>
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