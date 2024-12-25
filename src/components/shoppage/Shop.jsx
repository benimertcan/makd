import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ShopTags from "./ShopTags";
import ShopProducts from "./ShopProducts";
import { fetchProductByCategory } from '../../actions/productActions';

const Shop = () => {
    const { categoryId, categoryName } = useParams();
    const { categories } = useSelector((store) => store.category);
    const { products, total, isLoading } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 25;

    useEffect(() => {
        const offset = currentPage * itemsPerPage;
        if (categoryId) {
            dispatch(fetchProductByCategory(categoryId, itemsPerPage, offset));
        }
    }, [categoryId, currentPage, dispatch]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!categories || categories.length === 0) return null;

    const topCategories = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    const pageCount = Math.ceil(total / itemsPerPage);

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

                {/* Categories Grid */}
                {!categoryId && categories && categories.length > 0 && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 place-items-center">
                        {topCategories.map((category) => (
                            category?.id && (
                                <ShopTags 
                                    key={category.id} 
                                    category={category} 
                                />
                            )
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                <ShopProducts products={products} isLoading={isLoading} />

                {/* Pagination */}
                {pageCount > 1 && (
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        forcePage={currentPage}
                        containerClassName={"flex gap-2 items-center mt-8"}
                        pageClassName={"px-3 py-1 rounded hover:bg-gray-100"}
                        previousClassName={"px-4 py-1 rounded text-primary-blue hover:bg-gray-100"}
                        nextClassName={"px-4 py-1 rounded text-primary-blue hover:bg-gray-100"}
                        activeClassName={"!bg-primary-blue text-white"}
                        disabledClassName={"opacity-50 cursor-not-allowed"}
                    />
                )}
            </section>
        </div>
    );
};

export default Shop;
