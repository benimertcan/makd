import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProductByCategory } from '../../actions/productActions';

const ShopTags = ({ category }) => {
    const dispatch = useDispatch();
    
    if (!category || typeof category.title !== 'string') return null;

    const [gender, setGender] = useState("k");

    useEffect(() => {
        if (category.gender === "k") {
            setGender("kadin");
        } else {
            setGender("erkek");
        }
    }, [category.gender]);

    const imgSrc = category.img ?? "/images/shopBackgroundTwo.jpg";

    const handleClick = () => {
        if (!category || !category.id) return;
        console.log('onClick event handler triggered');
        console.log('category:', category);
        console.log('category.id:', category.id);
        dispatch(fetchProductByCategory(category.id));
    };

    return (
        <div onClick={handleClick}>
            <Link
                to={`/shop/${gender}/${category.title.toLowerCase()}/${category.id}`}
                className="flex flex-col gap-2 place-items-center justify-center size-72 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `linear-gradient(rgba(30, 30, 30, 0.5), rgba(30, 30, 30, 0.5)), url(${imgSrc})` }}
            >
                <h5 className="h5 text-text-light">{category.title}</h5>
                {category.rating && <h6 className="paragraph text-text-light">Rating: {category.rating}</h6>}
            </Link>
        </div>
    );
};

export default ShopTags;
