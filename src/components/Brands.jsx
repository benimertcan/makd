


const Brands = () => {
    const svgs = ["/svg/aws.svg","/svg/alien.svg","/svg/hooli.svg","/svg/piperHat.svg","/svg/lyft.svg","/svg/stripe.svg"]

    return (
        <>
            <section className="flex flex-col my-5 gap-10 place-items-center w-full  justify-center md:gap-20 md:flex-wrap md:flex-row">

              {
                svgs.map((svg, index) => {
                  return (
                        <img src={svg} key={index} className="size-24"></img>
                  );
                })
              }
            </section>
        </>
    );
};

export default Brands;