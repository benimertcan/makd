
function Wrapper({ children }) {

    return (
        <>

            <section className="flex flex-col lg:flex-row p-2 place-items-center justify-center content-center">
                {children}
            </section>

        </>
    )
}

export default Wrapper
