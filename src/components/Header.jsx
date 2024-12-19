import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import { fetchCategories } from '../actions/categoryActions';

function Header() {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
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
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        if (showDropdown) setShowDropdown(false);
    };

    return (
        <>
            <header className="flex flex-col my-5 md:my-10 min-w-full relative">
                <div className='flex flex-row place-items-center justify-between mx-4 md:mx-8'>
                    <img src="/images/logo.svg" alt="Logo" className="w-24 md:w-auto" />
                    <div className='flex flex-row gap-2 md:gap-3 lg:gap-5 lg:text-primary-blue flex-wrap place-content-end'>
                        <Link to="/signup" className='text-text-transparent flex flex-col lg:flex-row place-items-center text-center place-content-center h6 lg:h5'>
                            <User className='size-6 md:size-8 hover:scale-95 transition-transform' /> 
                            {username ? <p className='paragraph text-nowrap lg:h6'>{username}</p> : <p className='hidden lg:block'>Login / Register</p>}
                        </Link>
                        {username ? (
                            <LogOut 
                                className='size-6 md:size-8 hover:scale-95 transition-transform cursor-pointer' 
                                onClick={() => {
                                    if (dispatch && typeof dispatch === 'function') {
                                        dispatch({ type: 'LOGOUT' });
                                    }
                                    toast.success('Successfully logged out.');
                                }}
                            />
                        ) : null}
                        <Search className='size-6 md:size-8 hover:scale-95 transition-transform cursor-pointer' />
                        <Link to="/shop">
                            <ShoppingCart className='size-6 md:size-8 hover:scale-95 transition-transform' />
                        </Link>
                        <Heart className='size-6 md:size-8 hover:scale-95 transition-transform hidden lg:block cursor-pointer' />
                        <Menu 
                            className='size-6 md:size-8 hover:scale-95 transition-transform lg:hidden cursor-pointer' 
                            onClick={toggleMobileMenu}
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-row gap-5 text-text-transparent text-center place-self-center -mt-7 mr-20 h5 text-second-text-color">
                    <Link to="/" className="hover:text-primary-blue transition-colors">Home</Link>
                    <div className="relative" ref={dropdownRef}>
                        <Link 
                            to="/shop"
                            className="flex items-center gap-1 cursor-pointer hover:text-primary-blue transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowDropdown(!showDropdown);
                            }}
                        >
                            Shop <ChevronDown className='size-5 transition-transform' />
                        </Link>
                        {showDropdown && categories && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-primary-blue text-text-light shadow-lg rounded-md py-2 z-50">
                                <Link
                                    to="/shop"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    All Products
                                </Link>
                                <div className="border-b my-2"></div>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/shop/${category.gender}/${category.title.toLowerCase()}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to="/about" className="hover:text-primary-blue transition-colors">About</Link>
                    <Link to="/block" className="hover:text-primary-blue transition-colors">Blog</Link>
                    <Link to="/contact" className="hover:text-primary-blue transition-colors">Contact</Link>
                    <Link to="/pages" className="hover:text-primary-blue transition-colors">Pages</Link>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <div 
                        ref={mobileMenuRef}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-50"
                    >
                        <div className="flex flex-col gap-4 px-4">
                            <Link 
                                to="/" 
                                className="text-text-transparent hover:text-primary-blue transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/shop" 
                                className="text-text-transparent hover:text-primary-blue transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Shop
                            </Link>
                            <Link 
                                to="/product" 
                                className="text-text-transparent hover:text-primary-blue transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Product
                            </Link>
                            <Link 
                                to="/pricing" 
                                className="text-text-transparent hover:text-primary-blue transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Pricing
                            </Link>
                            <Link 
                                to="/contact" 
                                className="text-text-transparent hover:text-primary-blue transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;