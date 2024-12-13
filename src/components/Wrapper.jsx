
function Wrapper({ children }) {

    return (
        <>

            <section className="flex flex-col my-10 lg:flex-row p-2 place-items-center justify-center content-center lg:min-w-[80vw]">
                {children}
            </section>

        </>
    )
}

export default Wrapper
