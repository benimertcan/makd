import { User, Search, ShoppingCart, Menu, ChevronDown, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import { fetchCategories } from '../actions/categoryActions';
import ShoppingCartDropdown from './ShoppingCartDropdown';

function Header() {
    const dispatch = useDispatch();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showShopDropdown, setShowShopDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const userDropdownRef = useRef(null);
    const shopDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const username = useSelector((store) => store.auth.username);
    const { categories } = useSelector((store) => store.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
            if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target)) {
                setShowShopDropdown(false);
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
        if (showUserDropdown) setShowUserDropdown(false);
        if (showShopDropdown) setShowShopDropdown(false);
    };

    const handleLogout = () => {
        if (dispatch && typeof dispatch === 'function') {
            dispatch({ type: 'LOGOUT' });
        }
        toast.success('Successfully logged out.');
    };

    return (
        <>
            <header className="flex flex-col my-5 md:my-10  ">
                <div className='flex flex-row place-items-center justify-between mx-4 md:mx-8 '>
                    <img src="/images/logo.svg" alt="Logo" className="w-24 md:w-auto" />
                    <div className='flex flex-row gap-2 md:gap-3 lg:gap-5 xl:gap-8 lg:text-primary-blue flex-wrap place-content-end'>
                        {username ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => {
                                        setShowUserDropdown(!showUserDropdown);
                                        setShowShopDropdown(false);
                                    }}
                                    className="flex flex-col md:flex-row items-center gap-1 text-center h6 lg:h5"
                                >
                                    <User className='size-6 md:size-8 hover:scale-95 transition-transform' />
                                    <p className='text-xs md:text-sm lg:text-base xl:text-lg text-nowrap truncate max-w-[100px] md:max-w-[150px] xl:max-w-[200px]'>
                                        {username}
                                    </p>
                                    <ChevronDown className='size-4' />
                                </button>
                                {showUserDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 opacity-100 rounded-md shadow-lg py-1 bg-text-light ring-1 ring-black ring-opacity-5 z-50"
                                    >
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowUserDropdown(false)}
                                        >
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setShowUserDropdown(false);
                                                handleLogout();
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <LogOut className="size-4" />
                                                <span>Logout</span>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/signup" className='text-text-transparent flex flex-col md:flex-row items-center gap-1 text-center h6 lg:h5'>
                                <User className='size-6 md:size-8 hover:scale-95 transition-transform' />
                                <p className='hidden md:block lg:text-base xl:text-lg'>Login / Register</p>
                            </Link>
                        )}
                        <Search className='size-6 md:size-8 hover:scale-95 transition-transform cursor-pointer' />
                        <div className="relative">
                            <ShoppingCartDropdown />
                        </div>
                        <Heart className='size-6 md:size-8 hover:scale-95 transition-transform hidden lg:block cursor-pointer' />
                        <Menu 
                            className='size-6 md:size-8 hover:scale-95 transition-transform lg:hidden cursor-pointer' 
                            onClick={toggleMobileMenu}
                        />
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex flex-row gap-5 text-text-dark text-center place-self-center -mt-7 mr-20 h5">
                    <Link to="/" className="hover:text-primary-blue transition-colors">Home</Link>
                    <div className="relative" ref={shopDropdownRef}>
                        <button
                            className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary-blue transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowShopDropdown(!showShopDropdown);
                                setShowUserDropdown(false);
                            }}
                        >
                            Shop <ChevronDown className='size-5 transition-transform' />
                        </button>
                        <Link 
                            to="/shop"
                            className="lg:hidden flex items-center gap-1 cursor-pointer hover:text-primary-blue transition-colors"
                        >
                            Shop
                        </Link>
                        {showShopDropdown && categories && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-background-light text-text-dark shadow-lg rounded-md py-4 z-40">
                                <Link
                                    to="/shop"
                                    className="block px-4 py-2 text-text-dark hover:bg-gray-100 transition-colors mb-2 text-center font-semibold"
                                    onClick={() => setShowShopDropdown(false)}
                                >
                                    All Products
                                </Link>
                                <div className="h-px bg-gray-200 mb-2"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    {/* Women's Categories */}
                                    <div className="px-4">
                                        <h3 className="font-semibold mb-2 text-primary-blue">Women</h3>
                                        {categories
                                            .filter(category => category.gender === 'k')
                                            .map((category) => (
                                                <Link
                                                    key={category.id}
                                                    to={`/shop/kadin/${category.title.toLowerCase()}/${category.id}`}
                                                    className="block py-2 text-text-dark hover:text-primary-blue transition-colors capitalize"
                                                    onClick={() => setShowShopDropdown(false)}
                                                >
                                                    {category.title}
                                                </Link>
                                            ))}
                                    </div>
                                    {/* Men's Categories */}
                                    <div className="px-4 border-l border-gray-200">
                                        <h3 className="font-semibold mb-2 text-primary-blue">Men</h3>
                                        {categories
                                            .filter(category => category.gender === 'e')
                                            .map((category) => (
                                                <Link
                                                    key={category.id}
                                                    to={`/shop/erkek/${category.title.toLowerCase()}/${category.id}`}
                                                    className="block py-2 text-text-dark hover:text-primary-blue transition-colors capitalize"
                                                    onClick={() => setShowShopDropdown(false)}
                                                >
                                                    {category.title}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/about" className="hover:text-primary-blue transition-colors">About</Link>
                    <Link to="/block" className="hover:text-primary-blue transition-colors">Blog</Link>
                    <Link to="/contact" className="hover:text-primary-blue transition-colors">Contact</Link>
                    <Link to="/pages" className="hover:text-primary-blue transition-colors">Pages</Link>
                </nav>

                {/* Mobile Menu Overlay */}
                {showMobileMenu && (
                    <div 
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setShowMobileMenu(false)}
                    />
                )}
                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div 
                        ref={mobileMenuRef}
                        className="lg:hidden fixed top-0 right-0 h-screen w-64 bg-background-light text-text-dark shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
                    >
                        <div className="flex flex-col p-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="h4 text-text-dark">Menu</h3>
                                <button 
                                    onClick={() => setShowMobileMenu(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-text-dark"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <Link 
                                to="/" 
                                className="py-3 px-4 text-text-dark hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/shop" 
                                className="py-3 px-4 text-text-dark hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                All Products
                            </Link>
                            <div className="h-px bg-gray-200 my-2"></div>
                            <div className="space-y-1">
                                {categories && categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.title.toLowerCase()}/${category.id}`}
                                        className="block py-3 px-4 text-text-dark hover:bg-gray-100 rounded-md transition-colors capitalize"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;