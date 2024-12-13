


const Things = () => {
    const number = ["1","2","3","4"]

    return (
        <>
            <section className="flex flex-col  my-5 gap-5 place-items-center   place-self-center  justify-center  md:flex-wrap md:flex-row">

              {
                number.map(( index) => {
                  return (
                        <div className="flex flex-row w-80 lg:w-64 lg place-content-center " key={index}>
                            <h2 className="h2 text-newRed mx-2">{index}.</h2>
                            <div className="flex flex-col gap-2">
                                <h6 className="h6">Easy to use</h6>
                                <p className="paragraph text-wrap">Things on a very small that you have any direct.</p>
                            </div>
                        </div>
                  );
                })
              }
            </section>
        </>
    );
};

export default Things;