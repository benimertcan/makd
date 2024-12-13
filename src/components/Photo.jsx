
function Photo({ source }) {

    return (
        <>
            
                <div
                    className="flex mx-10 flex-col w-full h-96 lg:size-[45rem] bg-cover bg-center bg-no-repeat p-3 gap-1 place-self-center"
                    style={{ backgroundImage: `url(${source})` }}
                >
                  </div>
            
        </>
    )
}

export default Photo
