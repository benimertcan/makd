
const ShopTags = ({ image }) => {
    if (!image) {
        console.error("Image source is not provided");
        return null;
    }

    return (
        <div className="flex flex-col gap-2 place-items-center justify-center size-72 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `linear-gradient(rgba(30, 30, 30, 0.5), rgba(30, 30, 30, 0.5)),url(${image})` }}>
            <h5 className="h5 text-text-light">CLOTHS</h5>
            <h6 className="paragraph text-text-light">5 Items</h6>
        </div>
    );
};

export default ShopTags;