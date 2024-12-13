
function Furniture({ source }) {

    return (
        <>
            
                <div
                    className="flex flex-col w-[19rem] h-[85vh] bg-cover bg-center bg-no-repeat p-3 gap-1 place-self-center"
                    style={{ backgroundImage: `url(${source})` }}
                >
                    <h6 className="h6">FURNITURE</h6>
                    <p className="paragraph text-second-text-color font-bold">5 Items</p>
                </div>
            
        </>
    )
}

export default Furniture
