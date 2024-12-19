import { Link } from 'react-router-dom';

const ShopTags = ({ category }) => {
    if (!category) return null;

    return (
        <Link 
            to={`/shop/${category.gender}/${category.title.toLowerCase()}`}
            className="flex flex-col gap-2 place-items-center justify-center size-72 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-90 transition-opacity" 
            style={{ backgroundImage: `linear-gradient(rgba(30, 30, 30, 0.5), rgba(30, 30, 30, 0.5)), url(${category.img || "/images/shopBackgroundTwo.jpg"})` }}
        >
            <h5 className="h5 text-text-light">{category.title}</h5>
            <h6 className="paragraph text-text-light">Rating: {category.rating}</h6>
        </Link>
    );
};

export default ShopTags;
