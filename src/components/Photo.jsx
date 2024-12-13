
function Photo({ source }) {

    return (
        <>          
                {source ? (
                    <img 
                        src={source} 
                        alt="photo"
                        className="flex  w-full flex-col size-96 md:size-[45rem]"
                    />
                ) : (
                    <p className="text-red-500">Image source not available</p>
                )}         
        </>
    )
}

export default Photo
