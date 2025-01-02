import { Grid2X2, List, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import ShopProduct from "./ShopProduct";
import Brands from "../Brands";
import ShopFilter from "./ShopFilter";
import { fetchProducts } from "../../actions/productActions";
import { useParams } from "react-router-dom";

const ShopProducts = ({ products, isLoading }) => {
    const dispatch = useDispatch();
    const { category } = useSelector((store) => store.category);
    const { gender, categoryName } = useParams();
    const [sort, setSort] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    // Debounce search query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 2200); // Wait for 500ms after last keystroke

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Fetch products when debounced search query changes
    useEffect(() => {
        const params = {};
        if (sort) params.sort = sort;
        if (debouncedSearchQuery) params.filter = debouncedSearchQuery; 

        if (category && category.id) {
            dispatch(fetchProducts({ ...params, filterByCategory: category.id }));
        } else {
            dispatch(fetchProducts(params));
        }
    }, [sort, debouncedSearchQuery, category, dispatch]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="size-12 animate-spin text-primary-blue" />
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-lg text-gray-500">No products found</p>
            </div>
        );
    }

    // Update the filtering logic for immediate UI feedback
    const filteredProducts = (() => {
        // Make sure products exist and is an array
        if (!Array.isArray(products)) {
            return [];
        }

        // If no search query, return all products
        if (!searchQuery) {
            return products;
        }

        // Filter products
        const searchLower = searchQuery.toLowerCase();
        return products.filter(product => {
            // Skip invalid products
            if (!product || typeof product !== 'object') {
                return false;
            }

            // Get searchable text
            const title = String(product.title || '').toLowerCase();
            const description = String(product.description || '').toLowerCase();

            // Check for matches
            return title.includes(searchLower) || description.includes(searchLower);
        });
    })();

    return (
        <div className="flex flex-col place-items-center gap-5 place-self-center w-full">
            <div className="flex flex-col place-items-center gap-4 lg:flex-row justify-between w-full">
                <h6 className="h6">Showing {filteredProducts.length} results</h6>
                <div className="flex flex-row gap-3 place-items-center">
                    <h6 className="h6">Views: </h6>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center">
                        <Grid2X2 className="size-3 text-text-dark" />
                    </button>
                    <button className="size-5 border-[1px] border-second-text-color opacity-85 place-items-center">
                        <List className="size-3" />
                    </button>
                </div>
                <ShopFilter 
                onFilterChange={handleSearch}
                onSortChange={setSort}
            />
            </div>

            {/* Filter Section */}
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full place-items-center">
                {filteredProducts.map((product) => 
                    product ? (
                        <ShopProduct 
                        key={product.id} 
                        product={product} 
                        gender={gender}
                        categoryName={categoryName}
                        />
                    ) : null
                )}
            </div>
           
            
        </div>
    );
};

export default ShopProducts;
