


const Products = () => {


    return (
        <>
            <section className="flex flex-col gap-5 bg-[#ECECEC] w-full p-10 justify-center md:flex-wrap md:flex-row">

               <div className="flex flex-row w-80 bg-background-light place-content-center self-center p-4">
                <div className="flex flex-col justify-center gap-3 z-10">
                    <p className="paragraph opacity-75">Your Space</p>
                    <h3 className="h3">Unique Life</h3>
                    <p className="small opacity-75">Explore Items</p>
                </div>
                <div className="-ml-7 -z-0 size-56" >
                    <img src="/images/caramelCone.png"></img>
                </div>
               </div>

               <div className="flex flex-row bg-background-light place-content-center self-center w-80 p-4">
                <div className="flex flex-col justify-center gap-3 z-10">
                <p className="paragraph opacity-75">Ends Today</p>
                    <h3 className="h3">Elements Style</h3>
                    <p className="small opacity-75">Explore Items</p>
                </div>
                <div className="-ml-7 -z-0 size-56" >
                    <img src="/images/apple.jpg"></img>
                </div>
               </div>

               <div className="flex flex-row bg-background-light place-content-center self-center w-80 p-4">
                <div className="flex flex-col justify-center gap-3 z-10">
                    <p className="paragraph opacity-75">Ends Today</p>
                    <h3 className="h3">Elements Style</h3>
                    <p className="small opacity-75">Explore Items</p>
                </div>
                <div className="-ml-7 -z-0 size-56" >
                    <img src="/images/meat.jpg"></img>
                </div>
               </div>


            </section>
        </>
    );
};

export default Products;