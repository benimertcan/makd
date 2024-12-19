import { ChevronRight, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ShopTags from "./ShopTags";
import ShopProducts from "./ShopProducts";
import { fetchProducts } from "../../actions/productActions";

const Shop = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { categoryId, gender, categoryName } = useParams();
    const { categories } = useSelector((store) => store.category);
    
    // States for filters
    const [sort, setSort] = useState("");
    const [filter, setFilter] = useState("");
    
    const topCategories = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    // Get query parameters on mount
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sortParam = searchParams.get('sort');
        const filterParam = searchParams.get('filter');
        
        if (sortParam && sortParam !== sort) setSort(sortParam);
        if (filterParam && filterParam !== filter) setFilter(filterParam);
    }, [location.search]);

    // Update products when filters change
    useEffect(() => {
        const params = {};
        if (categoryId) params.category = categoryId;
        if (sort) params.sort = sort;
        if (filter) params.filter = filter;

        // Update URL
        const searchParams = new URLSearchParams();
        if (sort) searchParams.append('sort', sort);
        if (filter) searchParams.append('filter', filter);

        history.replace({
            pathname: location.pathname,
            search: searchParams.toString()
        });

        // Fetch products with filters
        dispatch(fetchProducts(params));
    }, [categoryId, sort, filter]);

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="w-full">
            <section className="flex flex-col gap-5 place-items-center my-5">
                <div className="flex flex-col gap-8 place-items-center justify-between">
                    <h2 className="h3">Shop</h2>
                    <div className="flex flex-row gap-2 place-items-center">
                        <h6 className="h6">Home</h6>
                        <ChevronRight className="size-5 text-second-text-color"/>
                        <h6 className="h6">Shop</h6>
                        {categoryName && (
                            <>
                                <ChevronRight className="size-5 text-second-text-color"/>
                                <h6 className="h6 text-second-text-color capitalize">{categoryName}</h6>
                            </>
                        )}
                    </div>
                </div>

                {/* Filter Section */}
                <div className="w-full flex flex-col md:flex-row gap-4 justify-end items-center px-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filter}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        />
                        <Search className="text-gray-400" />
                    </div>
                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                        <option value="">Sort by</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                        <option value="rating:asc">Rating: Low to High</option>
                        <option value="rating:desc">Rating: High to Low</option>
                    </select>
                </div>

                {/* Categories Grid */}
                {!categoryId && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 place-items-center">
                        {topCategories.map((category) => (
                            <ShopTags key={category.id} category={category} />
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                <ShopProducts />
            </section>
        </div>
    );
};

export default Shop;