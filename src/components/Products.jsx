


const Products = () => {


    return (
        <>
            <section className="flex flex-col gap-10 lg:gap-28 bg-[#ECECEC] w-full p-12 justify-center md:flex-wrap md:flex-row">

               <div className="flex flex-row  bg-background-light place-content-center self-center w-72 p-4 h-56">
                <div className="flex flex-col justify-center gap-3 z-10">
                    <p className="paragraph text-second-text-color">Your Space</p>
                    <h3 className="h3">Unique Life</h3>
                    <p className="small ">Explore Items</p>
                </div>
                
                    <img src="/images/caramelCone.png" className="-ml-10 -z-0 size-48"></img>
               
               </div>

               <div className="flex flex-row bg-background-light place-content-center self-center w-72 p-4  h-56">
                <div className="flex flex-col justify-center gap-3 z-10">
                <p className="paragraph text-second-text-color">Ends Today</p>
                    <h3 className="h3">Elements Style</h3>
                    <p className="small ">Explore Items</p>
                </div>
                
                    <img src="/images/apple.jpg" className="-ml-10 -z-0 size-48"></img>
               
               </div>

               <div className="flex flex-row bg-background-light place-content-center self-center w-72 p-4 h-56">
                <div className="flex flex-col justify-center gap-3 z-10">
                    <p className="paragraph text-second-text-color">Ends Today</p>
                    <h3 className="h3">Elements Style</h3>
                    <p className="small ">Explore Items</p>
                </div>
                
                    <img src="/images/meat.jpg" className="-ml-10 -z-0 size-48"></img>
                
               </div>


            </section>
        </>
    );
};

export default Products;