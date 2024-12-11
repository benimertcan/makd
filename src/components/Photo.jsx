
function Photo({ source }) {

    return (
        <>
            
                <div
                    className="flex flex-col w-full h-[50vh] bg-cover bg-center bg-no-repeat p-3 gap-1 place-self-center"
                    style={{ backgroundImage: `url(${source})` }}
                >
                  </div>
            
        </>
    )
}

export default Photo
