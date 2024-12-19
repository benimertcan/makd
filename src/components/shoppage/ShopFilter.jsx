import { Search } from "lucide-react";
import { useState, useCallback } from "react";

const ShopFilter = ({ onFilterChange, onSortChange }) => {
    const [showFilters, setShowFilters] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sort, setSort] = useState("");

    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchValue(value);
        onFilterChange(value);
    }, [onFilterChange]);

    const handleSortChange = useCallback((e) => {
        const value = e.target.value;
        setSort(value);
        onSortChange(value);
    }, [onSortChange]);

    const toggleFilters = useCallback(() => {
        setShowFilters(prev => !prev);
    }, []);

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Filter Toggle Button */}
            <button
                onClick={toggleFilters}
                className="w-40 place-self-center lg:place-self-end  px-4 py-2 bg-primary-blue text-text-light rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
                <Search className="size-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filter Section */}
            <div className={`w-full transition-all duration-300 ease-in-out ${
                showFilters 
                    ? 'opacity-100 max-h-96 visible' 
                    : 'opacity-0 max-h-0 invisible overflow-hidden'
            }`}>
                <div className="w-full flex flex-col md:flex-row gap-4 justify-end items-center px-4">
                    <div className="flex items-center gap-2 w-full md:w-auto relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue pl-10"
                        />
                        <Search className="text-gray-400 absolute left-3" />
                    </div>
                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                        <option value="">Sort by</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                        <option value="rating:asc">Rating: Low to High</option>
                        <option value="rating:desc">Rating: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ShopFilter;
